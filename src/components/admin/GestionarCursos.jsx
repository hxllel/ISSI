import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionarCursos.css";
import { AdminSidebar } from "./AdminSidebar";


export function GestionarCursos() {
  const [datos, setDatos] = useState([]);
  const [id_datos, setId_datos] = useState("");
  const [del, setDelete] = useState(false);
  const [mostrarModal, setmostrarModal] = useState(false);
  const navigate = useNavigate();

  const handleClickCur = () => {
    navigate("registrarCurso");
  };

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerCursos", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDatos(data.cursos))
      .catch((err) => console.error("Error al obtener los cursos:", err));
  }, []);

  const handleEdit = (id) => {
    navigate(`editarCurso/${id}`);
  };

  const handleClickDis = (id) => {
    navigate(`distribucionHorarios/${id}`);
  };

  const handleRegis = (id) => {
    navigate(`administrador/gestionarCursos/registrarCurso`);
  };

 
  

  const handleClickDelete = () => {
    setDelete(true);
  };

  const handleAbrirModal = (id) => {
    setmostrarModal(true);
    setId_datos(id);
  };

  const handleCerrarModal = () => {
    setmostrarModal(false);
  };

const handleClickAlu = () => navigate("../administrador/gestionarAlumnos");
  const handleClickProf = () => navigate("../administrador/gestionarProfesores");
  const handleClickCursos = () => navigate("../administrador/gestionarCursos");
  const handleClickadmin = () => navigate("/administrador");
  const handleRegistrarProf = () => navigate("registrarProfesor");
  const handleClickEdit = (id) => navigate(`editarProfesor/${id}`);
  
  const handleLogout = () => {navigate(`/`);};

  useEffect(() => {
    if (!del) return;

    fetch(`http://localhost:4000/EliminarCurso/${id_datos}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Grupo eliminado correctamente");
          setmostrarModal(false);
          setDatos((prev) => prev.filter((d) => d.id !== id_datos));
        } else {
          alert("Error al eliminar el grupo");
        }
      })
      .catch((err) => console.error("Error al eliminar el grupo:", err));

    setDelete(false);
  }, [del, id_datos]);

  return (
    <div className="admin-container">
    
      <AdminSidebar />
      <main className="main-content">
      <header className="chat-header">
        <div className="encabezado-section">
          <h1>Gestionar Cursos</h1>
          </div>
          
        <div>
        <button className="btn azul" onClick={handleClickCur}>
          + Registrar Grupo
        </button>
        </div>
        <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
      </header>

      <div className="gc-card">
        <div className="gc-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Profesor</th>
                <th>Unidad de Aprendizaje</th>
                <th>Turno</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.nombre}</td>
                  <td>
                    {dato.DatosPersonale.nombre}{" "}
                    {dato.DatosPersonale.ape_paterno}{" "}
                    {dato.DatosPersonale.ape_materno}
                  </td>
                  <td>{dato.Unidad_Aprendizaje.nombre}</td>
                  <td>{dato.turno}</td>
                  <td>{dato.Unidad_Aprendizaje.carrera}</td>
                  <td className="gc-actions-cell">
                    <button
                      className="btn azul"
                      onClick={() => handleEdit(dato.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn azul"
                      onClick={() => handleAbrirModal(dato.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn blanco"
                      onClick={() => handleClickDis(dato.id)}
                    >
                      Gestionar distribución
                    </button>
                  </td>
                </tr>
              ))}

              {datos.length === 0 && (
                <tr>
                  <td className="gc-empty" colSpan={6}>
                    No hay grupos registrados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <div className="gc-modal-backdrop">
          <div className="gc-modal">
            <h3 className="gc-modal-title">¿Estás seguro?</h3>
            <p className="gc-modal-text">
              Esta acción no se puede deshacer. El grupo será eliminado
              permanentemente.
            </p>
            <div className="gc-modal-actions">
              <button className="btn azul" onClick={handleClickDelete}>
                Confirmar
              </button>
              <button className="btn blanco" onClick={handleCerrarModal}>
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