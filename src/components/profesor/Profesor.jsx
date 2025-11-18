import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profesor.css";
import { ProfesorLayout } from "./ProfesorLayout";
import { VerAvisos } from "../shared/VerAvisos";

export function Profesor() {
  const { id } = useParams();
  const [cursos, setCursos] = useState([]);
  const API = "http://localhost:4000";

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        // Corregir la URL del fetch - remover los dos puntos antes del id
        const r = await fetch(`${API}/ObtenerCursos/Prof/${id}`, {
          credentials: "include",
        });
        const j = await r.json();
        console.log("Respuesta de ObtenerCursos:", j);
        const base = Array.isArray(j?.cursos) ? j.cursos : [];
        console.log("Cursos base:", base);

        const conDist = await Promise.all(
          base.map(async (c) => {
            try {
              const rr = await fetch(`${API}/ObtenerDist/${c.id}`, {
                credentials: "include",
              });
              const dd = await rr.json();
              c.Distribucion = Array.isArray(dd?.Distri) ? dd.Distri : [];
            } catch {
              c.Distribucion = [];
            }
            return c;
          })
        );

        setCursos(conDist);
        console.log("Cursos finales:", conDist);
      } catch (err) {
        console.error("Error al obtener cursos:", err);
        setCursos([]);
      }
    })();
  }, [id, API]);

  const totalGrupos = cursos.length;

  const clasesHoy = useMemo(() => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const hoy = dias[new Date().getDay()];

    return cursos.reduce((acc, c) => {
      const d = Array.isArray(c?.Distribucion) ? c.Distribucion : [];
      const n = d.filter(
        (x) =>
          x?.dia === hoy ||
          (hoy === "Miércoles" && x?.dia === "Miercoles")
      ).length;
      return acc + n;
    }, 0);
  }, [cursos]);

  const recientes = useMemo(() => cursos.slice(0, 5), [cursos]);

  return (
    <ProfesorLayout profesorId={id}>
      {/* Encabezado tipo "Asistente de chat de IA" */}
      <div className="prof-page-header">
        <h1 className="prof-page-title">¡Bienvenido, Juan Manuel!</h1>
        <div className="prof-page-header-right">
          <img
            src="/escom.png"
            alt="ESCOM"
            className="prof-page-escom-logo"
          />
        </div>
      </div>

      {/* KPIs */}
      <section className="kpi-row">
        <div className="kpi-card">
          <p className="kpi-title">Total de grupos asignados</p>
          <div className="kpi-value">{totalGrupos}</div>
        </div>
        <div className="kpi-card">
          <p className="kpi-title">Clases programadas para hoy</p>
          <div className="kpi-value">{clasesHoy}</div>
        </div>
      </section>

      {/* Sección de avisos */}
      <section className="section-card">
        <VerAvisos objetivo="profesor" />
      </section>

      {/* Tabla de grupos recientes */}
      <section className="section-card">
        <h3>Grupos vistos recientemente</h3>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Grupo</th>
                <th>Número de estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {recientes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="empty">
                    Sin cursos
                  </td>
                </tr>
              ) : (
                recientes.map((c) => {
                  const materia = c?.Unidad_Aprendizaje?.nombre ?? "—";
                  const grupo = c?.nombre ?? "—";
                  const inscritos = Number(
                    c?.inscritos_count ?? c?.inscritos?.length ?? 0
                  );
                  return (
                    <tr key={c.id}>
                      <td>{materia}</td>
                      <td className="muted">{grupo}</td>
                      <td>
                        <span className="pill">
                          {inscritos} estudiantes
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </ProfesorLayout>
  );
}
