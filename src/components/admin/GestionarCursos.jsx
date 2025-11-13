import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionarCursos.css";

export function GestionarCursos() {
  const [datos, setDatos] = useState([]);
  const [id_datos, setId_datos] = useState("");
  const [del, setDelete] = useState(false);
  const [mostrarModal, setmostrarModal] = useState(false);
  const navigate = useNavigate();
    const API = 'http://localhost:4000';

  const handleClickCur = () => {
    navigate("registrarCurso");
  };

  useEffect(() => {
    fetch(`${API}/ObtenerCursos`, { credentials: "include" })
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

  useEffect(() => {
    if (!del) return;

    fetch(`${API}/EliminarCurso/${id_datos}`, {
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
    <section className="gc-wrap">
      <header className="gc-header">
        <div>
          <h1 className="gc-title">Gestionar Cursos</h1>
          <p className="gc-sub">
            Consulta, edita y administra los grupos del programa académico.
          </p>
        </div>
        <button className="gc-btn primary" onClick={handleClickCur}>
          Registrar Grupo
        </button>
      </header>

      <div className="gc-card">
        <div className="gc-table-wrapper">
          <table className="gc-table" border="1" cellPadding={5}>
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
                      className="gc-btn table-btn edit"
                      onClick={() => handleEdit(dato.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="gc-btn table-btn delete"
                      onClick={() => handleAbrirModal(dato.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="gc-btn table-btn schedule"
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
              <button className="gc-btn danger" onClick={handleClickDelete}>
                Confirmar
              </button>
              <button className="gc-btn ghost" onClick={handleCerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
