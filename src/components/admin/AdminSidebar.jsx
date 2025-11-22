import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

export function AdminSidebar() {
  const navigate = useNavigate();

  // Handlers de navegación - ADMIN
  const handleGestionarAlumnos = () => navigate("/administrador/gestionarAlumnos");
  const handleGestionarProfesores = () => navigate("/administrador/gestionarProfesores");
  const handleGestionarCursos = () => navigate("/administrador/gestionarCursos");
  const handleETS = () => navigate("/administrador/ETS");
  const handlePublicarNoticia = () => navigate("/administrador/publicarNoticia");
  const handleCarreras = () => navigate("/administrador/carreras");
  const handleUnidades = () => navigate("/administrador/unidades");
  const handleDatosMedicos = () => navigate("/administrador/datosMedicos");
  const handleLogout = () => navigate("/");

  // Aquí agrego un objeto state común que quieras mandar
  const sharedState = { fromSidebar: true };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/ipn.png" alt="Logo" className="logo-img" />
        <span>SAES-R</span>
      </div>

      <nav className="menu">

        {/* Inicio */}
        <button
          onClick={() => navigate("/administrador", { state: sharedState })}
          className="menu-item"
        >
          Inicio
        </button>

        {/* Mantengo los handlers pero paso state desde el botón */}
        <button
          className="menu-item"
          onClick={() => {
            handleGestionarAlumnos();
            navigate("/administrador/gestionarAlumnos", { state: sharedState });
          }}
        >
          Gestionar Alumnos
        </button>

        <button
          className="menu-item"
          onClick={() => {
            handleGestionarProfesores();
            navigate("/administrador/gestionarProfesores", { state: sharedState });
          }}
        >
          Gestionar Profesores
        </button>

        <button
          className="menu-item"
          onClick={() => {
            handleGestionarCursos();
            navigate("/administrador/gestionarCursos", { state: sharedState });
          }}
        >
          Gestionar Cursos
        </button>

        <button
          className="menu-item"
          onClick={() => {
            handleETS();
            navigate("/administrador/ETS", { state: sharedState });
          }}
        >
          ETS
        </button>

        <button
          className="menu-item"
          onClick={() => {
            handlePublicarNoticia();
            navigate("/administrador/publicarNoticia", { state: sharedState });
          }}
        >
          Publicar Noticia
        </button>

        <button
          className="menu-item"
          onClick={() => {
            handleCarreras();
            navigate("/administrador/carreras", { state: sharedState });
          }}
        >
          Carreras
        </button>

        <button
          className="menu-item"
          onClick={() => {
            handleUnidades();
            navigate("/administrador/unidades", { state: sharedState });
          }}
        >
          Unidades
        </button>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
