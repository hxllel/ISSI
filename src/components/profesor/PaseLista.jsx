// PaseLista.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaseLista.css";
import "./Profesor.css";
import { ProfesorLayout } from "./ProfesorLayout";

export function PaseLista() {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState({});
  const [profesorId, setProfesorId] = useState(null);
  const API = "http://localhost:4000";

  const { idGrupo } = useParams(); // Cambiado de 'id' a 'idGrupo' para claridad
  const navigate = useNavigate();

  useEffect(() => {
    // Intentar obtener el profesorId del sessionStorage
    const savedProfesorId = sessionStorage.getItem('currentProfesorId');
    if (savedProfesorId) {
      setProfesorId(savedProfesorId);
    }

    fetch(`${API}/AlumnosInscritos/${idGrupo}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAlumnos(data.alumnos);
          if (data.profe) {
            setProfesorId(data.profe);
            sessionStorage.setItem('currentProfesorId', data.profe);
          }
        } else {
          alert("Ya no puede pasar lista del día de hoy");
          if (data.profe) {
            navigate(`/profesor/${data.profe}`);
          } else if (savedProfesorId) {
            navigate(`/profesor/${savedProfesorId}`);
          }
        }
      })
      .catch((err) => console.error("Error al obtener los alumnos", err));
  }, [idGrupo, navigate]);

  const handleSelectChange = (idAlumno, valor) => {
    setAsistencias((prev) => ({
      ...prev,
      [idAlumno]: valor,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataEnviar = Object.entries(asistencias).map(
      ([id_alumno, asistencia]) => ({
        id_alumno,
        asistencia,
      })
    );

    fetch(`${API}/GuardarAsistencias/${idGrupo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ grupo: idGrupo, asistencias: dataEnviar }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          const profId = data.profe || profesorId || sessionStorage.getItem('currentProfesorId');
          if (profId) {
            navigate(`/profesor/${profId}`);
          }
        }
      })
      .catch((err) => console.error("Error al enviar asistencias:", err));
  };

  return (
    <ProfesorLayout profesorId={profesorId}>
      {/* Encabezado de página tipo "Asistente de chat de IA" */}
      <div className="prof-page-header">
        <h1 className="prof-page-title">Pase de lista del grupo</h1>
        <div className="prof-page-header-right">
          <img
            src="/escom.png"
            alt="ESCOM"
            className="prof-page-escom-logo"
          />
        </div>
      </div>

      {/* Card con la tabla de alumnos */}
      <section className="prof-card pase-card">
        <form onSubmit={handleSubmit}>
          <table className="prof-table pase-table">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.length === 0 ? (
                <tr>
                  <td colSpan={2} className="pase-empty">
                    No hay alumnos inscritos en este grupo.
                  </td>
                </tr>
              ) : (
                alumnos.map((alumno) => (
                  <tr key={alumno.id}>
                    <td>
                      {alumno.ape_paterno} {alumno.ape_materno}{" "}
                      {alumno.nombre}
                    </td>
                    <td>
                      <select
                        className="pase-select"
                        value={asistencias[alumno.id] || ""}
                        onChange={(e) =>
                          handleSelectChange(alumno.id, e.target.value)
                        }
                      >
                        <option value="">Seleccione una opción</option>
                        <option value="Si">Asistencia</option>
                        <option value="No">Inasistencia</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="prof-actions">
            <button type="submit" className="prof-btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </section>
    </ProfesorLayout>
  );
}
