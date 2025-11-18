import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlumnoSidebar } from "./AlumnoSidebar";
import "./HistorialAcademico.css";

export function HistorialAcademico() {
  const navigate = useNavigate();
  const params = useParams();
  const alumnoId = params.id;

  const [historial, setHistorial] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const API = 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API}/ObtenerHistorial`, { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          alert("Sesión expirada. Por favor inicia sesión nuevamente.");
          navigate("/");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setHistorial(data.historial || []);
        setSemestres(data.semestres || []);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
        setHistorial([]);
        setSemestres([]);
      });
  }, [navigate]);

  // Renderiza una tabla por semestre
  const renderSeccion = (semestre) => {
    const materias = historial.filter((h) => h.semestre === semestre);

    return (
      <section key={semestre} className="kardex-section">
        <h2 className="kardex-title">Semestre {semestre}</h2>
        <div className="kardex-table-wrapper">
          <table className="kardex-table">
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
              {materias.map((m, idx) => (
                <tr key={idx}>
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
      </section>
    );
  };

  return (
    <div className="kardex-container">
      <AlumnoSidebar alumnoId={alumnoId} activeRoute="kardex" />

      <main className="main-content">
        <header className="kardex-header">
          <h1>Historial Académico (Kardex)</h1>
          <p>Visualiza tu historial académico completo por semestre</p>
        </header>

        <section className="kardex-content">
          {semestres.length > 0 ? (
            semestres.map((s) => renderSeccion(s))
          ) : (
            <div className="no-data">
              <p>No hay registros académicos disponibles.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
