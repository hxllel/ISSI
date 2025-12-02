// src/pages/DatosMedicos.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:4000";

export function DatosMedicos() {
  // ID del alumno viene de la URL: /administrador/datosMedicos/:id
  const { id } = useParams();
  const navigate = useNavigate();

  const [dm, setDm] = useState(null); // Datos médicos (un solo registro por alumno)
  const [enfs, setEnfs] = useState([]); // Enfermedades
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Modales
  const [modalDM, setModalDM] = useState(false);
  const [modalEnf, setModalEnf] = useState(false);
  const [editEnf, setEditEnf] = useState(null);

  // Formularios
  const [formDM, setFormDM] = useState({
    peso: "",
    altura: "",
    tipo_sangre: "",
    nss: "",
  });
  const [formEnf, setFormEnf] = useState({ descripcion: "" });

  const onChangeDM = (e) =>
    setFormDM({ ...formDM, [e.target.name]: e.target.value });
  const onChangeEnf = (e) =>
    setFormEnf({ ...formEnf, [e.target.name]: e.target.value });

  // Cargar datos médicos + enfermedades del alumno de la URL
  const cargar = async () => {
    if (!id) return;
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/api/datos-medicos/${encodeURIComponent(id)}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudieron obtener los datos médicos");
      }

      setDm(data.datos || null);
      setEnfs(data.enfermedades || []);
    } catch (e) {
      console.error(e);
      setMsg(e.message || "Error al cargar datos médicos");
      setDm(null);
      setEnfs([]);
    } finally {
      setLoading(false);
    }
  };

  // Se carga automáticamente al entrar a la página o si cambia el id
  useEffect(() => {
    cargar();
  }, [id]);

  // Abrir modal para crear datos médicos
  const abrirCrearDM = () => {
    setFormDM({ peso: "", altura: "", tipo_sangre: "", nss: "" });
    setModalDM(true);
  };

  // Abrir modal para editar datos médicos
  const abrirEditarDM = () => {
    if (!dm) return;
    setFormDM({
      peso: dm.peso ?? "",
      altura: dm.altura ?? "",
      tipo_sangre: dm.tipo_sangre ?? "",
      nss: dm.nss ?? "",
    });
    setModalDM(true);
  };

  // Guardar datos médicos (crear o editar)
  const guardarDM = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      let res;

      if (dm) {
        // Actualizar registro existente
        res = await fetch(
          `${API}/api/datos-medicos/${encodeURIComponent(dm.id)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              peso: Number(formDM.peso),
              altura: Number(formDM.altura),
              tipo_sangre: formDM.tipo_sangre,
              nss: formDM.nss,
            }),
          }
        );
      } else {
        // Crear nuevo registro usando el id del alumno de la URL
        res = await fetch(`${API}/api/datos-medicos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id_usuario: id,
            peso: Number(formDM.peso),
            altura: Number(formDM.altura),
            tipo_sangre: formDM.tipo_sangre,
            nss: formDM.nss,
          }),
        });
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");

      setModalDM(false);
      await cargar();
      setMsg("Datos médicos guardados correctamente");
    } catch (e) {
      console.error(e);
      setMsg(e.message || "Error al guardar datos médicos");
    }
  };

  // Abrir modal para nueva enfermedad
  const abrirNuevaEnf = () => {
    setEditEnf(null);
    setFormEnf({ descripcion: "" });
    setModalEnf(true);
  };

  // Abrir modal para editar enfermedad
  const abrirEditarEnf = (enf) => {
    setEditEnf(enf);
    setFormEnf({ descripcion: enf.descri || "" });
    setModalEnf(true);
  };

  // Guardar enfermedad (crear o editar)
  const guardarEnf = async (e) => {
    e.preventDefault();
    if (!dm) return;
    try {
      let res;

      if (editEnf) {
        res = await fetch(
          `${API}/api/datos-medicos/${encodeURIComponent(
            dm.id
          )}/enfermedades/${encodeURIComponent(editEnf.id)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ descripcion: formEnf.descripcion }),
          }
        );
      } else {
        res = await fetch(
          `${API}/api/datos-medicos/${encodeURIComponent(
            dm.id
          )}/enfermedades`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ descripcion: formEnf.descripcion }),
          }
        );
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");

      setModalEnf(false);
      await cargar();
      setMsg("Enfermedad guardada correctamente");
    } catch (e) {
      console.error(e);
      setMsg(e.message || "Error al guardar enfermedad");
    }
  };

  // Eliminar enfermedad
  const eliminarEnf = async (enf) => {
    if (!dm) return;
    if (!window.confirm("¿Seguro que quieres eliminar esta enfermedad?")) return;
    try {
      const res = await fetch(
        `${API}/api/datos-medicos/${encodeURIComponent(
          dm.id
        )}/enfermedades/${encodeURIComponent(enf.id)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo eliminar");

      await cargar();
    } catch (e) {
      console.error(e);
      setMsg(e.message || "Error al eliminar enfermedad");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 8 }}>
        Volver
      </button>

      <h2>Datos médicos del alumno</h2>
      <p>
        <strong>Boleta:</strong> {id}
      </p>

      {msg && <p>{msg}</p>}
      {loading && <p>Cargando...</p>}

      {!dm ? (
        <>
          <p>No hay datos médicos registrados para este alumno.</p>
          <button onClick={abrirCrearDM} disabled={!id}>
            Crear datos médicos
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              marginBottom: 12,
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <h3>Datos médicos</h3>
            <div>
              <strong>ID registro:</strong> {dm.id}
            </div>
            <div>
              <strong>Peso:</strong> {dm.peso} kg
            </div>
            <div>
              <strong>Altura:</strong> {dm.altura} m
            </div>
            <div>
              <strong>Tipo de sangre:</strong> {dm.tipo_sangre}
            </div>
            <div>
              <strong>NSS:</strong> {dm.nss}
            </div>
            <button onClick={abrirEditarDM} style={{ marginTop: 8 }}>
              Editar datos médicos
            </button>
          </div>

          <h3>Enfermedades</h3>
          <button onClick={abrirNuevaEnf}>Agregar enfermedad</button>

          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {enfs.length === 0 && <p>Sin enfermedades registradas.</p>}
            {enfs.map((e) => (
              <div
                key={e.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 8,
                  minWidth: 220,
                }}
              >
                <div>
                  <strong>ID:</strong> {e.id}
                </div>
                <div style={{ margin: "4px 0" }}>{e.descri}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button onClick={() => abrirEditarEnf(e)}>Editar</button>
                  <button onClick={() => eliminarEnf(e)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL: Datos Médicos */}
      {modalDM && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{dm ? "Editar datos médicos" : "Crear datos médicos"}</h3>
            <form onSubmit={guardarDM} style={{ display: "grid", gap: 8 }}>
              <input
                name="peso"
                type="number"
                step="0.1"
                placeholder="Peso (kg)"
                value={formDM.peso}
                onChange={onChangeDM}
                required
              />
              <input
                name="altura"
                type="number"
                step="0.01"
                placeholder="Altura (m)"
                value={formDM.altura}
                onChange={onChangeDM}
                required
              />
              <input
                name="tipo_sangre"
                placeholder="Tipo de sangre (ej. O+)"
                value={formDM.tipo_sangre}
                onChange={onChangeDM}
                required
              />
              <input
                name="nss"
                placeholder="NSS"
                value={formDM.nss}
                onChange={onChangeDM}
                required
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setModalDM(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Enfermedad */}
      {modalEnf && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{editEnf ? "Editar enfermedad" : "Nueva enfermedad"}</h3>
            <form onSubmit={guardarEnf} style={{ display: "grid", gap: 8 }}>
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formEnf.descripcion}
                onChange={onChangeEnf}
                required
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setModalEnf(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
};

const modal = {
  background: "#fff",
  padding: 16,
  maxWidth: 520,
  width: "100%",
  borderRadius: 8,
};

