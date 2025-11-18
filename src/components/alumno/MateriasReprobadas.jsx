import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import "./MateriasReprobadas.css";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx";


export function MateriasReprobadas() {
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
  const API = "http://localhost:4000";

  const navigate = useNavigate();
  const { id } = useParams(); // por si lo usas en la URL, si no, queda undefined

  // ================== DATOS REALES DESDE BACKEND ==================
  useEffect(() => {
    fetch(`${API}/ObtenerMateriasReprobadas`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMaterias(data.materias);
        setComprobante(data.compro);
      })
      .catch((err) =>
        console.error("Error al obtener la informacion: ", err)
      );
  }, []);

  // ================== MODO DEMO (DESCOMENTAR PARA PROBAR UI) ==================
  /*
  useEffect(() => {
    // Datos de prueba para ver la UI aunque el backend no regrese nada
    setMaterias([
      {
        id: 1,
        Unidad_Aprendizaje: { nombre: "Matemáticas I", credito: 8 },
        periodos_restantes: 2,
        recurse: 1,
        estado_actual: "ETS",
      },
    ]);
    setComprobante([]);
  }, []);
  */

  // ================== HANDLERS DE NAVEGACIÓN DEL SIDEBAR ==================
  const goInicio = () => {
    if (id) navigate(`/alumno/${id}`);
    else navigate("/alumno");
  };

  const handleIns = () => {
    if (id) navigate(`/alumno/inscripcion/${id}`);
    else alert("No se encontró el id del alumno para inscribir materias.");
  };

  const handleHorarios = () => {
    if (id) navigate(`/alumno/horarios/${id}`);
    else alert("No se encontró el id del alumno para ver horarios.");
  };

  const handleChat = () => {
    if (id) navigate(`/alumno/Chat`, { state: { alumnoId: id } });
    else navigate("/alumno/Chat");
  };

  const handleKardex = () => {
    navigate("/alumno/Kardex");
  };

  const handleEvaluacion = () => {
    if (id) navigate(`/alumno/evaluacion/${id}`);
    else alert("No se encontró el id del alumno para evaluación.");
  };

  const handleEditPer = () => {
    if (id) navigate(`/alumno/editarDatos/${id}`);
    else alert("No se encontró el id del alumno para editar datos.");
  };

  const handleLogout = () => {
    // aquí puedes meter tu lógica real de logout
    navigate("/");
  };

  // ================== LÓGICA DE ETS / COMPROBANTES ==================

  // Traer grupos ETS y abrir modal de horarios
  const handleClickIns = (idUnidadAprendizaje, idMateriaReprobada) => {
    setIDMR(idMateriaReprobada);
    fetch(`${API}/ObtenerGruposEts/${idUnidadAprendizaje}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHorarios(data.horarios);
        setModalOpen(true);
      })
      .catch((err) => console.error("Error", err));
  };

  // Inscribir ETS en un grupo (desde el modal)
  const handleI = (id_grupo) => {
    fetch(`${API}/RegistrarETS`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_mr,
        id_grupo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Se ha inscrito satisfactoriamente al ETS");
        } else {
          alert(
            "No se ha podido registrar el ETS debido a que " + data.message
          );
        }
        navigate(`/alumno/MateriasReprobadas`);
        window.location.reload();
      })
      .catch((err) => console.log("Error", err));
  };

  // Preparar datos y abrir modal de comprobante
  const handleM = (id_grupo, id_mr) => {
    setIDMR(id_mr);
    setIDGRU(id_grupo);
    setModalOpenCom(true);
  };

  // Subir comprobante
  const handleSC = () => {
    fetch(`${API}/SubirComprobante`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_grupo,
        id_mr,
        documento,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Se ha subido correctamente el comprobante");
          navigate(`/alumno/MateriasReprobadas`);
          window.location.reload();
        }
      })
      .catch((err) => console.log("Error", err));
  };

  // Traer historial y abrir modal de historial
  const handleHistor = (idMateria) => {
    fetch(`${API}/ObtenerHistorialETS/${idMateria}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHistorial(data.historial);
        setModalOpenH(true);
      })
      .catch((err) => console.error("Error", err));
  };

  return (
    <div className="alumno-container">
      <SidebarAlumno />

      {/* =============== CONTENIDO PRINCIPAL =============== */}
      <main className="main-content">
        <header className="chat-header">
          <div className ="encabezado-section">
            <h1>Materias reprobadas</h1>
            </div>
            <p>Consulta tus ETS, comprobantes y historial.</p>
          
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />

        </header>

        <section className="horario-section materias-section">
          <h2>Listado de materias reprobadas</h2>

          <table className="materias-table">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Créditos</th>
                <th>Periodos restantes</th>
                <th>Recurse disponible</th>
                <th>Estado actual</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {materias.length > 0 ? (
                materias.map((materia) => {
                  const etsDeEstaMateria = compro.find(
                    (c) => c.id_mr === materia.id && c.calificado === 0
                  );
                  const validado = compro.find(
                    (c) => c.id_mr === materia.id && c.validado === 1
                  );

                  return (
                    <tr key={materia.id}>
                      <td>{materia.Unidad_Aprendizaje.nombre}</td>
                      <td>{materia.Unidad_Aprendizaje.credito}</td>
                      <td>{materia.periodos_restantes}</td>
                      <td>{materia.recurse === 1 ? "Sí" : "No"}</td>
                      <td>{materia.estado_actual}</td>
                      <td>
                        {(() => {
                          if (validado) {
                            return (
                              <button disabled>
                                EL COMPROBANTE ESTA VALIDADO
                              </button>
                            );
                          } else {
                            if (etsDeEstaMateria) {
                              if (etsDeEstaMateria.comprobante) {
                                return (
                                  <button disabled style={{ opacity: 0.5 }}>
                                    Comprobante subido
                                  </button>
                                );
                              } else if (materia.estado_actual === "ETS") {
                                return (
                                  <button
                                    onClick={() =>
                                      handleM(
                                        etsDeEstaMateria?.id_grupo,
                                        etsDeEstaMateria?.id_mr
                                      )
                                    }
                                  >
                                    Subir comprobante de ETS
                                  </button>
                                );
                              }
                            }
                          }

                          if (materia.estado_actual === "Recurse") {
                            return " ";
                          }

                          return (
                            <button
                              onClick={() =>
                                handleClickIns(
                                  materia.Unidad_Aprendizaje.nombre,
                                  materia.id
                                )
                              }
                              disabled={etsDeEstaMateria !== undefined}
                              style={
                                etsDeEstaMateria
                                  ? { opacity: 0.5 }
                                  : undefined
                              }
                            >
                              Inscribir ETS
                            </button>
                          );
                        })()}
                        <br />
                        <button onClick={() => handleHistor(materia.id)}>
                          Revisar historial de ets
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">NO TIENES MATERIAS REPROBADAS</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* =============== MODAL: HORARIOS ETS =============== */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="ets-container">
          <h1 className="ets-title">Horarios para inscribir ETS</h1>

          {horarios.length === 0 ? (
            <p className="ets-empty">
              No hay grupos disponibles para esta unidad de aprendizaje.
            </p>
          ) : (
            <div className="ets-grid">
              {/* MATUTINO */}
              <div className="ets-card">
                <h2 className="ets-subtitle">Matutino</h2>
                {(() => {
                  const grupoMatutino = horarios.filter(
                    (h) => h.turno === "Matutino"
                  )[0];

                  return (
                    <>
                      {grupoMatutino ? (
                        <>
                          <div className="ets-info">
                            <p>
                              <strong>Turno:</strong> {grupoMatutino.turno}
                            </p>
                            <p>
                              <strong>Horas:</strong>{" "}
                              {grupoMatutino.hora_inicio} -{" "}
                              {grupoMatutino.hora_final}
                            </p>
                            <p>
                              <strong>Fecha:</strong> {grupoMatutino.fecha}
                            </p>
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

              {/* VESPERTINO */}
              <div className="ets-card">
                <h2 className="ets-subtitle">Vespertino</h2>
                {(() => {
                  const grupoVespertino = horarios.filter(
                    (h) => h.turno === "Vespertino"
                  )[0];

                  return (
                    <>
                      {grupoVespertino ? (
                        <>
                          <div className="ets-info">
                            <p>
                              <strong>Turno:</strong> {grupoVespertino.turno}
                            </p>
                            <p>
                              <strong>Horas:</strong>{" "}
                              {grupoVespertino.hora_inicio} -{" "}
                              {grupoVespertino.hora_final}
                            </p>
                            <p>
                              <strong>Fecha:</strong> {grupoVespertino.fecha}
                            </p>
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
            <button
              className="ets-btn-cerrar"
              onClick={() => setModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>

      {/* =============== MODAL: SUBIR COMPROBANTE =============== */}
      <Modal open={modalOpenCom} onClose={() => setModalOpenCom(false)}>
        <div className="ets-container">
          <h1 className="ets-title">Comprobante de pago (solo PDF)</h1>
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

            {documento && (
              <div className="file-ok">
                <p>
                  <strong>Archivo seleccionado:</strong> PDF cargado
                  correctamente ✅
                </p>
              </div>
            )}

            <button onClick={handleSC} className="ets-btn-inscribir">
              Subir comprobante
            </button>
          </div>
        </div>
      </Modal>

      {/* =============== MODAL: HISTORIAL ETS =============== */}
      <Modal open={modalOpenH} onClose={() => setModalOpenH(false)}>
        <div className="ets-container">
          <h1 className="modal-historial-title">Historial de ETS</h1>
          <table className="modal-historial-table">
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
          <div className="ets-footer">
            <button
              className="ets-btn-cerrar"
              onClick={() => setModalOpenH(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
