import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./RegistrarCursos.css";
import { AdminSidebar } from "./AdminSidebar";


export function RegistrarCursos() {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState([]);
  const [carrera, setCarreras] = useState([]);
  const [id_profesor, setId_profesor] = useState("");
  const [UA, setUA] = useState([]);
  const [id_UA, setId_UA] = useState("");
  const [turno, setTurno] = useState("");
  const [nombre, setNombre] = useState("");
  const [carreragru, setCarreragru] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [salon, setSalon] = useState("");
  const [diasSeleccionados, setDiasSeleccionados] = useState({});
  const [id_grupo_creado, setId_grupo_creado] = useState(null);
  const [mostrarDistribucion, setMostrarDistribucion] = useState(false);
  const API = "http://localhost:4000";

  const diasSemana = [
    { letra: "L", nombre: "Lunes" },
    { letra: "M", nombre: "Martes" },
    { letra: "X", nombre: "Miércoles" },
    { letra: "J", nombre: "Jueves" },
    { letra: "V", nombre: "Viernes" },
  ];

  const handleClickAlu = () => navigate("../administrador/gestionarAlumnos");
  const handleClickProf = () => navigate("../administrador/gestionarProfesores");
  const handleClickCursos = () => navigate("../administrador/gestionarCursos");
  const handleLogout = () => {navigate(`/`);};

  useEffect(() => {
    fetch(`${API}/ObtenerProfesores`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setProfesores(data.profesores))
      .catch((err) =>
        console.error("Error al obtener los profesores:", err)
      );
  }, []);

  useEffect(() => {
    fetch(`${API}/ObtenerUA`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUA(data.UA))
      .catch((err) => console.error("Error al obtener las UAs:", err));
  }, []);

  useEffect(() => {
    fetch(`${API}/ObtenerCarreras`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCarreras(data.carreras))
      .catch((err) =>
        console.error("Error al obtener las carreras:", err)
      );
  }, []);

 const handleDiaClick = (letra) => {
  setDiasSeleccionados(prev => ({
    ...prev,
    [letra]: prev[letra] ? false : { hora_ini: "", hora_fin: "" }
  }));
};


  const handleHoraChange = (dia, campo, valor) => {
    setDiasSeleccionados((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor,
      },
    }));
  };

  const validarHoras = () => {
    for (const dia in diasSeleccionados) {
      if (diasSeleccionados[dia] === true) {
        alert("Por favor, completa las horas para todos los días seleccionados");
        return false;
      }
      if (diasSeleccionados[dia] && diasSeleccionados[dia].hora_ini && diasSeleccionados[dia].hora_fin) {
        if (diasSeleccionados[dia].hora_ini >= diasSeleccionados[dia].hora_fin) {
          alert("La hora de inicio no puede ser mayor o igual que la hora de fin");
          return false;
        }
      } else if (diasSeleccionados[dia] && (diasSeleccionados[dia].hora_ini || diasSeleccionados[dia].hora_fin)) {
        alert("Por favor, completa las horas para todos los días seleccionados");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id_profesor || !id_UA || !turno || !nombre || !carreragru) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (!validarHoras()) {
      return;
    }

    try {
      const response = await fetch(`${API}/RegistrarCurso`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_profesor,
          id_UA,
          turno,
          nombre,
          carrera: carreragru,
          salon
        }),
      });

      const data = await response.json();

      if (data.success) {
        setId_grupo_creado(data.id_grupo);
        setMostrarDistribucion(true);
        agregarDistribucion(data.id_grupo);
      } else {
        alert("Error al crear el grupo");
      }
    } catch (error) {
      console.error("Error al registrar el curso:", error);
      alert("Ocurrió un error al registrar el curso");
    }
  };

  const agregarDistribucion = async (id_grupo) => {
    try {
      for (const dia in diasSeleccionados) {
        const diaConfig = diasSeleccionados[dia];
        if (diaConfig && diaConfig.hora_ini && diaConfig.hora_fin) {
          const diaNombre = diasSemana.find((d) => d.letra === dia)?.nombre;

          const response = await fetch(`${API}/AgregarDist/${id_grupo}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_grupo,
              dia: diaNombre,
              hora_ini: diaConfig.hora_ini,
              hora_fin: diaConfig.hora_fin,
            }),
          });

          const result = await response.json();
          if (!result.success) {
            alert(`Error al agregar distribución para ${diaNombre}, el grupo si se creó`);
          }
          else{
              alert("Grupo y horarios registrados exitosamente");

          }
        }
      }

      navigate("/administrador/gestionarCursos");
    } catch (error) {
      console.error("Error al agregar la distribución:", error);
      alert("Ocurrió un error al registrar los horarios");
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Registrar Curso</h1>
          </div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
        <section className="rc-wrap">
          <form className="formulario rc-card" onSubmit={handleSubmit}>
            <label>Número del grupo:</label>
            <input
              type="number"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label>Salón:</label>
            <input
              type="text"
              name="salon"
              value={salon}
              onChange={(e) => setSalon(e.target.value)}
            />

            <label>Profesor:</label>
            <select
              value={id_profesor}
              onChange={(e) => setId_profesor(e.target.value)}
            >
              <option value="">Seleccione un profesor</option>
              {profesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre} {profesor.ape_paterno}{" "}
                  {profesor.ape_materno}
                </option>
              ))}
            </select>

            <label>Carrera para el grupo:</label>
            <select
              value={carreragru}
              onChange={(e) => setCarreragru(e.target.value)}
            >
              <option value="">Seleccione una carrera</option>
              {carrera.map((c) => (
                <option key={c.nombre} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>

            <label>Tipo de UA:</label>
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="OBLIGATORIA">OBLIGATORIA</option>
              <option value="OPTATIVA">OPTATIVA</option>
            </select>

            <label>Unidad de Aprendizaje:</label>
            <select
              value={id_UA}
              onChange={(e) => setId_UA(e.target.value)}
            >
              <option value="">Seleccione una unidad de aprendizaje</option>
              {UA.filter((ua) => ua.carrera === carreragru && (!tipoFiltro || ua.tipo === tipoFiltro)).map((ua) => (
                <option key={ua.id} value={ua.id}>
                  {ua.nombre}
                </option>
              ))}
            </select>

            <label>Turno:</label>
            <select value={turno} onChange={(e) => setTurno(e.target.value)}>
              <option value="">Seleccione un turno</option>
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
            </select>

            <label>Horarios de clase:</label>
            <div className="dias-container">
              {diasSemana.map((dia) => (
                <div key={dia.letra} className="dia-item">
                  <button
                    type="button"
                    className={`dia-btn ${diasSeleccionados[dia.letra] ? "activo" : ""}`}
                    onClick={() => handleDiaClick(dia.letra)}
                  >
                    {dia.letra}
                  </button>

                  {diasSeleccionados[dia.letra] && diasSeleccionados[dia.letra] !== true && (
  <div className="horas-inputs">
    <small className="horas-titulo">Ingrese horas</small>
    <div className="horas-grid">
      <div className="hora-item">
        <label>Inicio</label>
        <input
          type="time"
          min="07:00"
          max="22:00"
          value={diasSeleccionados[dia.letra]?.hora_ini || ""}
          onChange={(e) =>
            handleHoraChange(dia.letra, "hora_ini", e.target.value)
          }
        />
      </div>

      <div className="hora-item">
        <label>Fin</label>
        <input
          type="time"
          min="07:00"
          max="22:00"
          value={diasSeleccionados[dia.letra]?.hora_fin || ""}
          onChange={(e) =>
            handleHoraChange(dia.letra, "hora_fin", e.target.value)
          }
        />
      </div>
    </div>
  </div>
)}

                </div>
              ))}
            </div>

            <button className="btn azul" type="submit">
              Registrar Grupo
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}