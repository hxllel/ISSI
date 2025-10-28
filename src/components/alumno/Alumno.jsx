import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alumno.css";

export function Alumno() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [alumno, setAlumno] = useState(null);

    useEffect(() => {
  fetch(`http://localhost:4000/ObtenerAlumno/${id}`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      // data.alumno es el objeto que quieres
      setAlumno(data.alumno || null);
    })
    .catch(() => setAlumno(null));
}, [id]);



  const handleIns = () => {navigate(`/alumno/inscripcion/${id}`);};
  const handleEditPer = () => {navigate(`/alumno/editarDatos/${id}`);};
    const handleHorarios = () => {navigate(`/alumno/horarios/${id}`);};

  return (
    <div className="alumno-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate(`/alumno/${id}`)} className="menu-item active">
            Inicio
          </button>
          <button className="menu-item"  onClick={handleIns}>Inscribir Materias </button>
          <button className="menu-item" onClick={handleHorarios}>Horarios</button>
          <button className="menu-item">Kardex</button>
          <button className="menu-item">Asistente de Chat</button>
          <button className="menu-item" onClick={handleEditPer}>Información Personal</button>
        </nav>
        <button className="logout">Cerrar sesión</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="alumno-header">
          <div>
    {alumno ? (
      <>
        <h2>¡Bienvenido {alumno.nombre} {alumno.ape_paterno} {alumno.ape_materno}!</h2>
        <p>Boleta: {alumno.id}</p>
      </>
    ) : (
      <p>Cargando alumno...</p>
    )}
  </div>
          
        </header>

        <section className="horario-section">
          <h2>Horario Semanal</h2>
          <table className="horario-table">
            <thead>
              <tr>
                <th>Profesor</th>
                <th>Materia</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. Ricardo Pérez</td>
                <td>Cálculo Diferencial</td>
                <td><span className="horario">09:00 - 10:30</span></td>
                <td></td>
                <td><span className="horario">09:00 - 10:30</span></td>
                <td></td>
                <td><span className="horario">09:00 - 10:30</span></td>
              </tr>
              <tr>
                <td>Mtra. Ana García</td>
                <td>Programación Orientada a Objetos</td>
                <td></td>
                <td><span className="horario">11:00 - 13:00</span></td>
                <td></td>
                <td><span className="horario">11:00 - 13:00</span></td>
                <td></td>
              </tr>
              <tr>
                <td>Lic. Luis Hernández</td>
                <td>Historia Universal Moderna</td>
                <td><span className="horario">14:00 - 15:30</span></td>
                <td></td>
                <td><span className="horario">14:00 - 15:30</span></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Dra. Laura Rojas</td>
                <td>Física Clásica</td>
                <td><span className="horario">09:00 - 10:30</span></td>
                <td></td>
                <td></td>
                <td><span className="horario">09:00 - 10:30</span></td>
                <td><span className="horario">09:00 - 10:30</span></td>
              </tr>
              <tr>
                <td>Mtro. Carlos Salazar</td>
                <td>Electrónica Analógica</td>
                <td><span className="horario">11:00 - 13:00</span></td>
                <td></td>
                <td><span className="horario">11:00 - 13:00</span></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="boton-container">
            <button className="comprobante-btn">
              Solicitar comprobante de horario
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
