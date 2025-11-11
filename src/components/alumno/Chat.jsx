"use client"

import { useState, useEffect } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import "./Chat.css"

export function ChatbotAsistente() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const alumnoId = (location && location.state && location.state.alumnoId) || params.id || null

  const handleInicio = () => { navigate(`/alumno/${alumnoId}`) }
  const handleIns = () => { navigate(`/alumno/inscripcion/${alumnoId}`) }
  const handleHorarios = () => { navigate(`/alumno/horarios/${alumnoId}`) }
  const handleKardex = () => { navigate(`/alumno/Kardex/${alumnoId}`) }
  const handleChat = () => { navigate(`/alumno/Chat`, { state: { alumnoId } }) }
  const handleEditPer = () => { navigate(`/alumno/DatosPersonales/${alumnoId}`) }

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!alumnoId) return;
    fetch(`http://localhost:4000/MensajesChat/${alumnoId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const raw = Array.isArray(data && data.messages) ? data.messages : [];
        const loaded = [];
        raw.forEach((m) => {
          // pregunta -> mensaje de usuario
          loaded.push({
            id: `${m.id}-q`,
            text: m.pregunta_realizada,
            sender: "user",
            time: new Date(m.fecha).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true }),
          });
          if (m.respuesta_obtenida) {
            loaded.push({
              id: `${m.id}-a`,
              text: m.respuesta_obtenida,
              sender: "bot",
              time: new Date(m.fecha).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true }),
            });
          }
        });
        setMessages(loaded);
      })
      .catch((err) => {
        console.error("Error cargando mensajes previos:", err);
        setMessages([]);
      });
  }, [alumnoId]);

  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true }),
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Gracias por tu mensaje. Estoy procesando tu solicitud...",
        sender: "bot",
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="chatbot-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={handleInicio} className="menu-item">
            Inicio
          </button>
          <button className="menu-item" onClick={handleIns}>Inscribir Materias</button>
          <button className="menu-item" onClick={handleHorarios}>Horarios</button>
          <button className="menu-item" onClick={handleKardex}>Kardex</button>
          <button className="menu-item active" onClick={handleChat}>Asistente de Chat</button>
          <button className="menu-item" onClick={handleEditPer}>Información Personal</button>
        </nav>
        <button className="logout" onClick={() => navigate("/")}>Cerrar Sesión</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
          <h1>Asistente de Chat de IA</h1>
          </div>
          {/* Mostrar id de alumno si está disponible */}
          {alumnoId && <div style={{ fontSize: 12, color: "#666" }}>Alumno: {alumnoId}</div>}
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "user" ? "message-user" : "message-bot"}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Escribe tu mensaje aquí..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}
