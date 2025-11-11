import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import "./EditarDatosPersonales.css"; // reutiliza el mismo estilo


export function DatosPersonales() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/ObtenerAlumno/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAlumno(data.alumno || null))
      .catch((err) => console.error("Error al obtener el alumno:", err));
  }, [id]);

  const handleEdit = () => navigate(`/alumno/editarDatos/${id}`);
  const handleIns = () => navigate(`/alumno/inscripcion/${id}`);
  const handleHorarios = () => navigate(`/alumno/horarios/${id}`);
  const handleLogout = () => {navigate(`/`);};
  const handleKardex = () => {navigate(`/alumno/Kardex/${id}`);};
  const handleChat = () => {navigate(`/alumno/Chat`, { state: { alumnoId: id } });};


  if (!alumno) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate(`/alumno/${id}`)} className="menu-item">
            Inicio
          </button>
          <button className="menu-item" onClick={handleIns}>
            Inscribir Materias
          </button>
          <button className="menu-item" onClick={handleHorarios}>
            Horarios
          </button>
          <button className="menu-item"onClick={handleKardex}>Kardex </button>
          <button className="menu-item" onClick={handleChat}>Asistente de Chat </button>
          <button className="menu-item active">Información Personal</button>
        </nav>
        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>DATOS PERSONALES</h1>
          </div>
          {/* Ajusta la ruta del logo según como lo tengas en tu proyecto */}
          <img src="/escom.png" alt="ESCOM" className="escom-logo" />
        </header>
        <section className="gestion-alumnos">
          
<header className="alumno-header">
          <div>
    {alumno ? (
      <>
        <p>     {alumno.nombre} {alumno.ape_paterno} {alumno.ape_materno}</p>
        <p>     Boleta: {alumno.id}</p>
      </>
    ) : (
      <p>Cargando alumno...</p>
    )}
  </div>
          
        </header>
          <div className="form-container">
            <div className="formulario">
              <div className="form-grid">
                {/* Información Personal */}
                <div className="form-section">
                  <h3>Información Personal</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre</label>
                      <p>{alumno.nombre}</p>
                    </div>
                    <div className="form-group">
                      <label>Apellido Paterno</label>
                      <p>{alumno.ape_paterno}</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Apellido Materno</label>
                      <p>{alumno.ape_materno}</p>
                    </div>
                    <div className="form-group">
                      <label>Fecha de Nacimiento</label>
                      <p>{alumno.fecha_nacimiento}</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tipo de Sangre</label>
                      <p>{alumno.tipo_sangre}</p>
                    </div>
                    <div className="form-group">
                      <label>CURP</label>
                      <p>{alumno.CURP}</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nacionalidad</label>
                      <p>{alumno.nacionalidad}</p>
                    </div>
                  </div>
                </div>

                {/* Dirección */}
                <div className="form-section">
                  <h3>Dirección</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Calle</label>
                      <p>{alumno.calle}</p>
                    </div>
                    <div className="form-group">
                      <label>Número Exterior</label>
                      <p>{alumno.num_exterior}</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Número Interior</label>
                      <p>{alumno.num_interior}</p>
                    </div>
                    <div className="form-group">
                      <label>Código Postal</label>
                      <p>{alumno.codigo_postal}</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Colonia</label>
                      <p>{alumno.colonia}</p>
                    </div>
                    <div className="form-group">
                      <label>Delegación</label>
                      <p>{alumno.delegacion}</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Ciudad</label>
                      <p>{alumno.ciudad}</p>
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <p>{alumno.telefono}</p>
                    </div>
                  </div>
                </div>

                {/* Información Académica */}
                <div className="form-section">
                  <h3>Información Académica</h3>
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <p>{alumno.email}</p>
                  </div>
                  <div className="form-group">
                    <label>Carrera</label>
                    <p>{alumno.carrera}</p>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                
                <button type="button" className="submit-btn" onClick={handleEdit}>
                  <FiEdit2 style={{ marginRight: "8px" }} />
                    Editar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
