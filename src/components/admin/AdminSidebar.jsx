import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./SideBar.css";

export function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const STORAGE_KEY = "saesr_sidebar_admin_open";
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

  const go = (path, state) => {
    closeIfMobile();
    navigate(path, state ? { state } : undefined);
  };

  const sharedState = { fromSidebar: true };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      {!open && (
        <div>
          <button
            className="sidebar-topbar-btn"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-controls="saesr-admin-sidebar"
            aria-expanded={open}
            type="button"
          >
            ☰
          </button>
        </div>
      )}

      <aside
        id="saesr-admin-sidebar"
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
          <button className="menu-item" onClick={() => go("/administrador", sharedState)}>
            Inicio
          </button>

          <button className="menu-item" onClick={() => go("/administrador/gestionarAlumnos", sharedState)}>
            Gestionar Alumnos
          </button>

          <button className="menu-item" onClick={() => go("/administrador/gestionarProfesores", sharedState)}>
            Gestionar Profesores
          </button>

          <button className="menu-item" onClick={() => go("/administrador/gestionarCursos", sharedState)}>
            Gestionar Cursos
          </button>

          <button className="menu-item" onClick={() => go("/administrador/ETS", sharedState)}>
            ETS
          </button>

          <button className="menu-item" onClick={() => go("/administrador/publicarNoticia", sharedState)}>
            Publicar Noticia
          </button>

          <button className="menu-item" onClick={() => go("/administrador/carreras", sharedState)}>
            Carreras
          </button>

          <button className="menu-item" onClick={() => go("/administrador/unidades", sharedState)}>
            Unidades
          </button>

          <button className="menu-item" onClick={() => go("/administrador/Fechas", sharedState)}>
            Configuración de Fechas
          </button>

          <button className="menu-item" onClick={() => go("/administrador/SituacionesEspeciales", sharedState)}>
            Situaciones Especiales
          </button>
        </nav>

        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

<button
  className={`sidebar-overlay ${open ? "show" : ""}`}
  onClick={() => setOpen(false)}
  aria-hidden="true"
/>

    </>
  );
}
