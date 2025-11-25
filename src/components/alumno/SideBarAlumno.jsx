import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./SideBar.css";

export function SidebarAlumno() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);


  // El ID viene de params o de state
  const id = params.id || location.state?.alumnoId;

  // Handlers de navegación
  const handleIns = () => navigate(`/alumno/inscripcion/${id}`);
  const handleHorarios = () => navigate(`/alumno/horarios/${id}`);
  const handleKardex = () => navigate(`/alumno/Kardex`, { state: { alumnoId: id } });
  const handleChat = () => navigate(`/alumno/Chat`, { state: { alumnoId: id } });
  const handleMatRe = () => navigate(`/alumno/MateriasReprobadas`, { state: { alumnoId: id } });
  const handleEvaluacion = () => navigate(`/alumno/evaluacion/${id}`);
  const handleEditPer = () => navigate(`/alumno/datosPersonales/${id}`);
  const handleCalif = () =>
    navigate(`/alumno/ConsultarCalificaciones`, { state: { alumnoId: id } });

  const handleLogout = () => navigate(`/`);

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/ipn.png" alt="Logo" className="logo-img" />
        <span>SAES-R</span>
      </div>

      <nav className="menu">
        <button onClick={() => navigate(`/alumno/${id}`)} className="menu-item">
          Inicio
        </button>

        <button
  className={`menu-item ${isActive(`/alumno/${id}`) ? " active" : ""}`}
  onClick={() => navigate(`/alumno/${id}`)}
>
  Inicio
</button>

<button
  className={`menu-item ${isActive("/alumno/inscripcion") ? "active" : ""}`}
  onClick={handleIns}
>
  Inscribir Materias
</button>

<button
  className={`menu-item ${isActive("/alumno/horarios") ? "active" : ""}`}
  onClick={handleHorarios}
>
  Horarios
</button>

<button
  className={`menu-item ${isActive("/alumno/Kardex") ? "active" : ""}`}
  onClick={handleKardex}
>
  Kardex
</button>

<button
  className={`menu-item ${isActive("/alumno/Chat") ? "active" : ""}`}
  onClick={handleChat}
>
  Asistente de Chat
</button>

<button
  className={`menu-item ${isActive("/alumno/MateriasReprobadas") ? "active" : ""}`}
  onClick={handleMatRe}
>
  Materias Reprobadas
</button>

<button
  className={`menu-item ${isActive("/alumno/evaluacion") ? "active" : ""}`}
  onClick={handleEvaluacion}
>
  Evaluación de Profesores
</button>

<button
  className={`menu-item ${isActive("/alumno/datosPersonales") ? "active" : ""}`}
  onClick={handleEditPer}
>
  Información Personal
</button>

<button
  className={`menu-item ${isActive("/alumno/ConsultarCalificaciones") ? "active" : ""}`}
  onClick={handleCalif}
>
  Consultar Calificaciones
</button>

      </nav>

      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
