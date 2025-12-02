// routes/rutaAdministrador.js
const express = require("express");
const bd = require("../../model/modelo");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { raw } = require("mysql2");
module.exports = (passport) => {
  const router = express.Router();

  router.post("/RegistrarAlumno", async (req, res) => {
    const {
      id,
      nombre,
      apellido_p,
      apellido_m,
      fecha_nacimiento,
      tipo_sangre,
      CURP,
      nacionalidad,
      calle,
      numero_ex,
      numero_in,
      codigo_postal,
      colonia,
      delegacion,
      ciudad,
      telefono,
      correo,
      fotoBase64,
    } = req.body;

    var ano = new Date().getFullYear();
    var numeroAleatorio = Math.floor(100000 + Math.random() * 900000);
    //var id = String(ano) + String(numeroAleatorio);
    const contra = uuidv4().replace(/-/g, "").substring(0, 15);
    console.log(contra);

    carr = await bd.Carrera.findOne({
      where: { nombre: req.body.carreraSeleccionada },
    });
    const salt = await bcrypt.genSalt(10);
    const contraHashed = await bcrypt.hash(contra, salt);
    try {
      // Procesar foto si se envió
      let fotoBuffer = null;
      if (fotoBase64) {
        try {
          const base64Data =
            typeof fotoBase64 === "string" && fotoBase64.includes(",")
              ? fotoBase64.split(",")[1]
              : fotoBase64;
          fotoBuffer = Buffer.from(base64Data, "base64");
        } catch (e) {
          console.warn(
            "No se pudo procesar fotoBase64 en registro, se ignora la foto."
          );
        }
      }

      const crearAlumno = await bd.DatosPersonales.create({
        id: id,
        contrasena: contraHashed,
        tipo_usuario: "alumno",
        nombre: nombre,
        ape_paterno: apellido_p,
        ape_materno: apellido_m,
        fecha_nacimiento: fecha_nacimiento,
        tipo_sangre: tipo_sangre,
        CURP: CURP,
        nacionalidad: nacionalidad,
        calle: calle,
        num_exterior: numero_ex,
        num_interior: numero_in,
        codigo_postal: codigo_postal,
        colonia: colonia,
        delegacion: delegacion,
        ciudad: ciudad,
        telefono: telefono,
        email: correo,
        foto: fotoBuffer,
        carrera: carr.nombre,
        situacion: "activo",
      });
      const id_es = uuidv4().replace(/-/g, "").substring(0, 15);
      const crearEstudiante = await bd.Estudiante.create({
        id: id_es,
        id_usuario: crearAlumno.id,
        promedio: 0,
        creditos_disponibles: carr.creditos_iniciales,
        estado_academico: "regular",
      });
      const crearHorario = await bd.Horario.create({
        id: uuidv4().replace(/-/g, "").substring(0, 15),
        id_alumno: id,
      });
      const crearKardex = await bd.Kardex.create({
        id: uuidv4().replace(/-/g, "").substring(0, 15),
        id_alumno: id,
        promedio: 0,
        situacion_academica: "regular",
        semestres_restantes: carr.duracion_max,
      });
      console.log("Alumno creado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al crear el alumno: ", error);
      res
        .status(500)
        .json({ success: false, message: "Error al crear el alumno" });
      return;
    }
  });

  router.get("/ObtenerGrupo/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const grupo = await bd.Grupo.findOne({
        where: { id: id },
        raw: true,
        nest: true,
      });
      console.log("Grupo obtenido: ", grupo);
      return res.json({ grupo: grupo });
    } catch (error) {
      console.error("Error al obtener la informacion del grupo: ", error);
    }
  });

  router.put("/EditarGrupo/:id", async (req, res) => {
    const { id } = req.body;
    const { id_prof, id_ua, turno, nombre } = req.body;
    console.log("Datos recibidos para editar el grupo: ", req.body);
    console.log("ID del grupo a editar: ", id);
    console.log("Tipo de ID:", typeof id, "Valor:", id);
    const id2 = id;
    let turn = "";
    if (turno == "Matutino") {
      turn = "M";
    } else {
      turn = "V";
    }

    const semes = await bd.Unidad_Aprendizaje.findOne({
      where: { id: id_ua },
    });
    let val = await bd.Grupo.count({
      where: { id_ua: id_ua, turno: turno },
    });
    console.log("Valor de val: ", val);
    const pref = await bd.Carrera.findOne({
      where: { nombre: semes.carrera },
    });
    try {
      const actualizarGrupo = await bd.Grupo.update(
        {
          nombre: nombre,
          id_ua: id_ua,
          id_prof: id_prof,
          turno: turno,
        },
        { where: { id: id2 } }
      );

      console.log("Grupo actualizado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al actualizar el grupo: ", error);
    }
  });
  router.post("/RegistrarProfesor", async (req, res) => {
    const {
      grado,
      nombre,
      apellido_p,
      apellido_m,
      fecha_nacimiento,
      tipo_sangre,
      CURP,
      nacionalidad,
      calle,
      numero_ex,
      numero_in,
      codigo_postal,
      colonia,
      delegacion,
      ciudad,
      telefono,
      correo,
      RFC,
      fotoBase64,
    } = req.body;
    const contra = uuidv4().replace(/-/g, "").substring(0, 15);
    try {
      console.log(contra);
      const salt = await bcrypt.genSalt(10);
      const contraHashed = await bcrypt.hash(contra, salt);

      // Procesar foto si se envió
      let fotoBuffer = null;
      if (fotoBase64) {
        try {
          const base64Data =
            typeof fotoBase64 === "string" && fotoBase64.includes(",")
              ? fotoBase64.split(",")[1]
              : fotoBase64;
          fotoBuffer = Buffer.from(base64Data, "base64");
        } catch (e) {
          console.warn(
            "No se pudo procesar fotoBase64 en registro de profesor, se ignora la foto."
          );
        }
      }

      const CrearProfesor = await bd.DatosPersonales.create({
        id: RFC,
        contrasena: contraHashed,
        tipo_usuario: "profesor",
        nombre: nombre,
        ape_paterno: apellido_p,
        ape_materno: apellido_m,
        fecha_nacimiento: fecha_nacimiento,
        RFC: RFC,
        tipo_sangre: tipo_sangre,
        CURP: CURP,
        nacionalidad: nacionalidad,
        calle: calle,
        num_exterior: numero_ex,
        num_interior: numero_in,
        codigo_postal: codigo_postal,
        colonia: colonia,
        delegacion: delegacion,
        ciudad: ciudad,
        telefono: telefono,
        email: correo,
        foto: fotoBuffer,
        grado: grado,
        situacion: "activo",
      });
      console.log("Profesor creado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al crear el profesor: ", error);
    }
  });

  router.get("/ObtenerProfesores", async (req, res) => {
    try {
      const profesores = await bd.DatosPersonales.findAll({
        where: { tipo_usuario: "profesor" },
      });
      return res.json({ profesores: profesores });
    } catch (error) {
      console.error("Error al obtener los alumnos: ", error);
    }
  });

  router.get("/ObtenerAlumno/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const alumno = await bd.DatosPersonales.findOne({
        where: { id: id, tipo_usuario: "alumno" },
        raw: true,
        nest: true,
      });
      return res.json({ alumno: alumno });
    } catch (error) {
      console.error("Error al obtener la informacion del alumno: ", error);
    }
  });

  router.delete("/EliminarCurso/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID a eliminar: ", id);
    try {
      const eliminar_relacionados = await bd.Distribucion.destroy({
        where: { id_grupo: id },
      });
      const eliminarCurso = await bd.Grupo.destroy({
        where: { id: id },
      });
      console.log("Curso eliminado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar el curso: ", error);
    }
  });

  router.get("/ObtenerDist/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const distribucion = await bd.Distribucion.findAll({
        where: { id_grupo: id },
        raw: true,
        nest: true,
      });
      return res.json({ Distri: distribucion });
    } catch (error) {
      console.error("Error al obtener la distribucion: ", error);
    }
  });

  router.post("/AgregarDist/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { id_grupo, dia, hora_ini, hora_fin } = req.body;

      console.log(dia, hora_ini, hora_fin);

      const grupoActual = await bd.Grupo.findOne({
        where: { id: id_grupo },
      });

      if (!grupoActual) {
        return res.json({ success: false, message: "Grupo no encontrado" });
      }

      const gruposMismoNombre = await bd.Grupo.findAll({
        where: { nombre: grupoActual.nombre },
        attributes: ["id"], // solo necesitamos los ids
      });

      const idsGrupos = gruposMismoNombre.map((g) => g.id);

      //  Buscar distribuciones de esos grupos en el mismo día
      const distribuciones = await bd.Distribucion.findAll({
        where: {
          id_grupo: { [Op.in]: idsGrupos },
          dia: dia,
        },
      });

      //  Validar traslape de horarios
      const conflicto = distribuciones.some((dist) => {
        // Convertimos a minutos para comparar fácilmente
        const [ini1h, ini1m] = dist.hora_ini.split(":").map(Number);
        const [fin1h, fin1m] = dist.hora_fin.split(":").map(Number);
        const [ini2h, ini2m] = hora_ini.split(":").map(Number);
        const [fin2h, fin2m] = hora_fin.split(":").map(Number);

        const ini1 = ini1h * 60 + ini1m;
        const fin1 = fin1h * 60 + fin1m;
        const ini2 = ini2h * 60 + ini2m;
        const fin2 = fin2h * 60 + fin2m;

        // hay traslape si se intersectan los intervalos
        return ini2 < fin1 && fin2 > ini1;
      });

      if (conflicto) {
        return res.json({
          success: false,
          message:
            "Horario ocupado: ya existe una distribución que se traslapa.",
        });
      }

      const id2 = uuidv4().replace(/-/g, "").substring(0, 15);
      await bd.Distribucion.create({
        id: id2,
        id_grupo: id_grupo,
        dia: dia,
        hora_ini: hora_ini,
        hora_fin: hora_fin,
      });

      res.json({
        success: true,
        message: "Distribución agregada correctamente",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error en el servidor" });
    }
  });

  router.get("/ObtenerProfesor/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const profesor = await bd.DatosPersonales.findOne({
        where: { id: id, tipo_usuario: "profesor" },
        raw: true,
        nest: true,
      });
      return res.json({ profesor: profesor });
    } catch (error) {
      console.error("Error al obtener la informacion del profesor: ", error);
    }
  });

  router.put("/EditarAlumno/:id", async (req, res) => {
    const { id } = req.params;
    const {
      nombre,
      ape_paterno,
      ape_materno,
      fecha_nacimiento,
      tipo_sangre,
      CURP,
      nacionalidad,
      calle,
      num_exterior,
      num_interior,
      codigo_postal,
      colonia,
      delegacion,
      ciudad,
      telefono,
      email,
      carrera,
    } = req.body;
    try {
      const fields = {
        nombre,
        ape_paterno,
        ape_materno,
        fecha_nacimiento,
        tipo_sangre,
        CURP,
        nacionalidad,
        calle,
        num_exterior,
        num_interior,
        codigo_postal,
        colonia,
        delegacion,
        ciudad,
        telefono,
        email,
        carrera,
      };

      if (req.body.fotoBase64) {
        try {
          const base64Data =
            typeof req.body.fotoBase64 === "string" &&
            req.body.fotoBase64.includes(",")
              ? req.body.fotoBase64.split(",")[1]
              : req.body.fotoBase64;
          fields.foto = Buffer.from(base64Data, "base64");
        } catch (e) {
          console.warn("No se pudo procesar fotoBase64, ignorando campo foto.");
        }
      }

      await bd.DatosPersonales.update(fields, {
        where: { id: id, tipo_usuario: "alumno" },
      });
      console.log("Alumno actualizado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al actualizar el alumno: ", error);
      return res
        .status(500)
        .json({ success: false, error: "Error al actualizar el alumno" });
    }
  });

  // Obtener foto de alumno en binario para consumo en otras vistas
  router.get("/Alumno/Foto/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const alumno = await bd.DatosPersonales.findOne({
        attributes: ["foto"],
        where: { id: id, tipo_usuario: "alumno" },
        raw: true,
      });
      if (!alumno || !alumno.foto) {
        return res.status(404).send("Foto no encontrada");
      }
      res.setHeader("Content-Type", "image/jpeg");
      return res.end(alumno.foto);
    } catch (e) {
      console.error("Error al obtener foto del alumno:", e);
      return res.status(500).send("Error interno");
    }
  });

  // Obtener foto de profesor en binario para consumo en otras vistas
  router.get("/Profesor/Foto/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const profesor = await bd.DatosPersonales.findOne({
        attributes: ["foto"],
        where: { id: id, tipo_usuario: "profesor" },
        raw: true,
      });
      if (!profesor || !profesor.foto) {
        return res.status(404).send("Foto no encontrada");
      }
      res.setHeader("Content-Type", "image/jpeg");
      return res.end(profesor.foto);
    } catch (e) {
      console.error("Error al obtener foto del profesor:", e);
      return res.status(500).send("Error interno");
    }
  });

  router.delete("/EliminarDist/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID a eliminar: ", id);
    try {
      const eliminarDist = await bd.Distribucion.destroy({
        where: { id: id },
      });
      console.log("Distribucion eliminada: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar la distribucion: ", error);
    }
  });
  router.put("/EditarProfesor/:id", async (req, res) => {
    const { id } = req.params;
    const {
      nombre,
      ape_paterno,
      ape_materno,
      fecha_nacimiento,
      tipo_sangre,
      CURP,
      nacionalidad,
      calle,
      num_exterior,
      num_interior,
      codigo_postal,
      colonia,
      delegacion,
      ciudad,
      telefono,
      email,
      grado,
      RFC,
      fotoBase64,
    } = req.body;
    try {
      const fields = {
        nombre,
        ape_paterno,
        ape_materno,
        fecha_nacimiento,
        tipo_sangre,
        CURP,
        nacionalidad,
        calle,
        num_exterior,
        num_interior,
        codigo_postal,
        colonia,
        delegacion,
        ciudad,
        telefono,
        email,
        grado,
      };

      if (fotoBase64) {
        try {
          const base64Data =
            typeof fotoBase64 === "string" && fotoBase64.includes(",")
              ? fotoBase64.split(",")[1]
              : fotoBase64;
          fields.foto = Buffer.from(base64Data, "base64");
        } catch (e) {
          console.warn(
            "No se pudo procesar fotoBase64 en edición de profesor, se ignora la foto."
          );
        }
      }

      const actualizarProfesor = await bd.DatosPersonales.update(fields, {
        where: { id: id, tipo_usuario: "profesor" },
      });
      console.log("Profesor actualizado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al actualizar el profesor: ", error);
      return res
        .status(500)
        .json({ success: false, error: "Error al actualizar el profesor" });
    }
  });
  router.get("/ObtenerCursos", async (req, res) => {
    try {
      const cursos = await bd.Grupo.findAll({
        include: [
          {
            model: bd.DatosPersonales,
            attributes: ["nombre", "ape_paterno", "ape_materno"],
          },
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["id" ,"nombre", "carrera", "tipo", "credito", "semestre"],
          },
        ],
        raw: true,
        nest: true,
      });

      res.json({ cursos: cursos });
    } catch (error) {
      console.error("Error al obtener los cursos: ", error);
      return res.status(500).json({ error: "Error interno al obtener cursos" });
    }
  });
  router.get("/ObtenerCursos/Prof/:id", async (req, res) => {
    const us = req.user.id;
    try {
      const cursos = await bd.Grupo.findAll({
        include: [
          {
            model: bd.DatosPersonales,
            atributes: ["nombre", "ape_paterno", "ape_materno"],
          },
          {
            model: bd.Unidad_Aprendizaje,
            attributes: ["nombre", "carrera", "tipo"],
          },
        ],
        where: { id_prof: us },
        raw: true,
        nest: true,
      });
      const profe = await bd.Grupo.findOne({
        where: { id: "1BM1_UA006" },
        raw: true,
        nest: true,
      });

      res.json({ cursos: cursos });
    } catch (error) {
      console.error("Error al obtener los cursos: ", error);
    }
  });

  router.get("/ObtenerUA", async (req, res) => {
    try {
      const UA = await bd.Unidad_Aprendizaje.findAll();
      return res.json({ UA: UA });
    } catch (error) {
      console.error("Error al obtener las UA: ", error);
    }
  });

  router.get("/ObtenerInscritos/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const inscritos = await bd.Mat_Inscritos.findAll({
        where: { id_grupo: id },
        include: [
          { model: bd.Horario, include: [{ model: bd.DatosPersonales }] },
          {
            model: bd.Grupo,
            include: [
              { model: bd.DatosPersonales },
              { model: bd.Unidad_Aprendizaje },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      return res.json({ inscritos: inscritos });
    } catch (error) {
      console.error("Error al obtener los inscritos: ", error);
      return res
        .status(500)
        .json({ error: "Error interno al obtener inscritos" });
    }
  });

  router.delete("/EliminarAlumno/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID a eliminar: ", id);
    try {
      const eliminarAlumno = await bd.DatosPersonales.update(
        {
          situacion: "inactivo",
        },
        {
          where: { id: id, tipo_usuario: "alumno" },
        }
      );
      console.log("Alumno eliminado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar el alumno: ", error);
    }
  });

  router.delete("/EliminarProfesor/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID a eliminar: ", id);
    try {
      const eliminarProfesor = await bd.DatosPersonales.update(
        {
          situacion: "inactivo",
        },
        {
          where: { id: id, tipo_usuario: "profesor" },
        }
      );
      console.log("Profesor eliminado: ");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar el profesor: ", error);
    }
  });
  router.get("/ObtenerCarreras", async (req, res) => {
    try {
      const carreras = await bd.Carrera.findAll();
      return res.json({ carreras: carreras });
    } catch (error) {
      console.error("Error al obtener las carreras: ", error);
    }
  });
  router.get("/ObtenerAlumnos", async (req, res) => {
    try {
      const alumnos = await bd.DatosPersonales.findAll({
        where: { tipo_usuario: "alumno" },
      });
      return res.json({ alumnos: alumnos });
    } catch (error) {
      console.error("Error al obtener los alumnos: ", error);
    }
  });

  router.post("/RegistrarCurso", async (req, res) => {
    const { id_profesor, id_UA, turno, nombre, carrera } = req.body;
    try {
      let t = "";
      if (turno == "Matutino") {
        t = "M";
      } else {
        t = "V";
      }

      const id2 = uuidv4().replace(/-/g, "").substring(0, 15);
      const carr = await bd.Carrera.findOne({
        where: { nombre: carrera },
      });

      const ua = await bd.Unidad_Aprendizaje.findOne({
        where: { id: id_UA },
      });
      let name2 =
        String(ua.semestre) +
        String(carr.prefijo_grupo) +
        String(t) +
        String(nombre);
      const val = await bd.Grupo.count({
        where: { id_ua: id_UA, nombre: name2 },
      });

      if (val > 0) {
        return res.json({ success: false });
      } else {
        const crearCurso = await bd.Grupo.create({
          id: id2,
          nombre: name2,
          id_ua: id_UA,
          id_prof: id_profesor,
          turno: turno,
          cupo: 30,
        });
        console.log("Curso creado: ");
        return res.json({ success: true });
      }
    } catch (error) {
      console.error("Error al crear el curso: ", error);
    }
  });

  router.get("/ObtenerGETS", async (req, res) => {
    try {
      const grupos = await bd.ETS_grupo.findAll({
        include: [
          {
            model: bd.Unidad_Aprendizaje,
          },
          {
            model: bd.DatosPersonales,
          },
        ],
        raw: true,
        nest: true,
      });
      return res.json({ grupos: grupos });
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/Comprobantes/:id", async (req, res) => {
    const id = req.params.id;

    const comprobantes = await bd.ETS.findAll({
      where: { id_grupo: id },
      include: [
        {
          model: bd.Materia_Reprobada,
          include: [
            {
              model: bd.Estudiante,
              include: [bd.DatosPersonales],
            },
          ],
        },
      ],
    });

    const result = comprobantes.map((c) => ({
      ...c.toJSON(),
      comprobante: c.comprobante ? c.comprobante.toString("base64") : null,
    }));

    return res.json({ comprobantes: result });
  });

  router.post("/Validar/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await bd.ETS.update(
        {
          validado: 1,
        },
        { where: { id: id } }
      );
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  });

  router.post("/Denegar/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await bd.ETS.update(
        {
          comprobante: null,
        },
        { where: { id: id } }
      );
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  });

  // ============================
  //  OBTENER PROFESORES PARA ETS
  // ============================
  router.get("/ObtenerProfesoresETS", async (req, res) => {
    try {
      const profesores = await bd.DatosPersonales.findAll({
        where: { tipo_usuario: "profesor" },
        attributes: ["id", "nombre", "ape_paterno", "ape_materno"],
      });
      return res.json({ success: true, profesores });
    } catch (err) {
      console.error("Error al obtener profesores:", err);
      return res
        .status(500)
        .json({ success: false, mensaje: "Error al obtener profesores" });
    }
  });

  // ============================
  //  OBTENER UNIDADES DE APRENDIZAJE PARA ETS
  // ============================
  router.get("/ObtenerUnidadesETS", async (req, res) => {
    try {
      const unidades = await bd.Unidad_Aprendizaje.findAll({
        attributes: ["id", "nombre", "credito", "semestre", "carrera"],
      });
      return res.json({ success: true, unidades });
    } catch (err) {
      console.error("Error al obtener unidades:", err);
      return res
        .status(500)
        .json({ success: false, mensaje: "Error al obtener unidades" });
    }
  });

  // ============================
  //  CREAR GRUPO ETS
  // ============================
  router.post("/CrearGrupoETS", async (req, res) => {
    try {
      const { id_ua, id_profesor, turno, hora_inicio, hora_final, fecha } =
        req.body;

      // Validar que todos los campos estén presentes
      if (
        !id_ua ||
        !id_profesor ||
        !turno ||
        !hora_inicio ||
        !hora_final ||
        !fecha
      ) {
        return res.status(400).json({
          success: false,
          mensaje: "Todos los campos son obligatorios",
        });
      }

      // Generar ID único para el grupo ETS
      const id = uuidv4().replace(/-/g, "").substring(0, 15);

      // Crear el grupo ETS
      await bd.ETS_grupo.create({
        id,
        id_ua,
        id_aplicante: id_profesor,
        turno,
        hora_inicio,
        hora_final,
        fecha,
      });

      return res.json({
        success: true,
        mensaje: "Grupo ETS creado exitosamente",
      });
    } catch (err) {
      console.error("Error al crear grupo ETS:", err);
      return res.status(500).json({
        success: false,
        mensaje: "Error al crear el grupo ETS",
      });
    }
  });

  // POST /GenerarCitas
  router.post("/GenerarCitas/:edo", async (req, res) => {
    const { fecha_ini, fecha_fin } = req.body;
    const { edo } = req.params;

    if (!fecha_ini || !fecha_fin) {
      return res
        .status(400)
        .json({ error: "fecha_ini y fecha_fin son requeridos" });
    }

    const val = await bd.Inscripcion.count({
      include: [
        {
          model: bd.DatosPersonales,
          required: true,
          include: [
            {
              model: bd.Estudiante,
              required: true,
              where: { estado_academico: edo },
            },
          ],
        },
      ],
    });

    console.log(val);
    console.log(edo);
    if (val != 0) {
      return res.json({ success: false });
    }
    // VALIDACIÓN DE FECHAS
    // Convertimos a Date solo para comparar validez y orden, pero usaremos los strings para la lógica
    const inicioCheck = new Date(fecha_ini);
    const finCheck = new Date(fecha_fin);

    if (isNaN(inicioCheck) || isNaN(finCheck)) {
      return res.status(400).json({ error: "Formato de fecha inválido" });
    }
    if (inicioCheck > finCheck) {
      return res
        .status(400)
        .json({ error: "fecha_ini debe ser anterior o igual a fecha_fin" });
    }

    try {
      // 1. OBTENER ALUMNOS
      const alumnos = await bd.Estudiante.findAll({
        where: { estado_academico: edo.toLowerCase() },
        order: [["promedio", "DESC"]], // Prioridad por promedio
        raw: true,
      });

      if (!alumnos || alumnos.length === 0) {
        return res
          .status(200)
          .json({ message: "No hay alumnos regulares para generar citas" });
      }

      const nAlumnos = alumnos.length;

      const strIni = new Date(fecha_ini).toISOString().split("T")[0];
      const strFin = new Date(fecha_fin).toISOString().split("T")[0];

      const oneDayMs = 24 * 60 * 60 * 1000;
      // Usamos UTC para calcular la diferencia exacta de días calendario
      const diffTime = new Date(strFin).getTime() - new Date(strIni).getTime();
      const numDias = Math.round(diffTime / oneDayMs) + 1; // +1 porque es inclusivo

      const horasDisponiblesDia = 15; // 07:00 a 22:00
      const minutosDisponiblesDia = horasDisponiblesDia * 60; // 900 minutos
      const minutosTotalesGlobales = numDias * minutosDisponiblesDia;

      // LÓGICA DE DISTRIBUCIÓN
      let intervaloMinutos = minutosTotalesGlobales / nAlumnos;
      let concurrencia = 1; // Alumnos por turno

      // Regla: Si el intervalo es menor a 10 minutos, forzamos 10 min y aumentamos concurrencia
      if (intervaloMinutos < 10) {
        intervaloMinutos = 10;
        // ¿Cuántos slots de 10 minutos caben en todo el periodo?
        const slotsTotalesPosibles = Math.floor(minutosTotalesGlobales / 10);
        // ¿Cuántos alumnos debemos meter en cada slot para que quepan todos?
        concurrencia = Math.ceil(nAlumnos / slotsTotalesPosibles);
      }

      console.log(
        `Configuración: Días: ${numDias}, Alumnos: ${nAlumnos}, Intervalo: ${intervaloMinutos.toFixed(
          2
        )}m, Concurrencia: ${concurrencia}`
      );

      // Función auxiliar para construir fechas sin cambios de zona horaria extraños
      // Toma el string base "YYYY-MM-DD", suma días y establece la hora
      function construirFechaCita(fechaBaseStr, diasASumar, minutosDesdeLas7) {
        const base = new Date(fechaBaseStr);
        // Ajustamos la fecha base sumando los días (en UTC para no perder info)
        base.setUTCDate(base.getUTCDate() + diasASumar);

        // Calculamos hora y minuto
        // Hora inicio es 7 AM.
        const horasExtra = Math.floor(minutosDesdeLas7 / 60);
        const minutosRestantes = Math.floor(minutosDesdeLas7 % 60);

        const horaFinal = 7 + horasExtra;

        // Establecemos la hora. IMPORTANTE: Usamos métodos UTC o Locales consistentemente.
        // Para asegurar que coincida con el backend, asumiremos que queremos guardar la hora local
        // tal cual se leería en el calendario.
        const fechaFinal = new Date(
          base.getUTCFullYear(),
          base.getUTCMonth(),
          base.getUTCDate(),
          horaFinal,
          minutosRestantes,
          0
        );
        return fechaFinal;
      }

      const t = await bd.sequelize.transaction();

      try {
        let currentSlotIndex = 0;
        let alumnosEnEsteSlot = 0;

        for (let i = 0; i < nAlumnos; i++) {
          const alumno = alumnos[i];

          // Calcular en qué minuto global inicia este slot
          const minutosGlobalesInicio = currentSlotIndex * intervaloMinutos;

          // Determinar qué día es (0 es el primer día, 1 el segundo...)
          const diaIndex = Math.floor(
            minutosGlobalesInicio / minutosDisponiblesDia
          );

          // Determinar minutos dentro de ese día (desde las 07:00)
          const minutosEnElDia = minutosGlobalesInicio % minutosDisponiblesDia;

          // Construir fechas
          // Nota: Si nos pasamos de días por redondeo (raro), el Math.floor lo manejará,
          // pero asegúrate de que strIni sea la fecha base correcta.
          const fechaHoraInicio = construirFechaCita(
            strIni,
            diaIndex,
            minutosEnElDia
          );

          // Timespan de 1 hora
          const fechaHoraFin = new Date(
            fechaHoraInicio.getTime() + 60 * 60 * 1000
          );

          let id = uuidv4().replace(/-/g, "").substring(0, 15);

          await bd.Inscripcion.create(
            {
              id,
              id_alumno: alumno.id_usuario,
              fecha_hora_in: fechaHoraInicio,
              fecha_hora_cad: fechaHoraFin,
            },
            { transaction: t }
          );
         
          //  ADMIN: DATOS DE ALUMNO PARA INSCRIPCIÓN
 
          router.get("/AdminAlumnoDatos/:idAlumno", async (req, res) => {
    const { idAlumno } = req.params;
    try {
      const alumno = await bd.DatosPersonales.findOne({
        where: { id: idAlumno, tipo_usuario: "alumno" },
      });

      if (!alumno) {
        return res
          .status(404)
          .json({ success: false, error: "Alumno no encontrado" });
      }

      const estudiante = await bd.Estudiante.findOne({
        where: { id_usuario: idAlumno },
      });

      if (!estudiante) {
        return res.status(404).json({
          success: false,
          error: "Registro de estudiante no encontrado para el alumno",
        });
      }

      return res.json({
        success: true,
        alumno: {
          id: alumno.id,
          nombre: alumno.nombre,
          ape_paterno: alumno.ape_paterno,
          ape_materno: alumno.ape_materno,
          carrera: alumno.carrera,
        },
        estudiante: {
          creditos_disponibles: estudiante.creditos_disponibles,
          promedio: estudiante.promedio,
          estado_academico: estudiante.estado_academico,
        },
      });
    } catch (error) {
      console.error("Error en /AdminAlumnoDatos:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener datos del alumno",
      });
    }
  });

 
  //  ADMIN: MATERIAS INSCRITAS DEL ALUMNO
  
  router.get("/AdminAlumnoInscripciones/:idAlumno", async (req, res) => {
    const { idAlumno } = req.params;
    try {
      const horario = await bd.Horario.findOne({
        where: { id_alumno: idAlumno },
      });

      if (!horario) {
        return res.json({ success: true, grupos: [] });
      }

      const mats = await bd.Mat_Inscritos.findAll({
        where: { id_horario: horario.id },
        include: [
          {
            model: bd.Grupo,
            attributes: ["id", "nombre", "turno", "cupo"],
            include: [
              {
                model: bd.Unidad_Aprendizaje,
                attributes: [
                  "id",
                  "nombre",
                  "credito",
                  "semestre",
                  "carrera",
                  "tipo",
                ],
              },
              {
                model: bd.DatosPersonales,
                attributes: ["nombre", "ape_paterno", "ape_materno"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });

      const grupos = mats.map((m) => {
        const g = m.Grupo || {};
        const ua = g.Unidad_Aprendizaje || {};
        const prof = g.DatosPersonale || g.DatosPersonales || {};
        return {
          id_mat_inscrito: m.id,
          id_grupo: g.id,
          grupo: g.nombre,
          turno: g.turno,
          ua: ua.nombre,
          tipo: ua.tipo,
          creditos: ua.credito,
          profesor: `${prof.nombre || ""} ${prof.ape_paterno || ""} ${
            prof.ape_materno || ""
          }`.trim(),
          cupo: g.cupo,
        };
      });

      return res.json({ success: true, grupos });
    } catch (error) {
      console.error("Error en /AdminAlumnoInscripciones:", error);
      return res.status(500).json({
        success: false,
        error: "Error al obtener inscripciones del alumno",
      });
    }
  });

 
  //  ADMIN: INSCRIBIR GRUPO A ALUMNO

  router.post("/AdminAlumnoInscribirGrupo/:idAlumno", async (req, res) => {
    const { idAlumno } = req.params;
    const { idGrupo } = req.body;

    if (!idGrupo) {
      return res
        .status(400)
        .json({ success: false, error: "Falta idGrupo en el cuerpo" });
    }

    try {
      const alumno = await bd.DatosPersonales.findOne({
        where: { id: idAlumno, tipo_usuario: "alumno" },
      });

      if (!alumno) {
        return res
          .status(404)
          .json({ success: false, error: "Alumno no encontrado" });
      }

      const estudiante = await bd.Estudiante.findOne({
        where: { id_usuario: idAlumno },
      });

      if (!estudiante) {
        return res.status(404).json({
          success: false,
          error: "Registro de estudiante no encontrado",
        });
      }

      const horario = await bd.Horario.findOne({
        where: { id_alumno: idAlumno },
      });

      if (!horario) {
        return res.status(404).json({
          success: false,
          error: "Horario no encontrado para el alumno",
        });
      }

      const grupo = await bd.Grupo.findOne({
        where: { id: idGrupo },
        include: [
          {
            model: bd.Unidad_Aprendizaje,
            attributes: [
              "id",
              "nombre",
              "credito",
              "semestre",
              "carrera",
              "tipo",
            ],
          },
          {
            model: bd.Distribucion,
            attributes: ["dia", "hora_ini", "hora_fin"],
          },
        ],
      });

      if (!grupo) {
        return res
          .status(404)
          .json({ success: false, error: "Grupo no encontrado" });
      }

      if (grupo.cupo <= 0) {
        return res.json({
          success: false,
          error: "El grupo no tiene cupo disponible",
        });
      }

      const creditosNecesarios = parseInt(
        grupo.Unidad_Aprendizaje.credito,
        10
      );
      const creditosDisponibles = parseInt(
        estudiante.creditos_disponibles,
        10
      );

      if (creditosDisponibles < creditosNecesarios) {
        return res.json({
          success: false,
          error: "El alumno no tiene créditos suficientes",
        });
      }

      // Materias ya inscritas
      const mats = await bd.Mat_Inscritos.findAll({
        where: { id_horario: horario.id },
        include: [
          {
            model: bd.Grupo,
            attributes: ["id", "id_ua"],
            include: [
              {
                model: bd.Unidad_Aprendizaje,
                attributes: ["id", "nombre"],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });

      // Validar que no tenga ya esa UA
      const yaTieneUA = mats.some(
        (m) =>
          m.Grupo &&
          (m.Grupo.id_ua === grupo.id_ua ||
            (m.Grupo.Unidad_Aprendizaje &&
              m.Grupo.Unidad_Aprendizaje.id ===
                grupo.Unidad_Aprendizaje.id))
      );

      if (yaTieneUA) {
        return res.json({
          success: false,
          error: "El alumno ya tiene inscrita esta unidad de aprendizaje",
        });
      }

      // Validar traslapes con distribución
      const idsGruposActuales = mats.map((m) => m.Grupo.id);
      let distribucionesExistentes = [];
      if (idsGruposActuales.length > 0) {
        distribucionesExistentes = await bd.Distribucion.findAll({
          where: { id_grupo: idsGruposActuales },
          raw: true,
        });
      }

      const distribNuevo = (grupo.Distribucions || []).map((d) =>
        d.toJSON ? d.toJSON() : d
      );

      for (const dNuevo of distribNuevo) {
        for (const dExist of distribucionesExistentes) {
          if (seTraslapan(dNuevo, dExist)) {
            return res.json({
              success: false,
              error:
                "El horario del grupo se traslapa con otra materia ya inscrita",
            });
          }
        }
      }

      // Transacción: crear Mat_Inscritos, actualizar cupo y créditos
      const t = await bd.sequelize.transaction();

      try {
        const idMat = uuidv4().replace(/-/g, "").substring(0, 15);

        await bd.Mat_Inscritos.create(
          {
            id: idMat,
            id_horario: horario.id,
            id_grupo: idGrupo,
          },
          { transaction: t }
        );

        await bd.Grupo.update(
          { cupo: grupo.cupo - 1 },
          { where: { id: idGrupo }, transaction: t }
        );

        await bd.Estudiante.update(
          {
            creditos_disponibles: creditosDisponibles - creditosNecesarios,
          },
          { where: { id_usuario: idAlumno }, transaction: t }
        );

        await t.commit();

        return res.json({
          success: true,
          message: "Grupo inscrito correctamente",
        });
      } catch (err) {
        await t.rollback();
        console.error(
          "Error en transacción AdminAlumnoInscribirGrupo:",
          err
        );
        return res.status(500).json({
          success: false,
          error: "Error al inscribir grupo",
        });
      }
    } catch (error) {
      console.error("Error en /AdminAlumnoInscribirGrupo:", error);
      return res.status(500).json({
        success: false,
        error: "Error al inscribir grupo",
      });
    }
  });

  
  //  ADMIN: DAR DE BAJA GRUPO A ALUMNO

  router.delete(
    "/AdminAlumnoBajaGrupo/:idAlumno/:idGrupo",
    async (req, res) => {
      const { idAlumno, idGrupo } = req.params;

      try {
        const estudiante = await bd.Estudiante.findOne({
          where: { id_usuario: idAlumno },
        });

        const horario = await bd.Horario.findOne({
          where: { id_alumno: idAlumno },
        });

        if (!estudiante || !horario) {
          return res.status(404).json({
            success: false,
            error: "No se encontró estudiante u horario para el alumno",
          });
        }

        const grupo = await bd.Grupo.findOne({
          where: { id: idGrupo },
          include: [
            {
              model: bd.Unidad_Aprendizaje,
              attributes: ["credito"],
            },
          ],
        });

        if (!grupo) {
          return res.status(404).json({
            success: false,
            error: "Grupo no encontrado",
          });
        }

        const t = await bd.sequelize.transaction();

        try {
          const deleted = await bd.Mat_Inscritos.destroy({
            where: { id_horario: horario.id, id_grupo: idGrupo },
            transaction: t,
          });

          if (!deleted) {
            await t.rollback();
            return res.json({
              success: false,
              error: "El alumno no tenía inscrito ese grupo",
            });
          }

          await bd.Grupo.update(
            { cupo: grupo.cupo + 1 },
            { where: { id: idGrupo }, transaction: t }
          );

          const creditosActuales = parseInt(
            estudiante.creditos_disponibles,
            10
          );
          const creditosUA = parseInt(
            grupo.Unidad_Aprendizaje.credito,
            10
          );

          await bd.Estudiante.update(
            {
              creditos_disponibles: creditosActuales + creditosUA,
            },
            { where: { id_usuario: idAlumno }, transaction: t }
          );

          await t.commit();

          return res.json({
            success: true,
            message: "Grupo dado de baja correctamente",
          });
        } catch (err) {
          await t.rollback();
          console.error("Error en transacción AdminAlumnoBajaGrupo:", err);
          return res.status(500).json({
            success: false,
            error: "Error al dar de baja grupo",
          });
        }
      } catch (error) {
        console.error("Error en /AdminAlumnoBajaGrupo:", error);
        return res.status(500).json({
          success: false,
          error: "Error al dar de baja grupo",
        });
      }
    }
  );

          // Manejo de concurrencia
          alumnosEnEsteSlot++;
          if (alumnosEnEsteSlot >= concurrencia) {
            // Llenamos este slot, avanzamos al siguiente intervalo de tiempo
            alumnosEnEsteSlot = 0;
            currentSlotIndex++;
          }
        }

        await t.commit();
      } catch (err) {
        await t.rollback();
        throw err;
      }

      return res.status(201).json({
        success: true,
        message: "Citas generadas correctamente",
        totalAlumnos: nAlumnos,
        dias: numDias,
        intervaloMinutos,
        concurrencia,
      });
    } catch (error) {
      console.error("Error GenerarCitas:", error);
      return res.status(500).json({
        error: "Error interno al generar citas",
        details: error.message,
      });
    }
  });

  return router;
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
function seTraslapan(d1, d2) {
  if (!d1 || !d2) return false;
  if (d1.dia !== d2.dia) return false;

  const ini1 = parseInt((d1.hora_ini || "00:00").replace(":", ""), 10);
  const fin1 = parseInt((d1.hora_fin || "00:00").replace(":", ""), 10);
  const ini2 = parseInt((d2.hora_ini || "00:00").replace(":", ""), 10);
  const fin2 = parseInt((d2.hora_fin || "00:00").replace(":", ""), 10);

  if ([ini1, fin1, ini2, fin2].some((x) => isNaN(x))) return false;

  // Se traslapan si uno empieza antes de que el otro termine
  // y termina después de que el otro empieza
  return ini1 < fin2 && ini2 < fin1;
}
