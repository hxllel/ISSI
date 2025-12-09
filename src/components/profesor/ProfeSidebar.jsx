import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./SideBar.css";

export function ProfeSideBar() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // ===== Toggle sidebar =====
  const STORAGE_KEY = "saesr_sidebar_profe_open";
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? true : saved === "1";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
  }, [open]);

  const closeIfMobile = useCallback(() => {
    if (window.innerWidth <= 768) setOpen(false);
  }, []);

  // ===== Tu lógica existente =====
  const periodo = location.state?.periodo || localStorage.getItem("periodo");
  useEffect(() => {
    if (location.state?.periodo) localStorage.setItem("periodo", location.state.periodo);
  }, [location.state]);

  const finalId = useMemo(() => {
    return location.state?.profesorId || params.id || localStorage.getItem("profesorId") || null;
  }, [location, params]);

  useEffect(() => {
    if (finalId) localStorage.setItem("profesorId", finalId);
  }, [finalId]);

  const go = (path, state) => {
    closeIfMobile();
    navigate(path, state ? { state } : undefined);
  };

  const handleInicio = () => {
    if (finalId) go(`/profesor/${finalId}`, { profesorId: finalId, fromSidebar: true });
    else go("/profesor");
  };

  const handleClases = () =>
    go(`/profesor/${finalId}/clases`, { profesorId: finalId, fromSidebar: true });

  const handleETS = () =>
    go(`/profesor/${finalId}/ets`, { profesorId: finalId, fromSidebar: true });

  const handleChat = () =>
    go(`/profesor/Chat`, { profesorId: finalId, tipo_usuario: "profesor", fromSidebar: true });

  const handleInfoPersonal = () =>
    go(`/profesor/informacionPersonal/${finalId}`, { profesorId: finalId, fromSidebar: true });

  const handleEvaluacion = () =>
    go(`/profesor/${finalId}/evaluacion`, { profesorId: finalId, fromSidebar: true });

  const handleLogout = () => {
    setOpen(false);
    navigate(`/`);
  };

  return (
    <>
      {!open && (
        <button className="sidebar-fab" onClick={() => setOpen(true)}>
          ☰
        </button>
      )}

      <aside className={`sidebar ${open ? "is-open" : "is-closed"}`}>
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
          <button onClick={handleInicio} className="menu-item">
            Inicio
          </button>

          <button className="menu-item" onClick={handleClases}>
            Clases Impartidas
          </button>

          <button className="menu-item" onClick={handleETS}>
            ETS
          </button>

          <button className="menu-item" onClick={handleChat}>
            Asistente de Chat
          </button>

          <button className="menu-item" onClick={handleInfoPersonal}>
            Información Personal
          </button>

          <button className="menu-item" onClick={handleEvaluacion}>
            Evaluación Docente
          </button>

          {/* si luego reactivas estas rutas, aquí van:
          <button className="menu-item" onClick={() => go(`/profesor/PaseLista/${finalId}`)}>Pase de Lista</button>
          <button className="menu-item" onClick={() => go(`/profesor/RegistrarCalificaciones/${finalId}/${periodo}`)}>Calificaciones</button>
          */}
        </nav>

        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <button className={`sidebar-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
    </>
  );
}
