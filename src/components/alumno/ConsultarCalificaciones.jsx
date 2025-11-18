import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function ConsultarCalificaciones() {
  const [datos, setDatos] = useState([]);
  const API = "http://localhost:4000";

  useEffect(() => {
    fetch(`${API}/ConsultarCalificaciones`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDatos(data.calificaciones);
        }
      })
      .catch((err) =>
        console.error("Error al obtener las calificaciones guardadas", err)
      );
  }, []);


  return (
    <section>
      <h2>Calificaciones Consultadas</h2>

      <table border="1" cellPadding={5}>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Materia</th>
            <th>Profesor</th>
            <th>Calificación 1er periodo</th>
            <th>Calificación 2do periodo</th>
            <th>Calificación 3er periodo</th>
            <th>Calificación final</th>
            <th>Extraordinario</th>
          </tr>
        </thead>

        <tbody>
          {datos.length === 0 ? (
            <tr>
              <td colSpan={8} className="pase-empty">
                No hay calificaciones.
              </td>
            </tr>
          ) : (
            datos.map((dato, idx) => (
              <tr key={idx}>
                <td>{dato.id_grupo}</td>
                <td>{dato.nombre_ua}</td>
                <td>{dato.profesor}</td>
                <td>{dato.calificacion_primer}</td>
                <td>{dato.calificacion_segundo}</td>
                <td>{dato.calificacion_tercer}</td>
                <td>{dato.calificacion_final}</td>
                <td>{dato.extra}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
