import React from "react";
import { useNavigate } from "react-router-dom";
import "./AlumnoSidebar.css";

export function AlumnoSidebar({ alumnoId, activeRoute = "inicio" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Agregar lógica de logout (limpiar sesión)
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/ipn.png" alt="Logo IPN" className="logo-img" />
        <span>SAES-R</span>
      </div>

      <nav className="menu">
        <button
          onClick={() => navigate(`/alumno/${alumnoId}`)}
          className={`menu-item ${activeRoute === "inicio" ? "active" : ""}`}
        >
          Inicio
        </button>
        <button
          onClick={() => navigate(`/alumno/inscripcion/${alumnoId}`)}
          className={`menu-item ${activeRoute === "inscripcion" ? "active" : ""}`}
        >
          Inscribir Materias
        </button>
        <button
          onClick={() => navigate(`/alumno/horarios/${alumnoId}`)}
          className={`menu-item ${activeRoute === "horarios" ? "active" : ""}`}
        >
          Horarios
        </button>
        <button
          onClick={() => navigate(`/alumno/Kardex/${alumnoId}`)}
          className={`menu-item ${activeRoute === "kardex" ? "active" : ""}`}
        >
          Kardex
        </button>
        <button
          onClick={() => navigate(`/alumno/Chat/${alumnoId}`)}
          className={`menu-item ${activeRoute === "chat" ? "active" : ""}`}
        >
          Asistente de Chat
        </button>
        <button
          onClick={() => navigate(`/alumno/MateriasReprobadas/${alumnoId}`)}
          className={`menu-item ${activeRoute === "materias-reprobadas" ? "active" : ""}`}
        >
          Materias Reprobadas
        </button>
        <button
          onClick={() => navigate(`/alumno/evaluacion/${alumnoId}`)}
          className={`menu-item ${activeRoute === "evaluacion" ? "active" : ""}`}
        >
          Evaluación de Profesores
        </button>
        <button
          onClick={() => navigate(`/alumno/editarDatos/${alumnoId}`)}
          className={`menu-item ${activeRoute === "editar-datos" ? "active" : ""}`}
        >
          Información Personal
        </button>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
