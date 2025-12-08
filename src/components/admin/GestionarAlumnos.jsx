import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionarAlumnos.css";
import { AdminSidebar } from "./AdminSidebar";

export function GestionarAlumnos() {
  const [carreras, setCarreras] = useState([]);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
  const [datos, setDatos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAlumno, setIdAlumno] = useState("");
  const [del, setDelete] = useState(false);

  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();
  const API = "http://localhost:4000";

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const alumnosPorPagina = 8;

  // ================================
  // Navegar a inscripción admin para un alumno
  // a.id = boleta del alumno (según tus columnas)
  // También mandamos todo el objeto alumno en state
  // para que InscripcionAdmin pueda usarlo si quiere.
  // ================================
  const handleClickInscribir = (alumno) =>
    navigate(
      `/administrador/gestionarAlumnos/inscripcion/${alumno.id}`,
      {
        state: { alumno },
      }
    );

  const handleRegistrar = () =>
    navigate("/administrador/gestionarAlumnos/registrarAlumno");

  const handleClickEdit = (id) =>
    navigate(`/administrador/gestionarAlumnos/editarAlumnos/${id}`);

  const handleAbrirModal = (id) => {
    setMostrarModal(true);
    setIdAlumno(id);
  };

  const handleCerrarModal = () => setMostrarModal(false);

  const handleEliminar = () => setDelete(true);

  // Navegar a Datos Médicos y Enfermedades
  const handleVerDatosMedicos = (idAlumno) => {
    navigate(`/administrador/datosMedicos/${idAlumno}`);
  };

  // ================================
  // Obtener alumnos
  // ================================
  useEffect(() => {
    fetch(`${API}/ObtenerAlumnos`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDatos(data.alumnos || []))
      .catch(() => setDatos([]));
  }, []);

  // ================================
  // Cargar carreras
  // ================================
  useEffect(() => {
    fetch(`${API}/ObtenerCarreras`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCarreras(data.carreras || []))
      .catch((err) => console.error("Error al obtener las carreras:", err));
  }, []);

  // ================================
  // Eliminar alumno (ponerlo inactivo)
  // ================================
  useEffect(() => {
    if (del && idAlumno) {
      fetch(`${API}/EliminarAlumno/${idAlumno}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Alumno eliminado correctamente");
            setDatos((prev) => prev.filter((a) => a.id !== idAlumno));
          } else {
            alert("Error al eliminar el alumno");
          }
          setMostrarModal(false);
        })
        .catch(() => {
          alert("Error al eliminar el alumno");
          setMostrarModal(false);
        })
        .finally(() => {
          setDelete(false);
        });
    }
  }, [del, idAlumno]); // eslint-disable-line react-hooks/exhaustive-deps

  // ================================
  // Filtrado y búsqueda
  // ================================
  const alumnosFiltrados = datos.filter((a) => {
    const nombreCompleto = `${a.nombre || ""} ${a.ape_paterno || ""} ${
      a.ape_materno || ""
    }`.toLowerCase();
    const busq = busqueda.toLowerCase().trim();

    const coincideCarrera = carreraSeleccionada
      ? (a.carrera || "").toLowerCase() === carreraSeleccionada.toLowerCase()
      : true;

    const coincideBusqueda =
      nombreCompleto.includes(busq) ||
      (a.id?.toString() || "").includes(busq) ||
      (a.email?.toLowerCase() || "").includes(busq);

    return coincideCarrera && coincideBusqueda;
  });

  // ================================
  // Paginación calculada
  // ================================
  const totalPaginas = Math.max(
    1,
    Math.ceil(alumnosFiltrados.length / alumnosPorPagina)
  );
  const indiceInicio = (paginaActual - 1) * alumnosPorPagina;
  const alumnosPagina = alumnosFiltrados.slice(
    indiceInicio,
    indiceInicio + alumnosPorPagina
  );

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  // Cuando cambia filtro o búsqueda, regresar a pág 1
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, carreraSeleccionada]);

  return (
    <div className="layout">
      <AdminSidebar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Gestión de Estudiantes</h1>
          </div>
          <div>
            <button className="btn azul" onClick={handleRegistrar}>
              + Registrar nuevo estudiante
            </button>
          </div>
          <img src="/escom.png" alt="Logo ESCOM" className="header-logo" />
        </header>

        {/* FILTROS */}
        <div className="filtros">
          <label>
            Carrera:
            <select
              value={carreraSeleccionada}
              onChange={(e) => setCarreraSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((c) => (
                <option key={c.id || c.nombre} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* TABLA */}
        <div className="tabla-contenedor">
          <div className="tabla-header">
            <h2>Lista de Estudiantes</h2>

            <div className="busqueda">
              <input
                type="text"
                placeholder="Buscar estudiante..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn-buscar" title="Buscar">
                🔎
              </button>
            </div>
          </div>

          <table className="tabla">
            <thead>
              <tr>
                <th>Boleta</th>
                <th>Nombre Completo</th>
                <th>Carrera</th>
                <th>Correo Institucional</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {alumnosPagina.length > 0 ? (
                alumnosPagina.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>
                      {a.nombre} {a.ape_paterno} {a.ape_materno}
                    </td>
                    <td>{a.carrera}</td>
                    <td>{a.email}</td>
                    <td className="acciones">
                      {/* Editar */}
                      <button
                        className="icono editar"
                        onClick={() => handleClickEdit(a.id)}
                        title="Editar estudiante"
                      >
                        ✎
                      </button>

                      {/* Eliminar */}
                      <button
                        className="icono eliminar"
                        onClick={() => handleAbrirModal(a.id)}
                        title="Eliminar estudiante"
                      >
                        🗑
                      </button>

                      {/* Inscripción admin */}
                      <button
                        className="icono inscribir"
                        title="Inscribir / dar de baja materias"
                        onClick={() => handleClickInscribir(a)}
                      >
                        📚
                      </button>

                      {/* Datos Médicos */}
                      <button
                        className="icono medico"
                        title="Ver datos médicos"
                        onClick={() => handleVerDatosMedicos(a.id)}
                      >
                        DM
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay alumnos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="tabla-footer">
            <div>
              <button className="btn azul">Descargar Listado</button>
            </div>
            <div className="paginacion">
              <button onClick={anteriorPagina} disabled={paginaActual === 1}>
                Anterior
              </button>

              <span className="pagina-activa">
                {paginaActual} / {totalPaginas}
              </span>

              <button
                onClick={siguientePagina}
                disabled={paginaActual >= totalPaginas}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* MODAL ELIMINAR */}
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>¿Estás seguro?</h3>
              <p>Esta acción no se puede deshacer.</p>
              <div className="modal-botones">
                <button className="btn rojo" onClick={handleEliminar}>
                  Confirmar
                </button>
                <button className="btn gris" onClick={handleCerrarModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
