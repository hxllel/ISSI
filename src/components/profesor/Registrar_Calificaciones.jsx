import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfesorLayout } from "./ProfesorLayout";
import "./Registrar_Calificaciones.css";
import "./Profesor.css";

export function Registrar_Calificaciones() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [calificaciones, setCalificaciones] = useState({});
  const [periodo, setPeriodo] = useState("");
  const [cargandoPeriodo, setCargandoPeriodo] = useState(true);
  const API = "http://localhost:4000";

  // Verificar el periodo activo para calificaciones
  useEffect(() => {
    fetch(`${API}/TiempoCalificaciones`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.tiempo && data.periodo) {
          setPeriodo(data.periodo);
        } else {
          alert("No es periodo de registro de calificaciones");
          navigate(`/profesor/${id}`);
        }
        setCargandoPeriodo(false);
      })
      .catch((err) => {
        console.error("Error al verificar periodo:", err);
        setCargandoPeriodo(false);
      });
  }, [id, navigate, API]);

  useEffect(() => {
    if (cargandoPeriodo) return;
    
    // Corregir la URL del fetch - remover los dos puntos antes del id
    fetch(`${API}/ObtenerCursos/Prof/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta de ObtenerCursos:", data);
        const cursos = Array.isArray(data?.cursos) ? data.cursos : [];
        console.log("Grupos para calificaciones:", cursos);
        setGrupos(cursos);
      })
      .catch((err) => {
        console.error("Error al obtener grupos:", err);
        setGrupos([]);
      });
  }, [id, API, cargandoPeriodo]);

  const handleSelectGrupo = (grupoId) => {
    setGrupoSeleccionado(grupoId);
    setCalificaciones({});
    
    sessionStorage.setItem('currentProfesorId', id);

    fetch(`${API}/AlumnosInscritos/${grupoId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAlumnos(data.alumnos || []);
        } else {
          setAlumnos([]);
        }
      })
      .catch((err) => {
        console.error("Error al obtener alumnos:", err);
        setAlumnos([]);
      });
  };

  const handleCalificacionChange = (idAlumno, valor) => {
    setCalificaciones((prev) => ({
      ...prev,
      [idAlumno]: valor,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!periodo) {
      alert("No se pudo determinar el periodo de calificaciones");
      return;
    }

    const dataEnviar = Object.entries(calificaciones).map(
      ([id_alumno, calificacion]) => ({
        id_alumno,
        calificacion: parseFloat(calificacion),
      })
    );

    if (dataEnviar.length === 0) {
      alert("Debe ingresar al menos una calificación");
      return;
    }

    fetch(`${API}/GuardarCalificaciones/${grupoSeleccionado}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ 
        calificaciones: dataEnviar,
        periodo: periodo 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.msg || "Calificaciones guardadas exitosamente");
          navigate(`/profesor/${id}`);
        } else {
          alert(data.msg || "Error al guardar calificaciones");
        }
      })
      .catch((err) => {
        console.error("Error al guardar calificaciones:", err);
        alert("Error al guardar calificaciones. Revisa la consola.");
      });
  };

  if (cargandoPeriodo) {
    return (
      <ProfesorLayout profesorId={id}>
        <div className="prof-page-header">
          <h1 className="prof-page-title">Registrar Calificaciones</h1>
          <div className="prof-page-header-right">
            <img src="/escom.png" alt="ESCOM" className="prof-page-escom-logo" />
          </div>
        </div>
        <section className="calif-card">
          <p style={{ textAlign: "center", padding: "2rem" }}>
            Verificando periodo de calificaciones...
          </p>
        </section>
      </ProfesorLayout>
    );
  }

  return (
    <ProfesorLayout profesorId={id}>
      <div className="prof-page-header">
        <h1 className="prof-page-title">
          Registrar Calificaciones - {periodo}° Parcial
        </h1>
        <div className="prof-page-header-right">
          <img
            src="/escom.png"
            alt="ESCOM"
            className="prof-page-escom-logo"
          />
        </div>
      </div>

      <section className="calif-card">
        <div className="calif-selector">
          <label htmlFor="grupo-select" className="calif-label">
            Selecciona un grupo:
          </label>
          <select
            id="grupo-select"
            className="calif-select"
            value={grupoSeleccionado || ""}
            onChange={(e) => handleSelectGrupo(e.target.value)}
          >
            <option value="">-- Seleccione un grupo --</option>
            {grupos.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.nombre} - {grupo.Unidad_Aprendizaje?.nombre}
              </option>
            ))}
          </select>
        </div>

        {grupoSeleccionado && (
          <form onSubmit={handleSubmit} className="calif-form">
            <div className="calif-table-wrapper">
              <table className="calif-table">
                <thead>
                  <tr>
                    <th>Boleta</th>
                    <th>Nombre completo</th>
                    <th>Calificación (0-10)</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="calif-empty">
                        No hay alumnos inscritos en este grupo.
                      </td>
                    </tr>
                  ) : (
                    alumnos.map((alumno) => (
                      <tr key={alumno.id}>
                        <td className="calif-boleta">{alumno.boleta}</td>
                        <td>
                          {alumno.ape_paterno} {alumno.ape_materno}{" "}
                          {alumno.nombre}
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            className="calif-input"
                            value={calificaciones[alumno.id] || ""}
                            onChange={(e) =>
                              handleCalificacionChange(
                                alumno.id,
                                e.target.value
                              )
                            }
                            placeholder="0.0"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {alumnos.length > 0 && (
              <div className="prof-actions">
                <button
                  type="button"
                  className="prof-btn-secondary"
                  onClick={() => navigate(`/profesor/${id}`)}
                >
                  Cancelar
                </button>
                <button type="submit" className="prof-btn-primary">
                  Guardar Calificaciones
                </button>
              </div>
            )}
          </form>
        )}
      </section>
    </ProfesorLayout>
  );
}