import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./SideBar.css";

export function ProfeSideBar() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // Obtener periodo
  const periodo = location.state?.periodo || localStorage.getItem("periodo");

  useEffect(() => {
    if (location.state?.periodo) {
      localStorage.setItem("periodo", location.state.periodo);
    }
  }, [location.state]);

  // Obtener ID del profesor (state → params → localStorage)
  const finalId = useMemo(() => {
    return (
      location.state?.profesorId ||
      params.id ||
      localStorage.getItem("profesorId") ||
      null
    );
  }, [location, params]);

  // Persistir ID si existe
  useEffect(() => {
    if (finalId) {
      localStorage.setItem("profesorId", finalId);
    }
  }, [finalId]);

  // -------------------------
  // NAVEGACIÓN — SIEMPRE PASA EL ID CORRECTO
  // -------------------------

  const handleClases = () => {
    navigate(`/profesor/${finalId}/clases`, {
      state: { profesorId: finalId, fromSidebar: true },
    });
  };

  const handleChat = () => {
    navigate(`/profesor/Chat`, {
      state: {
        profesorId: finalId,
        tipo_usuario: "profesor",
        fromSidebar: true,
      },
    });
  };

  const handleInfoPersonal = () => {
    navigate(`/profesor/informacionPersonal/${finalId}`, {
      state: { profesorId: finalId, fromSidebar: true },
    });
  };

  const handleInicio = () => {
    if (finalId) {
      navigate(`/profesor/${finalId}`, {
        state: { profesorId: finalId, fromSidebar: true },
      });
    } else {
      navigate("/profesor");
    }
  };

  const handleETS = () => {
    navigate(`/profesor/${finalId}/ets`, {
      state: { profesorId: finalId, fromSidebar: true },
    });
  };
  const handlePase = () => {navigate(`/profesor/PaseLista/${finalId}`)}
  const handleCalificaciones = () => {navigate(`/profesor/RegistrarCalificaciones/${finalId}/${periodo}`)}
  

  const handleLogout = () => {
    navigate(`/`);
  };

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
