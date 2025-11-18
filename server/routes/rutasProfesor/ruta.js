const express = require("express");
const bd = require("../../model/modelo");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

module.exports = (passport) => {
  const router = express.Router();

  // Agregar ruta para obtener cursos del profesor
  router.get("/ObtenerCursos/Prof/:id", async (req, res) => {
    try {
      const { id } = req.params;

      console.log("Buscando cursos para profesor ID:", id);

      const grupos = await bd.Grupo.findAll({
        where: { id_prof: id },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            as: "Unidad_Aprendizaje",
          },
          {
            model: bd.DatosPersonales,
            as: "DatosPersonale",
          },
        ],
      });

      console.log("Grupos encontrados:", grupos.length);

      return res.json({
        success: true,
        cursos: grupos,
      });
    } catch (err) {
      console.error("Error en /ObtenerCursos/Prof/:id:", err);
      return res.status(500).json({
        success: false,
        msg: "Error al obtener los cursos del profesor",
        error: err.message,
      });
    }
  });

  // Ruta corregida: /AlumnosInscritos/:id
  router.get("/AlumnosInscritos/:id", async (req, res) => {
    const { id } = req.params;

    const currentDate = new Date().toISOString().split("T")[0];
    const val = await bd.Lista.count({
      where: { fecha: currentDate },
      include: [
        {
          model: bd.Mat_Inscritos,
          where: { id_grupo: id },
        },
      ],
    });
    const prof = await bd.DatosPersonales.findOne({
      include: [
        {
          model: bd.Grupo,
          where: { id: id },
        },
      ],
    });

    const alum = await bd.DatosPersonales.findAll({
      where: { tipo_usuario: "alumno" },
      include: [
        {
          model: bd.Horario,
          required: true,
          include: [
            {
              model: bd.Mat_Inscritos,
              required: true,
              where: { id_grupo: id },
            },
          ],
        },
      ],
    });

    if (val > 0) {
      return res.json({ success: false, profe: prof.id });
    } else {
      return res.json({ alumnos: alum, success: true, profe: prof.id });
    }
  });

  // Ruta corregida: /GuardarAsistencias/:id (cambiar parámetro a idGrupo para claridad)
  router.post("/GuardarAsistencias/:idGrupo", async (req, res) => {
    try {
      const { asistencias } = req.body;
      const { idGrupo } = req.params;
      const currentDate = new Date().toISOString().split("T")[0];

      const prof = await bd.DatosPersonales.findOne({
        include: [
          {
            model: bd.Grupo,
            where: { id: idGrupo },
          },
        ],
      });

      if (!asistencias || !Array.isArray(asistencias)) {
        return res.status(400).json({
          success: false,
          msg: "Formato inválido: 'asistencias' debe ser un arreglo",
        });
      }

      for (const reg of asistencias) {
        const hor = await bd.Horario.findOne({
          where: { id_alumno: reg.id_alumno },
        });

        const mat_i = await bd.Mat_Inscritos.findOne({
          where: { id_horario: hor.id, id_grupo: idGrupo },
        });

        if (!mat_i) continue;

        const id = uuidv4().replace(/-/g, "").substring(0, 15);

        await bd.Lista.create({
          id,
          id_inscrito: mat_i.id,
          fecha: currentDate,
          asistencia: reg.asistencia,
        });
      }

      return res.json({
        success: true,
        msg: "Se registró la asistencia de hoy correctamente",
        profe: prof.id,
      });
    } catch (err) {
      console.error("Error al registrar asistencias:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al guardar asistencias",
      });
    }
  });

  router.get("/TiempoCalificaciones", async (req, res) => {
    try {
      const fechas = await bd.FechasRelevantes.findOne();
      const hoy = new Date();
      let f;
      let fi;
      let periodo = "";

      if (fechas.registro_primer_parcial < hoy) {
        periodo = "1";
        f = new Date(fechas.registro_primer_parcial);
        fi = new Date(fechas.fin_registro_primer_parcial);
      } else if (fechas.registro_segundo_parcial < hoy) {
        periodo = "2";
        f = new Date(fechas.registro_segundo_parcial);
        fi = new Date(fechas.fin_registro_segundo_parcial);
      } else if (fechas.registro_tercer_parcial < hoy) {
        periodo = "3";
        f = new Date(fechas.registro_tercer_parcial);
        fi = new Date(fechas.fin_registro_tercer_parcial);
      }

      if (!f || !fi) {
        return res.json({ tiempo: false, periodo: null });
      }

      const fechaEvalI = new Date(f.getFullYear(), f.getMonth(), f.getDate());
      const fechaEvalF = new Date(
        fi.getFullYear(),
        fi.getMonth(),
        fi.getDate()
      );
      const hoyEval = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
      );

      if (hoyEval >= fechaEvalI && hoyEval <= fechaEvalF) {
        return res.json({ tiempo: true, periodo });
      }

      return res.json({ tiempo: false, periodo: null });
    } catch (err) {
      console.error("Error al obtener el tiempo de calificaciones:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al obtener el tiempo de calificaciones",
      });
    }
  });

  // Nuevo endpoint para guardar calificaciones
  router.post("/GuardarCalificaciones/:idGrupo", async (req, res) => {
    try {
      const { idGrupo } = req.params;
      const { calificaciones, periodo } = req.body;

      if (!calificaciones || !Array.isArray(calificaciones)) {
        return res.status(400).json({
          success: false,
          msg: "Formato inválido: 'calificaciones' debe ser un arreglo",
        });
      }

      if (!periodo || !["1", "2", "3"].includes(periodo)) {
        return res.status(400).json({
          success: false,
          msg: "Periodo inválido. Debe ser '1', '2' o '3'",
        });
      }

      const prof = await bd.DatosPersonales.findOne({
        include: [
          {
            model: bd.Grupo,
            where: { id: idGrupo },
          },
        ],
      });

      if (!prof) {
        return res.status(404).json({
          success: false,
          msg: "No se encontró el profesor para este grupo",
        });
      }

      for (const reg of calificaciones) {
        const { id_alumno, calificacion } = reg;

        const hor = await bd.Horario.findOne({
          where: { id_alumno },
        });

        if (!hor) continue;

        const mat_i = await bd.Mat_Inscritos.findOne({
          where: { id_horario: hor.id, id_grupo: idGrupo },
        });

        if (!mat_i) continue;

        // Actualizar la calificación según el periodo
        const campoCalif = `calif_${periodo}p`;
        await mat_i.update({
          [campoCalif]: parseFloat(calificacion),
        });
      }

      return res.json({
        success: true,
        msg: `Calificaciones del ${periodo}° parcial registradas correctamente`,
        profe: prof.id,
      });
    } catch (err) {
      console.error("Error al guardar calificaciones:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al guardar calificaciones",
      });
    }
  });

  // Ruta para generar PDF de un grupo/clase
  router.get("/Reportes/Clases/PDF/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const grupo = await bd.Grupo.findOne({
        where: { id },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            as: "Unidad_Aprendizaje",
          },
          {
            model: bd.DatosPersonales,
            as: "DatosPersonale",
          },
        ],
      });

      if (!grupo) {
        return res.status(404).json({ success: false, msg: "Grupo no encontrado" });
      }

      const distribucion = await bd.Distribucion.findAll({
        where: { id_grupo: id },
      });

      // Crear el PDF
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=clase_${grupo.nombre}.pdf`);

      doc.pipe(res);

      // Título
      doc.fontSize(20).text("Horario de Clase", { align: "center" });
      doc.moveDown();

      // Información del grupo
      doc.fontSize(12);
      doc.text(`Grupo: ${grupo.nombre}`);
      doc.text(`Materia: ${grupo.Unidad_Aprendizaje?.nombre || "N/A"}`);
      doc.text(`Profesor: ${grupo.DatosPersonale?.nombre || ""} ${grupo.DatosPersonale?.ape_paterno || ""}`);
      doc.text(`Turno: ${grupo.turno}`);
      doc.moveDown();

      // Horarios
      doc.fontSize(14).text("Horarios:", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(10);

      distribucion.forEach(dist => {
        doc.text(`${dist.dia}: ${dist.hora_ini} - ${dist.hora_fin} (Salón: ${dist.salon})`);
      });

      doc.end();

    } catch (err) {
      console.error("Error al generar PDF:", err);
      return res.status(500).json({
        success: false,
        msg: "Error al generar el PDF",
        error: err.message,
      });
    }
  });

  // Ruta para generar Excel de un grupo/clase
  router.get("/Reportes/Clases/Excel/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const grupo = await bd.Grupo.findOne({
        where: { id },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            as: "Unidad_Aprendizaje",
          },
          {
            model: bd.DatosPersonales,
            as: "DatosPersonale",
          },
        ],
      });

      if (!grupo) {
        return res.status(404).json({ success: false, msg: "Grupo no encontrado" });
      }

      const distribucion = await bd.Distribucion.findAll({
        where: { id_grupo: id },
      });

      const alumnos = await bd.DatosPersonales.findAll({
        where: { tipo_usuario: "alumno" },
        include: [
          {
            model: bd.Horario,
            required: true,
            include: [
              {
                model: bd.Mat_Inscritos,
                required: true,
                where: { id_grupo: id },
              },
            ],
          },
        ],
      });

      // Crear el Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Clase");

      // Información del grupo
      worksheet.addRow(["Grupo:", grupo.nombre]);
      worksheet.addRow(["Materia:", grupo.Unidad_Aprendizaje?.nombre || "N/A"]);
      worksheet.addRow(["Profesor:", `${grupo.DatosPersonale?.nombre || ""} ${grupo.DatosPersonale?.ape_paterno || ""}`]);
      worksheet.addRow(["Turno:", grupo.turno]);
      worksheet.addRow([]);

      // Horarios
      worksheet.addRow(["Horarios"]);
      worksheet.addRow(["Día", "Hora Inicio", "Hora Fin", "Salón"]);

      distribucion.forEach(dist => {
        worksheet.addRow([dist.dia, dist.hora_ini, dist.hora_fin, dist.salon]);
      });

      worksheet.addRow([]);
      worksheet.addRow(["Lista de Alumnos"]);
      worksheet.addRow(["Boleta", "Nombre", "Apellido Paterno", "Apellido Materno"]);

      alumnos.forEach(alumno => {
        worksheet.addRow([
          alumno.boleta,
          alumno.nombre,
          alumno.ape_paterno,
          alumno.ape_materno,
        ]);
      });

      // Configurar la respuesta
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=clase_${grupo.nombre}.xlsx`);

      await workbook.xlsx.write(res);
      res.end();

    } catch (err) {
      console.error("Error al generar Excel:", err);
      return res.status(500).json({
        success: false,
        msg: "Error al generar el Excel",
        error: err.message,
      });
    }
  });

  return router;
};
