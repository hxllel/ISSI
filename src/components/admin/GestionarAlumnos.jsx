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
  const navigate = useNavigate();
  const API = 'http://localhost:4000';

  const handleRegistrar = () => navigate("registrarAlumno");
  const handleClickEdit = (id) => { navigate(`/admin/gestionarAlumnos/editarAlumnos/${id}`); };
  const handleAbrirModal = (id) => {
    setMostrarModal(true);
    setIdAlumno(id);
  };
  const handleCerrarModal = () => setMostrarModal(false);
  const handleEliminar = () => setDelete(true);

  useEffect(() => {
    fetch(`${API}/ObtenerAlumnos`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDatos(data.alumnos || []))
      .catch(() => setDatos([]));
  }, []);

  useEffect(() => {
    fetch(`${API}/ObtenerCarreras`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => { setCarreras(data.carreras || []); })
      .catch((err) => console.error("Error al obtener las carreras:", err));
  }, []);

  useEffect(() => {
    if (del) {
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
        });
      setDelete(false);
    }
  }, [del]);

  return (
    <div className="admin-container">
      <AdminSidebar activeRoute="estudiantes" />

      <main className="main-content">
        <header className="encabezado">
          <h1>Estudiantes</h1>
          <div className="acciones">
            <button className="btn azul" onClick={handleRegistrar}>+ Registrar nuevo estudiantes</button>
          </div>
        </header>

        {/* FILTROS */}
        <div className="filtros">
          <label>
            Carrera:
            <select value={carreraSeleccionada} onChange={(e) => setCarreraSeleccionada(e.target.value)}>
              <option value="">Seleccione una carrera</option>
              {carreras.map((c) => (
                <option key={c.id || c.nombre} value={c.nombre}>{c.nombre}</option>
              ))}</select>
          </label>
          <label>
            Semestre:
            <select><option>Seleccionar Semestre</option></select>
          </label>
          <label>
            Grupo:
            <select><option>Seleccionar Grupo</option></select>
          </label>
          <label>
            Horario:
            <select><option>Seleccionar Horario</option></select>
          </label>
        </div>

        {/* TABLA */}
        <div className="tabla-contenedor">
          <div className="tabla-header">
            <h2>Lista de Estudiantes</h2>
            <input type="text" placeholder="Buscar estudiante..." />
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
              {datos.length > 0 ? (
                datos.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.nombre} {a.ape_paterno} {a.ape_materno}</td>
                    <td>{a.carrera}</td>
                    <td>{a.email}</td>
                    <td>
                      <button className="icono editar" onClick={() => handleClickEdit(a.id)}>✎</button>
                      <button className="icono eliminar" onClick={() => handleAbrirModal(a.id)}>🗑</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">No hay alumnos disponibles</td></tr>
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
                <button className="btn rojo" onClick={handleEliminar}>Confirmar</button>
                <button className="btn gris" onClick={handleCerrarModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
