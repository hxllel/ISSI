import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Profesor.css"; // Usa los mismos estilos del panel

export function ClasesImpartidas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);

  const handleClickLista = (cursoId) => navigate(`/profesor/PaseLista/${cursoId}`);

  useEffect(() => {
    fetch(`http://localhost:4000/ObtenerCursos/Prof/:${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(async (data) => {
        const cursos = Array.isArray(data?.cursos) ? data.cursos : [];
        const cursosConDist = await Promise.all(
          cursos.map(async (c) => {
            try {
              const resDist = await fetch(`http://localhost:4000/ObtenerDist/${c.id}`, { credentials: "include" });
              const d = await resDist.json();
              c.Distribucion = Array.isArray(d?.Distri) ? d.Distri : [];
            } catch {
              c.Distribucion = [];
            }
            return c;
          })
        );
        setDatos(cursosConDist);
      })
      .catch(() => setDatos([]));
  }, [id]);

  const handleGenerarPDF = async (curso) => {
    // (Tu misma función actual, sin cambios)
  };

  const handleExportExcel = async (curso) => {
    // (Tu misma función actual, sin cambios)
  };

  const horasPorDia = (distribs, dia) => {
    if (dia === "Miércoles" || dia === "Miercoles") {
      return (distribs || [])
        .filter((d) => d?.dia === "Miércoles" || d?.dia === "Miercoles")
        .map((d) => `${d.hora_ini} - ${d.hora_fin}`)
        .join(", ");
    }
    return (distribs || [])
      .filter((d) => d?.dia === dia)
      .map((d) => `${d.hora_ini} - ${d.hora_fin}`)
      .join(", ");
  };

  return (
    <div className="profesor-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>

        <nav className="menu">
          <Link to={`/profesor/${id}`} className="menu-item">
            Inicio
          </Link>
          <Link to={`/profesor/${id}/clases`} className="menu-item active">
            Clases Impartidas
          </Link>
          <button
            className="menu-item"
            onClick={() => navigate(`/profesor/${id}/grupos`)}
          >
            Horario
          </button>
          
          <button
            className="menu-item"
            onClick={() => navigate(`/profesor/chat`)}
          >
            Asistente de Chat
          </button>
          <button
            className="menu-item"
            onClick={() => navigate(`/profesor/${id}/perfil`)}
          >
            Información Personal
          </button>
          <button
            className="menu-item"
            onClick={() => navigate(`/profesor/${id}/calificaciones`)}
          >
            Calificaciones
          </button>
        </nav>

        <button className="logout" onClick={() => navigate(`/`)}>Cerrar sesión</button>
      </aside>

      {/* Main */}
      <main className="main-content">

        <header className="chat-header">
          <div className="encabezado-section">
          <h1>Clases Impartidas</h1>
          </div>
          <img className="escom-logo" src="/escom.png" alt="ESCOM" />
        </header>

        <section className="section-card">
          

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Grupo y Salón</th>
                  <th>Materia</th>
                  <th>Acciones</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(datos) ? datos : []).map((c) => {
                  const distribs = Array.isArray(c?.Distribucion)
                    ? c.Distribucion
                    : [];
                  return (
                    <tr key={c.id}>
                      <td>
                        <strong>{c?.nombre ?? "—"}</strong>
                        {c?.salon ? ` / ${c.salon}` : ""}
                      </td>
                      <td>{c?.Unidad_Aprendizaje?.nombre ?? "—"}</td>
                      <td className="acciones-cell">
                        <button
                          className="btn azul"
                          onClick={() => handleClickLista(c.id)}
                        >
                          Pasar lista
                        </button>
                        <button
                          className="btn azul"
                          onClick={() => handleGenerarPDF(c)}
                        >
                          PDF
                        </button>
                        <button
                          className="btn azul"
                          onClick={() => handleExportExcel(c)}
                        >
                          Excel
                        </button>
                      </td>
                      <td>{horasPorDia(distribs, "Lunes") || "—"}</td>
                      <td>{horasPorDia(distribs, "Martes") || "—"}</td>
                      <td>
                        {horasPorDia(distribs, "Miércoles") ||
                          horasPorDia(distribs, "Miercoles") ||
                          "—"}
                      </td>
                      <td>{horasPorDia(distribs, "Jueves") || "—"}</td>
                      <td>{horasPorDia(distribs, "Viernes") || "—"}</td>
                    </tr>
                  );
                })}
                {datos.length === 0 && (
                  <tr>
                    <td colSpan={8} className="empty">
                      No hay clases registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
