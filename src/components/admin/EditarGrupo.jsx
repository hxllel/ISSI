import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarGrupo.css";
import { AdminSidebar } from "./AdminSidebar";


export function EditarGrupo() {
    const { id } = useParams();
    const [profesores, setProfesores] = useState([]);
    const [id_profesor, setId_profesor] = useState("");
    const [UA, setUA] = useState([]);
    const [id_UA, setId_UA] = useState("");
    const [grupo, setGrupo] = useState({
        id_profesor: "",
        id_UA: "",
        turno: "",
        salon: ""
    });
    const navigate = useNavigate();
      const API = "http://localhost:4000";

    useEffect(() => {
        fetch(`${API}/ObtenerProfesores`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setProfesores(data.profesores))
            .catch((err) => console.error("Error al obtener los profesores:", err));
    }, []);

    useEffect(() => {
        fetch(`${API}/ObtenerUA`)
            .then((res) => res.json())
            .then((data) => setUA(data.UA))
            .catch((err) => console.error("Error al obtener las unidades de aprendizaje:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGrupo((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetch(`${API}/ObtenerGrupo/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.grupo) setGrupo(data.grupo);
            })
            .catch((err) => console.error("Error al obtener el grupo:", err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API}/EditarGrupo/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(grupo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Grupo editado correctamente");
                    navigate("/administrador/gestionarCursos");
                } else {
                    alert("Error al editar el grupo");
                }
            })
            .catch((err) => console.error("Error al editar el grupo:", err));
    };
    
     const handleClickAlu = () => navigate("gestionarAlumnos");
  const handleClickProf = () => navigate("gestionarProfesores");
  const handleClickCursos = () => navigate("gestionarCursos");
const handleLogout = () => {navigate(`/`);};


    return (
        <div className="admin-container">
           <AdminSidebar />
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
          <h1>Editar Grupo</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
        <section className="gc-wrap">
            
            

            <form className="formulario eg-card" onSubmit={handleSubmit}>
                <label className="eg-label">Nombre del grupo:</label>
                <input
                    className="eg-input"
                    type="text"
                    name="nombre"
                    value={grupo.nombre || ""}
                    onChange={handleChange}
                />

                <label className="eg-label">Profesor:</label>
                <select
                    className="eg-select"
                    value={grupo.id_prof}
                    onChange={handleChange}
                    name="id_profesor"
                >
                    <option value="">Seleccione un profesor</option>
                    {profesores.map((profesor) => (
                        <option key={profesor.id} value={profesor.id}>
                            {profesor.nombre} {profesor.ape_paterno} {profesor.ape_materno}
                        </option>
                    ))}
                </select>
                <label className="eg-label">Salón</label>
                <input
                    className="eg-input"
                    type="text"
                    name="salon"
                    value={grupo.salon || ""}
                    onChange={handleChange}
                />
                <label className="eg-label">Unidad de Aprendizaje:</label>
                <select
                    className="eg-select"
                    value={grupo.id_ua}
                    onChange={handleChange}
                    name="id_UA"
                >
                    <option value="">Seleccione una unidad de aprendizaje</option>
                    {UA.map((ua) => (
                        <option key={ua.id} value={ua.id}>
                            {ua.nombre}
                        </option>
                    ))}
                </select>

                <label className="eg-label">Turno:</label>
                <select
                    className="eg-select"
                    value={grupo.turno}
                    onChange={handleChange}
                    name="turno"
                >
                    <option value="">Seleccione un turno</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                </select>

                <button className="btn azul" type="submit">
                    Actualizar Curso
                </button>
            </form>
        </section>
        </main>
        </div>
    );
}
