import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GenerarCitas.css";
import { AdminSidebar } from "./AdminSidebar";
import Modal from "../Modal";

export function GenerarCitas() {
  const navigate = useNavigate();
  const [fecha_ini, setFecha_ini] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [edo, setEdo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const API = "http://localhost:4000";

  const handleHoraInicio = (e) => {
    const nuevaFechaini = e.target.value;
    setFecha_ini(nuevaFechaini);

    if (fecha_fin && nuevaFechaini >= fecha_fin) {
      setMensaje({
        tipo: "error",
        texto: "La fecha de inicio no puede ser mayor o igual que la fecha de fin",
      });
      setFecha_ini("");
    } else {
      setMensaje({ tipo: "", texto: "" });
    }
  };

  const handleHoraFin = (e) => {
    const nuevaFechaFin = e.target.value;
    setFecha_fin(nuevaFechaFin);

    if (fecha_ini && nuevaFechaFin <= fecha_ini) {
      setMensaje({
        tipo: "error",
        texto: "La fecha de fin no puede ser menor o igual que la fecha de inicio",
      });
      setFecha_fin("");
    } else {
      setMensaje({ tipo: "", texto: "" });
    }
  };

  const handleRegulares = () => {
    setModalOpen(true);
    setEdo("Regular");
    setFecha_ini("");
    setFecha_fin("");
    setMensaje({ tipo: "", texto: "" });
  };

  const handleIrregulares = () => {
    setModalOpen(true);
    setEdo("Irregular");
    setFecha_ini("");
    setFecha_fin("");
    setMensaje({ tipo: "", texto: "" });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/GenerarCitas/${edo}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha_ini, fecha_fin }),
      });

      const data = await res.json();

      if (data.success) {
        setMensaje({
          tipo: "success",
          texto: "Las citas se generaron exitosamente",
        });
        setTimeout(() => {
          setModalOpen(false);
          setFecha_ini("");
          setFecha_fin("");
        }, 1500);
      } else {
        setMensaje({
          tipo: "error",
          texto: data.message || "Error al generar las citas",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setMensaje({
        tipo: "error",
        texto: "Error al conectar con el servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Generar Citas de Inscripción</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>

        <section className="gc-wrap">
          <div className="gc-buttons-container">
            <button
              className="gc-button gc-button-regular"
              onClick={handleRegulares}
            >
              <div className="gc-button-content">
                <h3>Alumnos Regulares</h3>
                <p>Crear fechas de inscripción para los alumnos regulares</p>
              </div>
            </button>

            <button
              className="gc-button gc-button-irregular"
              onClick={handleIrregulares}
            >
              <div className="gc-button-content">
                <h3>Alumnos Irregulares</h3>
                <p>Crear fechas de inscripción para los alumnos irregulares</p>
              </div>
            </button>
          </div>
        </section>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="gc-modal-content">
            <h2 className="gc-modal-title">
              {edo === "Regular"
                ? "Fechas de Inscripción - Alumnos Regulares"
                : "Fechas de Inscripción - Alumnos Irregulares"}
            </h2>

            {mensaje.texto && (
              <div className={`gc-mensaje gc-mensaje-${mensaje.tipo}`}>
                {mensaje.texto}
              </div>
            )}

            <form onSubmit={enviarFormulario} className="gc-formulario">
              <div className="gc-form-group">
                <label htmlFor="fecha_inicio" className="gc-label">
                  Fecha de inicio <span className="gc-required">*</span>
                </label>
                <input
                  type="date"
                  id="fecha_inicio"
                  required
                  value={fecha_ini}
                  onChange={handleHoraInicio}
                  className="gc-input"
                />
              </div>

              <div className="gc-form-group">
                <label htmlFor="fecha_fin" className="gc-label">
                  Fecha final <span className="gc-required">*</span>
                </label>
                <input
                  type="date"
                  id="fecha_fin"
                  required
                  value={fecha_fin}
                  onChange={handleHoraFin}
                  className="gc-input"
                />
              </div>

              <div className="gc-form-actions">
                <button
                  type="button"
                  className="btn blanco"
                  onClick={() => setModalOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn azul"
                  disabled={loading}
                >
                  {loading ? "Generando..." : "Generar Citas"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </main>
    </div>
  );
}