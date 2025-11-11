import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./ProfesorLayout.css";
import ipnLogo from "../../assets/ipn.png";

export function ProfesorLayout({ children, profesorId: propProfesorId }) {
  const params = useParams();
  const location = useLocation();

  // Id del profesor: viene por prop o por la URL /profesor/:id
  const profesorId = propProfesorId ?? params.id;

  const base = profesorId ? `/profesor/${profesorId}` : "/profesor";

  const inicioUrl = base;
  const gruposUrl = `${base}/clases`;
  const horarioUrl = `${base}/horario`;
  const chatUrl = `${base}/chat`;
  const infoUrl = `${base}/info`;
  const califUrl = `${base}/calificaciones`;

  const { pathname } = location;

  const isInicioActive =
    pathname === inicioUrl || pathname === `/profesor/${profesorId}`;
  const isGruposActive =
    pathname.includes("/clases") || pathname.includes("/PaseLista");
  const isHorarioActive = pathname.includes("/horario");
  const isChatActive = pathname.includes("/chat");
  const isInfoActive =
    pathname.includes("/info") ||
    pathname.toLowerCase().includes("informacion");
  const isCalifActive = pathname.includes("/calificaciones");

  return (
    <div className="profesor-layout">
      {/* SIDEBAR IZQUIERDO */}
      <aside className="profesor-sidebar">
        {/* Logo IPN + texto Gestión Escolar */}
        <div className="profesor-logo">
          <img src={ipnLogo} alt="IPN" className="profesor-logo-img" />
          <div className="profesor-logo-text">
            <span>Gestión</span>
            <span>Escolar</span>
          </div>
        </div>

        <div className="profesor-sidebar-separator" />

        {/* Menú */}
        <nav className="profesor-menu">
          <Link
            to={inicioUrl}
            className={`profesor-menu-item ${
              isInicioActive ? "active" : ""
            }`}
          >
            Inicio
          </Link>

          <Link
            to={gruposUrl}
            className={`profesor-menu-item ${
              isGruposActive ? "active" : ""
            }`}
          >
            Grupos asignados
          </Link>

          <Link
            to={horarioUrl}
            className={`profesor-menu-item ${
              isHorarioActive ? "active" : ""
            }`}
          >
            Horario
          </Link>

          <Link
            to={chatUrl}
            className={`profesor-menu-item ${
              isChatActive ? "active" : ""
            }`}
          >
            Asistente de Chat
          </Link>

          <Link
            to={infoUrl}
            className={`profesor-menu-item ${
              isInfoActive ? "active" : ""
            }`}
          >
            Información Personal
          </Link>

          <Link
            to={califUrl}
            className={`profesor-menu-item ${
              isCalifActive ? "active" : ""
            }`}
          >
            Calificaciones
          </Link>
        </nav>

        {/* Cerrar sesión */}
        <button
          type="button"
          className="profesor-logout"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="profesor-main">
        <div className="profesor-main-inner">{children}</div>
      </main>
    </div>
  );
}

export default ProfesorLayout;
