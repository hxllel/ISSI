import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionarProfesores.css";
import { AdminSidebar } from "./AdminSidebar";


export function GestionarProfesores() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
  const [id_profesor, setId_profesor] = useState("");
  const [del, setDelete] = useState(false);
  const [mostrarModal, setmostrarModal] = useState(false);

  const handleClickAlu = () => navigate("../administrador/gestionarAlumnos");
  const handleClickProf = () => navigate("../administrador/gestionarProfesores");
  const handleClickCursos = () => navigate("../administrador/gestionarCursos");
  const handleClickadmin = () => navigate("/administrador");
  const handleRegistrarProf = () => navigate("registrarProfesor");
  const handleClickEdit = (id) => navigate(`editarProfesor/${id}`);
  const handleClickDelete = () => setDelete(true);
  const handleLogout = () => {navigate(`/`);};

  const handleAbrirModal = (id) => {
    setmostrarModal(true);
    setId_profesor(id);
  };

  const handleCerrarModal = () => setmostrarModal(false);

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerProfesores", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setProfesores(data.profesores || []))
      .catch((err) => console.error("Error al obtener los profesores:", err));
  }, []);

  useEffect(() => {
    if (del) {
      fetch(`http://localhost:4000/EliminarProfesor/${id_profesor}`, {
        credentials: "include",
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Profesor eliminado correctamente");
            setProfesores((prev) => prev.filter((p) => p.id !== id_profesor));
            setmostrarModal(false);
          } else {
            alert("Error al eliminar el profesor");
          }
        })
        .catch((err) => console.error("Error al eliminar el profesor:", err));
      setDelete(false);
    }
  }, [del]);

  // 🔍 FILTRO DE BÚSQUEDA
  const profesoresFiltrados = profesores.filter((prof) => {
    const nombreCompleto = `${prof.nombre} ${prof.ape_paterno} ${prof.ape_materno}`.toLowerCase();
    return (
      nombreCompleto.includes(busqueda.toLowerCase()) ||
      prof.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      prof.id.toString().includes(busqueda)
    );
  });

  return (
    <div className="layout">
      <AdminSidebar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
          <h1>Profesores</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>

        {/* TABLA */}
        <div className="tabla-contenedor">
          <div className="tabla-header">
            <h2>Lista de Profesores</h2>

            <div className="busqueda">
  <input
    type="text"
    placeholder="Buscar profesor..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
  />
  <button className="btn-buscar" title="Buscar">
    🔎
  </button>
</div>


            <button className="btn azul" onClick={handleRegistrarProf}>
              + Registrar nuevo profesor
            </button>
          </div>

          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Correo Institucional</th>
                <th>Grado</th>
                <th>Situación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {profesoresFiltrados.length > 0 ? (
                profesoresFiltrados.map((profesor) => (
                  <tr key={profesor.id}>
                    <td>{profesor.id}</td>
                    <td>
                      {profesor.nombre} {profesor.ape_paterno}{" "}
                      {profesor.ape_materno}
                    </td>
                    <td>{profesor.email}</td>
                    <td>{profesor.grado}</td>
                    <td>{profesor.situacion}</td>
                    <td>
                      <button
                        className="icono editar"
                        onClick={() => handleClickEdit(profesor.id)}
                      >
                        ✎
                      </button>
                      <button
                        className="icono eliminar"
                        onClick={() => handleAbrirModal(profesor.id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No se encontraron profesores</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="tabla-footer">
            <button className="btn-descargar">Descargar Listado</button>
            <div className="paginacion">
              <button>Anterior</button>
              <span className="pagina-activa">1</span>
              <button>Siguiente</button>
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
                <button className="btn rojo" onClick={handleClickDelete}>
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
