import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiDownload } from "react-icons/fi";
import Modal from "../Modal";
import  "./Horarios.css";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx";


export default function Horarios({ alumnoId: propAlumnoId, onClose }) {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const [borr, setBorr] = useState([]);
  const [cursadas, setCursadas] = useState([]);
  const [carrera, setCarrera] = useState("");

  const alumnoId = propAlumnoId || params.id;

  const [add, setAdd] = useState(null);
  const [idgru, setIdgru] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [del, setdel] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const API = "http://localhost:4000";

  const safeArray = (value) => (Array.isArray(value) ? value : []);

    useEffect(() => {
      fetch(`${API}/ObtenerHistorial`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          const nombres = safeArray(data?.historial).map(
            (h) => h.unidad_aprendizaje
          );
          setCursadas(nombres);
          setCarrera(data.carrera);
        })
        .catch(() => setCursadas([]));
    }, []);

  useEffect(() => {
    fetch(`${API}/ObtenerGrupo`, { credentials: "include", })
      .then((res) => res.json())
      .then((data) => {
        const cursos = Array.isArray(data && data.cursos) ? data.cursos : [];
        setDatos(cursos);
        console.log('ObtenerGrupo response count =', cursos.length);
      })
      .catch((err) => {
        console.error("Error al obtener los cursos:", err);
        setDatos([]);
      });
  }, []);

  useEffect(() => {
    fetch(`${API}/ConsultarBorrador`, { credentials: "include", })
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


  const handleClickAdd = (id) => {
    setAdd(true);
    setIdgru(id);
  }

  const handleClickDel = (id) => {
    setdel(true);
    setIdgru(id);
  }


  useEffect(() => {
    if (add) {
      fetch(`${API}/AgregarBorrador/${idgru}`, { method: "POST", credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Se ha agregado exitosamente a tu borrador de horario la materia");
            window.location.reload();

          } else {
            alert("No se ha podido agregar la materia al borrador de horario");
            window.location.reload();

          }
        })
        .catch((err) => console.error("Error al agregar borrador:", err))
        .finally(() => setAdd(false));
    }
  }, [add]);

  useEffect(() => {
    if (del) {
      fetch(`${API}/EliminarBorrador/${idgru}`, { method: "POST", credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Se ha eliminado la materia de tu borrador de horario");
            window.location.reload();

          } else {
            alert("No se ha podido eliminar la materia al borrador de horario");
            window.location.reload();

          }
        })
        .catch((err) => console.error("Error al eliminar borrador:", err))
        .finally(() => setAdd(false));

    }
  }, [del]);



  return (
    <div className="alumno-container">
    <section>
      <SidebarAlumno />
    <main className="main-content">
      <header className="chat-header">
          <div className="encabezado-section">
          <h1>HORARIOS</h1>
            
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
      <section className="gestion-alumnos">
                    
      

      
      <section className="gestion-alumnos">
      <table className="horario-table1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profesor</th>
            <th>Unidad de Aprendizaje</th>
            <th>Turno</th>
            <th>Carrera</th>
            <th>Cupo</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(datos) ? datos : []).map((dato) => {
            // Distribuciones pueden venir como array o como objeto único
            const distribsRaw = dato.Distribucion || [];
            const distribs = Array.isArray(distribsRaw) ? distribsRaw : [distribsRaw];

            const horasPorDia = (dia) => {
              if (dia === 'Miércoles') {
                const vals = distribs
                  .filter(d => d && (d.dia === 'Miércoles' || d.dia === 'Miércoles'))
                  .map(d => `${d.hora_ini} - ${d.hora_fin}`);
                return vals.join(', ');
              }
              const vals = distribs
                .filter(d => d && d.dia === dia)
                .map(d => `${d.hora_ini} - ${d.hora_fin}`);
              return vals.join(', ');
            };

            const estaCursada = cursadas.includes(dato.Unidad_Aprendizaje.nombre);
            let carreraValida = false;
            if(dato.Unidad_Aprendizaje.carrera != carrera){
              carreraValida = true;
            }
            return (
              
              <tr key={dato.id}>
                <td>{dato.nombre}</td>
                <td>{dato.DatosPersonale && `${dato.DatosPersonale.nombre || ''} ${dato.DatosPersonale.ape_paterno || ''} ${dato.DatosPersonale.ape_materno || ''}`}</td>
                <td>{dato.Unidad_Aprendizaje && dato.Unidad_Aprendizaje.nombre}</td>
                <td>{dato.turno}</td>
                <td>{dato.Unidad_Aprendizaje && dato.Unidad_Aprendizaje.carrera}</td>
                <td>{dato.cupo}</td>
                <td>{horasPorDia('Lunes') || ' '}</td>
                <td>{horasPorDia('Martes') || ' '}</td>
                <td>{horasPorDia('Miércoles') || ' '}</td>
                <td>{horasPorDia('Jueves') || ' '}</td>
                <td>{horasPorDia('Viernes') || ' '}</td>
                <td><button
                      type="button"
                      className="btn azul"
                      onClick={() => handleClickAdd(dato.id)}
                      disabled={
                        borr.some(b => b.id_grupo === dato.id) ||
                        estaCursada || 
                        carreraValida
                      }
                    >
                      <FiPlus style={{ marginRight: "8px" }} />
                        Agregar al borrador
                    </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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
              <th>Miércoles</th>
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
                  <td><button type="button" className="btn azul" onClick={() => handleClickDel(dato.id_grupo)}>
                    Retirar del borrador</button></td>
                </tr>
              ))
            ) : (
              <tr colSpan="12"><td>No hay datos disponibles</td></tr>
            )}
          </tbody>

        </table>

      </Modal>
      
     
        
        <div className="download-button">
          <div>
          <button type="button" className="btn azul" onClick={() => setModalOpen(true)}>
        <FiEye style={{ marginRight: "8px" }} />
        Ver borrador
        </button>
        </div>
        <div> 
          
          <button type="button" className="btn azul" >
        <FiDownload style={{ marginRight: "8px" }} />
        Descargar Horario
        </button>
        </div>
        </div>

      </section>
      
      </section>
      </main>
    </section>
    </div>

  );
}
