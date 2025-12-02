const express = require("express");
const bd = require("../../model/modelo");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { raw } = require("mysql2");
const { Sequelize } = require("sequelize");

module.exports = (passport) => {
  const router = express.Router();

  router.get("/AlumnosInscritosPL/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // ----------------------------------------------------------
      // 1) OBTENER EL DÍA DE HOY (en texto igual que distribucion.dia)
      // ----------------------------------------------------------
      const dias = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
      ];
      const hoy = dias[new Date().getDay()];

      // ----------------------------------------------------------
      // 2) OBTENER LOS DÍAS EN QUE EL GRUPO TIENE CLASE
      // ----------------------------------------------------------
      const distribucion = await bd.Distribucion.findAll({
        where: { id_grupo: id },
        raw: true,
      });

      const diasClase = distribucion.map((d) => d.dia.toLowerCase().trim());
      const prof = await bd.DatosPersonales.findOne({
        include: [
          {
            model: bd.Grupo,
            where: { id: id },
          },
        ],
      });

      // ----------------------------------------------------------
      // 3) SI HOY NO ES DÍA DE CLASE → NO PUEDE PASAR LISTA
      // ----------------------------------------------------------
      if (!diasClase.includes(hoy)) {
        return res.json({
          success: false,
          motivo: "Hoy no corresponde pasar lista",
          diaHoy: hoy,
          diasClase,
          profe: prof.id,
        });
      }

      // ----------------------------------------------------------
      // 4) VALIDAR SI YA SE PASÓ LISTA HOY
      // ----------------------------------------------------------
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

      // Si ya se pasó lista hoy
      if (val > 0) {
        return res.json({
          success: false,
          motivo: "Lista ya registrada hoy",
          profe: prof.id,
        });
      }

      // ----------------------------------------------------------
      // 5) SI TODO ES CORRECTO → PERMITIR PASAR LISTA
      // ----------------------------------------------------------
      return res.json({
        success: true,
        alumnos: alum,
        profe: prof.id,
      });
    } catch (err) {
      console.error("Error en pasar lista:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno",
        error: err.message,
      });
    }
  });

  router.get("/AlumnosInscritos/:id", async (req, res) => {
    const { id } = req.params;

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

    return res.json({ alumnos: alum, success: true, profe: prof.id });
  });

  router.post("/RegistrarCalificaciones/:id/:periodo", async (req, res) => {
    const { id, periodo } = req.params;
    const us = req.user.id;

    try {
      const { calificaciones } = req.body;

      for (const reg of calificaciones) {
        // === Normalización segura de la calificación ===
        let cal = reg.calificacion;
        if (cal === "" || cal === null || cal === undefined) {
          cal = null;
        } else {
          cal = Number(cal);
        }

        // === Obtener horario del alumno ===
        const hor = await bd.Horario.findOne({
          where: { id_alumno: reg.id_alumno },
        });

        // ============================
        //  PRIMER PARCIAL
        // ============================
        if (periodo == "1") {
          await bd.Mat_Inscritos.update(
            { calificacion_primer: cal },
            {
              where: {
                id_horario: hor.id,
                id_grupo: id,
              },
            }
          );
        }

        // ============================
        //  SEGUNDO PARCIAL
        // ============================
        else if (periodo == "2") {
          await bd.Mat_Inscritos.update(
            { calificacion_segundo: cal },
            {
              where: {
                id_horario: hor.id,
                id_grupo: id,
              },
            }
          );
        }

        // ============================
        //  TERCER PARCIAL
        // ============================
        else if (periodo == "3") {
          await bd.Mat_Inscritos.update(
            { calificacion_tercer: cal },
            {
              where: {
                id_horario: hor.id,
                id_grupo: id,
              },
            }
          );
          await bd.Grupo.update(
            { reg_final: 1 },
            {
              where: { id: id },
            }
          );

          // Obtener todas las calificaciones después del update
          const cali = await bd.Mat_Inscritos.findOne({
            where: { id_horario: hor.id, id_grupo: id },
          });

          const promedio = Math.round(
            (Number(cali.calificacion_primer) +
              Number(cali.calificacion_segundo) +
              Number(cali.calificacion_tercer)) /
              3
          );

          await bd.Mat_Inscritos.update(
            { calificacion_final: promedio },
            {
              where: {
                id_horario: hor.id,
                id_grupo: id,
              },
            }
          );

          // ====== Lógica de aprobación/reprobación para ordinario ======

          const rep = await bd.Materia_Reprobada.findOne({
            where: {
              id_estudiante: reg.id_alumno,
              id_ua: id,
              estado_actual: "Recurse",
            },
          });

          if (promedio >= 6) {
            const kardex = await bd.Kardex.findOne({
              where: { id_alumno: reg.id_alumno },
            });
            const Ua = await bd.Unidad_Aprendizaje.findOne({
              include: [
                {
                  model: bd.Grupo,
                  where: { id: id },
                },
              ],
            });

            const f = await bd.FechasRelevantes.findOne();

            let M = "";

            if (rep) {
              M = "Recurse";
              await bd.Materia_Reprobada.destroy({
                where: { id_estudiante: reg.id_alumno, id_ua: id },
              });
            } else {
              M = "Ordinario";
            }
            await bd.UA_Aprobada.create({
              id: uuidv4().replace(/-/g, "").substring(0, 15),
              id_kardex: kardex.id,
              unidad_aprendizaje: id,
              calificacion_final: promedio,
              semestre: Ua.semestre,
              periodo: f.periodo,
              fecha: new Date(),
              metodo_aprobado: M,
            });
          }
        }

        // ============================
        //  EXTRAORDINARIO
        // ============================
        else if (periodo == "extra") {
          await bd.Grupo.update(
            { reg_extra: 1 },
            {
              where: { id: id },
            }
          );
          await bd.Mat_Inscritos.update(
            { extra: cal },
            {
              where: {
                id_horario: hor.id,
                id_grupo: id,
              },
            }
          );
          const rep = await bd.Materia_Reprobada.findOne({
            where: {
              id_estudiante: reg.id_alumno,
              id_ua: id,
              estado_actual: "Recurse",
            },
          });
          const es = await bd.Estudiante.findOne({
            where: { id_usuario: reg.id_alumno },
          });

          const kardex = await bd.Kardex.findOne({
            where: { id_alumno: reg.id_alumno },
          });

          const Ua = await bd.Unidad_Aprendizaje.findOne({
            include: [
              {
                model: bd.Grupo,
                where: { id: id },
              },
            ],
          });

          const f = await bd.FechasRelevantes.findOne();

          let M = "";

          // Caso de REPROBACIÓN en extra
          if (cal < 6) {
            if (rep) {
              await bd.Materia_Reprobada.update(
                {
                  estado_actual: "Reprobada",
                  periodos_restantes: rep.periodos_restantes - 1,
                  recurse: 0,
                },
                {
                  where: { id_estudiante: es.id, id_ua: id },
                }
              );
            } else {
              await bd.Materia_Reprobada.create({
                id: uuidv4().replace(/-/g, "").substring(0, 15),
                id_estudiante: es.id,
                id_ua: Ua.id,
                estado_actual: "Reprobada",
                periodos_restantes: 3,
                recurse: 1,
              });
              await bd.Estudiante.update({
                estado_academico: "Irregular",
                where: { id_usuario: es.id },
              });
            }
          }

          // Caso de APROBADO en extra
          else {
            if (rep) {
              M = "Extraordinario en recurse";
              await bd.Materia_Reprobada.destroy({
                where: { id_estudiante: es.id, id_ua: id },
              });
            } else {
              M = "Extraordinario";
            }

            await bd.UA_Aprobada.create({
              id: uuidv4().replace(/-/g, "").substring(0, 15),
              id_kardex: kardex.id,
              unidad_aprendizaje: id,
              calificacion_final: cal,
              semestre: Ua.semestre,
              periodo: f.periodo,
              fecha: new Date(),
              metodo_aprobado: M,
            });
          }
        }
      }

      return res.json({ success: true, profe: us });
    } catch (err) {
      console.error("Error al obtener alumnos y calificaciones:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al obtener alumnos y calificaciones",
      });
    }
  });

  router.post("/GuardarAsistencias/:id", async (req, res) => {
    try {
      const { grupo, asistencias } = req.body;
      const { id } = req.params;
      const currentDate = new Date().toISOString().split("T")[0];
      const prof = await bd.DatosPersonales.findOne({
        include: [
          {
            model: bd.Grupo,
            where: { id: id },
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
          where: { id_horario: hor.id, id_grupo: grupo },
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

  router.get("/CalificacionesGuardadas/:id/:periodo", async (req, res) => {
    const { id, periodo } = req.params;
    const us = req.user.id;
    try {
      const alumnosConCalificaciones = [];
      let alumnos = [];
      if (periodo == "extra") {
        alumnos = await bd.DatosPersonales.findAll({
          where: { tipo_usuario: "alumno" },
          include: [
            {
              model: bd.Horario,
              required: true,
              include: [
                {
                  model: bd.Mat_Inscritos,
                  required: true,
                  where: {
                    id_grupo: id,
                    [Op.and]: [
                      Sequelize.where(
                        Sequelize.cast(
                          Sequelize.col(
                            "Horario.Mat_Inscritos.calificacion_final"
                          ),
                          "UNSIGNED"
                        ),
                        { [Op.lte]: 6 }
                      ),
                    ],
                  },
                },
              ],
            },
          ],
          nest: true,
          raw: true,
        });
      } else {
        alumnos = await bd.DatosPersonales.findAll({
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
          raw: true,
          nest: true,
        });
      }

      for (const alumno of alumnos) {
        const ins = alumno.Horario.Mat_Inscritos;

        let calificacion = null;

        if (periodo == "1") {
          calificacion = ins.calificacion_primer;
        } else if (periodo == "2") {
          calificacion = ins.calificacion_segundo;
        } else if (periodo == "3") {
          calificacion = ins.calificacion_tercer;
        } else if (periodo == "extra") {
          calificacion = ins.extra;
        }

        alumnosConCalificaciones.push({
          id: alumno.id,
          nombre: alumno.nombre,
          ape_paterno: alumno.ape_paterno,
          ape_materno: alumno.ape_materno,
          calificacion,
        });
      }

      return res.json({
        success: true,
        alumnos: alumnosConCalificaciones,
        profe: us,
      });
    } catch (err) {
      console.error("Error al obtener calificaciones guardadas:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al obtener calificaciones guardadas",
      });
    }
  });

  router.get("/TiempoCalificaciones", async (req, res) => {
    try {
      const fechas = await bd.FechasRelevantes.findOne();
      const hoy = new Date();

      const p1_inicio = new Date(fechas.registro_primer_parcial);
      const p1_fin = new Date(fechas.fin_registro_primer_parcial);

      const p2_inicio = new Date(fechas.registro_segundo_parcial);
      const p2_fin = new Date(fechas.fin_registro_segundo_parcial);

      const p3_inicio = new Date(fechas.registro_tercer_parcial);
      const p3_fin = new Date(fechas.fin_registro_tercer_parcial);

      const extra_inicio = new Date(fechas.registro_extra);
      const extra_fin = new Date(fechas.fin_registro_extra);

      let periodo = "";
      let f, fi;

      if (hoy >= p1_inicio && hoy <= p1_fin) {
        periodo = "1";
        f = p1_inicio;
        fi = p1_fin;
      } else if (hoy >= p2_inicio && hoy <= p2_fin) {
        periodo = "2";
        f = p2_inicio;
        fi = p2_fin;
      } else if (hoy >= p3_inicio && hoy <= p3_fin) {
        periodo = "3";
        f = p3_inicio;
        fi = p3_fin;
      } else if (hoy >= extra_inicio && hoy <= extra_fin) {
        periodo = "extra";
        f = extra_inicio;
        fi = extra_fin;
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
      } else {
        return res.json({ tiempo: false, periodo: null });
      }
    } catch (err) {
      console.error("Error al obtener el tiempo de calificaciones:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al obtener el tiempo de calificaciones",
      });
    }
  });

  // ============================
  //  OBTENER INSCRITOS EN UN GRUPO
  // ============================
  router.get("/ObtenerInscritos/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const inscritos = await bd.Mat_Inscritos.findAll({
        where: { id_grupo: id },
        include: [
          {
            model: bd.Horario,
            required: true,
            include: [
              {
                model: bd.DatosPersonales,
                required: true,
                where: { tipo_usuario: "alumno" },
              },
            ],
          },
        ],
      });

      return res.json({
        success: true,
        inscritos: inscritos,
      });
    } catch (err) {
      console.error("Error al obtener inscritos:", err);
      return res.status(500).json({
        success: false,
        msg: "Error interno al obtener inscritos",
      });
    }
  });

  // ============================
  //  GENERAR PDF DE LISTA DE ASISTENCIA
  // ============================
  router.get("/Reportes/Clases/PDF/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // Obtener información del grupo
      const grupo = await bd.Grupo.findOne({
        where: { id },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
          },
          {
            model: bd.DatosPersonales,
          },
        ],
      });

      if (!grupo) {
        return res
          .status(404)
          .json({ success: false, msg: "Grupo no encontrado" });
      }

      // Obtener inscritos
      const inscritos = await bd.Mat_Inscritos.findAll({
        where: { id_grupo: id },
        include: [
          {
            model: bd.Horario,
            required: true,
            include: [
              {
                model: bd.DatosPersonales,
                required: true,
                where: { tipo_usuario: "alumno" },
              },
            ],
          },
        ],
      });

      const profesorNombre = grupo.DatosPersonale
        ? `${grupo.DatosPersonale.nombre || ""} ${
            grupo.DatosPersonale.ape_paterno || ""
          } ${grupo.DatosPersonale.ape_materno || ""}`
        : "";

      // Construir filas de alumnos (hasta 30 filas)
      const filas = [];
      for (let i = 0; i < 30; i++) {
        const ins = inscritos[i];
        const nombreEst =
          ins && ins.Horario && ins.Horario.DatosPersonale
            ? `${ins.Horario.DatosPersonale.nombre || ""} ${
                ins.Horario.DatosPersonale.ape_paterno || ""
              } ${ins.Horario.DatosPersonale.ape_materno || ""}`
            : "";
        filas.push({ no: i + 1, nombre: nombreEst });
      }

      // Generar celdas para días 1..31
      const dayHeaders = Array.from({ length: 31 }, (_, i) => i + 1);

      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Lista de asistencia - ${grupo.nombre}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { display:flex; align-items:center; margin-bottom:10px; }
              .title { background: #ffd54f; padding: 10px 16px; font-weight:700; color:#000; }
              .meta { flex:1; text-align:center; }
              .meta small { display:block; font-size:12px; }
              .right { width:260px; text-align:left; }
              table { border-collapse: collapse; width: 100%; font-size:11px; }
              table th, table td { border: 1px solid #333; padding:4px; }
              th.day { background:#00b050; color:#fff; }
              th.name { background:#2f75b5; color:#fff; }
              .no-col { width:36px; text-align:center; }
              .name-col { width:260px; text-align:left; padding-left:6px; }
              .percent-col { width:46px; text-align:center; }
              .footer { margin-top:8px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">LISTA DE ASISTENCIA</div>
              <div class="meta">
                <div><strong>NOMBRE DE LA ESCUELA:</strong></div>
                <div><small>__________________________________________</small></div>
                <div style="margin-top:4px"><strong>NOMBRE DEL MAESTRO(A):</strong> ${profesorNombre}</div>
              </div>
              <div class="right">
                <div>MES: <strong>${new Date()
                  .toLocaleString("default", { month: "long" })
                  .toUpperCase()}</strong></div>
                <div>GRADO: <strong>${
                  grupo.Unidad_Aprendizaje
                    ? grupo.Unidad_Aprendizaje.semestre || ""
                    : ""
                }</strong></div>
                <div>GRUPO: <strong>${grupo.nombre || ""}</strong></div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th class="no-col">NO.</th>
                  <th class="name-col">NOMBRE Y APELLIDO</th>
                  ${dayHeaders.map((d) => `<th class="day">${d}</th>`).join("")}
                  <th class="percent-col">%</th>
                </tr>
              </thead>
              <tbody>
                ${filas
                  .map(
                    (f) => `
                  <tr>
                    <td style="text-align:center">${f.no}</td>
                    <td>${f.nombre}</td>
                    ${dayHeaders.map(() => `<td>&nbsp;</td>`).join("")}
                    <td style="text-align:center">&nbsp;</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="footer">
              <table style="width:100%">
                <tr>
                  <td style="background:#f28b00;color:#fff;padding:6px;font-weight:700;">ASISTENCIAS DIARIAS</td>
                  <td style="padding:6px">${dayHeaders
                    .map(() => "0")
                    .join(" ")}</td>
                </tr>
              </table>
            </div>

            <p style="font-size:11px;color:#666;margin-top:8px;">Generado: ${new Date().toLocaleString()}</p>
          </body>
        </html>
      `;

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    } catch (err) {
      console.error("Error al generar PDF:", err);
      return res
        .status(500)
        .json({ success: false, msg: "Error al generar PDF" });
    }
  });

  // ============================
  //  GENERAR EXCEL DE CLASE (XLSX)
  // ============================
  router.get("/Reportes/Clases/Excel/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ExcelJS = require("exceljs");

      // Obtener información del grupo
      const grupo = await bd.Grupo.findOne({
        where: { id },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
          },
          {
            model: bd.DatosPersonales,
          },
        ],
      });

      if (!grupo) {
        return res
          .status(404)
          .json({ success: false, msg: "Grupo no encontrado" });
      }

      // Obtener inscritos
      const inscritos = await bd.Mat_Inscritos.findAll({
        where: { id_grupo: id },
        include: [
          {
            model: bd.Horario,
            required: true,
            include: [
              {
                model: bd.DatosPersonales,
                required: true,
                where: { tipo_usuario: "alumno" },
              },
            ],
          },
        ],
      });

      // Obtener distribución de horarios
      const distribucion = await bd.Distribucion.findAll({
        where: { id_grupo: id },
      });

      // Crear libro de Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Lista de Clase");

      // Información del grupo (primeras filas)
      worksheet.addRow(["INFORMACIÓN DEL GRUPO"]);
      worksheet.addRow(["Grupo:", grupo.nombre]);
      worksheet.addRow([
        "Unidad de Aprendizaje:",
        grupo.Unidad_Aprendizaje ? grupo.Unidad_Aprendizaje.nombre : "",
      ]);
      worksheet.addRow([
        "Profesor:",
        grupo.DatosPersonale
          ? `${grupo.DatosPersonale.nombre || ""} ${
              grupo.DatosPersonale.ape_paterno || ""
            } ${grupo.DatosPersonale.ape_materno || ""}`
          : "",
      ]);
      worksheet.addRow(["Turno:", grupo.turno]);
      worksheet.addRow([
        "Carrera:",
        grupo.Unidad_Aprendizaje ? grupo.Unidad_Aprendizaje.carrera : "",
      ]);
      worksheet.addRow(["Cupo:", grupo.cupo]);
      worksheet.addRow([]);

      // Horarios del grupo
      worksheet.addRow(["HORARIOS"]);
      const horariosHeader = worksheet.addRow([
        "Día",
        "Hora Inicio",
        "Hora Fin",
      ]);
      horariosHeader.font = { bold: true };
      horariosHeader.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4472C4" },
      };
      horariosHeader.font = { color: { argb: "FFFFFFFF" }, bold: true };

      distribucion.forEach((d) => {
        worksheet.addRow([d.dia, d.hora_ini, d.hora_fin]);
      });

      worksheet.addRow([]);

      // Lista de estudiantes
      worksheet.addRow(["LISTA DE ESTUDIANTES"]);
      const estudiantesHeader = worksheet.addRow([
        "No.",
        "ID Estudiante",
        "Nombre Completo",
        "Calificación Final",
      ]);
      estudiantesHeader.font = { bold: true };
      estudiantesHeader.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF70AD47" },
      };
      estudiantesHeader.font = { color: { argb: "FFFFFFFF" }, bold: true };

      inscritos.forEach((ins, index) => {
        const estudiante =
          ins.Horario && ins.Horario.DatosPersonale
            ? ins.Horario.DatosPersonale
            : null;
        worksheet.addRow([
          index + 1,
          estudiante ? estudiante.id : "",
          estudiante
            ? `${estudiante.nombre || ""} ${estudiante.ape_paterno || ""} ${
                estudiante.ape_materno || ""
              }`
            : "",
          ins.calificacion_final || "",
        ]);
      });

      // Ajustar ancho de columnas
      worksheet.columns = [
        { key: "A", width: 10 },
        { key: "B", width: 20 },
        { key: "C", width: 50 },
        { key: "D", width: 20 },
      ];

      // Enviar archivo
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=clase_${grupo.nombre}_${
          new Date().toISOString().split("T")[0]
        }.xlsx`
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error("Error al generar Excel:", err);
      return res
        .status(500)
        .json({ success: false, msg: "Error al generar Excel" });
    }
  });

  // ============================
  //  VALIDAR FECHA DE EVALUACIÓN ETS
  // ============================
  router.get("/ValidarFechaETS", async (req, res) => {
    try {
      const fechas = await bd.FechasRelevantes.findOne();

      if (!fechas) {
        return res.json({
          valido: false,
          mensaje: "No hay fechas configuradas en el sistema",
        });
      }

      const hoy = new Date();
      const inicio = new Date(fechas.eval_ets);
      const fin = new Date(fechas.fin_evalu_ets);

      // Normalizar fechas (solo día, mes, año)
      const hoyNorm = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
      );
      const inicioNorm = new Date(
        inicio.getFullYear(),
        inicio.getMonth(),
        inicio.getDate()
      );
      const finNorm = new Date(
        fin.getFullYear(),
        fin.getMonth(),
        fin.getDate()
      );

      if (hoyNorm >= inicioNorm && hoyNorm <= finNorm) {
        return res.json({
          valido: true,
          mensaje: "Período de evaluación ETS activo",
        });
      } else {
        return res.json({
          valido: false,
          mensaje: `El período de evaluación ETS es del ${inicio.toLocaleDateString(
            "es-MX"
          )} al ${fin.toLocaleDateString("es-MX")}`,
        });
      }
    } catch (err) {
      console.error("Error al validar fecha ETS:", err);
      return res.status(500).json({
        valido: false,
        mensaje: "Error al validar la fecha de evaluación",
      });
    }
  });

  // ============================
  //  OBTENER GRUPOS ETS DEL PROFESOR
  // ============================
  router.get("/ObtenerMisGruposETS/:id", async (req, res) => {
    try {
      const { id } = req.params; // ID del profesor
      console.log("Buscando grupos ETS para profesor:", id);

      const gruposETS = await bd.ETS_grupo.findAll({
        where: { id_aplicante: id },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["id", "nombre", "credito", "semestre"],
          },
        ],
      });

      console.log("Grupos encontrados en BD:", gruposETS.length);

      const grupos = gruposETS.map((g) => ({
        id: g.id,
        id_ua: g.id_ua,
        nombre_ua: g.Unidad_Aprendizaje ? g.Unidad_Aprendizaje.nombre : "",
        turno: g.turno,
        hora_inicio: g.hora_inicio,
        hora_final: g.hora_final,
        fecha: g.fecha,
      }));

      console.log("Enviando respuesta con", grupos.length, "grupos");

      return res.json({
        success: true,
        grupos: grupos,
      });
    } catch (err) {
      console.error("Error al obtener grupos ETS:", err);
      return res.status(500).json({
        success: false,
        mensaje: "Error al obtener grupos ETS",
      });
    }
  });

  // ============================
  //  OBTENER ALUMNOS DE UN GRUPO ETS
  // ============================
  router.get("/ObtenerAlumnosETS/:idGrupo", async (req, res) => {
    try {
      const { idGrupo } = req.params;

      const alumnosETS = await bd.ETS.findAll({
        where: { id_grupo: idGrupo },
        include: [
          {
            model: bd.Materia_Reprobada,
            required: true,
            include: [
              {
                model: bd.Estudiante,
                required: true,
                include: [
                  {
                    model: bd.DatosPersonales,
                    required: true,
                    attributes: ["id", "nombre", "ape_paterno", "ape_materno"],
                  },
                ],
              },
              {
                model: bd.Unidad_Aprendizaje,
                required: true,
                attributes: ["id", "nombre"],
              },
            ],
          },
        ],
        where: { validado: 1 },
      });

      const alumnos = alumnosETS.map((ets) => ({
        id_ets: ets.id,
        boleta: ets.Materia_Reprobada.Estudiante.DatosPersonale.id,
        nombre: ets.Materia_Reprobada.Estudiante.DatosPersonale.nombre,
        ape_paterno:
          ets.Materia_Reprobada.Estudiante.DatosPersonale.ape_paterno,
        ape_materno:
          ets.Materia_Reprobada.Estudiante.DatosPersonale.ape_materno,
        nombre_ua: ets.Materia_Reprobada.Unidad_Aprendizaje.nombre,
        calificado: ets.calificado,
      }));

      return res.json({
        success: true,
        alumnos: alumnos,
      });
    } catch (err) {
      console.error("Error al obtener alumnos ETS:", err);
      return res.status(500).json({
        success: false,
        mensaje: "Error al obtener alumnos del grupo ETS",
      });
    }
  });

  // ============================
  //  REGISTRAR CALIFICACIONES ETS
  // ============================
  router.post("/RegistrarCalificacionesETS", async (req, res) => {
    try {
      const { calificaciones } = req.body;

      if (!calificaciones || !Array.isArray(calificaciones)) {
        return res.status(400).json({
          success: false,
          mensaje: "Formato inválido de calificaciones",
        });
      }

      for (const cal of calificaciones) {
        const calificacion =
          cal.calificacion === null ? 0 : parseFloat(cal.calificacion);

        // Actualizar la calificación en la tabla ETS
        await bd.ETS.update(
          { calificado: calificacion },
          { where: { id: cal.id_ets } }
        );

        // Obtener información del ETS
        const ets = await bd.ETS.findOne({
          where: { id: cal.id_ets },
          include: [
            {
              model: bd.Materia_Reprobada,
              include: [
                {
                  model: bd.Estudiante,
                  include: [{ model: bd.DatosPersonales }],
                },
                {
                  model: bd.Unidad_Aprendizaje,
                },
              ],
            },
          ],
        });

        if (!ets) continue;

        const materiaRep = ets.Materia_Reprobada;
        const estudiante = materiaRep.Estudiante;
        const ua = materiaRep.Unidad_Aprendizaje;
        const alumnoId = estudiante.DatosPersonale.id;

        // Si aprueba (calificación >= 6.0)
        if (calificacion >= 6.0) {
          // Buscar el kardex del alumno
          const kardex = await bd.Kardex.findOne({
            where: { id_alumno: alumnoId },
          });

          if (kardex) {
            // Agregar a UA_Aprobada
            const fechas = await bd.FechasRelevantes.findOne();

            await bd.UA_Aprobada.create({
              id: uuidv4().replace(/-/g, "").substring(0, 15),
              id_kardex: kardex.id,
              unidad_aprendizaje: ua.id,
              calificacion_final: calificacion,
              semestre: ua.semestre,
              periodo: fechas ? fechas.periodo : "N/A",
              fecha: new Date(),
              metodo_aprobado: "ETS",
            });
          }

          // Eliminar de materia_reprobada
          await bd.Materia_Reprobada.destroy({
            where: { id: materiaRep.id },
          });
        } else {
          // Si no aprueba (calificación < 6.0)
          // Reducir un periodo en materia_reprobada
          const nuevosPeriodos = Math.max(0, materiaRep.periodos_restantes - 1);

          await bd.Materia_Reprobada.update(
            {
              periodos_restantes: nuevosPeriodos,
              estado_actual: "Reprobada",
            },
            { where: { id: materiaRep.id } }
          );
        }
      }

      return res.json({
        success: true,
        mensaje: "Calificaciones registradas correctamente",
      });
    } catch (err) {
      console.error("Error al registrar calificaciones ETS:", err);
      return res.status(500).json({
        success: false,
        mensaje: "Error al registrar las calificaciones",
      });
    }
  });

  return router;
};
