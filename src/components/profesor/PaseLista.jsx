import React, { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";

export function PaseLista() {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState({}); // 🔹 { id_alumno: "Si" o "No" }
  const { id } = useParams();
    const navigate = useNavigate();
    const API = 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API}/AlumnosInscritos/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) =>{
        if(data.success){
            setAlumnos(data.alumnos)
        }
        else{
          alert("Ya no puede pasar lista del dia de hoy");
          navigate(`/profesor/${data.profe}`);

        }
      }) 
      .catch((err) => console.error("Error al obtener los alumnos", err));
  }, [id]);

  const handleSelectChange = (idAlumno, valor) => {
    setAsistencias((prev) => ({
      ...prev,
      [idAlumno]: valor, // Guarda el valor de asistencia según el alumno
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Convertir el objeto en una lista de tuplas [{ id_alumno, asistencia }]
    const dataEnviar = Object.entries(asistencias).map(([id_alumno, asistencia]) => ({
      id_alumno,
      asistencia,
    }));

    fetch(`${API}/GuardarAsistencias/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ grupo: id, asistencias: dataEnviar }),
    })
      .then((res) => res.json())
      .then((data) =>   
        {if(data.success){
                alert(data.msg);
                navigate(`/profesor/${data.profe}`);
            }})
      .catch((err) => console.error("Error al enviar asistencias:", err));
  };

  return (
    <section>
      <h1>Pase de lista del grupo</h1>

      <form onSubmit={handleSubmit}>
        <table border="1" cellPadding={5}>
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>
                  {alumno.ape_paterno} {alumno.ape_materno} {alumno.nombre}
                </td>
                <td>
                  <select
                    value={asistencias[alumno.id] || ""}
                    onChange={(e) => handleSelectChange(alumno.id, e.target.value)}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Asistencia</option>
                    <option value="No">Inasistencia</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}
