import React, { useEffect, useState, useCallback, useMemo } from "react";
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
    // IMPORTANTE: ya no movemos el layout con body.sidebar-open (drawer overlay)
  }, [open]);

  const closeIfMobile = useCallback(() => {
    if (window.innerWidth <= 768) setOpen(false);
  }, []);

  // ⭐⭐⭐ ID universal: URL → state → localStorage
  const id = useMemo(() => {
    const fromUrl = params.id;
    const fromState = location.state?.alumnoId;
    const fromStorage = localStorage.getItem("alumno_id");

    const finalId = fromUrl || fromState || fromStorage;

    // Guardamos solo si viene uno nuevo
    if (finalId && finalId !== fromStorage) {
      localStorage.setItem("alumno_id", finalId);
    }

    return finalId;
  }, [params.id, location.state]);

  // Función de seguridad para evitar errores
  const safeNavigate = (path, state = null) => {
    if (!id) {
      alert("⚠ No se pudo obtener tu ID. Inicia sesión nuevamente.");
      return navigate("/");
    }
    closeIfMobile();
    navigate(path, state ? { state } : undefined);
  };

  // Handlers
  const handleIns = () => safeNavigate(`/alumno/inscripcion/${id}`);
  const handleHorarios = () => safeNavigate(`/alumno/horarios/${id}`);
  const handleKardex = () =>
    safeNavigate(`/alumno/Kardex`, { alumnoId: id });
  const handleChat = () =>
    safeNavigate(`/alumno/Chat`, { alumnoId: id });
  const handleMatRe = () =>
    safeNavigate(`/alumno/MateriasReprobadas`, { alumnoId: id });
  const handleEvaluacion = () => safeNavigate(`/alumno/evaluacion/${id}`);
  const handleEditPer = () => safeNavigate(`/alumno/datosPersonales/${id}`);
  const handleCalif = () =>
    safeNavigate(`/alumno/ConsultarCalificaciones`, { alumnoId: id });
  const handleCono = () => safeNavigate(`/alumno/conocenosAlumno`);
  const handleDetalle = () => safeNavigate(`/alumno/resenas-profesor/${id}`);
  const handleMapas = () =>
    safeNavigate(`/alumno/MapasCurriculares`, { alumnoId: id });

  const handleLogout = () => {
    localStorage.removeItem("alumno_id");
    setOpen(false);
    navigate(`/`);
  };

  return (
    <>
      {!open && (
        <div className="sidebar-topbar">
          <button
            className="sidebar-topbar-btn"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-controls="saesr-alumno-sidebar"
            aria-expanded={open}
            type="button"
          >
            ☰
          </button>
        </div>
      )}

      <aside
        id="saesr-alumno-sidebar"
        className={`sidebar ${open ? "is-open" : "is-closed"}`}
      >
        <div className="sidebar-header">
          <div className="logo">
            <img src="/ipn.png" alt="Logo" className="logo-img" />
            <span>SAES-R</span>
          </div>

          <button className="sidebar-close" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="menu">
          <button
            className={`menu-item ${isActive(`/alumno/${id}`) ? "active" : ""}`}
            onClick={() => safeNavigate(`/alumno/${id}`)}
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

          <button className={`menu-item ${isActive("/alumno/conocenosAlumno") ? "active" : ""}`} onClick={handleCono}>
            Conocenos
          </button>

          <button
            className={`menu-item ${isActive("/alumno/mapas-curriculares") ? "active" : ""}`}
            onClick={handleMapas}
          >
            Mapas Curriculares
          </button>

          <Link to="/reglamentos" className="menu-item">
            Reglamentos
          </Link>
        </nav>

        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <button className={`sidebar-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
    </>
  );
}
