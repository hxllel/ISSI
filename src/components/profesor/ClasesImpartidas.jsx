import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ClasesImpartidas.css";
import "./Profesor.css";

export function ClasesImpartidas({ profesorId: propProfesorId, onClose }) {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const profesorId = propProfesorId || params.id;

  const handleClickLista = (id) => {
    navigate(`/profesor/PaseLista/${id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/ObtenerCursos/Prof/:${profesorId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(async (data) => {
        const cursos = Array.isArray(data && data.cursos) ? data.cursos : [];

        const cursosConDist = await Promise.all(
          cursos.map(async (c) => {
            try {
              const resDist = await fetch(
                `http://localhost:4000/ObtenerDist/${c.id}`,
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

  // =============================
  //  PDF
  // =============================
  const handleGenerarPDF = (curso) => {
    // Obtener inscritos para el curso y generar la hoja de asistencia estilo plantilla
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/ObtenerInscritos/${curso.id}`, { credentials: "include" });
        const data = await res.json();
        const inscritos = Array.isArray(data && data.inscritos) ? data.inscritos : [];

        const profesorNombre = curso.DatosPersonale ? `${curso.DatosPersonale.nombre || ''} ${curso.DatosPersonale.ape_paterno || ''} ${curso.DatosPersonale.ape_materno || ''}` : '';

        // Construir filas de alumnos (hasta 30 filas en la plantilla)
        const filas = [];
        for (let i = 0; i < 30; i++) {
          const ins = inscritos[i];
          const nombreEst = ins && ins.Horario && ins.Horario.DatosPersonale ? `${ins.Horario.DatosPersonale.nombre || ''} ${ins.Horario.DatosPersonale.ape_paterno || ''} ${ins.Horario.DatosPersonale.ape_materno || ''}` : '';
          filas.push({ no: i + 1, nombre: nombreEst });
        }

        // Generar celdas para días 1..31
        const dayHeaders = Array.from({ length: 31 }, (_, i) => i + 1);

        const html = `
          <html>
            <head>
              <meta charset="utf-8" />
              <title>Lista de asistencia - ${curso.nombre}</title>
              <style>
                body { font-family: Arial, sans-serif; }
                .header { display:flex; align-items:center; margin-bottom:6px; }
                .title { background: #ffd54f; padding: 10px 16px; font-weight:700; color:#000; }
                .meta { flex:1; text-align:center; }
                .meta small { display:block; font-size:12px; }
                .right { width:260px; text-align:left; }
                table { border-collapse: collapse; width: 100%; font-size:12px; }
                table th, table td { border: 1px solid #333; padding:4px; }
                th.day { background:#00b050; color:#fff; }
                th.name { background:#2f75b5; color:#fff; }
                .no-col { width:36px; text-align:center; }
                .name-col { width:260px; text-align:left; padding-left:6px; }
                .percent-col { width:46px; text-align:center; }
                .footer { margin-top:8px; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="title">LISTA DE ASISTENCIA</div>
                <div class="meta">
                  <div><strong>NOMBRE DE LA ESCUELA:</strong></div>
                  <div><small>__________________________________________</small></div>
                  <div style="margin-top:4px"><strong>NOMBRE DEL MAESTRO(A):</strong> ${profesorNombre}</div>
                </div>
                <div class="right">
                  <div>MES: <strong>${new Date().toLocaleString('default', { month: 'long' }).toUpperCase()}</strong></div>
                  <div>GRADO: <strong>${curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.semestre || '' : ''}</strong></div>
                  <div>GRUPO: <strong>${curso.nombre || ''}</strong></div>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th class="no-col">NO.</th>
                    <th class="name-col">NOMBRE Y APELLIDO</th>
                    ${dayHeaders.map(d => `<th class="day">${d}</th>`).join('')}
                    <th class="percent-col">%</th>
                  </tr>
                </thead>
                <tbody>
                  ${filas.map(f => `
                    <tr>
                      <td style="text-align:center">${f.no}</td>
                      <td>${f.nombre}</td>
                      ${dayHeaders.map(() => `<td>&nbsp;</td>`).join('')}
                      <td style="text-align:center">&nbsp;</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="footer">
                <table style="width:100%"><tr><td style="background:#f28b00;color:#fff;padding:6px;font-weight:700;">ASISTENCIAS DIARIAS</td>
                <td style="padding:6px">${dayHeaders.map(() => '0').join(' ')}</td></tr></table>
              </div>

              <p style="font-size:11px;color:#666;margin-top:8px;">Generado: ${new Date().toLocaleString()}</p>
            </body>
          </html>
        `;

        const printWindow = window.open('', '_blank', 'width=1000,height=800');
        if (!printWindow) {
          alert('No se pudo abrir la ventana de impresión. Por favor permite ventanas emergentes.');
          return;
        }
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 400);

      } catch (err) {
        console.error('Error al generar PDF con inscritos:', err);
        alert('No se pudo generar la lista. Verifica que el servidor esté corriendo y el endpoint /ObtenerInscritos exista.');
      }
    })();
  }

  // =============================
  //  EXCEL
  // =============================
  const handleExportExcel = async (curso) => {
    try {
      const res = await fetch(`http://localhost:4000/ObtenerInscritos/${curso.id}`, { credentials: "include" });
      const data = await res.json();
      const inscritos = Array.isArray(data && data.inscritos) ? data.inscritos : [];

      // Encabezados del CSV (ajustables según la plantilla de Excel)
      const headers = [
        'Grupo', 'Profesor', 'Unidad de Aprendizaje', 'Turno', 'Carrera', 'Cupo', 'Día', 'Hora inicio', 'Hora fin', 'StudentID', 'Nombre estudiante', 'Apellido paterno', 'Apellido materno', 'Calificación'
      ];

      // Construir filas: para cada inscrito añadimos una fila por cada distribucion del curso
      const distribs = Array.isArray(curso.Distribucion) ? curso.Distribucion : [];

      const rows = [];
      if (inscritos.length === 0) {
        // Crear fila vacía con info del curso y sin estudiantes
        if (distribs.length === 0) {
          rows.push([curso.nombre, (curso.DatosPersonale ? `${curso.DatosPersonale.nombre || ''} ${curso.DatosPersonale.ape_paterno || ''}` : ''), (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.nombre : ''), curso.turno, (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.carrera : ''), curso.cupo, '', '', '', '', '', '', '', '']);
        } else {
          distribs.forEach(d => rows.push([curso.nombre, (curso.DatosPersonale ? `${curso.DatosPersonale.nombre || ''} ${curso.DatosPersonale.ape_paterno || ''}` : ''), (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.nombre : ''), curso.turno, (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.carrera : ''), curso.cupo, d.dia, d.hora_ini, d.hora_fin, '', '', '', '', '']));
        }
      } else {
        inscritos.forEach(ins => {
          const estudiante = ins.Horario && ins.Horario.DatosPersonale ? ins.Horario.DatosPersonale : null;
          if (distribs.length === 0) {
            rows.push([curso.nombre, (curso.DatosPersonale ? `${curso.DatosPersonale.nombre || ''} ${curso.DatosPersonale.ape_paterno || ''}` : ''), (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.nombre : ''), curso.turno, (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.carrera : ''), curso.cupo, '', '', '', estudiante ? estudiante.id : '', estudiante ? estudiante.nombre : '', estudiante ? estudiante.ape_paterno : '', estudiante ? estudiante.ape_materno : '', ins.calificacion || '']);
          } else {
            distribs.forEach(d => rows.push([curso.nombre, (curso.DatosPersonale ? `${curso.DatosPersonale.nombre || ''} ${curso.DatosPersonale.ape_paterno || ''}` : ''), (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.nombre : ''), curso.turno, (curso.Unidad_Aprendizaje ? curso.Unidad_Aprendizaje.carrera : ''), curso.cupo, d.dia, d.hora_ini, d.hora_fin, estudiante ? estudiante.id : '', estudiante ? estudiante.nombre : '', estudiante ? estudiante.ape_paterno : '', estudiante ? estudiante.ape_materno : '', ins.calificacion || '']));
          }
        });
      }

      const csvContent = [headers.join(','), ...rows.map(r => r.map(cell => '"' + String(cell ?? '').replace(/"/g, '""') + '"').join(','))].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = (curso.nombre || 'lista').replace(/[^a-z0-9_\-]/gi, '_');
      a.download = `${safeName}_inscritos.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error al exportar inscritos:', err);
      alert('No se pudo exportar la lista. Verifica que el servidor esté corriendo y el endpoint /ObtenerInscritos exista.');
    }
  }

  return (
  <div className="admin-container">

    {/* ===== Sidebar ===== */}
    <aside className="sidebar">
      <div className="logo">
        <img src="/ipn.png" alt="Logo" className="logo-img" />
        <span>Gestión Escolar</span>
      </div>

      <nav className="menu">
        <Link 
          to={`/profesor/${id}`} 
          className="menu-item"
        >
          Inicio
        </Link>

        <Link 
          to={`/profesor/${id}/clases`} 
          className= "menu-item active"
        >
          Clases Impartidas
        </Link>

        <button 
          className="menu-item" 
          onClick={() => navigate(`/profesor/${id}/grupos`)}
        >
          Horario
        </button>

        <button 
          className="menu-item" 
          onClick={() => navigate(`/profesor/chat`)}
        >
          Asistente de Chat
        </button>

        <button 
          className="menu-item" 
          onClick={() => navigate(`/profesor/${id}/perfil`)}
        >
          Información Personal
        </button>

        <button 
          className="menu-item" 
          onClick={() => navigate(`/profesor/${id}/calificaciones`)}
        >
          Calificaciones
        </button>
      </nav>

      <button className="logout" onClick={() => navigate(`/`)}>
        Cerrar sesión
      </button>
    </aside>

    {/* ===== Main ===== */}
    <main className="main-content">

      {/* ==== Header ====*/}  
      <header className="prof-header">
        <h1 className="title">Horarios de clase</h1>
        <img className="escom-logo" src="/escom.png" alt="ESCOM" />

        {onClose && (
          <button type="button" className="clases-close" onClick={onClose}>
            Cerrar
          </button>
        )}
      </header>

      {/* ======= CARD WRAPPER ======= */}
      <section className="section-card">

        <h3 className="section-title">Listado de horarios</h3>

        <div className="table-wrap">
          <table className="table">
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
              {(Array.isArray(datos)
                ? datos.filter(
                    d =>
                      !profesorId ||
                      String(d.id_prof) === String(profesorId)
                  )
                : []
              ).map((dato) => {

                const distribsRaw = dato.Distribucion || [];
                const distribs = Array.isArray(distribsRaw)
                  ? distribsRaw
                  : [distribsRaw];

                const horasPorDia = (dia) => {
                  if (dia === "Miercoles") {
                    const vals = distribs
                      .filter(
                        d =>
                          d &&
                          (d.dia === "Miércoles" || d.dia === "Miercoles")
                      )
                      .map(d => `${d.hora_ini} - ${d.hora_fin}`);
                    return vals.join(", ");
                  }
                  const vals = distribs
                    .filter(d => d && d.dia === dia)
                    .map(d => `${d.hora_ini} - ${d.hora_fin}`);
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
                    <td>{dato.Unidad_Aprendizaje?.nombre}</td>
                    <td>{dato.turno}</td>
                    <td>{dato.Unidad_Aprendizaje?.carrera}</td>

                    <td>{horasPorDia("Lunes") || "—"}</td>
                    <td>{horasPorDia("Martes") || "—"}</td>
                    <td>{horasPorDia("Miercoles") || "—"}</td>
                    <td>{horasPorDia("Jueves") || "—"}</td>
                    <td>{horasPorDia("Viernes") || "—"}</td>

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
              })}
            </tbody>
          </table>
        </div>

      </section>

    </main>
  </div>
);}
