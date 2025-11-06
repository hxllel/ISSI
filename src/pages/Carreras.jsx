// src/pages/Carreras.jsx
import { useEffect, useState } from 'react';

const API = 'http://localhost:4000';

export default function Carreras() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    creditos_iniciales: '',
    prefijo_grupo: '',
    duracion_max: ''
  });
  const [editNombre, setEditNombre] = useState(null);
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

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
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
      setForm({ nombre: '', creditos_iniciales: '', prefijo_grupo: '', duracion_max: '' });
      await load();
      setMsg('Carrera creada');
    } catch (e) {
      setMsg('Error al crear carrera');
    }
  };

  const startEdit = (c) => {
    setEditNombre(c.nombre);
    setForm({
      nombre: c.nombre,
      creditos_iniciales: c.creditos_iniciales ?? '',
      prefijo_grupo: c.prefijo_grupo ?? '',
      duracion_max: c.duracion_max ?? ''
    });
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
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
      setEditNombre(null);
      setForm({ nombre: '', creditos_iniciales: '', prefijo_grupo: '', duracion_max: '' });
      await load();
      setMsg('Carrera actualizada');
    } catch (e) {
      setMsg('Error al actualizar carrera');
    }
  };

  const onDelete = async (nombre) => {
    if (!confirm(`¿Eliminar carrera ${nombre}?`)) return;
    setMsg('');
    try {
      const res = await fetch(`${API}/api/carreras/${encodeURIComponent(nombre)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('No se pudo eliminar');
      await load();
      setMsg('Carrera eliminada');
    } catch (e) {
      setMsg('Error al eliminar carrera');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Carreras</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={editNombre ? onUpdate : onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
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
        <button type="submit">{editNombre ? 'Guardar cambios' : 'Agregar'}</button>
        {editNombre && (
          <button
            type="button"
            onClick={() => { setEditNombre(null); setForm({ nombre: '', creditos_iniciales: '', prefijo_grupo: '', duracion_max: '' }); }}
          >
            Cancelar
          </button>
        )}
      </form>

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
                  <button onClick={() => startEdit(c)}>Editar</button>{' '}
                  <button onClick={() => onDelete(c.nombre)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan="5">Sin registros</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
