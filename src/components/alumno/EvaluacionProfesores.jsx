import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EvaluacionProfesores.css";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx";

export function EvaluacionProfesores() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API = 'http://localhost:4000';

  const [profesores, setProfesores] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("");
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(null);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [registroCount, setRegistroCount] = useState(null);
  const [fechaValida, setFechaValida] = useState(null);
  const [mensajeFecha, setMensajeFecha] = useState("Cargando...");

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

  // ---- VALIDAR FECHA ----
  useEffect(() => {
  fetch(`${API}/ValidarFechaEvaluacion`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      console.log("VALIDAR FECHA RESPUESTA:", data);  // ⬅️ AGREGA ESTO

      setFechaValida(data.valido || false);
      setMensajeFecha(data.mensaje || "Error al validar fecha");
    })
    .catch((err) => {
      console.error("Error al validar fecha:", err);
      setFechaValida(false);
      setMensajeFecha("Error al validar la fecha de evaluación");
    });
}, []);


  // ---- OBTENER PROFESORES ----
  useEffect(() => {
    fetch(`${API}/ObtenerHorario/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.horario && Array.isArray(data.horario)) {
          const profUnicos = [...new Set(data.horario.map((h) => h.profesor))];
          setProfesores(profUnicos);
        }
      })
      .catch((err) => console.error("Error al obtener profesores:", err));
  }, [id]);

  // ---- RESPUESTA ----
  const handleRespuesta = (preguntaId, peso) => {
    setRespuestas({ ...respuestas, [preguntaId]: peso });
  };

  // ---- SUBMIT ----
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
          profesor: profesorSeleccionado,
          alumnoId: id,
          suma: total,
        },
        { withCredentials: true }
      );

      const registrado = resp?.data?.registrado ?? resp?.data?.registro ?? resp?.data?.count ?? null;

      if (registroCount !== null) setRegistroCount(registrado);

      setMostrarResultado(true);
    } catch (err) {
      console.error("Error al enviar evaluación:", err);
      alert("No se pudo enviar la evaluación. Intenta más tarde.");
    }
  };

  // ---- RESET ----
  const resetEvaluacion = () => {
    setProfesorSeleccionado("");
    setRespuestas({});
    setMostrarResultado(false);
    setPuntuacionTotal(0);
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

        {!fechaValida ? (
          <section className="mensaje-no-disponible">
            <div className="mensaje-card">
              <h3>{mensajeFecha}</h3>
              <p>La evaluación de profesores solo está disponible en la fecha indicada por la institución.</p>
            </div>
          </section>
        ) : !mostrarResultado ? (
          <section className="formulario-evaluacion">
            <div className="selector-profesor">
              <label htmlFor="profesor">Selecciona al profesor a evaluar:</label>
              <select
                id="profesor"
                value={profesorSeleccionado}
                onChange={(e) => setProfesorSeleccionado(e.target.value)}
                className="select-profesor"
              >
                <option value="">-- Selecciona un profesor --</option>
                {profesores.map((prof, index) => (
                  <option key={index} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSubmit} className="form-preguntas">
              {preguntas.map((pregunta) => (
                <div key={pregunta.id} className="pregunta-card">
                  <h3 className="pregunta-texto">
                    {pregunta.id}. {pregunta.pregunta}
                  </h3>
                  <div className="opciones-container">
                    {pregunta.opciones.map((opc, i) => (
                      <label key={i} className="opcion-label">
                        <input
                          type="radio"
                          name={`pregunta-${pregunta.id}`}
                          value={opc.peso}
                          onChange={() => handleRespuesta(pregunta.id, opc.peso)}
                          checked={respuestas[pregunta.id] === opc.peso}
                        />
                        <span className="opcion-texto">{opc.texto}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="botones-container">
                <button type="submit" className="btn azul">
                  Enviar Evaluación
                </button>
                <button
                  type="button"
                  className="btn blanco"
                  onClick={() => navigate(`/alumno/${id}`)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="resultado-evaluacion">
            <div className="resultado-card">
              <h2>¡Evaluación Completada!</h2>
              <div className="resultado-info">
                <p><strong>Profesor evaluado:</strong> {profesorSeleccionado}</p>

                <div className="puntuacion-box">
                  <p className="puntuacion-label">Puntuación Total enviada:</p>
                  <p className="puntuacion-valor">{puntuacionTotal} / {preguntas.length * 5}</p>
                  {registroCount !== null && (
                    <p className="registro-count">Veces evaluado: {registroCount}</p>
                  )}
                </div>

                <p className="mensaje-agradecimiento">
                  Gracias por tu participación. Tu opinión es valiosa para mejorar la calidad educativa.
                </p>
              </div>

              <div className="botones-resultado">
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
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
