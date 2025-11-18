import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import ModalPDF from "./ModalPDF";
import { AdminSidebar } from "./AdminSidebar";
import "./ETS.css";

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
      <AdminSidebar activeRoute="ets" />

      <main className="main-content">
        <section>
          <button>Crear nuevo grupo</button>

          <table border="2" cellPadding={5}>
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
                      <button onClick={() => handleClickAl(grupo.id)}>
                        Revisar comprobantes de pago
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <h1>COMPROBANTES</h1>

            <table border="2" cellPadding={5}>
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
                        {alumno.Materia_Reprobada.Estudiante.DatosPersonale?.ape_paterno}{" "}
                        {alumno.Materia_Reprobada.Estudiante.DatosPersonale?.ape_materno}{" "}
                        {alumno.Materia_Reprobada.Estudiante.DatosPersonale?.nombre}
                      </td>

                      <td>{alumno.comprobante ? "Sí" : "No"}</td>

                      <td>
                        {alumno.comprobante && alumno.validado === 0 ? (
                          <button onClick={() => handleVerPDF(alumno.comprobante, alumno.id)}>
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
                    <td colSpan="4">No hay alumnos inscritos al ETS</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Modal>

          <ModalPDF open={modalPdf} onClose={() => setModalPdf(false)}>
            <h2>COMPROBANTE DE PAGO</h2>
            <div>
              <button onClick={HandleValidar}>Validar</button>
              <button onClick={HandleDenegar}>Denegar</button>
            </div>

            {pdfActual ? (
              <embed
                src={`data:application/pdf;base64,${pdfActual}`}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            ) : (
              <p>No se pudo cargar el PDF.</p>
            )}
          </ModalPDF>
        </section>
      </main>
    </div>
  );
}
