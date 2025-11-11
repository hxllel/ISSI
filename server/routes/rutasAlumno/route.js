const express = require("express");
const bd = require("../../model/modelo");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { raw } = require("mysql2");

module.exports = (passport) => {
  const router = express.Router();

  // Nueva ruta: devuelve JSON para que el frontend realice la navegación al Chat
  // Se normaliza la ruta para usar la misma convención de capitalización que el resto
  router.get("/Chat/:id", (req, res) => {
    try {
      const { id } = req.params;
      // Respondemos con JSON en vez de redirigir. El frontend debe usar este JSON para navegar.
      return res.json({
        success: true,
        alumnoId: id,
        path: `/alumno/chat/${id}`,
        message:
          "Navegue en el cliente al path indicado para mostrar la vista de chat",
      });
    } catch (err) {
      console.error("Error en /Alumno/Chat/:id ->", err);
      return res
        .status(500)
        .json({ success: false, error: "Error al obtener datos para el chat" });
    }
  });

  router.get("/ObtenerHorario/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const datos = await bd.Horario.findAll({
        where: { id_alumno: id },
        include: [
          {
            model: bd.Mat_Inscritos,
            include: [
              {
                model: bd.Grupo,
                attributes: ["nombre", "turno"],
                include: [
                  {
                    model: bd.Distribucion,
                    attributes: ["hora_ini", "hora_fin", "dia"],
                  },
                  {
                    model: bd.Unidad_Aprendizaje,
                    attributes: ["nombre"],
                  },
                  {
                    model: bd.DatosPersonales,
                    attributes: ["nombre", "ape_paterno", "ape_materno"],
                  },
                ],
              },
            ],
          },
        ],
      });

      const materias = [];

      datos.forEach((hor) => {
        hor.Mat_Inscritos.forEach((ins) => {
          const grupo = ins.Grupo;
          const prof = grupo?.DatosPersonale;
          const materia = grupo?.Unidad_Aprendizaje?.nombre;

          const base = {
            materia: materia || "Sin materia",
            grupo: grupo?.nombre || "Sin grupo",
            turno: grupo?.turno || "Sin turno",
            profesor: prof
              ? `${prof.nombre} ${prof.ape_paterno} ${prof.ape_materno}`
              : "Sin profesor",
            distribuciones: grupo?.Distribucions?.map((d) => ({
              dia: d.dia,
              hora_ini: d.hora_ini,
              hora_fin: d.hora_fin,
            })) || [
              {
                dia: "Sin día",
                hora_ini: "",
                hora_fin: "",
              },
            ],
          };

          materias.push(base);
        });
      });

      const horarioUnificado = Object.values(
        materias.reduce((acc, curr) => {
          const key = `${curr.materia}-${curr.grupo}-${curr.turno}`;
          if (!acc[key]) {
            acc[key] = { ...curr, distribuciones: [] };
          }
          acc[key].distribuciones.push(...curr.distribuciones);
          return acc;
        }, {})
      );
      res.json({ horario: horarioUnificado });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener el horario" });
    }
  });

  router.get("/Grupos/:id", async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Usuario no autenticado",
      });
    }

    const us = req.user.id;
    const { id } = req.params;

    const cre = await bd.Estudiante.findOne({
      where: { id_usuario: us },
    });

    if (!req.session.tempGrupos) {
      req.session.tempGrupos = [];
      req.session.creditos = parseInt(cre.creditos_disponibles, 10);
    }

    try {
      const carr = await bd.DatosPersonales.findOne({
        where: { id: id },
      });

      // Obtener los grupos con includes
      const grupos = await bd.Grupo.findAll({
        attributes: ["id", "nombre", "turno", "cupo"],
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["id", "nombre", "credito", "semestre", "carrera"],
            where: { carrera: carr.carrera },
          },
          {
            model: bd.DatosPersonales,
            attributes: ["nombre", "ape_paterno", "ape_materno"],
          },
        ],
        raw: true,
        nest: true,
      });

      return res.json({ grupos, creditos: req.session.creditos });
    } catch (error) {
      console.error("Error al obtener los grupos:", error);
      res.status(500).json({ error: "Error interno" });
    }
  });

  router.get("/ObtenerDist/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const Distri = await bd.Distribucion.findAll({
        where: { id_grupo: id },
        attributes: ["dia", "hora_ini", "hora_fin"],
      });
      return res.json({ Distri });
    } catch (error) {
      console.error("Error al obtener la distribucion de horas:", error);
      res.status(500).json({ error: "Error interno" });
    }
  });
  router.get("/ObtenerGrupo", async (req, res) => {
    try {
      // Traer los grupos con datos personales y unidad de aprendizaje
      const cursos = await bd.Grupo.findAll({
        include: [
          {
            model: bd.DatosPersonales,
            attributes: ["nombre", "ape_paterno", "ape_materno"],
          },
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["nombre", "carrera"],
          },
        ],
        raw: true,
        nest: true,
      });

      console.log("ObtenerGrupo: cursos obtenidos =", cursos.length);

      // Si no hay cursos, devolver array vacío
      if (!Array.isArray(cursos) || cursos.length === 0) {
        return res.json({ cursos: [] });
      }

      // Obtener todas las distribuciones para los grupos obtenidos en una sola consulta
      const groupIds = cursos.map((c) => c.id);
      const distribuciones = await bd.Distribucion.findAll({
        where: { id_grupo: groupIds },
        attributes: ["id", "id_grupo", "dia", "hora_ini", "hora_fin"],
        raw: true,
      });

      // Adjuntar distribuciones a cada curso
      const cursosConDistrib = cursos.map((c) => {
        const d = distribuciones.filter((x) => x.id_grupo === c.id);
        return { ...c, Distribucion: d };
      });

      res.json({ cursos: cursosConDistrib });
    } catch (error) {
      console.error("Error al obtener los cursos: ", error);
      return res.status(500).json({ error: "Error interno al obtener cursos" });
    }
  });

  router.get("/Alumno/VerHorarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const grupos = await bd.Grupo.findAll({
        attributes: ["id", "nombre", "id_ua", "id_prof", "cupo"],
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["id", "nombre"],
          },
          {
            model: bd.DatosPersonales,
            attributes: [
              "id",
              "nombre",
              "ape_paterno",
              "ape_materno",
              "calificacion",
            ],
          },
        ],
        raw: true,
        nest: true,
      });

      console.log("Grupos obtenidos count:", grupos.length);
      const resultado = [];

      for (const g of grupos) {
        console.log("Procesando grupo raw:", g);
        const distribuciones = await bd.Distribucion.findAll({
          where: { id_grupo: g.id },
          attributes: ["dia", "hora_ini", "hora_fin"],
          raw: true,
        });

        console.log(
          `Distribuciones encontradas para grupo ${g.id}:`,
          distribuciones.length
        );

        const dias = {
          Lunes: [],
          Martes: [],
          Miercoles: [],
          Jueves: [],
          Viernes: [],
        };
        distribuciones.forEach((d) => {
          const diaKey =
            d.dia === "Miércoles" || d.dia === "Miercoles"
              ? "Miercoles"
              : d.dia;
          if (dias[diaKey] !== undefined)
            dias[diaKey].push(`${d.hora_ini}-${d.hora_fin}`);
        });

        const datosProf = g.DatosPersonale || g.DatosPersonales || {};
        resultado.push({
          id_grupo: g.id,
          id_ua:
            (g.Unidad_Aprendizaje &&
              (g.Unidad_Aprendizaje.id || g.Unidad_Aprendizaje.ID)) ||
            g.id_ua,
          nombre_ua:
            (g.Unidad_Aprendizaje &&
              (g.Unidad_Aprendizaje.nombre || g.Unidad_Aprendizaje.Nombre)) ||
            "",
          profesor: `${datosProf.nombre || ""} ${datosProf.ape_paterno || ""} ${
            datosProf.ape_materno || ""
          }`.trim(),
          calificacion_profesor: datosProf.calificacion || null,
          cupo: g.cupo,
          dias,
        });
      }

      return res.json({ filas: resultado });
    } catch (error) {
      console.error("Error al obtener horarios:", error);
      return res.status(500).json({ error: "Error interno" });
    }
  });
  router.post("/Agregar/:id", async (req, res) => {
    const { id } = req.params;
    const us = req.user.id;
    console.log(us);

    const cre = await bd.Estudiante.findOne({
      where: { id_usuario: us },
    });

    const cuesta = await bd.Grupo.findOne({
      where: { id: id },
      include: [
        {
          model: bd.Unidad_Aprendizaje,
          attributes: ["credito"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!req.session.tempGrupos) {
      req.session.tempGrupos = [];
      req.session.creditos = parseInt(cre.creditos_disponibles, 10);
    }
    if (!req.session.tempGrupos.includes(id)) {
      const gruposActuales = req.session.tempGrupos || [];

      const distribuciones = await bd.Distribucion.findAll({
        attributes: ["dia", "hora_ini", "hora_fin", "id_grupo"],
        where: {
          id_grupo: [...gruposActuales, id],
        },
      });

      let ua_existe = false;
      const distriNuevo = distribuciones.filter((d) => d.id_grupo === id);
      const ua = await bd.Grupo.findOne({ where: { id: id } });

      for (const g of gruposActuales) {
        const distriExistente = distribuciones.filter((d) => d.id_grupo === g);
        const uas = await bd.Grupo.findOne({ where: { id: g } });
        if (uas.id_ua == ua.id_ua) {
          return res.json({
            success: false,
            err: "Ya hay una grupo con la unidad de aprendizaje",
            tempGrupo: req.session.tempGrupos,
            creditos: req.session.creditos,
          });
        } else {
          for (const dis of distriExistente) {
            for (const disNuevo of distriNuevo) {
              if (seTraslapan(dis, disNuevo)) {
                return res.json({
                  success: false,
                  err: `El grupo ${id} se traslapa con el grupo ${g}`,
                  tempGrupo: req.session.tempGrupos,
                  creditos: req.session.creditos,
                });
              }
            }
          }
        }
      }
      if (
        parseInt(req.session.creditos, 10) <
        parseInt(cuesta.Unidad_Aprendizaje.credito, 10)
      ) {
        return res.json({
          success: false,
          tempGrupo: req.session.tempGrupos,
          creditos: req.session.creditos,
          err: "No tienes creditos suficientes",
        });
      } else {
        req.session.creditos =
          parseInt(req.session.creditos, 10) -
          parseInt(cuesta.Unidad_Aprendizaje.credito, 10);
        req.session.tempGrupos.push(id);
        console.log("Grupo guardado: ", req.session.tempGrupos);
        console.log("Creditos:", req.session.creditos);
        return res.json({
          success: true,
          tempGrupo: req.session.tempGrupos,
          creditos: req.session.creditos,
        });
      }
    }
  });

  router.get("/Con", async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Usuario no autenticado",
      });
    }

    const us = req.user.id;
    const cre = await bd.Estudiante.findOne({
      where: { id_usuario: us },
    });
    if (!req.session.tempGrupos) {
      req.session.tempGrupos = [];
      req.session.creditos = parseInt(cre.creditos_disponibles, 10);
    }
    return res.json({
      success: true,
      tempGrupo: req.session.tempGrupos,
      creditos: req.session.creditos,
    });
  });

  router.post("/ImportarHorario", async (req, res) => {
    us = req.user.id;

    console.log(us);
    let cred;
    const n = await bd.Borrador_Horario.count({
      where: { id_alumno: us, valido: 1 },
    });
    console.log(n);
    const l = await bd.Borrador_Horario.count({
      where: { id_alumno: us },
    });
    console.log(l);
    if (l > 0) {
      const k = await bd.Borrador_Horario.findAll({
        where: { id_alumno: us, valido: 1 },
      });

      const creditos_necesarios = await bd.Borrador_Horario.sum(
        "creditos_necesarios",
        {
          where: { id_alumno: us, valido: 1 },
        }
      );
      console.log(creditos_necesarios);

      for (const b of k) {
        const c = b.creditos_necesarios;
        const ua_ids = req.session.tempGrupos;

        if (req.session.creditos >= c) {
          if (!req.session.tempGrupos.includes(b.id_grupo)) {
            if (req.session.tempGrupos.length > 0) {
              let hayTraslape = false;

              // Recorre los grupos ya agregados en sesión
              for (const u of ua_ids) {
                const ua1 = await bd.Grupo.findOne({
                  where: { id: u },
                });
                const ua2 = await bd.Grupo.findOne({
                  where: { id: b.id_grupo },
                });

                // Obtiene las distribuciones de ambos grupos
                const dist1 = await bd.Distribucion.findAll({
                  where: { id_grupo: ua1.id },
                });
                const dist2 = await bd.Distribucion.findAll({
                  where: { id_grupo: ua2.id },
                });

                // Verifica si alguna distribución se traslapa
                for (const d1 of dist1) {
                  for (const d2 of dist2) {
                    if (seTraslapan(d1, d2)) {
                      hayTraslape = true;
                      break;
                    }
                  }
                  if (hayTraslape) break;
                }

                // Si hay traslape, no se agrega el grupo y se detiene
                if (hayTraslape) {
                  console.log(
                    `Traslape detectado entre grupo ${ua1.id} y ${ua2.id}`
                  );
                  break;
                }

                // Si no hay traslape y no es la misma UA, se agrega
                if (!(ua1.id_ua == ua2.id_ua)) {
                  req.session.tempGrupos.push(b.id_grupo);
                  req.session.creditos =
                    parseFloat(req.session.creditos) -
                    parseFloat(b.creditos_necesarios);

                  await bd.Borrador_Horario.destroy({
                    where: { id_grupo: b.id_grupo },
                  });
                }
              }

              // Si hubo traslape, no se agrega ni se descuentan créditos
              if (hayTraslape) {
                console.log(`El grupo ${b.id_grupo} no se agregó por traslape`);
                continue;
              }
            } else {
              req.session.tempGrupos.push(b.id_grupo);
              req.session.creditos =
                parseFloat(req.session.creditos) -
                parseFloat(b.creditos_necesarios);
              await bd.Borrador_Horario.destroy({
                where: { id_grupo: b.id_grupo },
              });
            }
          }
        } else {
          return res.json({
            success: false,
            msg: "No se han agregado todas porque no tienes creditos suficientes",
          });
        }
      }

      if (l == n) {
        return res.json({ success: true });
      } else {
        return res.json({
          success: false,
          msg: "No se han agregado todas porque algunos horarios se traslapan",
        });
      }
    } else {
      return res.json({
        success: false,
        fatal: true,
        msg: "NO HAY MATERIAS EN EL BORRADOR DE HORARIO",
      });
    }
  });

  router.post("/Inscribirse", async (req, res) => {
    if (req.session.tempGrupos.length === 0) {
      return res.json({ success: false });
    } else {
      try {
        const ids = req.session.tempGrupos;
        const creditos_restantes = req.session.creditos;
        const id = req.user.id;

        console.log("creditos restantes", creditos_restantes);
        console.log("ID: ", id);

        const idh = await bd.Horario.findOne({
          where: { id_alumno: id },
        });
        const cre = await bd.Estudiante.update(
          {
            creditos_disponibles: creditos_restantes,
          },
          { where: { id_usuario: id } }
        );

        for (const g of ids) {
          const ua = await bd.Unidad_Aprendizaje.findOne({
            include: [
              {
                model: bd.Grupo,
                where: { id: g },
              },
            ],
          });

          const recu = await bd.Materia_Reprobada.findOne({
            include: [
              {
                model: bd.Estudiante,
                where: { id_usuario: id },
              },
              {
                model: bd.Unidad_Aprendizaje,
                where: { id: ua.id },
              },
            ],
          });

          await bd.Materia_Reprobada.update(
            {
              recurse: 0,
              estado_actual: "Recurse",
            },
            { where: { id: recu.id } }
          );
          const id2 = uuidv4().replace(/-/g, "").substring(0, 15);
          const crear_mat_inscrita = await bd.Mat_Inscritos.create({
            id: id2,
            id_horario: idh.id,
            id_grupo: g,
            calificacion: 0,
          });
          const cup_act = await bd.Grupo.findOne({
            where: { id: g },
          });

          const up_grup = await bd.Grupo.update(
            {
              cupo: parseInt(cup_act.cupo, 10) - 1,
            },
            { where: { id: g } }
          );
        }

        return res.json({ success: true });
      } catch (err) {
        console.log(err);
        return res.json({ success: false });
      }
    }
  });

  router.post("/Del/:id", async (req, res) => {
    const { id } = req.params;
    const us = req.user.id;

    const cre = await bd.Estudiante.findOne({
      where: { id_usuario: us },
    });

    const cuesta = await bd.Grupo.findOne({
      where: { id: id },
      include: [
        {
          model: bd.Unidad_Aprendizaje,
          attributes: ["credito"],
        },
      ],
      raw: true,
      nest: true,
    });

    req.session.tempGrupos = req.session.tempGrupos.filter((g) => g != id);
    req.session.creditos =
      parseInt(req.session.creditos, 10) +
      parseInt(cuesta.Unidad_Aprendizaje.credito, 10);

    console.log("Grupo sin el elemento ", req.session.tempGrupos);
    console.log("Creditos:", req.session.creditos);
    res.json({
      success: true,
      tempGrupo: req.session.tempGrupos,
      creditos: req.session.creditos,
    });
  });

  router.get("/ConsultarBorrador", async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Usuario no autenticado",
      });
    }

    try {
      const borr = await bd.Borrador_Horario.findAll({
        where: { id_alumno: req.user.id },
        include: [
          {
            model: bd.DatosPersonales,
            attributes: ["nombre", "ape_paterno", "ape_materno"],
            as: "profesor",
          },
          {
            model: bd.Grupo,
            attributes: ["nombre", "cupo"],
            include: [
              {
                model: bd.Unidad_Aprendizaje,
                attributes: ["credito"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.json({ horario: borr });
    } catch (err) {
      console.error("Error en /ConsultarBorrador:", err);
      return res.status(500).json({
        success: false,
        error: "Error al consultar el borrador",
      });
    }
  });

  router.post("/EliminarBorrador/:id", async (req, res) => {
    const us = req.user.id;
    const { id } = req.params;

    const grupo = await bd.Grupo.findOne({ where: { id } });

    // Distribución del grupo que se va a eliminar
    const distriNuevo = await bd.Distribucion.findAll({
      where: { id_grupo: id },
    });

    // Obtener todos los grupos del borrador del usuario actual
    const b = await bd.Borrador_Horario.findOne({
      where: { id_alumno: us, id_grupo: id },
    });

    if (b.valido != 1) {
      const eli = await bd.Borrador_Horario.destroy({
        where: { id_grupo: id },
      });
      const borradores = await bd.Borrador_Horario.findAll({
        where: { id_alumno: us },
      });
      const idsGruposUsuario = borradores.map((t) => t.id_grupo);
      const distribucionesExistentes = await bd.Distribucion.findAll({
        where: { id_grupo: idsGruposUsuario },
      });

      let hayTraslape = false;
      // Verificar traslapes
      for (const dis of distriNuevo) {
        for (const dis2 of distribucionesExistentes) {
          if (seTraslapan(dis, dis2)) {
            hayTraslape = true;
            await bd.Borrador_Horario.update(
              { valido: 1 },
              { where: { id_grupo: dis2.id_grupo, id_alumno: us } }
            );
          }
        }
      }
      if (hayTraslape) {
        for (const d of distribucionesExistentes) {
          for (const d2 of distribucionesExistentes) {
            if (d.id_grupo != d2.id_grupo) {
              if (seTraslapan(d, d2)) {
                await bd.Borrador_Horario.update(
                  { valido: 0 },
                  { where: { id_grupo: d.id_grupo, id_alumno: us } }
                );
                await bd.Borrador_Horario.update(
                  { valido: 0 },
                  { where: { id_grupo: d2.id_grupo, id_alumno: us } }
                );
              }
            }
          }
        }
      }

      return res.json({ success: true });
    } else {
      const eli = await bd.Borrador_Horario.destroy({
        where: { id_grupo: id },
      });
      return res.json({ success: true });
    }
  });
  router.post("/AgregarBorrador/:id", async (req, res) => {
    try {
      const us = req.user.id;
      const { id } = req.params;
      const id2 = uuidv4().replace(/-/g, "").substring(0, 15);
      let val = 1;

      //Obtener grupo, profesor y materia
      const grupo = await bd.Grupo.findOne({ where: { id } });
      const ua = await bd.Unidad_Aprendizaje.findOne({
        where: { id: grupo.id_ua },
      });
      const dat = await bd.DatosPersonales.findOne({
        where: { id: grupo.id_prof },
      });

      // Distribución del grupo que se va a agregar
      const distriNuevo = await bd.Distribucion.findAll({
        where: { id_grupo: id },
      });

      // Obtener todos los grupos del borrador del usuario actual
      const borradores = await bd.Borrador_Horario.findAll({
        where: { id_alumno: us },
      });

      if (borradores && borradores.length > 0) {
        //Obtener los id_grupo actuales del borrador
        const idsGruposUsuario = borradores.map((t) => t.id_grupo);

        // Obtener sus distribuciones
        const distribucionesExistentes = await bd.Distribucion.findAll({
          where: { id_grupo: idsGruposUsuario },
        });

        // Verificar traslapes
        for (const dis of distriNuevo) {
          for (const dis2 of distribucionesExistentes) {
            if (seTraslapan(dis, dis2)) {
              val = 0;

              // Marcar el grupo existente como no válido
              await bd.Borrador_Horario.update(
                { valido: 0 },
                { where: { id_grupo: dis2.id_grupo, id_alumno: us } }
              );
            }
          }
        }
      }

      // Armar las horas por día
      let lun, mar, mier, jue, vie;
      for (const g of distriNuevo) {
        const horas = `${g.hora_ini} - ${g.hora_fin}`;
        if (g.dia === "Lunes") lun = horas;
        else if (g.dia === "Martes") mar = horas;
        else if (g.dia === "Miercoles") mier = horas;
        else if (g.dia === "Jueves") jue = horas;
        else if (g.dia === "Viernes") vie = horas;
      }

      // Crear el nuevo registro en borrador
      const borr = await bd.Borrador_Horario.create({
        id: id2,
        id_grupo: id,
        id_alumno: us,
        id_profesor: grupo.id_prof,
        calificacion: dat.calificacion,
        materia: ua.nombre,
        horas_lun: lun,
        horas_mar: mar,
        horas_mie: mier,
        horas_jue: jue,
        horas_vie: vie,
        creditos_necesarios: ua.credito,
        valido: val,
      });

      return res.json({
        success: true,
        message: val
          ? "Grupo agregado correctamente sin traslapes."
          : "Grupo agregado, pero se detectaron traslapes. Marcado como no válido.",
        grupo: borr,
      });
    } catch (error) {
      console.error("Error al agregar borrador:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error interno del servidor" });
    }
  });

  router.get("/ObtenerHistorial", async (req, res) => {
    // Validar que el usuario esté autenticado
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Usuario no autenticado. Por favor inicia sesión.",
      });
    }

    const us = req.user.id;
    try {
      const k = await bd.Kardex.findOne({ where: { id_alumno: us } });

      if (!k) {
        return res.json({ historial: [], semestres: [] });
      }

      const sems = await bd.UA_Aprobada.findAll({
        where: { id_kardex: k.id },
        raw: true,
        nest: true,
      });

      const semestres = [...new Set(sems.map((s) => s.semestre))];

      return res.json({ historial: sems, semestres: semestres });
    } catch (err) {
      console.error("Error en /ObtenerHistorial:", err);
      return res.status(500).json({
        success: false,
        error: "Error al obtener el historial académico",
      });
    }
  });

  // Obtener mensajes previos del chatbot para un usuario
  router.get("/MensajesChat/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (req.user.id !== id && req.user.tipo_usuario !== "administrador") {
        return res.status(403).json({
          success: false,
          error: "No tienes permiso para acceder a estos mensajes",
        });
      }

      // Validar formato de ID
      if (!id || id.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "ID de usuario inválido",
        });
      }

      // Buscar mensajes asociados al usuario, ordenados por fecha asc
      const mensajes = await bd.Mensaje_Chat.findAll({
        where: { id_usuario: id },
        order: [["fecha", "ASC"]],
        raw: true,
      });

      return res.json({ success: true, messages: mensajes });
    } catch (err) {
      console.error("Error al obtener MensajesChat/:id ->", err);
      return res
        .status(500)
        .json({ success: false, error: "Error al obtener mensajes" });
    }
  });

  router.get("/ObtenerMateriasReprobadas", async (req, res) => {
    const id = req.user.id;

    try {
      const mat_re = await bd.Materia_Reprobada.findAll({
        include: [
          {
            model: bd.Estudiante,
            where: { id_usuario: id },
          },
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["nombre", "credito", "semestre"],
          },
        ],
      });

      const ids_mr = mat_re.map((m) => m.id);

      const compro = await bd.ETS.findAll({
        where: {
          id_mr: ids_mr,
        },
      });

      return res.json({
        materias: mat_re,
        compro: compro,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  router.get("/ObtenerGruposEts/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const grupos = await bd.ETS_grupo.findAll({
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            where: { nombre: id },
          },
          {
            model: bd.DatosPersonales,
          },
        ],
      });

      return res.json({ horarios: grupos });
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/RegistrarETS", async (req, res) => {
    const { id_mr, id_grupo } = req.body;
    const us = req.user.id;

    try {
      // Obtener grupo nuevo
      const grupoNuevo = await bd.ETS_grupo.findOne({
        where: { id: id_grupo },
      });

      if (!grupoNuevo) {
        return res.json({ success: false, message: "Grupo no encontrado" });
      }

      // ETS existentes del alumno
      const etsExistentes = await bd.ETS.findAll({
        include: [
          {
            model: bd.Materia_Reprobada,
            include: [
              {
                model: bd.Estudiante,
                where: { id_usuario: us },
              },
            ],
          },
          {
            model: bd.ETS_grupo,
          },
        ],
      });

      const nuevoHorario = {
        dia: grupoNuevo.fecha,
        hora_ini: grupoNuevo.hora_inicio,
        hora_fin: grupoNuevo.hora_final,
      };

      for (const ets of etsExistentes) {
        const horarioExistente = {
          dia: ets.ETS_Grupo.fecha,
          hora_ini: ets.ETS_Grupo.hora_inicio,
          hora_fin: ets.ETS_Grupo.hora_final,
        };

        if (seTraslapan(nuevoHorario, horarioExistente)) {
          return res.json({
            success: false,
            message:
              "el horario del grupo seleccionado se traslapa con un ETS ya registrado.",
          });
        }
      }

      await bd.ETS.create({
        id: uuidv4().replace(/-/g, "").substring(0, 15),
        id_mr: id_mr,
        id_grupo: id_grupo,
        comprobante: null,
        validado: 0,
        calificado: 0,
      });

      await bd.Materia_Reprobada.update(
        { estado_actual: "ETS" },
        { where: { id: id_mr } }
      );

      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: "Error en el servidor" });
    }
  });

  router.post("/SubirComprobante", async (req, res) => {
    const { documento, id_mr, id_grupo } = req.body;

    try {
      const comprobante = await bd.ETS.update(
        {
          comprobante: documento ? Buffer.from(documento, "base64") : null,
        },
        { where: { id_mr: id_mr, comprobante: null, id_grupo: id_grupo } }
      );
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/NoReinscripcion", async (req, res) => {
    const us = req.user.id;

    try {
      const noReins = await bd.Materia_Reprobada.findAll({
        include: [
          {
            model: bd.Estudiante,
            where: { id_usuario: us },
          },
        ],
        where: { recurse: 0 },
      });

      let ids = noReins.map((item) => item.id_ua);

      ids = [...new Set(ids)];
      return res.json({ grupos: ids });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });

  router.get("/ObtenerHistorialETS/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const histo = await bd.ETS.findAll({
        where: { id_mr: id, calificado: { [Op.ne]: 0 } },
        include: [
          {
            model: bd.ETS_grupo,
            include: [
              {
                model: bd.Unidad_Aprendizaje,
              },
              {
                model: bd.DatosPersonales,
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });

      return res.json({ historial: histo });
    } catch (err) {
      console.log(err);
    }
  });

  // Guardar mensaje de chat en la base de datos
  router.post("/GuardarMensajeChat", async (req, res) => {
    try {
      const { id_usuario, pregunta_realizada, respuesta_obtenida } = req.body;

      // Validar que el usuario esté autenticado y sea el mismo que intenta guardar
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          error: "Usuario no autenticado",
        });
      }

      if (req.user.id !== id_usuario) {
        return res.status(403).json({
          success: false,
          error: "No tienes permiso para guardar mensajes de otro usuario",
        });
      }

      // Validar que al menos la pregunta esté presente
      if (!pregunta_realizada || pregunta_realizada.trim() === "") {
        return res.status(400).json({
          success: false,
          error: "La pregunta no puede estar vacía",
        });
      }

      // Validar longitud de pregunta
      if (pregunta_realizada.length > 5000) {
        return res.status(400).json({
          success: false,
          error: "La pregunta es demasiado larga (máximo 5000 caracteres)",
        });
      }

      // Generar ID único para el mensaje
      const id = uuidv4().replace(/-/g, "").substring(0, 15);
      const fecha = new Date();

      // Crear el mensaje en BD
      const mensaje = await bd.Mensaje_Chat.create({
        id: id,
        id_usuario: id_usuario,
        fecha: fecha,
        pregunta_realizada: pregunta_realizada,
        respuesta_obtenida: respuesta_obtenida || null,
      });

      return res.json({
        success: true,
        mensaje: mensaje,
        message: "Mensaje guardado correctamente",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Error al guardar el mensaje",
      });
    }
  });

  // Actualizar o crear registro en la tabla 'contador' para un profesor
  router.post("/ActualizarContadorProfesor", async (req, res) => {
    try {
      // Requerir usuario autenticado
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ success: false, error: "Usuario no autenticado" });
      }
      const { profesor, alumnoId, suma } = req.body;

      if (!profesor || suma === undefined || suma === null) {
        return res
          .status(400)
          .json({ success: false, error: "Faltan datos (profesor o suma)" });
      }

      // Intentar localizar al profesor por nombre completo
      const nombreCompleto = profesor.trim();

      // Buscar por concatenación de nombre y apellidos
      let prof = await bd.DatosPersonales.findOne({
        where: bd.sequelize.where(
          bd.sequelize.fn(
            "concat",
            bd.sequelize.col("nombre"),
            " ",
            bd.sequelize.col("ape_paterno"),
            " ",
            bd.sequelize.col("ape_materno")
          ),
          nombreCompleto
        ),
      });

      // Si no se encontró con la concatenación exacta, intentar búsqueda LIKE
      if (!prof) {
        prof = await bd.DatosPersonales.findOne({
          where: bd.sequelize.where(
            bd.sequelize.fn(
              "concat",
              bd.sequelize.col("nombre"),
              " ",
              bd.sequelize.col("ape_paterno"),
              " ",
              bd.sequelize.col("ape_materno")
            ),
            { [Op.like]: `%${nombreCompleto}%` }
          ),
        });
      }

      if (!prof) {
        return res
          .status(404)
          .json({ success: false, error: "Profesor no encontrado" });
      }

      const idProf = prof.id;

      // Buscar registro en Contador
      let contador = await bd.Contador.findByPk(idProf);

      if (contador) {
        // Actualizar sumas y registrados
        const nuevaSuma = parseInt(contador.suma || 0, 10) + parseInt(suma, 10);
        const nuevosRegistrados = parseInt(contador.registrados || 0, 10) + 1;
        await bd.Contador.update(
          { suma: nuevaSuma, registrados: nuevosRegistrados },
          { where: { id_profesor: idProf } }
        );
        contador = await bd.Contador.findByPk(idProf);
      } else {
        // Crear nuevo registro
        const crear = await bd.Contador.create({
          id_profesor: idProf,
          suma: parseInt(suma, 10),
          registrados: 1,
        });
        contador = crear;
      }

      return res.json({ success: true, registrado: contador.registrados });
    } catch (err) {
      console.error("Error en /ActualizarContadorProfesor:", err);
      return res
        .status(500)
        .json({
          success: false,
          error: "Error interno al actualizar contador",
        });
    }
  });

  // Actualizar respuesta de un mensaje de chat existente
  router.put("/ActualizarMensajeChat/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { respuesta_obtenida } = req.body;

      // Validar que el usuario esté autenticado
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          error: "Usuario no autenticado",
        });
      }

      // Validar que la respuesta no sea vacía si se proporciona
      if (
        respuesta_obtenida !== null &&
        respuesta_obtenida !== undefined &&
        respuesta_obtenida.trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          error: "La respuesta no puede estar vacía",
        });
      }

      // Buscar el mensaje
      const mensaje = await bd.Mensaje_Chat.findByPk(id);

      if (!mensaje) {
        return res.status(404).json({
          success: false,
          error: "Mensaje no encontrado",
        });
      }

      // Validar que el usuario sea el propietario del mensaje o admin
      if (
        mensaje.id_usuario !== req.user.id &&
        req.user.tipo_usuario !== "administrador"
      ) {
        return res.status(403).json({
          success: false,
          error: "No tienes permiso para actualizar este mensaje",
        });
      }

      // Actualizar la respuesta
      await mensaje.update({
        respuesta_obtenida: respuesta_obtenida || null,
      });

      return res.json({
        success: true,
        mensaje: mensaje,
        message: "Respuesta guardada correctamente",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Error al actualizar el mensaje",
      });
    }
  });

  // Validar si es tiempo de evaluar profesores
  router.get("/ValidarFechaEvaluacion", async (req, res) => {
    try {
      const fechas = await bd.FechasRelevantes.findOne();

      if (!fechas || !fechas.evalu_profe) {
        return res.json({
          valido: false,
          mensaje: "No hay fechas de evaluación configuradas",
        });
      }

      const fechaEvaluacion = new Date(fechas.evalu_profe);
      const hoy = new Date();

      // normalizar fechas para comparar solo dia/mes/año
      const fechaEvalNorm = new Date(
        fechaEvaluacion.getFullYear(),
        fechaEvaluacion.getMonth(),
        fechaEvaluacion.getDate()
      );
      const hoyNorm = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
      );

      if (hoyNorm.getTime() === fechaEvalNorm.getTime()) {
        return res.json({
          valido: true,
          mensaje: "Es momento de evaluar a tus profesores",
        });
      } else {
        return res.json({
          valido: false,
          mensaje: "Aún no es tiempo de evaluar a tus profesores",
          fechaEvaluacion: fechaEvaluacion.toLocaleDateString("es-MX"),
        });
      }
    } catch (err) {
      console.error("Error en /ValidarFechaEvaluacion:", err);
      return res.status(500).json({
        success: false,
        error: "Error al validar fecha de evaluación",
      });
    }
  });

  return router;
};
function seTraslapan(d1, d2) {
  // Solo comparar si es el mismo día
  if (d1.dia !== d2.dia) return false;

  const ini1 = parseInt(d1.hora_ini.replace(":", ""));
  const fin1 = parseInt(d1.hora_fin.replace(":", ""));
  const ini2 = parseInt(d2.hora_ini.replace(":", ""));
  const fin2 = parseInt(d2.hora_fin.replace(":", ""));

  // Se traslapan si uno empieza antes de que el otro termine y termina después de que el otro empieza
  return ini1 < fin2 && ini2 < fin1;
}
