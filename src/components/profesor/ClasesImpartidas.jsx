// Componente combinado: diseño del primero + funcionalidad del segundo
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ClasesImpartidas.css";
import "./Profesor.css";
import { ProfesorLayout } from "./ProfesorLayout";
import { ProfeSideBar } from "./ProfeSidebar";
const FILAS_POR_PAGINA = 10;

export function ClasesImpartidas({ profesorId: propProfesorId, onClose }) {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [periodo, setPeriodo] = useState("");
  const [tiempo, setTiempo] = useState(false);

  const navigate = useNavigate();
  const API = "http://localhost:4000";

  const profesorId = propProfesorId || params.id;

  const handleClickLista = (id) => {
    navigate(`/profesor/PaseLista/${id}`);
  };

  const handleClickRegistrar = (id) => {
    navigate(`/profesor/RegistrarCalificaciones/${id}/${periodo}`);
  };

  // Obtener tiempo de calificaciones
  useEffect(() => {
    fetch(`${API}/TiempoCalificaciones`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.tiempo) {
          setTiempo(true);
          setPeriodo(data.periodo);
        } else {
          setTiempo(false);
          setPeriodo("");
        }
      })
      .catch(() => {
        setTiempo(false);
        setPeriodo("");
      });
  }, []);

  // Obtener cursos del profesor + horarios
  useEffect(() => {
    fetch(`${API}/ObtenerCursos/Prof/:${profesorId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        const cursos = Array.isArray(data?.cursos) ? data.cursos : [];

        const cursosConDist = await Promise.all(
          cursos.map(async (c) => {
            try {
              const resDist = await fetch(`${API}/ObtenerDist/${c.id}`, {
                credentials: "include",
              });
              const d = await resDist.json();
              c.Distribucion = Array.isArray(d?.Distri) ? d.Distri : [];
            } catch (e) {
              c.Distribucion = [];
            }
            return c;
          })
        );

        setDatos(cursosConDist);
      })
      .catch(() => setDatos([]));
  }, [profesorId]);

  // Validar página actual
  useEffect(() => {
    const filtrados = datos.filter((d) => String(d.id_prof) === String(profesorId));
    const paginas = Math.max(1, Math.ceil(filtrados.length / FILAS_POR_PAGINA));
    if (paginaActual > paginas) setPaginaActual(paginas);
  }, [datos, profesorId, paginaActual]);

  // Paginación
  const datosFiltrados = datos.filter((d) => String(d.id_prof) === String(profesorId));
  const totalPaginas = Math.max(1, Math.ceil(datosFiltrados.length / FILAS_POR_PAGINA));
  const inicio = (paginaActual - 1) * FILAS_POR_PAGINA;
  const datosPaginados = datosFiltrados.slice(inicio, inicio + FILAS_POR_PAGINA);

  const irAPagina = (p) => p >= 1 && p <= totalPaginas && setPaginaActual(p);

  // PDF
  const handleGenerarPDF = async (curso) => {
    try {
      const res = await fetch(`${API}/Reportes/Clases/PDF/${curso.id}`, {
        method: "GET",
        credentials: "include",
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `clase_${curso.nombre || curso.id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("No se pudo generar el PDF");
    }
  };

  // Excel
  const handleExportExcel = async (curso) => {
    try {
      const res = await fetch(`${API}/Reportes/Clases/Excel/${curso.id}`, {
        method: "GET",
        credentials: "include",
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `clase_${curso.nombre || curso.id}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("No se pudo generar el Excel");
    }
  };

  return (
    <ProfesorLayout profesorId={profesorId}>
      <div className="prof-page-header">
        <h1 className="prof-page-title">Horarios de clase</h1>
        <div className="prof-page-header-right">
          {onClose && (
            <button className="clases-close" onClick={onClose}>
              Cerrar
            </button>
          )}
          <img src="/escom.png" alt="ESCOM" className="prof-page-escom-logo" />
        </div>
      </div>

      <section className="section-card">
        <h3 className="section-title">Listado de horarios</h3>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Profesor</th>
                <th>Unidad</th>
                <th>Turno</th>
                <th>Carrera</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {datosPaginados.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: "center", padding: "1rem" }}>
                    No hay grupos asignados.
                  </td>
                </tr>
              ) : (
                datosPaginados.map((dato) => {
                  const dist = Array.isArray(dato.Distribucion)
                    ? dato.Distribucion
                    : [];

                  const horasPorDia = (dia) => {
                    if (dia === "Miercoles") {
                      return dist
                        .filter((d) => d.dia === "Miércoles" || d.dia === "Miercoles")
                        .map((d) => `${d.hora_ini} - ${d.hora_fin}`)
                        .join(", ");
                    }
                    return dist
                      .filter((d) => d.dia === dia)
                      .map((d) => `${d.hora_ini} - ${d.hora_fin}`)
                      .join(", ");
                  };

                  return (
                    <tr key={dato.id}>
                      <td>{dato.nombre}</td>
                      <td>
                        {dato.DatosPersonale &&
                          `${dato.DatosPersonale.nombre} ${dato.DatosPersonale.ape_paterno} ${dato.DatosPersonale.ape_materno}`}
                      </td>
                      <td>{dato.Unidad_Aprendizaje?.nombre}</td>
                      <td>{dato.turno}</td>
                      <td>{dato.Unidad_Aprendizaje?.carrera}</td>
                      <td>{horasPorDia("Lunes") || "—"}</td>
                      <td>{horasPorDia("Martes") || "—"}</td>
                      <td>{horasPorDia("Miercoles") || "—"}</td>
                      <td>{horasPorDia("Jueves") || "—"}</td>
                      <td>{horasPorDia("Viernes") || "—"}</td>

                      <td className="clases-actions">
                        <button className="cl-btn cl-btn-outline" onClick={() => handleGenerarPDF(dato)}>
                          PDF
                        </button>
                        <button className="cl-btn cl-btn-outline" onClick={() => handleExportExcel(dato)}>
                          Excel
                        </button>
                        <button className="cl-btn cl-btn-primary" onClick={() => handleClickLista(dato.id)}>
                          Pasar lista
                        </button>
                        {(tiempo && dato.reg_final === null )||( tiempo && Number(dato.reg_final) === 0) ||  (tiempo && periodo === "extra" && dato.reg_extra === null) ||  (tiempo && periodo === "extra" && Number(dato.reg_extra) === 0 ) ? ( <button type = "button" className="cl-btn cl-btn-primary" onClick={() => handleClickRegistrar(dato.id)}>Registrar calificaciones del periodo {periodo}</button>) : ( <></> )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ===== PAGINACIÓN ===== */}
        <div className="pagination">
          <button onClick={() => irAPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            «
          </button>
          <span>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => irAPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            »
          </button>
        </div>
      </section>
    </ProfesorLayout>
  );
}
