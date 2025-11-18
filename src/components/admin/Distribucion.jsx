import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../Modal";
import { AdminSidebar } from "./AdminSidebar";
import "./Distribucion.css";

export function Distribucion() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [dia, setDia] = useState("");
  const [hora_ini, setHora_ini] = useState("");
  const [hora_fin, setHora_fin] = useState("");
  const [del, setDelete] = useState(false);
  const [id_delete, setId_delete] = useState("");
  const API = "http://localhost:4000";

  const [modalOpen2, setModalOpen2] = useState(false);
  const [Distri, setDistri] = useState([]);

  const { id } = useParams();

  const handleHoraInicio = (e) => {
    const nuevaHoraIni = e.target.value;
    setHora_ini(nuevaHoraIni);

    if (hora_fin && nuevaHoraIni >= hora_fin) {
      alert("La hora de inicio no puede ser mayor o igual que la hora de fin");
      setHora_ini("");
    }
  };

  const handleHoraFin = (e) => {
    const nuevaHoraFin = e.target.value;
    setHora_fin(nuevaHoraFin);

    if (hora_ini && nuevaHoraFin <= hora_ini) {
      alert("La hora de fin no puede ser menor o igual que la hora de inicio");
      setHora_fin("");
    }
  };

  useEffect(() => {
    fetch(`${API}/ObtenerDist/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Distri) setDistri(data.Distri);
      })
      .catch((err) =>
        console.error("Error la distribucion de horas del grupo:", err)
      );
  }, [id]);

  const enviarFormulario = (e) => {
    e.preventDefault();

    fetch(`${API}/AgregarDist/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_grupo: id, dia, hora_ini, hora_fin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMensaje("Día agregado correctamente");
        } else {
          setMensaje("Error al agregar el día: " + data.message);
        }
      })
      .catch((err) => console.error("Error al agregar el día:", err));

    setModalOpen(false);
  };

  const handleClickAbrir = (id) => {
    setModalOpen2(true);
    setId_delete(id);
  };

  const handleClickDelete = () => {
    setDelete(true);
  };

  useEffect(() => {
    if (!del) return;

    fetch(`${API}/EliminarDist/${id_delete}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Día eliminado correctamente");
          setModalOpen2(false);
        } else {
          alert("Error al eliminar el día");
        }
      })
      .catch((err) => console.error("Error al eliminar el día:", err));

    setDelete(false);
    setModalOpen2(false);
  }, [del, id_delete]);

  return (
    <div className="admin-container">
      <AdminSidebar activeRoute="cursos" />

      <main className="main-content">
        <section className="dist-wrap">
          <h1 className="dist-title">Distribución del grupo</h1>

          <button className="btn dist-add-btn" onClick={() => setModalOpen(true)}>
            Agregar un día
          </button>

          {mensaje && <p className="mensaje dist-message">{mensaje}</p>}

          <table className="dist-table" border="1" cellPadding={5}>
            <thead>
              <tr>
                <th>Día</th>
                <th>Hora que inicia la clase</th>
                <th>Hora que finaliza la clase</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Distri.length > 0 ? (
                Distri.map((dato) => (
                  <tr key={dato.id}>
                    <td>{dato.dia}</td>
                    <td>{dato.hora_ini}</td>
                    <td>{dato.hora_fin}</td>
                    <td>
                      <button
                        className="btn dist-btn-delete"
                        onClick={() => handleClickAbrir(dato.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="dist-empty" colSpan="4">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <h2 className="titulo dist-modal-title">Registrar nuevo día</h2>
            <form onSubmit={enviarFormulario} className="formulario dist-form">
              <label>Día:</label>
              <select
                onChange={(e) => setDia(e.target.value)}
                value={dia}
                required
              >
                <option value="">-- Selecciona un día --</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
              </select>

              <label>Hora que inicia la clase:</label>
              <input
                type="time"
                min="07:00"
                max="22:00"
                value={hora_ini}
                onChange={handleHoraInicio}
                required
              />

              <label>Hora que finaliza la clase:</label>
              <input
                type="time"
                min="07:00"
                max="22:00"
                value={hora_fin}
                onChange={handleHoraFin}
                required
              />

              <button type="submit" className="btn-enviar">
                Enviar
              </button>
            </form>
          </Modal>

          <Modal open={modalOpen2} onClose={() => setModalOpen2(false)}>
            <h2 className="titulo dist-modal-title">Eliminar día</h2>
            <p className="dist-modal-text">
              ¿Estás seguro de que deseas eliminar este día?
            </p>
            <button
              type="button"
              className="btn-enviar dist-btn-danger"
              onClick={handleClickDelete}
            >
              Eliminar
            </button>
          </Modal>
        </section>
      </main>
    </div>
  );
}
