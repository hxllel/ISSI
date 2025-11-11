import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import "./Inscripcion.css";

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
  const [d, setd] = useState(null);
  const [cursadas, setCursadas] = useState([]);
  const [alumno, setAlumno] = useState(null);

  // --- HISTORIAL DE CURSADAS ---
  useEffect(() => {
    fetch("http://localhost:4000/ObtenerHistorial", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const nombres = data.historial?.map((h) => h.unidad_aprendizaje) || [];
        setCursadas(nombres);
      })
      .catch((err) => console.error("Error", err));
  }, []);

  // --- BORRADOR ---
  useEffect(() => {
    fetch("http://localhost:4000/ConsultarBorrador", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const borr = Array.isArray(data && data.horario) ? data.horario : [];
        setBorr(borr);
      })
      .catch((err) => {
        console.error("Error al obtener el horario:", err);
        setBorr([]);
      });
  }, []);

  const handleClickDel = (id) => {
    setdel(true);
    setIdgru(id);
  };

  // --- GRUPOS DISPONIBLES ---
  useEffect(() => {
    fetch(`http://localhost:4000/Grupos/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.grupos) setGrupos(data.grupos);
        if (data.creditos) setCreditos(data.creditos);
      })
      .catch((err) => console.error("Error al obtener los grupos:", err));
  }, [id]);

  const handleClickAbrir = (id) => {
    setModalOpen(true);
    setId_dis(id);
  };

  // --- DISTRIBUCIÓN HORARIA ---
  useEffect(() => {
    if (modalOpen) {
      fetch(`http://localhost:4000/ObtenerDist/${id_dis}`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.Distri) setDistri(data.Distri);
        })
        .catch((err) => console.error("Error la distribucion de horas del grupo:", err));
    }
  }, [modalOpen, id_dis]);

  // --- TEMPORALES ---
  useEffect(() => {
    fetch("http://localhost:4000/Con", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGruposagg(data.tempGrupo);
          setCreditos(data.creditos);
        }
      });
  });

  const handleClickD = (id) => {
    setd(true);
    setIdgru(id);
  };

  // --- ELIMINAR DE BORRADOR ---
  useEffect(() => {
    if (d) {
      fetch(`http://localhost:4000/EliminarBorrador/${idgru}`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          alert(
            data.success
              ? "Se ha eliminado la materia de tu borrador de horario"
              : "No se ha podido eliminar la materia al borrador de horario"
          );
        })
        .catch((err) => console.error("Error al eliminar borrador:", err))
        .finally(() => setd(false));
    }
  }, [d, idgru]);

  // --- AGREGAR A HORARIO ---
  const handleClickAdd = (id) => {
    fetch(`http://localhost:4000/Agregar/${id}`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) alert("Se ha agregado la materia a tu horario");
        else alert(`No se ha podido agregar: ${data.err || ""}`);
      })
      .catch((err) => console.error("Error: ", err));
  };

  // --- ELIMINAR DE HORARIO ---
  const handleClickEl = (id) => {
    fetch(`http://localhost:4000/Del/${id}`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(
          data.success
            ? "Se ha eliminado la materia a tu horario"
            : "No se ha podido eliminar a tu horario"
        );
      })
      .catch((err) => console.error("Error: ", err));
  };

  // --- IMPORTAR DEL BORRADOR ---
  const handleClickImport = () => {
    fetch("http://localhost:4000/ImportarHorario", {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.fatal) alert(`NO SE HA AGREGADO NINGUNA MATERIA, ${data.msg}`);
        else if (data.success) alert("Se han agregado todas las materias a su horario");
        else alert(`Se han agregado algunas materias: ${data.msg}`);
      })
      .catch((err) => console.error("Error ", err));
  };

  // --- ELIMINAR BORRADOR FINAL ---
  useEffect(() => {
    if (del) {
      fetch(`http://localhost:4000/EliminarBorrador/${idgru}`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          alert(
            data.success
              ? "Se ha eliminado la materia de tu borrador de horario"
              : "No se ha podido eliminar la materia al borrador de horario"
          );
        })
        .catch((err) => console.error("Error al eliminar borrador:", err))
        .finally(() => setdel(false));
    }
  }, [del, idgru]);

  // --- INSCRIPCIÓN FINAL ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/Inscribirse`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Se ha inscrito satisfactoriamente");
          navigate(`/alumno/${id}`);
        } else alert("Ha ocurrido un error");
      });
  };

  // --- NAVEGACIÓN ---
  const handleIns = () => navigate(`/alumno/inscripcion/${id}`);
  const handleEditPer = () => navigate(`/alumno/datosPersonales/${id}`);
  const handleHorarios = () => navigate(`/alumno/horarios/${id}`);
  const handleLogout = () => navigate(`/`);
  const handleKardex = () => {navigate(`/alumno/Kardex/${id}`);};
  const handleChat = () => {navigate(`/alumno/Chat`, { state: { alumnoId: id } });};

  return (
    <section>
      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate(`/alumno/${id}`)} className="menu-item">
            Inicio
          </button>
          
          <button className="menu-item active"  onClick={handleIns}>Inscribir Materias </button>
          <button className="menu-item" onClick={handleHorarios}>Horarios</button>
          <button className="menu-item"onClick={handleKardex}>Kardex </button>
          <button className="menu-item" onClick={handleChat}>Asistente de Chat </button>
          <button className="menu-item" onClick={handleEditPer}>Información Personal</button>
           
        </nav>
        <button className="logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
          <h1>INSCRIPCIÓN DE MATERIAS</h1>
            
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
        <section className="gestion-alumnos">
          

          <div className="button-gap">
            <button type="button" className="submit-btn" onClick={handleClickImport}>
              Importar del borrador
            </button>
            <button type="button" className="submit-btn" onClick={() => setModalOpen2(true)}>
              Visualizar borrador de horario
            </button>
          </div>

          {/* === GRUPOS DISPONIBLES === */}
          <section className="horario-section">
            <h1>Grupos disponibles</h1>
            <table className="horario-table">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Unidad de Aprendizaje</th>
                  <th>Créditos</th>
                  <th>Profesor</th>
                  <th>Disponibilidad</th>
                  <th>Cupos</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {grupos.length > 0 ? (
                  grupos.map((grupo) => (
                    <tr key={grupo.id}>
                      <td>{grupo.nombre}</td>
                      <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                      <td>{grupo.Unidad_Aprendizaje.credito}</td>
                      <td>
                        {grupo.DatosPersonale.nombre} {grupo.DatosPersonale.ape_paterno}{" "}
                        {grupo.DatosPersonale.ape_materno}
                      </td>
                      <td>{grupo.cupo > 0 ? "Disponible" : "Lleno"}</td>
                      <td>{grupo.cupo}</td>
                      <td>
                        <button
                          type="button"
                          className="submit-btn"
                          onClick={() => handleClickAdd(grupo.id)}
                          disabled={
                            grupo.cupo <= 0 ||
                            gruposagg.includes(grupo.id) ||
                            cursadas.includes(grupo.Unidad_Aprendizaje.nombre)
                          }
                        >
                          Seleccionar
                        </button>
                        <button
                          type="button"
                          className="submit-btn"
                          onClick={() => handleClickAbrir(grupo.id)}
                        >
                          Mostrar Horario
                        </button>
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
          </section>

          {/* === GRUPOS SELECCIONADOS === */}
          <section className="horario-section">
            <h1>Grupos seleccionados</h1>
            <h2>Créditos restantes: {creditos}</h2>
            <table className="horario-table">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Unidad de Aprendizaje</th>
                  <th>Créditos</th>
                  <th>Profesor</th>
                  <th>Disponibilidad</th>
                  <th>Cupos</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {gruposagg.length > 0 ? (
                  grupos
                    .filter((grupo) => gruposagg.includes(grupo.id))
                    .map((grupo) => (
                      <tr key={grupo.id}>
                        <td>{grupo.nombre}</td>
                        <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                        <td>{grupo.Unidad_Aprendizaje.credito}</td>
                        <td>
                          {grupo.DatosPersonale.nombre} {grupo.DatosPersonale.ape_paterno}{" "}
                          {grupo.DatosPersonale.ape_materno}
                        </td>
                        <td>{grupo.cupo > 0 ? "Disponible" : "Lleno"}</td>
                        <td>{grupo.cupo}</td>
                        <td>
                          <button
                            type="button"
                            className="submit-btn"
                            onClick={() => handleClickEl(grupo.id)}
                          >
                            Eliminar
                          </button>
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
              <button type="submit" className="submit-btn">
                Realizar inscripción
              </button>
            </form>
          </section>

          {/* === MODAL HORARIO === */}
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia) => (
                    <td key={dia}>
                      {distri
                        .filter((dis) => dis.dia === dia)
                        .map((dis, i) => (
                          <div key={i}>
                            {dis.hora_ini} - {dis.hora_fin}
                          </div>
                        ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Modal>

          {/* === MODAL BORRADOR === */}
          <Modal open={modalOpen2} onClose={() => setModalOpen2(false)}>
            <h1>Borrador de horario</h1>
            <table border="1" cellPadding={5}>
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Profesor</th>
                  <th>Calificación</th>
                  <th>Materia</th>
                  <th>Cupo</th>
                  <th>Créditos</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                  <th>Válido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {borr.length > 0 ? (
                  borr.map((dato) => (
                    <tr key={dato.id}>
                      <td>{dato.Grupo.nombre}</td>
                      <td>
                        {dato.profesor.nombre} {dato.profesor.ape_paterno}{" "}
                        {dato.profesor.ape_materno}
                      </td>
                      <td>{dato.calificacion}</td>
                      <td>{dato.materia}</td>
                      <td>{dato.Grupo.cupo}</td>
                      <td>{dato.Grupo.Unidad_Aprendizaje.credito}</td>
                      <td>{dato.horas_lun || " "}</td>
                      <td>{dato.horas_mar || " "}</td>
                      <td>{dato.horas_mie || " "}</td>
                      <td>{dato.horas_jue || " "}</td>
                      <td>{dato.horas_vie || " "}</td>
                      <td>{dato.valido === 1 ? "Es válido" : "No válido"}</td>
                      <td>
                        <button
                          className="submit-btn"
                          onClick={() => handleClickD(dato.id_grupo)}
                        >
                          Retirar del borrador
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Modal>
        </section>
      </main>
    </section>
  );
}
