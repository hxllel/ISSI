import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HistorialAcademico.css";

export function HistorialAcademico() {
  const navigate = useNavigate();
  const { id } = useParams(); // por si tu ruta incluye :id

  const [historial, setHistorial] = useState([]);
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerHistorial", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          alert("Sesión expirada. Por favor inicia sesión nuevamente.");
          navigate("/");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return; // Si fue 401, data será null
        setHistorial(data.historial || []);
        setSemestres(data.semestres || []);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
        setHistorial([]);
        setSemestres([]);
      });
  }, [navigate]);

  // === Navegación del sidebar (igual que en otras vistas de alumno) ===
  const handleIns = () => {navigate(`/alumno/inscripcion/${id}`);};
  const handleEditPer = () => {navigate(`/alumno/datosPersonales/${id}`);};
  const handleHorarios = () => {navigate(`/alumno/horarios/${id}`);};
  const handleLogout = () => {navigate(`/`);};
  const handleKardex = () => {navigate(`/alumno/Kardex/${id}`);};
  const handleChat = () => {navigate(`/alumno/Chat`, { state: { alumnoId: id } });};

  // Renderiza una tabla por semestre
  const renderSeccion = (semestre) => {
    const materias = historial.filter((h) => h.semestre === semestre);

    return (
      <div key={semestre} className="historial-semestre">
        <h3>Semestre {semestre}</h3>
        <table className="horario-table" border="1" cellPadding={5}>
          <thead>
            <tr>
              <th>Unidad de Aprendizaje</th>
              <th>Calificación Final</th>
              <th>Periodo</th>
              <th>Fecha</th>
              <th>Método Aprobado</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((m) => (
              <tr key={m.id}>
                <td>{m.unidad_aprendizaje}</td>
                <td>{m.calificacion_final}</td>
                <td>{m.periodo}</td>
                <td>{m.fecha}</td>
                <td>{m.metodo_aprobado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="alumno-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo IPN" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate(`/alumno/${id}`)} className="menu-item">
            Inicio
          </button>
          <button className="menu-item" onClick={handleIns}>
            Inscribir Materias
          </button>
          <button className="menu-item" onClick={handleHorarios}>
            Horarios
          </button>
          <button className="menu-item active" onClick={handleKardex}>
            Kardex
          </button>
          <button className="menu-item" onClick={handleChat}>
            Asistente de Chat
          </button>
          <button className="menu-item" onClick={handleEditPer}>
            Información Personal
          </button>
        </nav>
        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        {/* Encabezado Gestión Escolar + logo ESCOM */}
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>KARDEX</h1>
          </div>
          {/* Ajusta la ruta del logo según como lo tengas en tu proyecto */}
          <img src="/escom.png" alt="ESCOM" className="escom-logo" />
        </header>

        {/* Sección principal del historial */}
        <section className="horario-section">
          <h2>Historial Académico</h2>

          {semestres.length > 0 ? (
            semestres.map((s) => renderSeccion(s))
          ) : (
            <p className="historial-empty">No hay registros disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
}
