import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

export function AdminSidebar({ activeRoute = "panel" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <div className="logo">
        <img src="/ipn.png" alt="Logo IPN" className="logo-img" />
        <span>SAES-R</span>
      </div>

      <nav className="menu">
        <button
          onClick={() => navigate("/administrador")}
          className={`menu-item ${activeRoute === "panel" ? "active" : ""}`}
        >
          Panel de Control
        </button>
        <button
          onClick={() => navigate("/administrador/gestionarAlumnos")}
          className={`menu-item ${activeRoute === "estudiantes" ? "active" : ""}`}
        >
          Estudiantes
        </button>
        <button
          onClick={() => navigate("/administrador/gestionarProfesores")}
          className={`menu-item ${activeRoute === "profesores" ? "active" : ""}`}
        >
          Profesores
        </button>
        <button
          onClick={() => navigate("/administrador/gestionarCursos")}
          className={`menu-item ${activeRoute === "cursos" ? "active" : ""}`}
        >
          Cursos
        </button>
        <button
          onClick={() => navigate("/administrador/carreras")}
          className={`menu-item ${activeRoute === "carreras" ? "active" : ""}`}
        >
          Carreras
        </button>
        <button
          onClick={() => navigate("/administrador/unidades")}
          className={`menu-item ${activeRoute === "unidades" ? "active" : ""}`}
        >
          Unidades
        </button>
        <button
          onClick={() => navigate("/administrador/ETS")}
          className={`menu-item ${activeRoute === "ets" ? "active" : ""}`}
        >
          ETS
        </button>
        <button
          onClick={() => navigate("/administrador/publicarNoticia")}
          className={`menu-item ${activeRoute === "noticias" ? "active" : ""}`}
        >
          Publicar Noticia
        </button>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
