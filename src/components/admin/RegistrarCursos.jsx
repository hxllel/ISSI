import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./RegistrarCursos.css";

export function RegistrarCursos() {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
  const [carrera, setCarreras] = useState([]);
  const [id_profesor, setId_profesor] = useState("");
  const [UA, setUA] = useState([]);
  const [id_UA, setId_UA] = useState("");
  const [turno, setTurno] = useState("");
  const [nombre, setNombre] = useState("");
  const [carreragru, setCarreragru] = useState("");

  const handleClickAlu = () => navigate("../administrador/gestionarAlumnos");
    const handleClickProf = () => navigate("../administrador/gestionarProfesores");
    const handleClickCursos = () => navigate("../administrador/gestionarCursos");
    const handleLogout = () => {navigate(`/`);};

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerProfesores", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setProfesores(data.profesores))
      .catch((err) =>
        console.error("Error al obtener los profesores:", err)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerUA", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUA(data.UA))
      .catch((err) => console.error("Error al obtener las UAs:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerCarreras", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCarreras(data.carreras))
      .catch((err) =>
        console.error("Error al obtener las carreras:", err)
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id_profesor || !id_UA || !turno || !nombre || !carreragru) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/RegistrarCurso", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_profesor,
          id_UA,
          turno,
          nombre,
          carrera: carreragru,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("grupo creado con éxito");
        navigate("/administrador/gestionarCursos");
      } else {
        alert("Error al crear el grupo");
      }
    } catch (error) {
      console.error("Error al registrar el curso:", error);
      alert("Ocurrió un error al registrar el curso");
    }
  };

  return (
    <div className="admin-container">
        <aside className="sidebar">
                <div className="logo">
                    <img src="/ipn.png" alt="Logo" className="logo-img" />
                    <span>Gestión Escolar</span>
                </div>
                <nav className="menu">
                    <button onClick={() => navigate("/administrador")} className="menu-item">
                        Panel de Control
                    </button>
                    <button onClick={() => navigate("/estudiantes")} className="menu-item">Estudiantes</button>
                    <button onClick={handleClickProf} className="menu-item">Profesores</button>
                    <button onClick={handleClickCursos} className="menu-item active">Cursos</button>
                    <button className="menu-item">Informes</button>
                </nav>
                <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
            </aside>
            <main className="main-content">
                <header className="chat-header">
          <div className="encabezado-section">
          <h1>Registrar Curso</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
    <section className="rc-wrap">
      <form className="formulario rc-card" onSubmit={handleSubmit}>
        <label>Número del grupo:</label>
        <input
          type="number"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Profesor:</label>
        <select
          value={id_profesor}
          onChange={(e) => setId_profesor(e.target.value)}
        >
          <option value="">Seleccione un profesor</option>
          {profesores.map((profesor) => (
            <option key={profesor.id} value={profesor.id}>
              {profesor.nombre} {profesor.ape_paterno}{" "}
              {profesor.ape_materno}
            </option>
          ))}
        </select>

        <label>Carrera para el grupo:</label>
        <select
          value={carreragru}
          onChange={(e) => setCarreragru(e.target.value)}
        >
          <option value="">Seleccione una carrera</option>
          {carrera.map((c) => (
            <option key={c.nombre} value={c.nombre}>
              {c.nombre}
            </option>
          ))}
        </select>

        <label>Unidad de Aprendizaje:</label>
        <select
          value={id_UA}
          onChange={(e) => setId_UA(e.target.value)}
        >
          <option value="">Seleccione una unidad de aprendizaje</option>
          {UA.filter((ua) => ua.carrera === carreragru).map((ua) => (
            <option key={ua.id} value={ua.id}>
              {ua.nombre}
            </option>
          ))}
        </select>

        <label>Turno:</label>
        <select value={turno} onChange={(e) => setTurno(e.target.value)}>
          <option value="">Seleccione un turno</option>
          <option value="Matutino">Matutino</option>
          <option value="Vespertino">Vespertino</option>
        </select>

        <button className="rc-btn primary" type="submit">
          Registrar Curso
        </button>
      </form>
    </section>
    </main>
    </div>
  );
}
