import React from "react";
import { SidebarAlumno } from "../alumno/SideBarAlumno.jsx"; 
import "./ConocenosAlumno.css";

export function ConocenosAlumno() {
  return (
    <div className="alumno-container">
      <SidebarAlumno />

      <main className="main-content">
        <header className="chat-header">
          <div className="encabezado-section">
            <h1>Conócenos</h1>
          </div>
          

          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
        <section className="section-alumnos">
          <div className="cono-hero__bg" />
          <div className="cono-hero__content">
            <div className="cono-badge">SAES-R • ESCOM</div>
            
            <p>
              SAES-R es una plataforma académica para la gestión de procesos escolares:
              inscripción, horarios, calificaciones, kardex, ETS y más.
              Diseñada con enfoque en claridad, rapidez y accesibilidad.
            </p>

            <div className="cono-hero__cta">
              <a className="cono-btn primary" href="#servicios">Ver servicios</a>
              <a className="cono-btn" href="#faq">Preguntas frecuentes</a>
            </div>

            <div className="cono-stats">
              <div className="cono-stat">
                <span className="num">+7</span>
                <span className="label">Módulos principales</span>
              </div>
              <div className="cono-stat">
                <span className="num">24/7</span>
                <span className="label">Acceso a información</span>
              </div>
              <div className="cono-stat">
                <span className="num">1</span>
                <span className="label">Cuenta, todo integrado</span>
              </div>
            </div>
          </div>
        </section>

        {/* MISIÓN / VISIÓN */}
        <section className="cono-section" id="mision">
          <div className="cono-grid2">
            <article className="cono-card">
              <h2>Misión</h2>
              <p>
                Facilitar la vida escolar del alumnado centralizando procesos académicos en una
                plataforma moderna, confiable y fácil de usar.
              </p>
              <ul className="cono-list">
                <li>Acceso rápido a trámites y consulta.</li>
                <li>Interfaz clara y consistente.</li>
                <li>Información organizada por perfil.</li>
              </ul>
            </article>

            <article className="cono-card">
              <h2>Visión</h2>
              <p>
                Ser una plataforma modelo en experiencia de usuario para sistemas escolares,
                integrando automatización, analítica y soporte inteligente.
              </p>
              <ul className="cono-list">
                <li>Mejoras continuas basadas en feedback.</li>
                <li>Compatibilidad móvil y accesibilidad.</li>
                <li>Seguridad y privacidad como prioridad.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="cono-section" id="servicios">
          <div className="cono-head">
            <h2>¿Qué puedes hacer aquí?</h2>
            <p>Funciones principales disponibles para el perfil Alumno.</p>
          </div>

          <div className="cono-grid3">
            <div className="cono-feature">
              <div className="icon">📝</div>
              <h3>Inscripción</h3>
              <p>Consulta e inscríbete a materias de acuerdo a tu carga académica.</p>
            </div>
            <div className="cono-feature">
              <div className="icon">📅</div>
              <h3>Horarios</h3>
              <p>Visualiza tu horario y ubica fácilmente tus grupos.</p>
            </div>
            <div className="cono-feature">
              <div className="icon">📄</div>
              <h3>Kárdex</h3>
              <p>Revisa tu historial académico en un solo lugar.</p>
            </div>
            <div className="cono-feature">
              <div className="icon">✅</div>
              <h3>Calificaciones</h3>
              <p>Consulta calificaciones por periodo y seguimiento de avances.</p>
            </div>
            <div className="cono-feature">
              <div className="icon">🧾</div>
              <h3>ETS</h3>
              <p>Información y procesos relacionados a evaluaciones ETS.</p>
            </div>
            <div className="cono-feature">
              <div className="icon">💬</div>
              <h3>Asistente</h3>
              <p>Apoyo informativo para ubicar opciones y resolver dudas frecuentes.</p>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section className="cono-section" id="valores">
          <div className="cono-grid2">
            <article className="cono-card soft">
              <h2>Nuestros valores</h2>
              <div className="cono-chips">
                <span className="chip">Claridad</span>
                <span className="chip">Accesibilidad</span>
                <span className="chip">Seguridad</span>
                <span className="chip">Rapidez</span>
                <span className="chip">Mejora continua</span>
              </div>
              <p className="muted">
                Buscamos que todo sea entendible, rápido, y sin pasos innecesarios.
              </p>
            </article>

            <article className="cono-card soft">
              <h2>Seguridad y privacidad</h2>
              <p>
                Las acciones del sistema están diseñadas para proteger tu información y
                evitar accesos no autorizados.
              </p>
              <ul className="cono-list">
                <li>Sesiones con credenciales y control de acceso por roles.</li>
                <li>Datos mostrados según permisos del perfil.</li>
                <li>Buenas prácticas en manejo de información.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="cono-section" id="faq">
          <div className="cono-head">
            <h2>Preguntas frecuentes</h2>
            <p>Respuestas rápidas para lo más común.</p>
          </div>

          <div className="cono-faq">
            <details className="faq-item">
              <summary>¿Por qué no me aparecen materias para inscribir?</summary>
              <p>
                Puede depender de tu situación académica, cupos disponibles o periodo activo.
                Revisa que estés en el periodo correcto y que tengas acceso habilitado.
              </p>
            </details>

            <details className="faq-item">
              <summary>¿Dónde consulto mis calificaciones?</summary>
              <p>
                En el menú lateral, entra a <b>Consultar Calificaciones</b>. Ahí verás las
                calificaciones registradas por periodo.
              </p>
            </details>

            <details className="faq-item">
              <summary>¿Mis datos personales están seguros?</summary>
              <p>
                La plataforma separa accesos por roles y muestra información según permisos.
                Evita compartir tu sesión y cierra sesión en equipos públicos.
              </p>
            </details>

            <details className="faq-item">
              <summary>¿A quién contacto si tengo un problema?</summary>
              <p>
                Si tu proyecto tiene sección de soporte, ahí podrás levantar incidencia.
                Si no, contacta al área escolar/soporte de tu sistema (según tu escuela).
              </p>
            </details>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cono-footer">
          <div className="line" />
          <p>
            © {new Date().getFullYear()} SAES-R • ESCOM / IPN — Página informativa para alumnado.
          </p>
        </footer>
      </main>
    </div>
  );
}
