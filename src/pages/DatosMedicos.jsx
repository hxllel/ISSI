// src/pages/DatosMedicos.jsx
import { useState } from 'react';

const API = 'http://localhost:4000';

export default function DatosMedicos() {
  const [idUsuario, setIdUsuario] = useState('');
  const [dm, setDm] = useState(null); // objeto datos medicos
  const [enfs, setEnfs] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // modales
  const [modalDM, setModalDM] = useState(false);
  const [modalEnf, setModalEnf] = useState(false);
  const [editEnf, setEditEnf] = useState(null);

  // formulario DM
  const [formDM, setFormDM] = useState({ peso: '', altura: '', tipo_sangre: '', nss: '' });
  // formulario enfermedad
  const [formEnf, setFormEnf] = useState({ descripcion: '' });

  const onChangeDM = (e) => setFormDM({ ...formDM, [e.target.name]: e.target.value });
  const onChangeEnf = (e) => setFormEnf({ ...formEnf, [e.target.name]: e.target.value });

  const cargar = async () => {
    if (!idUsuario) { setMsg('Ingresa un id_usuario'); return; }
    setMsg(''); setLoading(true);
    try {
      const res = await fetch(`${API}/api/datos-medicos/${encodeURIComponent(idUsuario)}`, { credentials: 'include' });
      const data = await res.json();
      setDm(data.datos);
      setEnfs(data.enfermedades || []);
    } catch {
      setMsg('Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  const abrirCrearDM = () => {
    setFormDM({ peso: '', altura: '', tipo_sangre: '', nss: '' });
    setModalDM(true);
  };

  const abrirEditarDM = () => {
    if (!dm) return;
    setFormDM({
      peso: dm.peso ?? '',
      altura: dm.altura ?? '',
      tipo_sangre: dm.tipo_sangre ?? '',
      nss: dm.nss ?? ''
    });
    setModalDM(true);
  };

  const guardarDM = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      let res;
      if (dm) {
        res = await fetch(`${API}/api/datos-medicos/${encodeURIComponent(dm.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            peso: Number(formDM.peso),
            altura: Number(formDM.altura),
            tipo_sangre: formDM.tipo_sangre,
            nss: formDM.nss
          })
        });
      } else {
        res = await fetch(`${API}/api/datos-medicos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            id_usuario: idUsuario,
            peso: Number(formDM.peso),
            altura: Number(formDM.altura),
            tipo_sangre: formDM.tipo_sangre,
            nss: formDM.nss
          })
        });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar');

      setModalDM(false);
      await cargar();
      setMsg('Datos médicos guardados');
    } catch (e) {
      setMsg(e.message || 'Error');
    }
  };

  const abrirNuevaEnf = () => {
    setEditEnf(null);
    setFormEnf({ descripcion: '' });
    setModalEnf(true);
  };

  const abrirEditarEnf = (enf) => {
    setEditEnf(enf);
    setFormEnf({ descripcion: enf.descri || '' });
    setModalEnf(true);
  };

  const guardarEnf = async (e) => {
    e.preventDefault();
    if (!dm) return;
    try {
      let res;
      if (editEnf) {
        res = await fetch(`${API}/api/datos-medicos/${encodeURIComponent(dm.id)}/enfermedades/${encodeURIComponent(editEnf.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ descripcion: formEnf.descripcion })
        });
      } else {
        res = await fetch(`${API}/api/datos-medicos/${encodeURIComponent(dm.id)}/enfermedades`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ descripcion: formEnf.descripcion })
        });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar');
      setModalEnf(false);
      await cargar();
      setMsg('Enfermedad guardada');
    } catch (e) {
      setMsg(e.message || 'Error en enfermedad');
    }
  };

  const eliminarEnf = async (enf) => {
    if (!dm) return;
    if (!window.confirm("¿Seguro que quieres eliminar esta enfermedad?")) return;
    try {
      const res = await fetch(`${API}/api/datos-medicos/${encodeURIComponent(dm.id)}/enfermedades/${encodeURIComponent(enf.id)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('No se pudo eliminar');
      await cargar();
    } catch (e) {
      setMsg('Error al eliminar enfermedad');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Datos Médicos</h2>
      {msg && <p>{msg}</p>}

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          placeholder="id_usuario (boleta)"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
        />
        <button onClick={cargar} disabled={loading}>Cargar</button>
      </div>

      {!dm ? (
        <>
          <p>No hay datos médicos para este usuario.</p>
          <button onClick={abrirCrearDM} disabled={!idUsuario}>Crear datos médicos</button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <strong>Registro:</strong> {dm.id} — <em>usuario:</em> {dm.id_usuario}
            <div>Peso: {dm.peso} kg</div>
            <div>Altura: {dm.altura} m</div>
            <div>Tipo de sangre: {dm.tipo_sangre}</div>
            <div>NSS: {dm.nss}</div>
            <button onClick={abrirEditarDM} style={{ marginTop: 8 }}>Editar datos médicos</button>
          </div>

          <hr />

          <h3>Enfermedades</h3>
          <button onClick={abrirNuevaEnf}>Agregar enfermedad</button>
          <table border="1" cellPadding="6" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {enfs.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.descri}</td>
                  <td>
                    <button onClick={() => abrirEditarEnf(e)}>Editar</button>{' '}
                    <button onClick={() => eliminarEnf(e)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {enfs.length === 0 && <tr><td colSpan="3">Sin registros</td></tr>}
            </tbody>
          </table>
        </>
      )}

      {/* MODAL: Datos Médicos */}
      {modalDM && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{dm ? 'Editar datos médicos' : 'Crear datos médicos'}</h3>
            <form onSubmit={guardarDM} style={{ display: 'grid', gap: 8 }}>
              <input name="peso" type="number" step="0.1" placeholder="Peso (kg)" value={formDM.peso} onChange={onChangeDM} required />
              <input name="altura" type="number" step="0.01" placeholder="Altura (m)" value={formDM.altura} onChange={onChangeDM} required />
              <input name="tipo_sangre" placeholder="Tipo de sangre (ej. O+)" value={formDM.tipo_sangre} onChange={onChangeDM} required />
              <input name="nss" placeholder="NSS" value={formDM.nss} onChange={onChangeDM} required />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setModalDM(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Enfermedad */}
      {modalEnf && (
        <div style={overlay}>
          <div style={modal}>
            <h3>{editEnf ? 'Editar enfermedad' : 'Nueva enfermedad'}</h3>
            <form onSubmit={guardarEnf} style={{ display: 'grid', gap: 8 }}>
              <textarea name="descripcion" placeholder="Descripción" value={formEnf.descripcion} onChange={onChangeEnf} required />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setModalEnf(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const overlay = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
};
const modal = { background: '#fff', padding: 16, maxWidth: 520, width: '100%', borderRadius: 8 };
