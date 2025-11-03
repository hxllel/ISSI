import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HistorialAcademico() {
  const navigate = useNavigate();

  const [historial, setHistorial] = useState([]);
  const [semestres, setSemestres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/ObtenerHistorial", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setHistorial(data.historial || []);
        setSemestres(data.semestres || []);
      })
      .catch(() => {
        setHistorial([]);
        setSemestres([]);
      });
  }, []);

  // Renderiza una tabla por semestre
  const renderSeccion = (semestre) => {
    const materias = historial.filter((h) => h.semestre === semestre);

    return (
      <section key={semestre} className="p-4 bg-white shadow rounded-2xl mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Semestre {semestre}
        </h2>
        <table className="w-full border text-sm text-center" border="1" cellPadding={5}>
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Unidad de Aprendizaje</th>
              <th className="border px-2 py-1">Calificación Final</th>
              <th className="border px-2 py-1">Periodo</th>
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Método Aprobado</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((m) => (
              <tr key={m.id}>
                <td className="border px-2 py-1">{m.unidad_aprendizaje}</td>
                <td className="border px-2 py-1">{m.calificacion_final}</td>
                <td className="border px-2 py-1">{m.periodo}</td>
                <td className="border px-2 py-1">{m.fecha}</td>
                <td className="border px-2 py-1">{m.metodo_aprobado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Historial Académico</h1>

      {semestres.length > 0 ? (
        semestres.map((s) => renderSeccion(s))
      ) : (
        <p className="text-center text-gray-500">No hay registros disponibles.</p>
      )}
    </section>
  );
}
