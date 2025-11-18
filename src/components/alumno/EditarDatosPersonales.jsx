import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarDatosPersonales.css";

export function EditarDatos() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [alumno, setAlumno] = useState({
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
        carrera: ""
    });

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/ObtenerAlumno/${id}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => { if (data.alumno) setAlumno(data.alumno); })
            .catch(err => console.error("Error al obtener el alumno:", err));
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:4000/ObtenerCarreras")
            .then(res => res.json())
            .then(data => setCarreras(data.carreras || []))
            .catch(err => console.error("Error al obtener las carreras:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlumno(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/EditarAlumno/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alumno),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Alumno editado con éxito");
                    navigate(`/alumno/${id}`);
                } else {
                    alert("Error al editar el alumno");
                }
            })
            .catch(err => console.error("Error al editar el alumno:", err));
    };

    const handleInicio = () => { navigate(`/alumno/${id}`) }
    const handleIns = () => {navigate(`/alumno/inscripcion/${id}`);};
    const handleHorarios = () => {navigate(`/alumno/horarios/${id}`);};
    const handleKardex = () => { navigate("/alumno/Kardex") }
    const handleChat = () => { navigate(`/alumno/Chat`, { state: { alumnoId: id } }) }
    const handleEditPer = () => {navigate(`/alumno/editarDatos/${id}`);};
    const handleEvaluacion = () => {navigate(`/alumno/evaluacion/${id}`);};
    const handleETS = () => {navigate(`/alumno/MateriasReprobadas/${id}`);};

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
          <button className="menu-item"  onClick={handleIns}>Inscribir Materias </button>
          <button className="menu-item" onClick={handleHorarios}>Horarios</button>
          <button className="menu-item"onClick={handleKardex}>Kardex </button>
          <button className="menu-item" onClick={handleChat}>Asistente de Chat </button>
          <button className="menu-item" onClick={handleEvaluacion}>Evaluación de Profesores</button>
          <button className="menu-item" onClick={handleETS}>ETS</button>
          <button className="menu-item" onClick={handleEditPer}>Información Personal</button>
        </nav>
                <button className="logout">Cerrar sesión</button>
            </aside>

            {/* Contenido principal */}
            <main className="main-content">
                <section className="gestion-alumnos">
                    <div className="header-section">
                        <h1>Editar Alumno</h1>
                    </div>

                    <div className="form-container">
                        <form className="formulario" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                {/* Información Personal */}
                                <div className="form-section">
                                    <h3>Información Personal</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nombre *</label>
                                            <input type="text" name="nombre" value={alumno.nombre} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Apellido Paterno *</label>
                                            <input type="text" name="ape_paterno" value={alumno.ape_paterno} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Apellido Materno *</label>
                                            <input type="text" name="ape_materno" value={alumno.ape_materno} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Fecha de Nacimiento *</label>
                                            <input type="date" name="fecha_nacimiento" value={alumno.fecha_nacimiento} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Tipo de Sangre</label>
                                            <input type="text" name="tipo_sangre" value={alumno.tipo_sangre} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>CURP</label>
                                            <input type="text" name="CURP" value={alumno.CURP} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nacionalidad</label>
                                            <input type="text" name="nacionalidad" value={alumno.nacionalidad} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                {/* Dirección */}
                                <div className="form-section">
                                    <h3>Dirección</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Calle</label>
                                            <input type="text" name="calle" value={alumno.calle} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Número Exterior</label>
                                            <input type="text" name="num_exterior" value={alumno.num_exterior} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Número Interior</label>
                                            <input type="text" name="num_interior" value={alumno.num_interior} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Código Postal</label>
                                            <input type="text" name="codigo_postal" value={alumno.codigo_postal} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Colonia</label>
                                            <input type="text" name="colonia" value={alumno.colonia} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Delegación</label>
                                            <input type="text" name="delegacion" value={alumno.delegacion} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Ciudad</label>
                                            <input type="text" name="ciudad" value={alumno.ciudad} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono</label>
                                            <input type="text" name="telefono" value={alumno.telefono} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                {/* Información Académica */}
                                <div className="form-section">
                                    <h3>Información Académica</h3>
                                    <div className="form-group">
                                        <label>Correo Electrónico</label>
                                        <input type="email" name="email" value={alumno.email} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Carrera</label>
                                        <select name="carrera" value={alumno.carrera} readOnly>
                                            <option value="">Seleccione una carrera</option>
                                            {carreras.map(c => (
                                                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn blanco" onClick={() => navigate(-1)}>Cancelar</button>
                                <button type="submit" className="btn azul">Editar Alumno</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
