import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarProfesores.css";

export function EditarProfesores() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profesor, setProfesor] = useState({
    nombre: "",
    ape_paterno: "",
    ape_materno: "",
    fecha_nacimiento: "",
    tipo_sangre: "",
    CURP: "",
    nacionalidad: "",
    calle: "",
    num_exterior: "",
    num_interior: "",
    codigo_postal: "",
    colonia: "",
    delegacion: "",
    ciudad: "",
    telefono: "",
    email: "",
    RFC: "",
    grado: "",
  });

  const [fotoBase64, setFotoBase64] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/ObtenerProfesor/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.profesor) setProfesor(data.profesor);
      })
      .catch((err) => console.error("Error al obtener el profesor:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setFotoBase64(typeof result === "string" ? result : null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...profesor };
    if (fotoBase64) payload.fotoBase64 = fotoBase64;

    fetch(`http://localhost:4000/EditarProfesor/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Profesor editado correctamente");
          navigate("/administrador/gestionarProfesores");
        } else {
          alert("Error al editar el profesor");
        }
      })
      .catch((err) => console.error("Error al editar el profesor:", err));
  };
  const handleLogout = () => {navigate(`/`);};

  return (
    <div className="layout">
      {/* PANEL LATERAL */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate("/administrador")} className="menu-item">
            Panel de Control
          </button>
          <button onClick={() => navigate("/administrador/gestionarAlumnos")} className="menu-item">
            Estudiantes
          </button>
          <button onClick={() => navigate("/administrador/gestionarProfesores")} className="menu-item active">
            Profesores
          </button>
          <button onClick={() => navigate("/administrador/gestionarCursos")} className="menu-item">
            Cursos
          </button>
          <button className="menu-item">Informes</button>
        </nav>
        <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Editar Profesor</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>

        <form className="formulario ep-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={profesor.nombre} onChange={handleChange} />

            <label>Apellido Paterno:</label>
            <input type="text" name="ape_paterno" value={profesor.ape_paterno} onChange={handleChange} />

            <label>Apellido Materno:</label>
            <input type="text" name="ape_materno" value={profesor.ape_materno} onChange={handleChange} />

            <label>Fecha de Nacimiento:</label>
            <input type="date" name="fecha_nacimiento" value={profesor.fecha_nacimiento} onChange={handleChange} />

            <label>Tipo de Sangre:</label>
            <input type="text" name="tipo_sangre" value={profesor.tipo_sangre} onChange={handleChange} />

            <label>CURP:</label>
            <input type="text" name="CURP" value={profesor.CURP} onChange={handleChange} />

            <label>Nacionalidad:</label>
            <input type="text" name="nacionalidad" value={profesor.nacionalidad} onChange={handleChange} />

            <label>Calle:</label>
            <input type="text" name="calle" value={profesor.calle} onChange={handleChange} />

            <label>Número Exterior:</label>
            <input type="text" name="num_exterior" value={profesor.num_exterior} onChange={handleChange} />

            <label>Número Interior:</label>
            <input type="text" name="num_interior" value={profesor.num_interior} onChange={handleChange} />

            <label>Código Postal:</label>
            <input type="text" name="codigo_postal" value={profesor.codigo_postal} onChange={handleChange} />

            <label>Colonia:</label>
            <input type="text" name="colonia" value={profesor.colonia} onChange={handleChange} />

            <label>Delegación:</label>
            <input type="text" name="delegacion" value={profesor.delegacion} onChange={handleChange} />

            <label>Ciudad:</label>
            <input type="text" name="ciudad" value={profesor.ciudad} onChange={handleChange} />

            <label>Teléfono:</label>
            <input type="text" name="telefono" value={profesor.telefono} onChange={handleChange} />

            <label>Correo Electrónico:</label>
            <input type="email" name="email" value={profesor.email} onChange={handleChange} />

            <label>RFC:</label>
            <input type="text" name="RFC" value={profesor.RFC} onChange={handleChange} />

            <label>Grado:</label>
            <input type="text" name="grado" value={profesor.grado} onChange={handleChange} />
          </div>

          {/* FOTO */}
          <div className="foto-section">
            <label>Foto (opcional):</label>
            <input type="file" accept="image/*" onChange={handleFotoChange} />
            {fotoBase64 && (
              <div className="ep-photo-preview">
                <img src={fotoBase64} alt="Previsualización" />
              </div>
            )}
          </div>

          {/* BOTONES */}
          <div className="acciones">
            <button className="btn azul" type="submit">Guardar Cambios</button>
            <button className="btn blanco" type="button" onClick={() => navigate("/administrador/gestionarProfesores")}>
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
