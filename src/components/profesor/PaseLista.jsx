// PaseLista.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaseLista.css";
import "./ProfesorLayout.css";
import { ProfesorLayout } from "./ProfesorLayout";

export function PaseLista() {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState({});
  const [profesorId, setProfesorId] = useState(null);

  const { id } = useParams(); // id del grupo
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/AlumnosInscritos/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAlumnos(data.alumnos);
          if (data.profe) {
            setProfesorId(data.profe);
          }
        } else {
          alert("Ya no puede pasar lista del día de hoy");
          if (data.profe) {
            navigate(`/profesor/${data.profe}`);
          }
        }
      })
      .catch((err) => console.error("Error al obtener los alumnos", err));
  }, [id, navigate]);

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

    fetch(`http://localhost:4000/GuardarAsistencias/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ grupo: id, asistencias: dataEnviar }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          navigate(`/profesor/${data.profe}`);
        }
      })
      .catch((err) => console.error("Error al enviar asistencias:", err));
  };

  return (
    <ProfesorLayout profesorId={profesorId}>
      {/* Encabezado de página tipo "Asistente de chat de IA" */}
      <div className="chat-header">
        <h1>Pase de lista del grupo</h1>
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
            <button type="submit" className="btn azul">
              Guardar
            </button>
          </div>
        </form>
      </section>
    </ProfesorLayout>
  );
}
