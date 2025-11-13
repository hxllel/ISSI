import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import "./MateriasReprobadas.css";


export function MateriasReprobadas(){

    const [materias, setMaterias] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [compro, setComprobante] = useState([]);
    const [historial, setHistorial] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenCom, setModalOpenCom] = useState(false);
    const [modalOpenH, setModalOpenH] = useState(false);
    const [documento, setDocumento] = useState(null);
    const [id_mr, setIDMR] = useState("");
    const [id_grupo, setIDGRU] = useState("");
    const API = 'http://localhost:4000';

    const navigate = useNavigate();

    useEffect(() =>{

        fetch(`${API}/ObtenerMateriasReprobadas`, {credentials: "include"})
        .then((res) => res.json())
        .then((data) => {
                setMaterias(data.materias)
                setComprobante(data.compro)
        })
        .catch((err) => console.error("Error al obtener la informacion: ", err));

    }, []);

const handleClickIns = (id, nom) => {
    setIDMR(nom);
    fetch(`${API}/ObtenerGruposEts/${id}`, {
        credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
        setHorarios(data.horarios);
        setModalOpen(true); 
    })
    .catch((err) => console.error("Error", err));
};

const handleI = (id_grupo) => {
    fetch(`${API}/RegistrarETS`, {
        credentials: "include",
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_mr,
            id_grupo
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.success){
            alert("Se ha inscrito satisfactoriamente al ETS");
            navigate(`/alumno/MateriasReprobadas`);
            window.location.reload();
        }
        else{
            alert("No se ha podido registrar el ETS debido a que " + data.message);
            navigate(`/alumno/MateriasReprobadas`);
            window.location.reload();
        }
    })
    .catch((err) => console.log("Error", err));
}

const handleM = (id_grupo , id_mr) =>{
    setIDMR(id_mr);
    setIDGRU(id_grupo);
    setModalOpenCom(true);
}
const handleSC = () =>{
    fetch(`${API}/SubirComprobante`, {
        credentials : "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body : JSON.stringify({
            id_grupo,
            id_mr,
            documento 
        })
    }).then((res) => res.json())
    .then((data) =>{
        if(data.success){
            alert("Se ha subido correctamente el comprobante");
            navigate(`/alumno/MateriasReprobadas`);
            window.location.reload();

        }
    }).catch((err) => console.log("Error", err));
}


