import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EvaluacionProfesores.css";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx";

export function EvaluacionProfesores() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API = 'http://localhost:4000';

  // Guardar objetos con id y nombre
  const [profesores, setProfesores] = useState([]);
  const [profesoresEvaluados, setProfesoresEvaluados] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const [mostrarCuestionario, setMostrarCuestionario] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(null);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [registroCount, setRegistroCount] = useState(null);
  const [fechaValida, setFechaValida] = useState(null);
  const [mensajeFecha, setMensajeFecha] = useState("Cargando...");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [comentario, setComentario] = useState("");

  // ---- PREGUNTAS ----
  const preguntas = [
    {
      id: 1,
      pregunta: "¿El profesor explica los temas de manera clara y comprensible?",
      opciones: [
        { texto: "Excelente", peso: 5 },
        { texto: "Muy bueno", peso: 4 },
        { texto: "Bueno", peso: 3 },
        { texto: "Regular", peso: 2 },
        { texto: "Deficiente", peso: 1 }
      ]
    },
    {
      id: 2,
      pregunta: "¿El profesor muestra dominio del contenido de la materia?",
      opciones: [
        { texto: "Excelente", peso: 5 },
        { texto: "Muy bueno", peso: 4 },
        { texto: "Bueno", peso: 3 },
        { texto: "Regular", peso: 2 },
        { texto: "Deficiente", peso: 1 }
      ]
    },
    {
      id: 3,
      pregunta: "¿El profesor fomenta la participación en clase?",
      opciones: [
        { texto: "Siempre", peso: 5 },
        { texto: "Casi siempre", peso: 4 },
        { texto: "Algunas veces", peso: 3 },
        { texto: "Pocas veces", peso: 2 },
        { texto: "Nunca", peso: 1 }
      ]
    },
    {
      id: 4,
      pregunta: "¿El profesor es puntual y respeta el horario de clase?",
      opciones: [
        { texto: "Siempre", peso: 5 },
        { texto: "Casi siempre", peso: 4 },
        { texto: "Algunas veces", peso: 3 },
        { texto: "Pocas veces", peso: 2 },
        { texto: "Nunca", peso: 1 }
      ]
    },
    {
      id: 5,
      pregunta: "¿El profesor resuelve dudas de manera efectiva?",
      opciones: [
        { texto: "Excelente", peso: 5 },
        { texto: "Muy bueno", peso: 4 },
        { texto: "Bueno", peso: 3 },
        { texto: "Regular", peso: 2 },
        { texto: "Deficiente", peso: 1 }
      ]
    },
    {
      id: 6,
      pregunta: "¿El material didáctico utilizado por el profesor es apropiado?",
      opciones: [
        { texto: "Totalmente de acuerdo", peso: 5 },
        { texto: "De acuerdo", peso: 4 },
        { texto: "Neutral", peso: 3 },
        { texto: "En desacuerdo", peso: 2 },
        { texto: "Totalmente en desacuerdo", peso: 1 }
      ]
    },
    {
      id: 7,
      pregunta: "¿El profesor muestra disposición para atender a los estudiantes?",
      opciones: [
        { texto: "Siempre", peso: 5 },
        { texto: "Casi siempre", peso: 4 },
        { texto: "Algunas veces", peso: 3 },
        { texto: "Pocas veces", peso: 2 },
        { texto: "Nunca", peso: 1 }
      ]
    },
    {
      id: 8,
      pregunta: "¿Las evaluaciones del profesor son justas y objetivas?",
      opciones: [
        { texto: "Totalmente de acuerdo", peso: 5 },
        { texto: "De acuerdo", peso: 4 },
        { texto: "Neutral", peso: 3 },
        { texto: "En desacuerdo", peso: 2 },
        { texto: "Totalmente en desacuerdo", peso: 1 }
      ]
    },
    {
      id: 9,
      pregunta: "¿El profesor retroalimenta de manera constructiva el trabajo de los estudiantes?",
      opciones: [
        { texto: "Siempre", peso: 5 },
        { texto: "Casi siempre", peso: 4 },
        { texto: "Algunas veces", peso: 3 },
        { texto: "Pocas veces", peso: 2 },
        { texto: "Nunca", peso: 1 }
      ]
    },
    {
      id: 10,
      pregunta: "¿Recomendarías este profesor a otros estudiantes?",
      opciones: [
        { texto: "Definitivamente sí", peso: 5 },
        { texto: "Probablemente sí", peso: 4 },
        { texto: "No estoy seguro", peso: 3 },
        { texto: "Probablemente no", peso: 2 },
        { texto: "Definitivamente no", peso: 1 }
      ]
    }
  ];

  useEffect(() => {
  fetch(`${API}/ValidarFechaEvaluacion`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      console.log("VALIDAR FECHA RESPUESTA:", data); 

      setFechaValida(data.valido || false);
      setMensajeFecha(data.mensaje || "Error al validar fecha");
    })
    .catch((err) => {
      console.error("Error al validar fecha:", err);
      setFechaValida(false);
      setMensajeFecha("Error al validar la fecha de evaluación");
    });
}, []);


  useEffect(() => {
    // Validar fechas de evaluación
    fetch(`${API}/ValidarFechaEvaluacionProfe`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFechaValida(data.valida);
          setMensajeFecha(data.mensaje);
          setFechaInicio(data.fechaInicio);
          setFechaFin(data.fechaFin);
        } else {
          setFechaValida(false);
          setMensajeFecha(data.error || "No hay fechas de evaluación configuradas");
        }
      })
      .catch((err) => {
        setFechaValida(false);
        setMensajeFecha("Error al verificar periodo de evaluación");
      });

    // Obtener profesores del horario
    fetch(`${API}/ObtenerHorario/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.horario && Array.isArray(data.horario)) {
          // Extraer id y nombre del profesor
          const profUnicos = [];
          const idsSet = new Set();
          data.horario.forEach((h) => {
            if (h.id_profesor && !idsSet.has(h.id_profesor)) {
              profUnicos.push({
                id: h.id_profesor,
                nombre: h.profesor
              });
              idsSet.add(h.id_profesor);
            }
          });
          setProfesores(profUnicos);
        }
      })
      .catch((err) => {});

    // Obtener profesores ya evaluados por el alumno
    fetch(`${API}/api/profesor/evaluados/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.evaluados)) {
          setProfesoresEvaluados(data.evaluados);
        }
      })
      .catch((err) => {});
  }, [id]);

  const handleRespuesta = (preguntaId, peso) => {
    setRespuestas({ ...respuestas, [preguntaId]: peso });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(respuestas).length !== preguntas.length) {
      alert("Por favor responde todas las preguntas antes de enviar la evaluación.");
      return;
    }

    if (!profesorSeleccionado) {
      alert("Por favor selecciona un profesor para evaluar.");
      return;
    }

    const total = Object.values(respuestas).reduce((acc, p) => acc + p, 0);
    setPuntuacionTotal(total);

    try {
      const resp = await axios.post(
        `${API}/ActualizarContadorProfesor`,
        {
          id_profesor: profesorSeleccionado.id,
          profesor: profesorSeleccionado.nombre,
          alumnoId: id,
          suma: total,
        },
        { withCredentials: true }
      );

      const registrado = resp?.data?.registrado ?? resp?.data?.registro ?? resp?.data?.count ?? null;

      if (registroCount !== null) setRegistroCount(registrado);

      setMostrarResultado(true);
      // Enviar reseña de texto al endpoint de reseñas (sin bloquear UX)
      try {
        const calPromedio = total / preguntas.length; // promedio entre 1 y 5
        await axios.post(`${API}/api/profesor/${profesorSeleccionado.id}/evaluaciones`, {
          id_alumno: id,
          calificacion: calPromedio,
          comentario: comentario ? comentario.trim() : null,
        }, { withCredentials: true });
      } catch (errPost) {
        console.error('Error al enviar reseña textual:', errPost);
        // No mostramos error al usuario para no romper flujo; lo registramos en consola.
      }
    } catch (err) {
      console.error("Error al enviar evaluación:", err);
      alert("No se pudo enviar la evaluación. Intenta más tarde.");
    }
  };

  // ---- RESET ----
  const resetEvaluacion = () => {
    setProfesorSeleccionado(null);
    setMostrarCuestionario(false);
    setRespuestas({});
    setMostrarResultado(false);
    setPuntuacionTotal(0);
  };

  // ---- SELECCIONAR PROFESOR PARA EVALUAR ----
  const handleEvaluarProfesor = (profesorObj) => {
    if (!fechaValida) {
      const inicio = fechaInicio ? new Date(fechaInicio).toLocaleDateString() : 'N/A';
      const fin = fechaFin ? new Date(fechaFin).toLocaleDateString() : 'N/A';
      alert(`No se puede evaluar fuera del periodo de evaluación.\n\nPeriodo: ${inicio} - ${fin}`);
      return;
    }
    setProfesorSeleccionado(profesorObj);
    setMostrarCuestionario(true);
    setRespuestas({});
  };

  // ---- VOLVER A LA LISTA ----
  const volverALista = () => {
    setMostrarCuestionario(false);
    setProfesorSeleccionado(null);
    setRespuestas({});
  };

  // ---- RENDER ----
  return (
    <div className="alumno-container">
      <SidebarAlumno />

      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Evaluación de Profesores</h1>
          </div>
          <p>Comparte tu opinión sobre el desempeño de tus profesores</p>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>

        {fechaValida === null ? (
          <section className="mensaje-no-disponible">
            <div className="mensaje-card">
              <h3>{mensajeFecha}</h3>
            </div>
          </section>
        ) : !fechaValida ? (
          <section className="mensaje-no-disponible">
            <div className="mensaje-card">
              <h3>{mensajeFecha}</h3>
              <p>La evaluación de profesores solo está disponible en la fecha indicada por la institución.</p>
              {fechaInicio && fechaFin && (
                <p><strong>Periodo:</strong> {new Date(fechaInicio).toLocaleDateString()} - {new Date(fechaFin).toLocaleDateString()}</p>
              )}
            </div>
          </section>
        ) : !mostrarResultado ? (
          <>
            {!mostrarCuestionario ? (
              <section className="lista-profesores">
                <div className="lista-header">
                  <h2>Mis Profesores</h2>
                  <p>Selecciona un profesor para evaluar</p>
                </div>

                <div className="tabla-container">
                  <table className="tabla-profesores">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Profesor</th>
                        <th>Acción</th>
                      </tr>
                    </thead>

                    <tbody>
                      {profesores.filter(p => !profesoresEvaluados.includes(p.id)).length > 0 ? (
                        profesores.filter(p => !profesoresEvaluados.includes(p.id)).map((profesorObj, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="nombre-profesor">{profesorObj.nombre}</td>
                            <td>
                              <button
                                className="btn-evaluar"
                                onClick={() => handleEvaluarProfesor(profesorObj)}
                              >
                                Evaluar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No hay profesores disponibles</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <button
                  className="btn-cancelar"
                  onClick={() => navigate(`/alumno/${id}`)}
                >
                  Volver al inicio
                </button>
              </section>
            ) : (
              <section className="formulario-evaluacion">
                <div className="profesor-evaluando">
                  <h2>Evaluando a: {profesorSeleccionado?.nombre}</h2>
                  <button className="btn-volver-lista" onClick={volverALista}>
                    ← Volver a la lista
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="form-preguntas">
                  {preguntas.map((pregunta) => (
                    <div key={pregunta.id} className="pregunta-card">
                      <h3>
                        {pregunta.id}. {pregunta.pregunta}
                      </h3>

                      <div className="opciones-container">
                        {pregunta.opciones.map((opc, i) => (
                          <label key={i} className="opcion-label">
                            <input
                              type="radio"
                              name={`pregunta-${pregunta.id}`}
                              value={opc.peso}
                              onChange={() =>
                                handleRespuesta(pregunta.id, opc.peso)
                              }
                              checked={respuestas[pregunta.id] === opc.peso}
                            />
                            {opc.texto}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="comentario-section">
                    <label htmlFor="comentario" className="comentario-label">Comentario (opcional):</label>
                    <textarea
                      id="comentario"
                      className="comentario-input"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      placeholder="Escribe aquí tu reseña para el profesor (sin revelar tu identidad)."
                      maxLength={1000}
                      rows={4}
                    />
                  </div>

                  <div className="botones-container">
                    <button type="submit" className="btn-enviar">
                      Enviar Evaluación
                    </button>

                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={volverALista}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </section>
            )}
          </>
        ) : (
          <section className="resultado-evaluacion">
            <div className="resultado-card">
              <h2>¡Evaluación Completada!</h2>
              <div className="resultado-info">
                <p><strong>Profesor evaluado:</strong> {profesorSeleccionado?.nombre}</p>

                <div className="puntuacion-box">
                  <p className="puntuacion-label">Puntuación Total enviada:</p>
                  <p className="puntuacion-valor">{puntuacionTotal} / {preguntas.length * 5}</p>
                  {registroCount !== null && (
                    <p className="registro-count">Veces evaluado: {registroCount}</p>
                  )}
                </div>

              <p><strong>Profesor:</strong> {profesorSeleccionado}</p>
              <p>Puntuación total: {puntuacionTotal}</p>
              {registroCount !== null && (
                <p>Veces evaluado: {registroCount}</p>
              )}

              <button className="btn-nueva" onClick={resetEvaluacion}>
                Evaluar otro profesor
              </button>

              <button
                className="btn-volver"
                onClick={() => navigate(`/alumno/${id}`)}
              >
                Volver al inicio
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
