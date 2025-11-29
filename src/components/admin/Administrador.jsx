import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Administrador.css";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaTrashAlt,
  FaFileAlt,
  FaBullhorn,
  FaFileInvoiceDollar,
  FaGraduationCap, FaBook
} from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

import { AdminSidebar } from "../admin/AdminSidebar.jsx";


export function Administrador() {
  const navigate = useNavigate();

  const handleClickAlu = () => navigate("gestionarAlumnos");
  const handleClickProf = () => navigate("gestionarProfesores");
  const handleClickCursos = () => navigate("gestionarCursos");
  const handleClickETS = () => navigate("ETS");
  const handleClickPublicarNoticia = () => navigate("publicarNoticia");
  const handleLogout = () => navigate("/");

  const handleETS = () => navigate("/administrador/ETS");
  const handlePublicarNoticia = () => navigate("/administrador/publicarNoticia");
  const handleCarreras = () => navigate("/administrador/carreras");
  const handleUnidades = () => navigate("/administrador/unidades");
  const handleDatosMedicos = () => navigate("/administrador/datosMedicos");
  const handleGenerarCitas = () => navigate("/administrador/GenerarCitas");

  return (
    <div className="admin-container">
      <AdminSidebar />
      {/* Main content con DISEÑO DEL SEGUNDO */}
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>¡Bienvenido, Administrador!</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>

        {/* Acciones rápidas (diseño del segundo, contenido del primero) */}
        <section className="acciones-rapidas">
          <div className="acciones-grid">
            <div className="card highlighted">
              <FaUserGraduate className="icon" />
              <h3>Gestión de Estudiantes</h3>
              <p>Añadir nuevos estudiantes al sistema con todos sus datos relevantes.</p>
              <button onClick={handleClickAlu}>Registrar</button>
            </div>

            <div className="card">
              <FaChalkboardTeacher className="icon" />
              <h3>Gestión de Profesores</h3>
              <p>Incorporar nuevos miembros del personal docente con sus calificaciones.</p>
              <button onClick={handleClickProf}>Registrar</button>
            </div>

            <div className="card">
              <FaBookOpen className="icon" />
              <h3>Gestión de Grupos</h3>
              <p>Crear y configurar nuevos programas y asignaturas.</p>
              <button onClick={handleClickCursos}>Añadir</button>
            </div>

            {/* Esta tarjeta viene del primer código */}
            <div className="card">
              <FaFileInvoiceDollar className="icon" />
              <h3>ETS</h3>
              <p>Revisión de comprobantes de pago de Examenes a Título de Suficiencia.</p>
              <button onClick={handleETS}>Revisar</button>
            </div>

            <div className="card">
              <FaBullhorn className="icon" />
              <h3>Publicar Noticia</h3>
              <p>Publica noticias o eventos relevantes dentro de la comunidad politecnica.</p>
              <button onClick={handleClickPublicarNoticia}>Publicar</button>
            </div>

            {/* También del primer código */}
            <div className="card">
              <FaGraduationCap className="icon" />
              <h3>Carreras</h3>
              <p>Agrega nuevas carreras o consulta las que ya existen.</p>
              <button onClick={handleCarreras}>Consultar</button>
            </div>

             <div className="card">
              <FaBook className="icon" />
              <h3>Unidades de Aprendizaje</h3>
              <p>Agrega nuevas unidades o edita las que ya existen.</p>
              <button onClick={handleUnidades}>Agregar</button>
            </div>

             <div className="card">
              <MdEventAvailable className="icon" />
              <h3>Citas de Inscripción</h3>
              <p>Genera citas para alumnos regulares e irregulares.</p>
              <button onClick={handleGenerarCitas}>Generar</button>
            </div>
          </div>
        </section>

        {/* Estadísticas con diseño del segundo */}
        <section className="estadisticas">
          <h2>Estadísticas Generales</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <p>Total de Estudiantes</p>
              <h3>1,250</h3>
            </div>

            <div className="stat-card">
              <p>Total de Profesores</p>
              <h3>85</h3>
            </div>

            <div className="stat-card">
              <p>Cursos Activos</p>
              <h3>32</h3>
            </div>

            <div className="stat-card">
              <p>Próximos Eventos</p>
              <h3>5</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
