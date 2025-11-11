// src/pages/Carreras.jsx
import { useEffect, useState } from 'react';

const API = 'http://localhost:4000';

export default function Carreras() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNombre, setEditNombre] = useState(null); // PK
  const [form, setForm] = useState({
    nombre: '', creditos_iniciales: '', prefijo_grupo: '', duracion_max: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/carreras`, { credentials: 'include' });
      setList(await res.json());
    } catch (e) {
      setMsg('Error cargando carreras');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditNombre(null);
    setForm({ nombre: '', creditos_iniciales: '', prefijo_grupo: '', duracion_max: '' });
    setModalOpen(true);
  };

  const openEdit = (c) => {
    setEditNombre(c.nombre);
    setForm({
      nombre: c.nombre ?? '',
      creditos_iniciales: c.creditos_iniciales ?? '',
      prefijo_grupo: c.prefijo_grupo ?? '',
      duracion_max: c.duracion_max ?? ''
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMsg('');
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      if (editNombre) {
        const res = await fetch(`${API}/api/carreras/${encodeURIComponent(editNombre)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            creditos_iniciales: Number(form.creditos_iniciales),
            prefijo_grupo: form.prefijo_grupo,
            duracion_max: Number(form.duracion_max)
          })
        });
        if (!res.ok) throw new Error('No se pudo actualizar');
      } else {
        const res = await fetch(`${API}/api/carreras`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            nombre: form.nombre,
            creditos_iniciales: Number(form.creditos_iniciales),
            prefijo_grupo: form.prefijo_grupo,
            duracion_max: Number(form.duracion_max)
          })
        });
        if (!res.ok) throw new Error('No se pudo crear');
      }
      await load();
      setMsg(editNombre ? 'Carrera actualizada' : 'Carrera creada');
      setModalOpen(false);
    } catch (e) {
      setMsg('Error al guardar');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Carreras</h2>
      {msg && <p>{msg}</p>}

      <button onClick={openCreate}>Nueva carrera</button>

      <hr />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Créditos iniciales</th>
              <th>Prefijo grupo</th>
              <th>Duración máx</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.nombre}>
                <td>{c.nombre}</td>
                <td>{c.creditos_iniciales}</td>
                <td>{c.prefijo_grupo}</td>
                <td>{c.duracion_max}</td>
                <td>
                  <button onClick={() => openEdit(c)}>Editar</button>
                  {/* Eliminado: botón Eliminar */}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan="5">Sin registros</td></tr>
            )}
          </tbody>
        </table>
      )}

      {/* MODAL simple */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ background: '#fff', padding: 16, maxWidth: 480, width: '100%', borderRadius: 8 }}>
            <h3>{editNombre ? 'Editar carrera' : 'Nueva carrera'}</h3>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
              <input
                name="nombre"
                placeholder="Nombre (PK)"
                value={form.nombre}
                onChange={onChange}
                required
                disabled={!!editNombre}
              />
              <input
                name="creditos_iniciales"
                type="number"
                placeholder="Créditos iniciales"
                value={form.creditos_iniciales}
                onChange={onChange}
                required
              />
              <input
                name="prefijo_grupo"
                placeholder="Prefijo de grupo (ej. ISC)"
                value={form.prefijo_grupo}
                onChange={onChange}
                required
              />
              <input
                name="duracion_max"
                type="number"
                placeholder="Duración máx (semestres)"
                value={form.duracion_max}
                onChange={onChange}
                required
              />

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button type="submit">{editNombre ? 'Guardar cambios' : 'Crear'}</button>
                <button type="button" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

