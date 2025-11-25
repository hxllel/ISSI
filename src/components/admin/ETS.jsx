import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ModalPDF from "./ModalPDF"
import { AdminSidebar } from "./AdminSidebar";


export function ETS() {
    const navigate = useNavigate();
    const API = 'http://localhost:4000';
    const [grupos, setGrupos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const [idETS, setIdETS] = useState("");
    const [modalPdf, setModalPdf] = useState(false);   
    const [pdfActual, setPdfActual] = useState(null);
    
    const [modalCrear, setModalCrear] = useState(false);
    const [profesores, setProfesores] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [nuevoGrupo, setNuevoGrupo] = useState({
        id_ua: "",
        id_profesor: "",
        turno: "",
        hora_inicio: "",
        hora_final: "",
        fecha: ""
    });       

    useEffect(() => {
        fetch(`${API}/ObtenerGETS`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setGrupos(data.grupos))
            .catch((err) => console.error("Error al obtener la información:", err));
    }, []);

    // Cargar profesores y unidades cuando se abre el modal de crear
    const handleAbrirModalCrear = () => {
        // Obtener profesores
        fetch(`${API}/ObtenerProfesoresETS`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProfesores(data.profesores);
                }
            })
            .catch((err) => console.error("Error al obtener profesores:", err));

        // Obtener unidades de aprendizaje
        fetch(`${API}/ObtenerUnidadesETS`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUnidades(data.unidades);
                }
            })
            .catch((err) => console.error("Error al obtener unidades:", err));

        setModalCrear(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoGrupo({
            ...nuevoGrupo,
            [name]: value
        });
    };

    const handleCrearGrupo = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!nuevoGrupo.id_ua || !nuevoGrupo.id_profesor || !nuevoGrupo.turno || 
            !nuevoGrupo.hora_inicio || !nuevoGrupo.hora_final || !nuevoGrupo.fecha) {
            alert("Por favor completa todos los campos");
            return;
        }

        try {
            const response = await fetch(`${API}/CrearGrupoETS`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(nuevoGrupo)
            });

            const data = await response.json();

            if (data.success) {
                alert("Grupo ETS creado exitosamente");
                setModalCrear(false);
                setNuevoGrupo({
                    id_ua: "",
                    id_profesor: "",
                    turno: "",
                    hora_inicio: "",
                    hora_final: "",
                    fecha: ""
                });
                // Recargar los grupos
                window.location.reload();
            } else {
                alert(data.mensaje || "Error al crear el grupo ETS");
            }
        } catch (err) {
            console.error("Error al crear grupo ETS:", err);
            alert("Error al crear el grupo ETS");
        }
    };

    const handleClickAl = (id) => {
        fetch(`${API}/Comprobantes/${id}`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                setAlumnos(data.comprobantes);
            })
            .catch((err) => console.error("Error", err));

        setModalOpen(true);
    };

    const handleVerPDF = (pdfBase64, id) => {
        setPdfActual(pdfBase64); 
        setIdETS(id);
        setModalPdf(true);
    };

    const HandleValidar = () =>{
        fetch(`${API}/Validar/${idETS}`, {
            credentials: "include",
            method: "POST"
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    alert("Se ha validado correctamente el ETS");
                    navigate(`/administrador/ETS`);
                    window.location.reload();
                }
            })
            .catch((err) => console.error("Error", err));

    }
    const HandleDenegar = () =>{
        fetch(`${API}/Denegar/${idETS}`, {
            credentials: "include",
            method: "POST"
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    alert("Se ha denegado correctamente el ETS");
                    navigate(`/administrador/ETS`);
                    window.location.reload();
                }
            })
            .catch((err) => console.error("Error", err));
    }

    return (
        <section>
            <button onClick={handleAbrirModalCrear}>Crear nuevo grupo</button>

            <table border="2" cellPadding={5}>
                <thead>
                    <tr>
                        <th>Unidad de Aprendizaje</th>
                        <th>Profesor</th>
                        <th>Día</th>
                        <th>Horas</th>
                        <th>Turno</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {grupos.length > 0 ? (
                        grupos.map((grupo) => (
                            <tr key={grupo.id}>
                                <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                                <td>{grupo.DatosPersonale?.nombre} {grupo.DatosPersonale?.ape_paterno} {grupo.DatosPersonale?.ape_materno}</td>
                                <td>{grupo.fecha}</td>
                                <td>{grupo.hora_inicio} - {grupo.hora_final}</td>
                                <td>{grupo.turno}</td>
                                <td>
                                    <button onClick={() => handleClickAl(grupo.id)}>
                                        Revisar comprobantes de pago
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr></tr>
                    )}
                </tbody>
            </table>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <h1>COMPROBANTES</h1>

                <table border="2" cellPadding={5}>
                    <thead>
                        <tr>
                            <th>Alumno</th>
                            <th>Subió comprobante</th>
                            <th>Ver comprobante</th>
                        </tr>
                    </thead>

                    <tbody>
                        {alumnos.length > 0 ? (
                            alumnos.map((alumno) => (
                                <tr key={alumno.id}>
                                    <td>
                                        {alumno.Materia_Reprobada.Estudiante.DatosPersonale?.ape_paterno}{" "}
                                        {alumno.Materia_Reprobada.Estudiante.DatosPersonale?.ape_materno}{" "}
                                        {alumno.Materia_Reprobada.Estudiante.DatosPersonale?.nombre}
                                    </td>

                                    <td>{alumno.comprobante ? "Sí" : "No"}</td>

                                    <td>
                                        {alumno.comprobante && alumno.validado === 0 ? (
                                            <button onClick={() => handleVerPDF(alumno.comprobante, alumno.id)}>
                                                Ver comprobante
                                            </button>
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay alumnos inscritos al ETS</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Modal>

            <ModalPDF open={modalPdf} onClose={() => setModalPdf(false)}>
                <h2>COMPROBANTE DE PAGO</h2>
                <div>
                    <button onClick={HandleValidar}>Validar</button>
                    <button onClick={HandleDenegar}>Denegar</button>
                </div>

                {pdfActual ? (
                <embed 
                    src={`data:application/pdf;base64,${pdfActual}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                />
                ) : (
                    <p>No se pudo cargar el PDF.</p>
                )}
            </ModalPDF>

            {/* Modal para crear nuevo grupo ETS */}
            <Modal open={modalCrear} onClose={() => setModalCrear(false)}>
                <h2>Crear Nuevo Grupo ETS</h2>
                <form onSubmit={handleCrearGrupo} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
                    <div>
                        <label htmlFor="id_ua">Unidad de Aprendizaje:</label>
                        <select
                            id="id_ua"
                            name="id_ua"
                            value={nuevoGrupo.id_ua}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        >
                            <option value="">-- Selecciona una unidad --</option>
                            {unidades.map((ua) => (
                                <option key={ua.id} value={ua.id}>
                                    {ua.nombre} - Semestre {ua.semestre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="id_profesor">Profesor:</label>
                        <select
                            id="id_profesor"
                            name="id_profesor"
                            value={nuevoGrupo.id_profesor}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        >
                            <option value="">-- Selecciona un profesor --</option>
                            {profesores.map((prof) => (
                                <option key={prof.id} value={prof.id}>
                                    {prof.nombre} {prof.ape_paterno} {prof.ape_materno}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="turno">Turno:</label>
                        <select
                            id="turno"
                            name="turno"
                            value={nuevoGrupo.turno}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        >
                            <option value="">-- Selecciona un turno --</option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fecha">Fecha del ETS:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={nuevoGrupo.fecha}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="hora_inicio">Hora de Inicio:</label>
                        <input
                            type="time"
                            id="hora_inicio"
                            name="hora_inicio"
                            value={nuevoGrupo.hora_inicio}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="hora_final">Hora Final:</label>
                        <input
                            type="time"
                            id="hora_final"
                            name="hora_final"
                            value={nuevoGrupo.hora_final}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Crear Grupo
                        </button>
                        <button type="button" onClick={() => setModalCrear(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>

        </section>
    );
}
