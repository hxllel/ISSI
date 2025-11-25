import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./SideBar.css";

export function ProfeSideBar() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // Intentamos obtener el id por (1) location.state, (2) params, (3) localStorage
  const finalId = useMemo(() => {
    return location.state?.profesorId || params.id || localStorage.getItem("profesorId") || null;
  }, [location, params]);

  // Si encontramos finalId, lo persistimos
  useEffect(() => {
    if (finalId) {
      localStorage.setItem("profesorId", finalId);
    }
  }, [finalId]);

  // Handlers de navegación - PROFESOR (AHORA USAN finalId y pasan state correctamente)
  const handleClases = () => {
    const ruta = `/profesor/${finalId}/clases`;
    navigate(ruta, { state: { profesorId: finalId, fromSidebar: true } });
  };

  const handleChat = () => {
    // Ruta de chat no tiene :id en la URL en tu diseño original,
    // así que pasamos el id por state (si existe)
    navigate(`/profesor/Chat`, { state: { profesorId: finalId, fromSidebar: true } });
  };

  const handleInfoPersonal = () => {
    const ruta = `/profesor/informacionPersonal/${finalId}`;
    navigate(ruta, { state: { profesorId: finalId, fromSidebar: true } });
  };

  const handleInicio = () => {
    const ruta = `/profesor/${finalId || ""}`;
    // si no hay finalId, igual navegamos a /profesor/ (o /profesor/undefined sería malo)
    if (finalId) navigate(ruta, { state: { profesorId: finalId, fromSidebar: true } });
    else navigate("/profesor");
  };

  const handleETS = () => {
    const ruta = `/profesor/${finalId}/ets`;
    navigate(ruta, { state: { profesorId: finalId, fromSidebar: true } });
  };

  const handleLogout = () => navigate(`/`);

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/ipn.png" alt="Logo" className="logo-img" />
        <span>SAES-R</span>
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
      </nav>

      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
