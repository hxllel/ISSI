// ...existing code...
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alumno.css";
import { VerAvisos } from "../shared/VerAvisos";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx";
import RecuperarContra from "../formulario/RecuperarContra.jsx"

export function Alumno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API = "http://localhost:4000";

  const [alumno, setAlumno] = useState(null);
  const [horario, setHorario] = useState([]);
  const [primera_vez, setPrimeraVez] = useState(null);

  useEffect(() => {
    fetch(`${API}/ObtenerAlumno/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setAlumno(data.alumno || null);
      })
      .catch(() => setAlumno(null));
  }, [id]);

  useEffect(() => {
    fetch(`${API}/PrimeraVez/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setPrimeraVez(data.primera_vez);
      })
      .catch(() => setPrimeraVez(null));
  }, [id]);

  /** ============================
   *   Cargar horario del alumno
   *  ============================ */
  useEffect(() => {
    fetch(`${API}/ObtenerHorario/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setHorario(data.horario);
      })
      .catch(() => setAlumno(null));
  }, [id]);

  /** ============================
   *  Descargar comprobante horario
   *  ============================ */
  const handleDescargarComprobante = () => {
    try {
      if (!Array.isArray(horario) || horario.length === 0) {
        alert("No hay materias inscritas para generar el comprobante.");
        return;
      }

      const normalizaDia = (d) =>
        d === "Miércoles" || d === "Miércoles" ? "Miércoles" : d;

      const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

      const filas = horario.map((h, idx) => {
        const horasPorDia = dias.map((dia) => {
          const matches = (Array.isArray(h.distribuciones)
            ? h.distribuciones
            : []
          )
            .filter((d) => normalizaDia(d.dia) === dia)
            .map((d) => `${d.hora_ini} - ${d.hora_fin}`);
          return matches.join(", ");
        });
        return {
          id: h.grupo || String(idx + 1),
          ua: h.materia || "",
          profesor: h.profesor || "",
          horas: horasPorDia,
        };
      });

      const estilo = `
        <style>
          body { font-family: Arial, sans-serif; color:#111; }
          h1 { margin: 0 0 8px 0; font-size: 18px; }
          .header-container { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 12px; }
          .foto-alumno { width: 100px; height: 120px; object-fit: cover; border: 1px solid #333; border-radius: 4px; }
          .meta-info { flex: 1; }
          .meta { font-size: 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #333; padding: 6px 8px; }
          th { background: #f0f0f0; text-align: left; }
        </style>`;

      const fotoUrl =
        alumno && alumno.id ? `${API}/Alumno/Foto/${alumno.id}` : "";

      const cabecera = `
        <h1>Comprobante de horario</h1>
        <div class="header-container">
          ${
            fotoUrl
              ? `<img src="${fotoUrl}" class="foto-alumno" onerror="this.style.display='none'" />`
              : ""
          }
          <div class="meta-info">
            <div class="meta">
              <div><strong>Alumno:</strong> ${alumno.nombre} ${alumno.ape_paterno} ${alumno.ape_materno}</div>
              <div><strong>Boleta:</strong> ${alumno.id}</div>
              <div><strong>Fecha de emisión:</strong> ${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>`;

      const encabezados = `
        <tr>
          <th>ID</th>
          <th>Unidad de aprendizaje</th>
          <th>Profesor</th>
          ${dias.map((d) => `<th>${d}</th>`).join("")}
        </tr>`;

      const cuerpo = filas
        .map(
          (f) => `
        <tr>
          <td>${f.id}</td>
          <td>${f.ua}</td>
          <td>${f.profesor}</td>
          ${f.horas.map((hh) => `<td>${hh || "&nbsp;"}</td>`).join("")}
        </tr>`
        )
        .join("");

      const html = `
        <html>
          <head><meta charset="utf-8"/>${estilo}</head>
          <body>${cabecera}
            <table><thead>${encabezados}</thead><tbody>${cuerpo}</tbody></table>
          </body>
        </html>`;

      const w = window.open("", "_blank", "width=1024,height=768");
      if (!w) return alert("Permite ventanas emergentes.");

      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 350);
    } catch (e) {
      console.error("Error al generar comprobante:", e);
      alert("No se pudo generar el comprobante.");
    }
  };

  /** ============================
   *        UI (DISEÑO #2)
   *  ============================ */
  return (
    <div className="alumno-container">
      { primera_vez === true ? (
        <main className="centrar">
            <RecuperarContra />
        </main>
      ) : (
        <>
          <SidebarAlumno />

          {/* Contenido principal */}
          <main className="main-content">
            <header className="chat-header">
              <div>
                {alumno ? (
                  <>
                    <div className="encabezado-section">
                      <h1>¡Bienvenido {alumno.nombre} {alumno.ape_paterno} {alumno.ape_materno}!</h1>
                    </div>
                    <div className="subheader-section">
                      <p>Boleta: {alumno.id}</p>
                    </div>
                  </>
                ) : (
                  <p>Cargando alumno...</p>
                )}
              </div>

              <img src="/escom.png" alt="Logo ESCOM" className="header-logo" />
            </header>

            {/* Horario */}
            <section className="horario-section">
              <h2>Horario Semanal</h2>

              <table className="horario-table">
                <thead>
                  <tr>
                    <th>Grupo</th>
                    <th>Salon</th>
                    <th>Profesor</th>
                    <th>Materia</th>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miércoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                  </tr>
                </thead>

                <tbody>
                  {horario.map((h, index) => (
                    <tr key={index}>
                      <td>{h.grupo}</td>
                      <td>{h.salon}</td>
                      <td>{h.profesor}</td>
                      <td>{h.materia}</td>

                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia) => {
                        const distrib = h.distribuciones.filter((d) => d.dia === dia);
                        return (
                          <td key={dia}>
                            {distrib.length > 0
                              ? distrib.map((d, i) => (
                                  <div key={i} className="horario">
                                    {d.hora_ini} - {d.hora_fin}
                                  </div>
                                ))
                              : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="boton-container">
                <button className="comprobante-btn" onClick={handleDescargarComprobante}>
                  Descargar comprobante de horario
                </button>
              </div>
            </section>

            {/* Avisos del primer código */}
            <section className="avisos-section">
              <VerAvisos objetivo="alumno" />
            </section>
          </main>
        </>
      )}
    </div>
  );
}
// ...existing code...