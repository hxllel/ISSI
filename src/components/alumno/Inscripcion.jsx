import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import "./Inscripcion.css";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx";

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
  const [NoReinscripcion, setNoRe] = useState([]);
  const [filtroTurno, setFiltroTurno] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroSemestre, setFiltroSemestre] = useState("");

  const API = "http://localhost:4000";

  const safe = (value, fallback) =>
    value !== null && value !== undefined ? value : fallback;

  const safeArray = (value) => (Array.isArray(value) ? value : []);

  // HISTORIAL CURSADAS
  useEffect(() => {
    fetch(`${API}/ObtenerHistorial`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const nombres = safeArray(data?.historial).map(
          (h) => h.unidad_aprendizaje
        );
        setCursadas(nombres);
      })
      .catch(() => setCursadas([]));
  }, []);

  // BORRADOR
  useEffect(() => {
    fetch(`${API}/ConsultarBorrador`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const borr = Array.isArray(data?.horario) ? data.horario : [];
        setBorr(borr);
      })
      .catch(() => setBorr([]));
  }, []);

  // NO REINSCRIPCIÓN
  useEffect(() => {
    fetch(`${API}/NoReinscripcion`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setNoRe(safeArray(data?.grupos)))
      .catch(() => setNoRe([]));
  }, []);

  // GRUPOS DISPONIBLES
  useEffect(() => {
    fetch(`${API}/Grupos/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setGrupos(safeArray(data?.grupos));
        setCreditos(safe(data?.creditos, 0));
      })
      .catch(() => {
        setGrupos([]);
        setCreditos(0);
      });
  }, [id]);

  const handleClickAbrir = (id) => {
    setModalOpen(true);
    setId_dis(id);
  };

  // DISTRIBUCIÓN HORARIA
  useEffect(() => {
    if (!modalOpen || !id_dis) return;

    fetch(`${API}/ObtenerDist/${id_dis}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDistri(safeArray(data?.Distri)))
      .catch(() => setDistri([]));
  }, [modalOpen, id_dis]);

  // TEMPORALES
  useEffect(() => {
    fetch(`${API}/Con`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setGruposagg(safeArray(data?.tempGrupo));
          setCreditos(safe(data?.creditos, 0));
        }
      })
      .catch(() => {});
  });

  const handleClickD = (id) => {
    setd(true);
    setIdgru(id);
  };

  // ELIMINAR DE BORRADOR
  useEffect(() => {
    if (!d || !idgru) return;

    fetch(`${API}/EliminarBorrador/${idgru}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        alert(
          data?.success
            ? "Se ha eliminado la materia del borrador"
            : "No se pudo eliminar"
        )
      )
      .finally(() => setd(false));
  }, [d, idgru]);

  // AGREGAR A HORARIO
  const handleClickAdd = (id) => {
    if (!id) return;

    fetch(`${API}/Agregar/${id}`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) alert("Se ha agregado la materia");
        else alert(`No se pudo agregar: ${safe(data?.err, "")}`);
      });
  };

  // ELIMINAR DEL HORARIO
  const handleClickEl = (id) => {
    fetch(`${API}/Del/${id}`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) =>
        alert(
          data.success
            ? "Se ha eliminado la materia a tu horario"
            : "No se ha podido eliminar"
        )
      );
  };

  // IMPORTAR BORRADOR
  const handleClickImport = () => {
    fetch(`${API}/ImportarHorario`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.fatal) alert(`NO SE AGREGÓ NADA: ${data.msg}`);
        else if (data?.success) alert("Se importó correctamente");
        else alert(`Importado parcial: ${safe(data?.msg, "")}`);
      });
  };

  // ELIMINAR BORRADOR FINAL
  useEffect(() => {
    if (!del || !idgru) return;

    fetch(`${API}/EliminarBorrador/${idgru}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        alert(
          data?.success
            ? "Se ha eliminado la materia del borrador"
            : "No se ha podido eliminar"
        )
      )
      .finally(() => setdel(false));
  }, [del, idgru]);

  // INSCRIPCIÓN FINAL
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API}/Inscribirse`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Se ha inscrito satisfactoriamente");
          navigate(`/alumno/${id}`);
          window.location.reload();
        } else alert("Ha ocurrido un error");
      });
  };

  return (
    <section>
      {/* === SIDEBAR === */}
      <SidebarAlumno />

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="main-content">
        <section className="gestion-alumnos">
          <div className="header-section">
            <h1>INSCRIPCIÓN DE MATERIAS</h1>
          </div>

          <div className="button-gap">
            <button type="button" className="submit-btn" onClick={handleClickImport}>
              Importar del borrador
            </button>
            <button type="button" className="submit-btn" onClick={() => setModalOpen2(true)}>
              Visualizar borrador de horario
            </button>
          </div>

          {/* GRUPOS DISPONIBLES */}
          <section className="horario-section">
            <h1>Grupos disponibles</h1>
            
            <div className="filtros-container" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Buscar por grupo..."
                value={filtroGrupo}
                onChange={(e) => setFiltroGrupo(e.target.value)}
                className="filtro-input"
                style={{ padding: '0.5rem' }}
              />
              <select 
                value={filtroTurno} 
                onChange={(e) => setFiltroTurno(e.target.value)}
                className="filtro-select"
                style={{ padding: '0.5rem' }}
              >
                <option value="">Todos los turnos</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </select>
              <select 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="filtro-select"
                style={{ padding: '0.5rem' }}
              >
                <option value="">Todos los tipos</option>
                <option value="OBLIGATORIA">OBLIGATORIA</option>
                <option value="OPTATIVA">OPTATIVA</option>
              </select>
              <select 
                value={filtroSemestre} 
                onChange={(e) => setFiltroSemestre(e.target.value)}
                className="filtro-select"
                style={{ padding: '0.5rem' }}
              >
                <option value="">Todos los semestres</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>{sem}° Semestre</option>
                ))}
              </select>
            </div>

            <table className="horario-table">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Unidad de Aprendizaje</th>
                  <th>Tipo</th>
                  <th>Créditos</th>
                  <th>Profesor</th>
                  <th>Disponibilidad</th>
                  <th>Cupo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {grupos.length > 0 ? (
                  grupos
                    .filter((grupo) => {
                      const matchTurno = !filtroTurno || grupo.turno === filtroTurno;
                      const matchTipo = !filtroTipo || grupo.Unidad_Aprendizaje.tipo === filtroTipo;
                      const matchGrupo = !filtroGrupo || grupo.nombre.toLowerCase().includes(filtroGrupo.toLowerCase());
                      const matchSemestre = !filtroSemestre || grupo.nombre.charAt(0) === filtroSemestre;
                      return matchTurno && matchTipo && matchGrupo && matchSemestre;
                    })
                    .map((grupo) => (
                    <tr key={grupo.id}>
                      <td>{grupo.nombre}</td>
                      <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                      <td>{grupo.Unidad_Aprendizaje.tipo}</td>
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
                            cursadas.includes(grupo.Unidad_Aprendizaje.nombre) ||
                            NoReinscripcion.includes(grupo.Unidad_Aprendizaje.id)
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

          {/* GRUPOS SELECCIONADOS */}
          <section className="horario-section">
            <h1>Grupos seleccionados</h1>
            <h2>Créditos restantes: {creditos}</h2>

            <table className="horario-table">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Unidad de Aprendizaje</th>
                  <th>Tipo</th>
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
                        <td>{grupo.Unidad_Aprendizaje.tipo}</td>
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

          {/* MODAL HORARIO */}
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

          {/* MODAL BORRADOR */}
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
