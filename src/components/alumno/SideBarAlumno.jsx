import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import "./SideBar.css";


export function SidebarAlumno() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const STORAGE_KEY = "saesr_sidebar_alumno_open";
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? true : saved === "1";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
  }, [open]);

  const closeIfMobile = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) setOpen(false);
  }, []);

  // El ID viene de params o de state
  const id = params.id || location.state?.alumnoId;

  // Handlers de navegación
  const handleIns = () => { navigate(`/alumno/inscripcion/${id}`); closeIfMobile(); };
  const handleHorarios = () => { navigate(`/alumno/horarios/${id}`); closeIfMobile(); };
  const handleKardex = () => { navigate(`/alumno/Kardex`, { state: { alumnoId: id } }); closeIfMobile(); };
  const handleChat = () => { navigate(`/alumno/Chat`, { state: { alumnoId: id } }); closeIfMobile(); };
  const handleMatRe = () => { navigate(`/alumno/MateriasReprobadas`, { state: { alumnoId: id } }); closeIfMobile(); };
  const handleEvaluacion = () => { navigate(`/alumno/evaluacion/${id}`); closeIfMobile(); };
  const handleEditPer = () => { navigate(`/alumno/datosPersonales/${id}`); closeIfMobile(); };
  const handleCalif = () => { navigate(`/alumno/ConsultarCalificaciones`, { state: { alumnoId: id } }); closeIfMobile(); };
  const handleCono = () => { navigate(`/alumno/conocenosAlumno`); closeIfMobile(); };
  const handleDetalle = () => { navigate(`/alumno/resenas-profesor/${id}`); closeIfMobile(); };
  const handleResena = () => { navigate(`/alumno/resenar-profesores`); closeIfMobile(); };
  const handleMapas = () => navigate(`/alumno/MapasCurriculares`, { state: { alumnoId: id } });

  const handleLogout = () => { setOpen(false); navigate(`/`); };

  return (
    <>
      {!open && (
        <button className="sidebar-fab" onClick={() => setOpen(true)} aria-label="Mostrar menú">
          ☰
        </button>
      )}

      <aside className={`sidebar ${open ? "is-open" : "is-closed"}`} aria-hidden={!open}>
        <div className="sidebar-header">
          <div className="logo">
            <img src="/ipn.png" alt="Logo" className="logo-img" />
            <span>SAES-R</span>
          </div>

          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Ocultar sidebar">
            ✕
          </button>
        </div>

        <nav className="menu">
          <button
            className={`menu-item ${isActive(`/alumno/${id}`) ? " active" : ""}`}
            onClick={() => { navigate(`/alumno/${id}`); closeIfMobile(); }}
          >
            Inicio
          </button>

          <button className={`menu-item ${isActive("/alumno/inscripcion") ? "active" : ""}`} onClick={handleIns}>
            Inscribir Materias
          </button>

          <button className={`menu-item ${isActive("/alumno/horarios") ? "active" : ""}`} onClick={handleHorarios}>
            Horarios
          </button>

          <button className={`menu-item ${isActive("/alumno/Kardex") ? "active" : ""}`} onClick={handleKardex}>
            Kardex
          </button>

          <button className={`menu-item ${isActive("/alumno/Chat") ? "active" : ""}`} onClick={handleChat}>
            Asistente de Chat
          </button>

          <button
            className={`menu-item ${isActive("/alumno/MateriasReprobadas") ? "active" : ""}`}
            onClick={handleMatRe}
          >
            Materias Reprobadas
          </button>

          <button className={`menu-item ${isActive("/alumno/evaluacion") ? "active" : ""}`} onClick={handleEvaluacion}>
            Evaluación de Profesores
          </button>

          <button className={`menu-item ${isActive("/alumno/datosPersonales") ? "active" : ""}`} onClick={handleEditPer}>
            Información Personal
          </button>

          <button
            className={`menu-item ${isActive("/alumno/ConsultarCalificaciones") ? "active" : ""}`}
            onClick={handleCalif}
          >
            Consultar Calificaciones
          </button>
          <button
            className={`menu-item ${isActive("/alumno/conocenosAlumno") ? "active" : ""}`}
            onClick={handleCono}
          >
            Conocenos
          </button>
          <button
            className={`menu-item ${isActive("/alumno/resenas-profesor/:id") ? "active" : ""}`}
            onClick={handleDetalle}
          >
            Reseñas profesores
          </button>
          
          <button
          className={`menu-item ${
            isActive("/alumno/mapas-curriculares") ? "active" : ""
          }`}
          onClick={handleMapas}
        >
          Mapas Curriculares
        </button>
        <Link to="/reglamentos">Reglamentos</Link>

        </nav>

        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <button className={`sidebar-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} aria-label="Cerrar menú" />
    </>
  );
}
