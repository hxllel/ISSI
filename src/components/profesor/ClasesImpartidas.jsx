import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ClasesImpartidas.css";
import "./Profesor.css";
import { ProfesorLayout } from "./ProfesorLayout";

const FILAS_POR_PAGINA = 10; // <- puedes cambiar cuántos grupos por página

export function ClasesImpartidas({ profesorId: propProfesorId, onClose }) {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const navigate = useNavigate();
  const API = "http://localhost:4000";
  const profesorId = propProfesorId || params.id;

  const handleClickLista = (id) => {
    navigate(`/profesor/PaseLista/${id}`);
  };

  useEffect(() => {
    fetch(`${API}/ObtenerCursos/Prof/:${profesorId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        const cursos = Array.isArray(data && data.cursos) ? data.cursos : [];

        const cursosConDist = await Promise.all(
          cursos.map(async (c) => {
            try {
              const resDist = await fetch(
                `${API}/ObtenerDist/${c.id}`,
                { credentials: "include" }
              );
              const d = await resDist.json();
              c.Distribucion = Array.isArray(d && d.Distri) ? d.Distri : [];
            } catch (e) {
              console.error(
                "Error al obtener la distribucion para curso",
                c.id,
                e
              );
              c.Distribucion = [];
            }
            return c;
          })
        );

        setDatos(cursosConDist);
        console.log("ObtenerCursos response count =", cursosConDist.length);
      })
      .catch((err) => {
        console.error("Error al obtener los cursos:", err);
        setDatos([]);
      });
  }, [profesorId]);

  // Asegura que si cambia el número de cursos, la página actual siga siendo válida
  useEffect(() => {
    const datosParaProf = Array.isArray(datos)
      ? datos.filter(
          (d) => !profesorId || String(d.id_prof) === String(profesorId)
        )
      : [];

    const paginas = Math.max(
      1,
      Math.ceil(datosParaProf.length / FILAS_POR_PAGINA)
    );

    if (paginaActual > paginas) {
      setPaginaActual(paginas);
    }
  }, [datos, profesorId, paginaActual]);

  // =============================
  //  LÓGICA DE PAGINACIÓN
  // =============================
  const datosFiltrados = Array.isArray(datos)
    ? datos.filter(
        (d) => !profesorId || String(d.id_prof) === String(profesorId)
      )
    : [];

  const totalPaginas = Math.max(
    1,
    Math.ceil(datosFiltrados.length / FILAS_POR_PAGINA)
  );

  const indiceInicio = (paginaActual - 1) * FILAS_POR_PAGINA;
  const indiceFin = indiceInicio + FILAS_POR_PAGINA;
  const datosPaginados = datosFiltrados.slice(indiceInicio, indiceFin);

  const irAPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // =============================
  //  PDF
  // =============================
  const handleGenerarPDF = async (curso) => {
    try {
      const res = await fetch(
        `${API}/Reportes/Clases/PDF/${curso.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("No se pudo generar el PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `clase_${curso.nombre || curso.id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("No se pudo generar el PDF. Revisa la consola para más detalles.");
    }
  };

  // =============================
  //  EXCEL
  // =============================
  const handleExportExcel = async (curso) => {
    try {
      const res = await fetch(
        `${API}/Reportes/Clases/Excel/${curso.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("No se pudo generar el Excel");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `clase_${curso.nombre || curso.id}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al exportar Excel:", error);
      alert(
        "No se pudo generar el archivo de Excel. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <ProfesorLayout profesorId={profesorId}>
      {/* Encabezado global con título + ESCOM */}
      <div className="prof-page-header">
        <h1 className="prof-page-title">Horarios de clase</h1>
        <div className="prof-page-header-right">
          {onClose && (
            <button
              type="button"
              className="clases-close"
              onClick={onClose}
            >
              Cerrar
            </button>
          )}
          <img
            src="/escom.png"
            alt="ESCOM"
            className="prof-page-escom-logo"
          />
        </div>
      </div>

      {/* Card blanca con la tabla de grupos */}
      <section className="clases-card">
        <div className="clases-table-wrapper">
          <table className="clases-table">
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Profesor</th>
                <th>Unidad de Aprendizaje</th>
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
                    No hay grupos asignados para mostrar.
                  </td>
                </tr>
              ) : (
                datosPaginados.map((dato) => {
                  const distribsRaw = dato.Distribucion || [];
                  const distribs = Array.isArray(distribsRaw)
                    ? distribsRaw
                    : [distribsRaw];

                  const horasPorDia = (dia) => {
                    if (dia === "Miercoles") {
                      const vals = distribs
                        .filter(
                          (d) =>
                            d &&
                            (d.dia === "Miércoles" || d.dia === "Miercoles")
                        )
                        .map((d) => `${d.hora_ini} - ${d.hora_fin}`);
                      return vals.join(", ");
                    }
                    const vals = distribs
                      .filter((d) => d && d.dia === dia)
                      .map((d) => `${d.hora_ini} - ${d.hora_fin}`);
                    return vals.join(", ");
                  };

                  return (
                    <tr key={dato.id}>
                      <td>{dato.nombre}</td>
                      <td>
                        {dato.DatosPersonale &&
                          `${dato.DatosPersonale.nombre || ""} ${
                            dato.DatosPersonale.ape_paterno || ""
                          } ${dato.DatosPersonale.ape_materno || ""}`}
                      </td>
                      <td>
                        {dato.Unidad_Aprendizaje &&
                          dato.Unidad_Aprendizaje.nombre}
                      </td>
                      <td>{dato.turno}</td>
                      <td>
                        {dato.Unidad_Aprendizaje &&
                          dato.Unidad_Aprendizaje.carrera}
                      </td>
                      <td>{horasPorDia("Lunes") || " "}</td>
                      <td>{horasPorDia("Martes") || " "}</td>
                      <td>{horasPorDia("Miercoles") || " "}</td>
                      <td>{horasPorDia("Jueves") || " "}</td>
                      <td>{horasPorDia("Viernes") || " "}</td>
                      <td className="clases-actions">
                        <button
                          type="button"
                          className="cl-btn cl-btn-outline"
                          onClick={() => handleGenerarPDF(dato)}
                        >
                          PDF
                        </button>
                        <button
                          type="button"
                          className="cl-btn cl-btn-outline"
                          onClick={() => handleExportExcel(dato)}
                        >
                          Generar Excel
                        </button>
                        <button
                          type="button"
                          className="cl-btn cl-btn-primary"
                          onClick={() => handleClickLista(dato.id)}
                        >
                          Pasar lista
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        {datosFiltrados.length > FILAS_POR_PAGINA && (
          <div className="clases-pagination">
            <button
              type="button"
              className="clases-page-btn"
              onClick={() => irAPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>

            <span className="clases-page-info">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              type="button"
              className="clases-page-btn"
              onClick={() => irAPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </ProfesorLayout>
  );
}