import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alumno.css";

export function Alumno() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [alumno, setAlumno] = useState(null);
  const [horario, setHorario] = useState([]);

    useEffect(() => {
  fetch(`http://localhost:4000/ObtenerAlumno/${id}`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      setAlumno(data.alumno || null);
    })
    .catch(() => setAlumno(null));
}, [id]);

  useEffect(()=>{
    fetch(`http://localhost:4000/ObtenerHorario/${id}`, {credentials : "include"})
    .then((res) => res.json())
    .then((data) => {
      setHorario(data.horario);
    })
    .catch(() => setAlumno(null));
  }, [id]);


  const handleIns = () => {navigate(`/alumno/inscripcion/${id}`);};
  const handleEditPer = () => {navigate(`/alumno/editarDatos/${id}`);};
    const handleHorarios = () => {navigate(`/alumno/horarios/${id}`);};

  const handleDescargarComprobante = () => {
    try {
      if (!Array.isArray(horario) || horario.length === 0) {
        alert("No hay materias inscritas para generar el comprobante.");
        return;
      }

      const normalizaDia = (d) => (d === 'Miércoles' || d === 'Miercoles' ? 'Miércoles' : d);
      const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

      const filas = horario.map((h, idx) => {
        const horasPorDia = dias.map((dia) => {
          const matches = (Array.isArray(h.distribuciones) ? h.distribuciones : [])
            .filter((d) => normalizaDia(d.dia) === dia)
            .map((d) => `${d.hora_ini} - ${d.hora_fin}`);
          return matches.join(', ');
        });
        return {
          id: h.grupo || String(idx + 1),
          ua: h.materia || '',
          profesor: h.profesor || '',
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
          .id { width: 120px; }
          .ua { width: 260px; }
          .prof { width: 240px; }
          .dia { width: 120px; text-align: left; }
          @media print { @page { size: A4; margin: 16mm; } }
        </style>`;

      const fotoUrl = alumno && alumno.id ? `http://localhost:4000/Alumno/Foto/${alumno.id}` : '';
      
      const cabecera = `
        <h1>Comprobante de horario</h1>
        <div class="header-container">
          ${fotoUrl ? `<img src="${fotoUrl}" alt="Foto alumno" class="foto-alumno" onerror="this.style.display='none'" />` : ''}
          <div class="meta-info">
            <div class="meta">
              ${alumno ? `<div><strong>Alumno:</strong> ${alumno.nombre || ''} ${alumno.ape_paterno || ''} ${alumno.ape_materno || ''}</div>` : ''}
              ${alumno ? `<div><strong>Boleta:</strong> ${alumno.id || ''}</div>` : ''}
              <div><strong>Fecha de emisión:</strong> ${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>`;

      const encabezados = `
        <tr>
          <th class="id">ID de la materia</th>
          <th class="ua">Unidad de aprendizaje</th>
          <th class="prof">Profesor</th>
          ${dias.map(d => `<th class="dia">${d}</th>`).join('')}
        </tr>`;

      const cuerpo = filas.map(f => `
        <tr>
          <td class="id">${f.id}</td>
          <td class="ua">${f.ua}</td>
          <td class="prof">${f.profesor}</td>
          ${f.horas.map(hh => `<td class="dia">${hh || '&nbsp;'}</td>`).join('')}
        </tr>`).join('');

      const html = `
        <html>
          <head>
            <meta charset="utf-8"/>
            <title>Comprobante de horario</title>
            ${estilo}
          </head>
          <body>
            ${cabecera}
            <table>
              <thead>${encabezados}</thead>
              <tbody>${cuerpo}</tbody>
            </table>
          </body>
        </html>`;

      const w = window.open('', '_blank', 'width=1024,height=768');
      if (!w) {
        alert('No se pudo abrir la ventana de impresión. Permite ventanas emergentes para continuar.');
        return;
      }
      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => w.print(), 350);
    } catch (e) {
      console.error('Error al generar el comprobante de horario:', e);
      alert('No se pudo generar el comprobante. Vuelve a intentarlo.');
    }
  };

  return (
    <div className="alumno-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/ipn.png" alt="Logo" className="logo-img" />
          <span>Gestión Escolar</span>
        </div>
        <nav className="menu">
          <button onClick={() => navigate(`/alumno/${id}`)} className="menu-item active">
            Inicio
          </button>
          <button className="menu-item"  onClick={handleIns}>Inscribir Materias </button>
          <button className="menu-item" onClick={handleHorarios}>Horarios</button>
          <button className="menu-item" onClick = {() => navigate("/alumno/Kardex")}>Kardex</button>
          <button className="menu-item">Asistente de Chat</button>
          <button className="menu-item" onClick={handleEditPer}>Información Personal</button>
        </nav>
        <button className="logout">Cerrar sesión</button>
      </aside>

      <main className="main-content">
        <header className="alumno-header">
          <div>
    {alumno ? (
      <>
        <h2>¡Bienvenido {alumno.nombre} {alumno.ape_paterno} {alumno.ape_materno}!</h2>
        <p>Boleta: {alumno.id}</p>
      </>
    ) : (
      <p>Cargando alumno...</p>
    )}
  </div>
          
        </header>

        <section className="horario-section">
          <h2>Horario Semanal</h2>
          <table className="horario-table">
  <thead>
    <tr>
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
        <td>{h.profesor}</td>
        <td>{h.materia}</td>

        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia) => {
          const distrib = h.distribuciones.filter((d) => d.dia === dia);
          return (
            <td key={dia}>
              {distrib.length > 0 ? (
                distrib.map((d, i) => (
                  <div key={i} className="horario">
                    {d.hora_ini} - {d.hora_fin}
                  </div>
                ))
              ) : (
                ""
              )}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table>


 {/* comprobante de horario*/}
          <div className="boton-container">
            <button className="comprobante-btn" onClick={handleDescargarComprobante}>
              Solicitar comprobante de horario
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
