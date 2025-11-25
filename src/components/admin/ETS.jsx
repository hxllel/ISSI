import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ModalPDF from "./ModalPDF";
import { AdminSidebar } from "./AdminSidebar";
import "./RevisarComprobante.css"; // estilos ETS


export function ETS() {
  const navigate = useNavigate();
  const API = "http://localhost:4000";
  const [grupos, setGrupos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [idETS, setIdETS] = useState("");
  const [modalPdf, setModalPdf] = useState(false);
  const [pdfActual, setPdfActual] = useState(null);

  useEffect(() => {
    fetch(`${API}/ObtenerGETS`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setGrupos(data.grupos))
      .catch((err) => console.error("Error al obtener la información:", err));
  }, []);

  const handleClickAl = (id) => {
    fetch(`${API}/Comprobantes/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAlumnos(data.comprobantes);
      })
      .catch((err) => console.error("Error", err));

    setModalOpen(true);
  };

  const handleVerPDF = (pdfBase64, id) => {
    setPdfActual(pdfBase64);
    setIdETS(id);
    setModalPdf(true);
  };

  const HandleValidar = () => {
    fetch(`${API}/Validar/${idETS}`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Se ha validado correctamente el ETS");
          navigate(`/administrador/ETS`);
          window.location.reload();
        }
      })
      .catch((err) => console.error("Error", err));
  };

  const HandleDenegar = () => {
    fetch(`${API}/Denegar/${idETS}`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Se ha denegado correctamente el ETS");
          navigate(`/administrador/ETS`);
          window.location.reload();
        }
      })
      .catch((err) => console.error("Error", err));
  };

  return (
    <div className="admin-container">
    <AdminSidebar />
    <main className="main-content">
    
      {/* Encabezado y botón */}
      <header className="chat-header">
          <div className="encabezado-section">
          <h1>Comprobantes de Exámenes a Título de Suficiencia (ETS)</h1>
            
          </div>
          <div><button className="btn azul">
          Crear nuevo grupo
        </button></div>
          <img src="/escom.png" alt="Logo SCOM" className="header-logo" />
        </header>
      
<section className="horario-section">
      {/* Tabla principal */}
      <div className="ets-table-container">
        <table className="ets-table">
          <thead>
            <tr>
              <th>Unidad de Aprendizaje</th>
              <th>Profesor</th>
              <th>Día</th>
              <th>Horas</th>
              <th>Turno</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {grupos.length > 0 ? (
              grupos.map((grupo) => (
                <tr key={grupo.id}>
                  <td>{grupo.Unidad_Aprendizaje.nombre}</td>
                  <td>
                    {grupo.DatosPersonale?.nombre}{" "}
                    {grupo.DatosPersonale?.ape_paterno}{" "}
                    {grupo.DatosPersonale?.ape_materno}
                  </td>
                  <td>{grupo.fecha}</td>
                  <td>
                    {grupo.hora_inicio} - {grupo.hora_final}
                  </td>
                  <td>{grupo.turno}</td>
                  <td>
                    <button
                      className="ets-btn-revisar"
                      onClick={() => handleClickAl(grupo.id)}
                    >
                      Revisar comprobantes de pago
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="ets-table-empty">
                  No hay ETS registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL COMPROBANTES */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="ets-comprobantes-modal">
          <h1 className="ets-comprobantes-title">COMPROBANTES</h1>

          <table className="ets-comprobantes-table">
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Subió comprobante</th>
                <th>Ver comprobante</th>
              </tr>
            </thead>

            <tbody>
              {alumnos.length > 0 ? (
                alumnos.map((alumno) => (
                  <tr key={alumno.id}>
                    <td>
                      {alumno.Materia_Reprobada.Estudiante.DatosPersonale
                        ?.ape_paterno}{" "}
                      {
                        alumno.Materia_Reprobada.Estudiante.DatosPersonale
                          ?.ape_materno
                      }{" "}
                      {
                        alumno.Materia_Reprobada.Estudiante.DatosPersonale
                          ?.nombre
                      }
                    </td>

                    <td>{alumno.comprobante ? "Sí" : "No"}</td>

                    <td>
                      {alumno.comprobante && alumno.validado === 0 ? (
                        <button
                          className="ets-comprobantes-btn-ver"
                          onClick={() =>
                            handleVerPDF(alumno.comprobante, alumno.id)
                          }
                        >
                          Ver comprobante
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay alumnos inscritos al ETS</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* MODAL PDF */}
      <ModalPDF open={modalPdf} onClose={() => setModalPdf(false)}>
        <div className="ets-pdf-modal">
          <h2 className="ets-pdf-title">COMPROBANTE DE PAGO</h2>

          <div className="ets-pdf-actions">
            <button className="btn-validar" onClick={HandleValidar}>
              Validar
            </button>
            <button className="btn-denegar" onClick={HandleDenegar}>
              Denegar
            </button>
          </div>

          {pdfActual ? (
            <div className="ets-pdf-frame">
              <embed
                src={`data:application/pdf;base64,${pdfActual}`}
                type="application/pdf"
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <p className="ets-pdf-error">No se pudo cargar el PDF.</p>
          )}
        </div>
      </ModalPDF>
    </section>
    </main>
    </div>
  );
}
