// src/pages/Unidades.jsx
import { useEffect, useState } from 'react';

const API = 'http://localhost:4000';

export function Unidades() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUA, setEditUA] = useState(null); // objeto UA (tiene id interno)
  const [form, setForm] = useState({ nombre: '', credito: '', carrera: '', semestre: '' });
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

  const openCreate = () => {
    setEditUA(null);
    setForm({ nombre: '', credito: '', carrera: '', semestre: '' });
    setModalOpen(true);
  };

  const openEdit = (ua) => {
    setEditUA(ua); // guardamos para PUT por id
    setForm({
      nombre: ua.nombre ?? '',
      credito: ua.credito ?? '',
      carrera: ua.carrera ?? '',
      semestre: ua.semestre ?? ''
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
      const payload = {
        nombre: form.nombre,
        credito: Number(form.credito),
        carrera: form.carrera,
        semestre: Number(form.semestre)
      };

      let res;
      if (editUA) {
        res = await fetch(`${API}/api/unidades/${encodeURIComponent(editUA.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API}/api/unidades`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Operación no exitosa');

      await load();
      setMsg(editUA ? 'UA actualizada' : 'UA creada');
      setModalOpen(false);
    } catch (e) {
      setMsg(e.message || 'Error');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Unidades de Aprendizaje</h2>
      {msg && <p>{msg}</p>}

      <button onClick={openCreate}>Nueva UA</button>

      <hr />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              {/* id interno ya no se muestra */}
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
                <td>{ua.nombre}</td>
                <td>{ua.credito}</td>
                <td>{ua.carrera}</td>
                <td>{ua.semestre}</td>
                <td>
                  <button onClick={() => openEdit(ua)}>Editar</button>
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

      {/* MODAL simple sin librerías */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{ background: '#fff', padding: 16, maxWidth: 480, width: '100%', borderRadius: 8 }}>
            <h3>{editUA ? 'Editar UA' : 'Nueva UA'}</h3>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
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

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button type="submit">{editUA ? 'Guardar cambios' : 'Crear'}</button>
                <button type="button" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

