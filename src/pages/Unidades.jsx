// src/pages/Unidades.jsx
import { useEffect, useState } from 'react';

const API = 'http://localhost:4000';

export default function Unidades() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    credito: '',
    carrera: '',
    semestre: ''
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/unidades`, { credentials: 'include' });
      setList(await res.json());
    } catch (e) {
      setMsg('Error cargando unidades');
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
      const res = await fetch(`${API}/api/unidades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id: form.id, // PK string
          nombre: form.nombre,
          credito: Number(form.credito),
          carrera: form.carrera, // debe existir previamente en carrera.nombre
          semestre: Number(form.semestre)
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'No se pudo crear');
      }
      setForm({ id: '', nombre: '', credito: '', carrera: '', semestre: '' });
      await load();
      setMsg('UA creada');
    } catch (e) {
      setMsg(e.message || 'Error al crear UA');
    }
  };

  const startEdit = (ua) => {
    setEditId(ua.id);
    setForm({
      id: ua.id,
      nombre: ua.nombre,
      credito: ua.credito,
      carrera: ua.carrera,
      semestre: ua.semestre
    });
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/api/unidades/${encodeURIComponent(editId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nombre: form.nombre,
          credito: Number(form.credito),
          carrera: form.carrera,
          semestre: Number(form.semestre)
        })
      });
      if (!res.ok) throw new Error('No se pudo actualizar');
      setEditId(null);
      setForm({ id: '', nombre: '', credito: '', carrera: '', semestre: '' });
      await load();
      setMsg('UA actualizada');
    } catch (e) {
      setMsg('Error al actualizar UA');
    }
  };

  const onDelete = async (id) => {
    if (!confirm(`¿Eliminar UA ${id}?`)) return;
    setMsg('');
    try {
      const res = await fetch(`${API}/api/unidades/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('No se pudo eliminar');
      await load();
      setMsg('UA eliminada');
    } catch (e) {
      setMsg('Error al eliminar UA');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Unidades de Aprendizaje</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={editId ? onUpdate : onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input
          name="id"
          placeholder="ID (PK string, ej. PROG1)"
          value={form.id}
          onChange={onChange}
          required
          disabled={!!editId}
        />
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={onChange}
          required
        />
        <input
          name="credito"
          type="number"
          step="0.5"
          placeholder="Crédito"
          value={form.credito}
          onChange={onChange}
          required
        />
        <input
          name="carrera"
          placeholder="Carrera (coincide con carrera.nombre)"
          value={form.carrera}
          onChange={onChange}
          required
        />
        <input
          name="semestre"
          type="number"
          placeholder="Semestre"
          value={form.semestre}
          onChange={onChange}
          required
        />
        <button type="submit">{editId ? 'Guardar cambios' : 'Agregar'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => { setEditId(null); setForm({ id: '', nombre: '', credito: '', carrera: '', semestre: '' }); }}
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Crédito</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map((ua) => (
              <tr key={ua.id}>
                <td>{ua.id}</td>
                <td>{ua.nombre}</td>
                <td>{ua.credito}</td>
                <td>{ua.carrera}</td>
                <td>{ua.semestre}</td>
                <td>
                  <button onClick={() => startEdit(ua)}>Editar</button>{' '}
                  <button onClick={() => onDelete(ua.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan="6">Sin registros</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
