const express = require("express");
const bd = require("../../model/modelo");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { raw } = require("mysql2");

module.exports = (passport) => {
  const router = express.Router();

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

  return router;
};
