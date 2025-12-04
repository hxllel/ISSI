// src/components/admin/InscripcionAdmin.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import Modal from "../Modal.jsx";
import "../alumno/Inscripcion.css"; // reutilizamos estilos de inscripción alumno

const API = "http://localhost:4000";

export function InscripcionAdmin() {
  const { id } = useParams(); // id del alumno (boleta)

  const [alumnoInfo, setAlumnoInfo] = useState(null);
  const [creditos, setCreditos] = useState(0);

  const [gruposDisponibles, setGruposDisponibles] = useState([]);
  const [gruposInscritos, setGruposInscritos] = useState([]);

  // filtros (igual que en Inscripcion.jsx)
  const [filtroTurno, setFiltroTurno] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroSemestre, setFiltroSemestre] = useState("");

  // modal horario
  const [modalOpen, setModalOpen] = useState(false);
  const [distri, setDistri] = useState([]);
  const [idGrupoHorario, setIdGrupoHorario] = useState(null);

  const safeArray = (v) => (Array.isArray(v) ? v : []);

  // =========================
  //  CARGAR DATOS DEL ALUMNO
  // =========================
  const loadAlumno = async () => {
    try {
      const res = await fetch(`${API}/AdminAlumnoDatos/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        console.error(data.error || "Error obteniendo alumno");
        return;
      }
      setAlumnoInfo(data.alumno);
      setCreditos(data.estudiante?.creditos_disponibles ?? 0);
    } catch (e) {
      console.error("Error loadAlumno:", e);
    }
  };

  // =========================
  //  CARGAR INSCRIPCIONES
  // =========================
  const loadInscritos = async () => {
    try {
      const res = await fetch(`${API}/AdminAlumnoInscripciones/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        console.error(data.error || "Error obteniendo inscripciones");
        setGruposInscritos([]);
        return;
      }
      setGruposInscritos(safeArray(data.grupos));
    } catch (e) {
      console.error("Error loadInscritos:", e);
      setGruposInscritos([]);
    }
  };

  // =========================
  //  CARGAR GRUPOS DISPONIBLES
  // =========================
  const loadGruposDisponibles = async () => {
    try {
      const res = await fetch(`${API}/ObtenerCursos`, {
        credentials: "include",
      });
      const data = await res.json();
      setGruposDisponibles(safeArray(data.cursos));
    } catch (e) {
      console.error("Error loadGruposDisponibles:", e);
      setGruposDisponibles([]);
    }
  };

  useEffect(() => {
    loadAlumno();
    loadInscritos();
    loadGruposDisponibles();
  }, [id]);

  // =========================
  //  MODAL HORARIO DE GRUPO
  // =========================
  const handleVerHorario = (idGrupo) => {
    setIdGrupoHorario(idGrupo);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!modalOpen || !idGrupoHorario) return;

    fetch(`${API}/ObtenerDist/${idGrupoHorario}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setDistri(safeArray(data.Distri));
      })
      .catch(() => setDistri([]));
  }, [modalOpen, idGrupoHorario]);

  // =========================
  //  INSCRIBIR GRUPO (ADMIN)
  // =========================
  const handleInscribirGrupo = async (idGrupo) => {
    try {
      const res = await fetch(`${API}/AdminAlumnoInscribirGrupo/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idGrupo }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "No se pudo inscribir el grupo");
        return;
      }
      alert("Grupo inscrito correctamente");
      await loadAlumno();
      await loadInscritos();
    } catch (e) {
      console.error("Error handleInscribirGrupo:", e);
      alert("Error al inscribir el grupo");
    }
  };

  // =========================
  //  DAR DE BAJA GRUPO (ADMIN)
  // =========================
  const handleBajaGrupo = async (idGrupo) => {
    if (!window.confirm("¿Dar de baja este grupo para el alumno?")) return;

    try {
      const res = await fetch(
        `${API}/AdminAlumnoBajaGrupo/${id}/${idGrupo}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "No se pudo dar de baja el grupo");
        return;
      }
      alert("Grupo dado de baja correctamente");
      await loadAlumno();
      await loadInscritos();
    } catch (e) {
      console.error("Error handleBajaGrupo:", e);
      alert("Error al dar de baja el grupo");
    }
  };

  // =========================
  //  HELPERS PARA RENDER
  // =========================
  const gruposInscritosIds = new Set(
    gruposInscritos.map((g) => g.id_grupo)
  );

  const gruposFiltrados = gruposDisponibles.filter((grupo) => {
    const matchTurno = !filtroTurno || grupo.turno === filtroTurno;
    const ua = grupo.Unidad_Aprendizaje || {};
    const matchTipo = !filtroTipo || ua.tipo === filtroTipo;
    const matchGrupo =
      !filtroGrupo ||
      (grupo.nombre || "")
        .toLowerCase()
        .includes(filtroGrupo.toLowerCase());
    const matchSemestre =
      !filtroSemestre ||
      String(ua.semestre || "").toString() === filtroSemestre;
    return matchTurno && matchTipo && matchGrupo && matchSemestre;
  });

  const nombreCompletoAlumno = alumnoInfo
    ? `${alumnoInfo.ape_paterno} ${alumnoInfo.ape_materno} ${alumnoInfo.nombre}`
    : "";

  return (
    <div className="inscripcion-container">
      <AdminSidebar />

      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1 className="titulo">Inscripción de materias (Administrador)</h1>
          </div>
          <p className="descripcion">
            Administra la inscripción de materias para el alumno seleccionado.
          </p>
          <img src="/escom.png" alt="Logo ESCOM" className="header-logo" />
        </header>

        {/* RESUMEN DEL ALUMNO */}
        <section className="tabla-contenedor" style={{ marginBottom: "1rem" }}>
          <h2 className="titulo">Datos del alumno</h2>
          {alumnoInfo ? (
            <table className="tabla-cursos">
              <thead>
                <tr>
                  <th>Boleta</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Créditos disponibles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{alumnoInfo.id}</td>
                  <td>{nombreCompletoAlumno}</td>
                  <td>{alumnoInfo.carrera}</td>
                  <td>{creditos}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Cargando datos del alumno...</p>
          )}
        </section>

        {/* GRUPOS DISPONIBLES */}
        <section className="tabla-contenedor">
          <h2 className="titulo">Grupos disponibles</h2>

          <div
            className="button-gap"
            style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
          >
            <input
              type="text"
              placeholder="Buscar por grupo..."
              value={filtroGrupo}
              onChange={(e) => setFiltroGrupo(e.target.value)}
              className="btn-ver"
              style={{ padding: "0.5rem" }}
            />
            <select
              value={filtroTurno}
              onChange={(e) => setFiltroTurno(e.target.value)}
              className="btn-ver"
              style={{ padding: "0.5rem" }}
            >
              <option value="">Todos los turnos</option>
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
            </select>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="btn-ver"
              style={{ padding: "0.5rem" }}
            >
              <option value="">Todos los tipos</option>
              <option value="OBLIGATORIA">OBLIGATORIA</option>
              <option value="OPTATIVA">OPTATIVA</option>
            </select>
            <select
              value={filtroSemestre}
              onChange={(e) => setFiltroSemestre(e.target.value)}
              className="btn-ver"
              style={{ padding: "0.5rem" }}
            >
              <option value="">Todos los semestres</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={String(sem)}>
                  {sem}° Semestre
                </option>
              ))}
            </select>
          </div>

          <table className="tabla-cursos">
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Unidad de Aprendizaje</th>
                <th>Tipo</th>
                <th>Créditos</th>
                <th>Profesor</th>
                <th>Cupo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gruposFiltrados.length > 0 ? (
                gruposFiltrados.map((grupo) => {
                  const ua = grupo.Unidad_Aprendizaje || {};
                  const prof =
                    grupo.DatosPersonale || grupo.DatosPersonales || {};
                  const nombreProf = `${prof.nombre || ""} ${
                    prof.ape_paterno || ""
                  } ${prof.ape_materno || ""}`.trim();

                  return (
                    <tr key={grupo.id}>
                      <td>{grupo.nombre}</td>
                      <td>{ua.nombre}</td>
                      <td>{ua.tipo}</td>
                      <td>{ua.credito}</td>
                      <td>{nombreProf || "Sin profesor"}</td>
                      <td>{grupo.cupo}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-inscribir"
                          onClick={() => handleInscribirGrupo(grupo.id)}
                          disabled={
                            grupo.cupo <= 0 || gruposInscritosIds.has(grupo.id)
                          }
                        >
                          Inscribir
                        </button>
                        <button
                          type="button"
                          className="btn-ver"
                          style={{ marginLeft: "8px" }}
                          onClick={() => handleVerHorario(grupo.id)}
                        >
                          Ver horario
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No hay grupos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* GRUPOS INSCRITOS */}
        <section className="tabla-contenedor" style={{ marginTop: "1.5rem" }}>
          <h2 className="titulo">Grupos inscritos del alumno</h2>

          <table className="tabla-cursos">
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Unidad de Aprendizaje</th>
                <th>Tipo</th>
                <th>Créditos</th>
                <th>Profesor</th>
                <th>Cupo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gruposInscritos.length > 0 ? (
                gruposInscritos.map((g) => (
                  <tr key={g.id_grupo}>
                    <td>{g.grupo}</td>
                    <td>{g.ua}</td>
                    <td>{g.tipo}</td>
                    <td>{g.creditos}</td>
                    <td>{g.profesor}</td>
                    <td>{g.cupo}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-ver"
                        onClick={() => handleBajaGrupo(g.id_grupo)}
                      >
                        Dar de baja
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">El alumno no tiene grupos inscritos</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* MODAL: HORARIO DE GRUPO */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="tabla-contenedor">
            <h2 className="titulo">Horario del grupo</h2>
            <table className="tabla-horario">
              <thead>
                <tr>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(
                    (dia) => (
                      <td key={dia}>
                        {distri
                          .filter((d) => d.dia === dia)
                          .map((d, i) => (
                            <div key={i}>
                              {d.hora_ini} - {d.hora_fin}
                            </div>
                          ))}
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      </main>
    </div>
  );
}