const handleHistor = (id) => {

    fetch(`${API}/ObtenerHistorialETS/${id}`, {
        credentials: "include"
    })
    .then((res) => res.json())
    .then((data) => {
        setHistorial(data.historial);
        setModalOpenH(true); 
    })
    .catch((err) => console.error("Error", err));

}


    return (
        <section>

            <h1>SECCION DE MATERIAS REPROBADAS POR EL ALUMNO</h1>

            <table border="2" cellPadding={5}>
                <thead>
                    <tr>
                        <th>
                            Materia
                        </th>
                        <th>
                            Creditos
                        </th>
                        <th>
                            Periodos restantes 
                        </th>
                        <th>
                            Recurse disponible
                        </th>
                        <th>
                            Estado actual
                        </th>
                        <th>
                            Acciones
                        </th>

                    </tr>
                </thead>

                <tbody>
                    {materias.length > 0 ?(
                        materias.map((materia) =>(
                            <tr key={materia.id}>
                                <td>{materia.Unidad_Aprendizaje.nombre}</td>
                                <td>{materia.Unidad_Aprendizaje.credito}</td>
                                <td>{materia.periodos_restantes}</td>
                                <td>{materia.recurse === 1 ? "si" : "no"}</td>
                                <td>{materia.estado_actual}</td>
                                <td>{(() => {
                                    const etsDeEstaMateria = compro.find(c => (c.id_mr === materia.id) && (c.calificado === 0));
                                    const validado = compro.find(c => (c.id_mr === materia.id) && (c.validado === 1));
                                    if(validado){
                                        return(
                                            <button disabled>EL COMPROBANTE ESTA VALIDADO</button>
                                        )
                                    }
                                    else{
                                    if (etsDeEstaMateria) {
                                     if (etsDeEstaMateria.comprobante) {
                                            return (
                                                <button disabled style={{ opacity: 0.5 }}>
                                                    Comprobante subido
                                                </button>
                                            );
                                        }

                                    else if(materia.estado_actual === "ETS"){
                                        return (
                                                <button onClick={()=> handleM(etsDeEstaMateria?.id_grupo, etsDeEstaMateria?.id_mr)}>
                                                    Subir comprobante de ETS
                                                </button>
                                            );
                                    }
                                    }
                                }

                                if (materia.estado_actual === "Recurse") {
                                    return " "; // vacío
                                }

                                return (
                                <button
                                    onClick={() => handleClickIns(materia.Unidad_Aprendizaje.nombre, materia.id)}
                                    disabled={etsDeEstaMateria !== undefined}
                                    style={etsDeEstaMateria ? { opacity: 0.5 } : {}}
                                >
                                    Inscribir ETS
                                </button>
                                );
                 })()} <br />
                 <button onClick = {() => handleHistor(materia.id)}>Revisar historial de ets</button>
                            </td>
                            </tr>
                        ))

                    ): (
                        <tr>
                            <td colSpan="7">NO TIENES MATERIAS REPROBADAS</td>
                        </tr>
                        
                    )}
                </tbody>

            </table>
        

<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
    <div className="ets-container">
        <h1 className="ets-title">Horarios para inscribir ETS</h1>

        {/* Si NO hay ningún grupo */}
        {horarios.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "18px" }}>
                No hay grupos disponibles para esta unidad de aprendizaje.
            </p>
        ) : (
            <div className="ets-grid">

                <div className="ets-card">
                    <h2 className="ets-subtitle">Matutino</h2>

                    {(() => {
    const grupoMatutino = horarios.filter(h => h.turno === "Matutino")[0];

    return (
        <>
            {grupoMatutino ? (
                <>
                    <div className="ets-info">
                        <p><strong>Turno:</strong> {grupoMatutino.turno}</p>
                        <p><strong>Horas:</strong> {grupoMatutino.hora_inicio} - {grupoMatutino.hora_final}</p>
                        <p><strong>Fecha:</strong> {grupoMatutino.fecha}</p>
                        <p>
                            <strong>Aplicante:</strong>{" "}
                            {grupoMatutino.DatosPersonale?.nombre}{" "}
                            {grupoMatutino.DatosPersonale?.ape_paterno}{" "}
                            {grupoMatutino.DatosPersonale?.ape_materno}
                        </p>
                    </div>

                    <button
                        onClick={() => handleI(grupoMatutino.id)}
                        className="ets-btn-inscribir"
                    >
                        Inscribir
                    </button>
                </>
            ) : (
                <p>No hay grupos matutinos disponibles.</p>
            )}
        </>
    );
})()}

                </div>

                {/* ---------------------- VESPERTINO ---------------------- */}
                <div className="ets-card">
                    <h2 className="ets-subtitle">Vespertino</h2>

                    {(() => {
    const grupoVespertino = horarios.filter(h => h.turno === "Vespertino")[0];

    return (
        <>
            {grupoVespertino ? (
                <>
                    <div className="ets-info">
                        <p><strong>Turno:</strong> {grupoVespertino.turno}</p>
                        <p><strong>Horas:</strong> {grupoVespertino.hora_inicio} - {grupoVespertino.hora_final}</p>
                        <p><strong>Fecha:</strong> {grupoVespertino.fecha}</p>
                        <p>
                            <strong>Aplicante:</strong>{" "}
                            {grupoVespertino.DatosPersonale?.nombre}{" "}
                            {grupoVespertino.DatosPersonale?.ape_paterno}{" "}
                            {grupoVespertino.DatosPersonale?.ape_materno}
                        </p>
                    </div>

                    <button
                        onClick={() => handleI(grupoVespertino.id)}
                        className="ets-btn-inscribir"
                    >
                        Inscribir
                    </button>
                </>
            ) : (
                <p>No hay grupos vespertinos disponibles.</p>
            )}
        </>
    );
})()}

                </div>

            </div>
        )}

        <div className="ets-footer">
            <button className="ets-btn-cerrar" onClick={() => setModalOpen(false)}>
                Cerrar
            </button>
        </div>
    </div>
</Modal>



<Modal open={modalOpenCom} onClose={() => setModalOpenCom(false)}>
    <h1>COMPROBANTE DE PAGO (SOLO PDF)</h1>
    <div className="form-group">

    <input
    type="file"
    accept="application/pdf"
    onChange={(e) => {
        const file = e.target.files?.[0];

        if (!file) return setDocumento(null);

        if (file.type !== "application/pdf") {
            alert("Solo se permiten archivos PDF.");
            e.target.value = "";
            setDocumento(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const full = reader.result;  
            const base64 = full.split(",")[1]; 
            setDocumento(base64);
        };
        reader.readAsDataURL(file);
    }}
/>


    {/* Opcional: Mostrar nombre del archivo PDF */}
    {documento && (
        <div style={{ marginTop: 8 }}>
            <p><strong>Archivo seleccionado:</strong> PDF cargado correctamente ✅</p>
        </div>
    )}

    <button onClick={handleSC}>SUBIR</button>
</div>
</Modal>

<Modal open={modalOpenH} onClose={() => setModalOpenH(false)}>
    <h1>HISTORIAL DE ETS</h1>
    <table border="1" cellPadding={5}>
        <thead>
            <tr>
                <th>Aplicante</th>
                <th>Turno</th>
                <th>Fecha</th>
                <th>Calificación</th>
            </tr>
        </thead>

        <tbody>
            {historial.length > 0 ? (
                historial.map((dato, index) => (
                    <tr key={index}>
                        <td>
                            {dato.ETS_Grupo.DatosPersonale?.nombre}{" "}
                            {dato.ETS_Grupo.DatosPersonale?.ape_paterno}{" "}
                            {dato.ETS_Grupo.DatosPersonale?.ape_materno}
                        </td>
                        <td>{dato.ETS_Grupo.turno}</td>
                        <td>{dato.ETS_Grupo.fecha}</td>
                        <td>{dato.calificado}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4">No hay datos disponibles</td>
                </tr>
            )}
        </tbody>
    </table>
</Modal>

            
        </section>
    )
}