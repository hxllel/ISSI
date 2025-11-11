import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionarAlumnos.css";

export function GestionarAlumnos() {
  const [carreras, setCarreras] = useState([]);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
  const [datos, setDatos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idAlumno, setIdAlumno] = useState("");
  const [del, setDelete] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const alumnosPorPagina = 8;

  const navigate = useNavigate();

  const handleClickAlu = () => navigate("../administrador/gestionarAlumnos");
  const handleClickProf = () => navigate("../administrador/gestionarProfesores");
  const handleClickCursos = () => navigate("../administrador/gestionarCursos");
  const handleRegistrar = () => navigate("registrarAlumno");
  const handleClickEdit = (id) => navigate(`/admin/gestionarAlumnos/editarAlumnos/${id}`);
  const handleLogout = () => {navigate(`/`);};

  const handleAbrirModal = (id) => {
    setMostrarModal(true);
    setIdAlumno(id);
  };
  const handleCerrarModal = () => setMostrarModal(false);
  const handleEliminar = () => setDelete(true);

  // 🔹 Cargar alumnos
  useEffect(() => {
    fetch("http://localhost:4000/ObtenerAlumnos", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDatos(data.alumnos || []))
      .catch(() => setDatos([]));
  }, []);

  // 🔹 Cargar carreras
  useEffect(() => {
    fetch("http://localhost:4000/ObtenerCarreras", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCarreras(data.carreras || []))
      .catch((err) => console.error("Error al obtener las carreras:", err));
  }, []);

  // 🔹 Eliminar alumno
  useEffect(() => {
    if (del) {
      fetch(`http://localhost:4000/EliminarAlumno/${idAlumno}`, {
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
        });
      setDelete(false);
    }
  }, [del]);

  // 🔍 Filtrado y búsqueda (corregido)
  const alumnosFiltrados = datos.filter((a) => {
    const nombreCompleto = `${a.nombre || ""} ${a.ape_paterno || ""} ${a.ape_materno || ""}`.toLowerCase();
    const busq = busqueda.toLowerCase().trim();

    const coincideCarrera = carreraSeleccionada
      ? (a.carrera || "").toLowerCase().trim() === carreraSeleccionada.toLowerCase().trim()
      : true;

    const coincideBusqueda =
      nombreCompleto.includes(busq) ||
      (a.id?.toString() || "").includes(busq) ||
      (a.email?.toLowerCase() || "").includes(busq);

    return coincideCarrera && coincideBusqueda;
  });

  // 📄 Paginación corregida
  const totalPaginas = Math.max(1, Math.ceil(alumnosFiltrados.length / alumnosPorPagina));
  const indiceInicio = (paginaActual - 1) * alumnosPorPagina;
  const alumnosPagina = alumnosFiltrados.slice(indiceInicio, indiceInicio + alumnosPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  // Si cambian filtros, regresamos a página 1
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, carreraSeleccionada]);

  return (
    <div className="layout">
      {/* PANEL LATERAL */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate("/administrador")} className="menu-item">
            Panel de Control
          </button>
          <button onClick={handleClickAlu} className="menu-item active">
            Estudiantes
          </button>
          <button onClick={handleClickProf} className="menu-item">
            Profesores
          </button>
          <button onClick={handleClickCursos} className="menu-item">
            Cursos
          </button>
          <button className="menu-item">Informes</button>
        </nav>
        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Gestión de Estudiantes</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
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

          <button className="btn azul" onClick={handleRegistrar}>
            + Registrar nuevo estudiante
          </button>
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

  <button className="btn azul" onClick={handleRegistrar}>
    + Registrar nuevo estudiante
  </button>
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
                    <td>
                      <button
                        className="icono editar"
                        onClick={() => handleClickEdit(a.id)}
                      >
                        ✎
                      </button>
                      <button
                        className="icono eliminar"
                        onClick={() => handleAbrirModal(a.id)}
                      >
                        🗑
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
            <button className="btn-descargar">Descargar Listado</button>
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

        {/* MODAL */}
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
