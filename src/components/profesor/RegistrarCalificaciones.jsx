import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaseLista.css";
import "./Profesor.css";
import { ProfesorLayout } from "./ProfesorLayout";
import { ProfeSideBar } from "./ProfeSidebar";

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

    // Validar que todos los alumnos con asistencia suficiente tengan calificación
    const alumnosSinAsistencia = alumnos.filter(al => !al.tieneAsistenciaSuficiente);
    
    if (alumnosSinAsistencia.length > 0) {
      const nombres = alumnosSinAsistencia
        .map(al => `${al.ape_paterno} ${al.ape_materno} ${al.nombre}`)
        .join(', ');
      
      const confirmar = window.confirm(
        `Los siguientes alumnos no tienen el 80% de asistencia requerido y no se les podrá registrar calificación:\n\n${nombres}\n\n¿Deseas continuar?`
      );
      
      if (!confirmar) return;
    }

    const dataEnviar = Object.entries(calificaciones)
      .filter(([id_alumno]) => {
        const alumno = alumnos.find(al => al.id === id_alumno);
        return alumno && alumno.tieneAsistenciaSuficiente;
      })
      .map(([id_alumno, calificacion]) => ({
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
            <th>Asistencia</th>
            <th>Calificación</th>
          </tr>
        </thead>

        <tbody>
          {alumnos.length === 0 ? (
            <tr>
              <td colSpan={3} className="pase-empty">
                No hay alumnos.
              </td>
            </tr>
          ) : (
            alumnos.map((alumno) => (
              <tr key={alumno.id} style={{ 
                backgroundColor: !alumno.tieneAsistenciaSuficiente ? '#ffebee' : 'transparent' 
              }}>
                <td>
                  {alumno.ape_paterno} {alumno.ape_materno} {alumno.nombre}
                </td>
                <td style={{ 
                  color: alumno.tieneAsistenciaSuficiente ? '#4caf50' : '#f44336',
                  fontWeight: 'bold'
                }}>
                  {alumno.porcentajeAsistencia}%
                  {!alumno.tieneAsistenciaSuficiente && (
                    <span style={{ display: 'block', fontSize: '0.85em', fontWeight: 'normal' }}>
                      (Mínimo 80%)
                    </span>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={calificaciones[alumno.id] ?? ""}  
                    onChange={(e) =>
                      handleChange(alumno.id, e.target.value)
                    }
                    disabled={!alumno.tieneAsistenciaSuficiente}
                    title={!alumno.tieneAsistenciaSuficiente ? 
                      'No se puede registrar calificación sin el 80% de asistencia' : ''}
                    style={{
                      backgroundColor: !alumno.tieneAsistenciaSuficiente ? '#f5f5f5' : 'white',
                      cursor: !alumno.tieneAsistenciaSuficiente ? 'not-allowed' : 'text'
                    }}
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
