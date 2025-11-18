import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaseLista.css";
import "./Profesor.css";
import { ProfesorLayout } from "./ProfesorLayout";

export function RegistrarCalificaciones() {
  const API = "http://localhost:4000";
  const [alumnos, setAlumnos] = useState([]);
  const [profesorId, setProfesorId] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);
  const [cal, setCal] = useState([]);
  const { id, periodo } = useParams();
  const navigate = useNavigate();   

 useEffect(() => {
  fetch(`${API}/CalificacionesGuardadas/${id}/${periodo}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // Seteamos alumnos
        setAlumnos(data.alumnos);

        // Construimos calificaciones iniciales si ya hay guardadas
        const califs = {};

        data.alumnos.forEach((al) => {
          // Si la calificación guardada es null, dejamos vacío
          califs[al.id] = al.calificacion !== null ? al.calificacion : "";
        });

        setCalificaciones(califs);
      }
    })
    .catch((err) =>
      console.error("Error al obtener las calificaciones guardadas", err)
    );
}, [id, periodo]);

  const handleReg =()=>{
    navigate(`/profesor/${profesorId}`);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const dataEnviar = Object.entries(calificaciones).map(
      ([id_alumno, calificacion]) =>({
        id_alumno,
        calificacion
      }));

      fetch(`${API}/RegistrarCalificaciones/${id}/${periodo}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },  
        
        credentials: "include",
        body: JSON.stringify({calificaciones: dataEnviar}),
      }).then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Calificaciones guardadas correctamente");
          navigate(`/profesor/${data.profe}`);
        } else {
          alert("Error al registrar calificaciones");
        }
      })
      .catch((err) => console.error("Error al registrar calificaciones", err));
  };

  const handleChange = (id_alumno, calificacion) =>{
    setCalificaciones((prev) =>({
      ...prev, 
      [id_alumno]: calificacion,

    }));
  };

  return (
  <ProfesorLayout profesorId={profesorId}>
  <div className="prof-page-header">
    <h1 className="prof-page-title">Registrar Calificaciones</h1>
    <div className="prof-page-header-right">
      <img src="/escom.png" alt="ESCOM" className="prof-page-escom-logo" />
    </div>
  </div>

  <section className="prof-card pase-card">
    <form onSubmit={handleSubmit}>
      <table className="prof-table pase-table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Calificación</th>
          </tr>
        </thead>

        <tbody>
          {alumnos.length === 0 ? (
            <tr>
              <td colSpan={2} className="pase-empty">
                No hay alumnos.
              </td>
            </tr>
          ) : (
            alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>
                  {alumno.ape_paterno} {alumno.ape_materno} {alumno.nombre}
                </td>
                <td>
                  <input
                    type="number"
                    value={calificaciones[alumno.id] ?? ""}  
                    onChange={(e) =>
                      handleChange(alumno.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="prof-actions">
      {alumnos.length === 0 ? 
      (<button className="prof-btn-primary" onClick={handleReg}>Regresar</button>
      ) : (
      <button type="submit" className="prof-btn-primary">
          Registrar
        </button>)}
      
        
      </div>
    </form>
  </section>
</ProfesorLayout>

  );
}
