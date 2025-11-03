import React, { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import Modal from "../Modal.jsx";

export function Inscripcion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [grupos, setGrupos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [id_dis, setId_dis] = useState("");
    const [distri, setDistri] = useState([]);
    const [gruposagg, setGruposagg] = useState([]);
    const [creditos, setCreditos] = useState([]);
    const [borr, setBorr] = useState([]);
    const [idgru, setIdgru] = useState("");
    const [del, setdel] = useState(null);
    const [cursadas ,setCursadas] = useState([]);

    const [d, setd] = useState(null);

    useEffect(() => {
  fetch("http://localhost:4000/ObtenerHistorial", { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      // Extrae solo los nombres de UA aprobadas
      const nombres = data.historial?.map(h => h.unidad_aprendizaje) || [];
      setCursadas(nombres);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}, []);

    useEffect(() => {
        fetch("http://localhost:4000/ConsultarBorrador", { credentials: "include", })
            .then((res) => res.json())
            .then((data) => {
                const borr = Array.isArray(data && data.horario) ? data.horario : [];
                setBorr(borr);
                console.log('ObtenerGrupo response count =', borr.length);
            })
            .catch((err) => {
                console.error("Error al obtener el horario:", err);
                setBorr([]);
            });
    }, []);
    const handleClickDel = (id) => {
        setdel(true);
        setIdgru(id);
    }
    useEffect(() => {

        fetch(`http://localhost:4000/Grupos/${id}`, { credentials: "include", })
            .then(res => res.json())
            .then(data => {
                if (data.grupos) setGrupos(data.grupos);
                if (data.creditos) setCreditos(data.creditos)
            })
            .catch(err => console.error("Error al obtener los grupos:", err));
    }, []);


    const handleClickAbrir = (id) => {
        setModalOpen(true);
        setId_dis(id);

    }



    useEffect(() => {
        if (modalOpen) {
            fetch(`http://localhost:4000/ObtenerDist/${id_dis}`, { credentials: "include", })
                .then(res => res.json())
                .then(data => {
                    if (data.Distri) setDistri(data.Distri);
                }
                )
                .catch(err => console.error("Error la distribucion de horas del grupo:", err));
        }
    }, [modalOpen, id_dis]);

    useEffect(() => {
        fetch("http://localhost:4000/Con", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setGruposagg(data.tempGrupo);
                    setCreditos(data.creditos);
                }
            })
    })

    const handleClickD = (id) => {
        setd(true);
        setIdgru(id);
    }

    useEffect(() => {
        if (d) {
            fetch(`http://localhost:4000/EliminarBorrador/${idgru}`, { method: "POST", credentials: "include" })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        alert("Se ha eliminado la materia de tu borrador de horario");
                    } else {
                        alert("No se ha podido eliminar la materia al borrador de horario");
                    }
                })
                .catch((err) => console.error("Error al eliminar borrador:", err))
                .finally(() => setd(false));

        }
    }, [del, idgru]);

    const handleClickAdd = (id) => {

        fetch(`http://localhost:4000/Agregar/${id}`, { credentials: "include", method: "POST" })
            .then(res => res.json()).
            then(data => {
                if (data.success) {
                    alert("Se ha agregado la materia a tu horario");
                    //setGruposagg(data.tempGrupo);
                    //setCreditos(data.creditos);
                }
                else {
                    if (data.err) {
                        alert("No se ha podido agregar a tu horario, ", data.err);

                    }
                }
            }).catch(err => console.error("Error: ", err));

    };

    const handleClickEl = (id) => {
        fetch(`http://localhost:4000/Del/${id}`, { credentials: "include", method: "POST" })
            .then(res => res.json()).
            then(data => {
                if (data.success) {
                    alert("Se ha eliminado la materia a tu horario");
                    //setGruposagg(data.tempGrupo);
                    //setCreditos(data.creditos);

                }
                else {
                    alert("No se ha podido eliminar a tu horario");
                }
            }).catch(err => console.error("Error: ", err));

    }

    const handleClickImport = () => {
        fetch("http://localhost:4000/ImportarHorario", { credentials: "include", method: "POST" })
            .then(res => res.json())
            .then(data => {
                if (data.fatal) {
                    alert(`NO SE HA AGREGADO NINGUNA MATERIA, ${data.msg}`);

                }
                else if (data.success) {
                    alert(`Se ha agregado todas las materias a su horario`);
                }
                else {
                    alert(`Se han agregado algunas materias ${data.msg}`);
                }
            }).catch(err => console.error("Error ", err));

    }

    useEffect(() => {
        if (del) {
            fetch(`http://localhost:4000/EliminarBorrador/${idgru}`, { method: "POST", credentials: "include" })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        alert("Se ha eliminado la materia de tu borrador de horario");
                    } else {
                        alert("No se ha podido eliminar la materia al borrador de horario");
                    }
                })
                .catch((err) => console.error("Error al eliminar borrador:", err))
                .finally(() => setdel(false));

        }
    }, [del, idgru]);
    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`http://localhost:4000/Inscribirse`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },

        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Se ha inscrito satisfactoriamente");
                    navigate(`/alumno/${id}`);

                }
                else {
                    alert("Ha ocurrido un error");
                }
            })
    }

    return (<section>

        <button onClick={() => { handleClickImport() }} >Importar del borrador</button>
        <button onClick={() => { setModalOpen2(true) }}>Visualizar borrador de horario</button>

        <h1>Grupos disponibles</h1>
        <table border="1" cellPadding={5}>
            <thead>
                <tr>
                    <th>Grupo</th>
                    <th>Unidad de Aprendizaje</th>
                    <th>Creditos Necesarios</th>
                    <th>Profesor</th>
                    <th>Disponibilidad</th>
                    <th>Cupos Disponibles</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {grupos.length > 0 ? (
                    grupos.map((grupo) => (
                        <tr key={grupo.id}>
                            <td>{grupo.nombre}</td>
                            <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                            <td>{grupo.Unidad_Aprendizaje.credito}</td>
                            <td>{grupo.DatosPersonale.nombre} {grupo.DatosPersonale.ape_paterno} {grupo.DatosPersonale.ape_materno}</td>
                            <td>{grupo.cupo > 0 ? "Disponible" : "Lleno"}</td>
                            <td>{grupo.cupo}</td>
                            <td>
                                <button onClick={() => { handleClickAdd(grupo.id) }} disabled={grupo.cupo <= 0 || gruposagg.includes(grupo.id) || cursadas.includes(grupo.Unidad_Aprendizaje.nombre)}>Seleccionar</button>
                                <button onClick={() => { handleClickAbrir(grupo.id) }}>Mostrar Horario</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No hay grupos disponibles</td>
                    </tr>
                )}
            </tbody>
        </table>

        <h1>Grupos seleccionados</h1>
        <h2>Creditos restantes {creditos}</h2>
        <table border="1" cellPadding={5}>
            <thead>
                <tr>
                    <th>Grupo</th>
                    <th>Unidad de Aprendizaje</th>
                    <th>Creditos Necesarios</th>
                    <th>Profesor</th>
                    <th>Disponibilidad</th>
                    <th>Cupos Disponibles</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {gruposagg.length > 0 ? (
                    grupos.filter((grupo) => gruposagg.includes(grupo.id)).map((grupo) => (
                        <tr key={grupo.id}>
                            <td>{grupo.nombre}</td>
                            <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                            <td>{grupo.Unidad_Aprendizaje.credito}</td>
                            <td>{grupo.DatosPersonale.nombre} {grupo.DatosPersonale.ape_paterno} {grupo.DatosPersonale.ape_materno}</td>
                            <td>{grupo.cupo > 0 ? "Disponible" : "Lleno"}</td>
                            <td>{grupo.cupo}</td>
                            <td>
                                <button onClick={() => { handleClickEl(grupo.id) }}>Eliminar de la seleccion</button>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No hay grupos seleccionados</td>
                    </tr>
                )}
            </tbody>
        </table>
        <form className="formulario" onSubmit={handleSubmit}>
            <button type="submit">Realizar inscripcion</button>
        </form>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} >
            <h2>Horario del Grupo</h2>

            <table>
                <thead>
                    <tr>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {distri
                                .filter(dis => dis.dia === "Lunes")
                                .map((dis, i) => (
                                    <div key={i}>
                                        {dis.hora_ini} - {dis.hora_fin}
                                    </div>
                                ))}
                        </td>

                        <td>
                            {distri
                                .filter(dis => dis.dia === "Martes")
                                .map((dis, i) => (
                                    <div key={i}>
                                        {dis.hora_ini} - {dis.hora_fin}
                                    </div>
                                ))}
                        </td>

                        <td>
                            {distri
                                .filter(dis => dis.dia === "Miércoles")
                                .map((dis, i) => (
                                    <div key={i}>
                                        {dis.hora_ini} - {dis.hora_fin}
                                    </div>
                                ))}
                        </td>

                        <td>
                            {distri
                                .filter(dis => dis.dia === "Jueves")
                                .map((dis, i) => (
                                    <div key={i}>
                                        {dis.hora_ini} - {dis.hora_fin}
                                    </div>
                                ))}
                        </td>

                        <td>
                            {distri
                                .filter(dis => dis.dia === "Viernes")
                                .map((dis, i) => (
                                    <div key={i}>
                                        {dis.hora_ini} - {dis.hora_fin}
                                    </div>
                                ))}
                        </td>
                    </tr>
                </tbody>
            </table>

        </Modal>
        <Modal open={modalOpen2} onClose={() => setModalOpen2(false)}>
            <h1>Borrador de horario</h1>
            <table border="1" cellPadding={5}>
                <thead>
                    <tr>
                        <th>Grupo</th>
                        <th>Profesor</th>
                        <th>Calificacion del profesor</th>
                        <th>Materia</th>
                        <th>Cupo</th>
                        <th>Creditos Necesarios </th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miercoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                        <th>Es valido</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {borr.length > 0 ? (
                        borr.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.Grupo.nombre}</td>
                                <td>{dato.profesor.nombre} {dato.profesor.ape_paterno} {dato.profesor.ape_materno} </td>
                                <td>{dato.calificacion}</td>
                                <td>{dato.materia}</td>
                                <td>{dato.Grupo.cupo}</td>
                                <td>{dato.Grupo.Unidad_Aprendizaje.credito}</td>
                                <td>{dato.horas_lun || " "}</td>
                                <td>{dato.horas_mar || " "}</td>
                                <td>{dato.horas_mie || " "}</td>
                                <td>{dato.horas_jue || " "}</td>
                                <td>{dato.horas_vie || " "}</td>
                                <td>{dato.valido === 1 ? "Es valido" : " No es valido"}</td>
                                <td><button onClick={() => handleClickD(dato.id_grupo)}>Retirar del borrador</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr colSpan="12"><td>No hay datos disponibles</td></tr>
                    )}
                </tbody>

            </table>

        </Modal>


    </section>);
}