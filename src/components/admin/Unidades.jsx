// src/pages/Unidades.jsx
import { useEffect, useState } from 'react';
import { AdminSidebar } from "./AdminSidebar";
import "./Unidades.css";

const API = 'http://localhost:4000';

export function Unidades() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUA, setEditUA] = useState(null);
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
    setEditUA(ua);
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
    <div className="admin-container">
      <AdminSidebar activeRoute="unidades" />

      <main className="main-content">
        <section className="admin-section">
          <div className="admin-header">
            <h1>Unidades de Aprendizaje</h1>
            <button className="btn-primary" onClick={openCreate}>+ Nueva UA</button>
          </div>

          {msg && <div className="alert">{msg}</div>}

          <div className="table-wrapper">
            {loading ? (
              <p className="loading">Cargando...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Crédito</th>
                    <th>Carrera</th>
                    <th>Semestre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? (
                    list.map((ua) => (
                      <tr key={ua.id}>
                        <td>{ua.nombre}</td>
                        <td>{ua.credito}</td>
                        <td>{ua.carrera}</td>
                        <td>{ua.semestre}</td>
                        <td>
                          <button className="btn-edit" onClick={() => openEdit(ua)}>Editar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">Sin registros</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>{editUA ? 'Editar UA' : 'Nueva UA'}</h3>
                <form onSubmit={onSubmit} className="form-grid">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input
                      name="nombre"
                      placeholder="Nombre"
                      value={form.nombre}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Crédito *</label>
                    <input
                      name="credito"
                      type="number"
                      step="0.5"
                      placeholder="Crédito"
                      value={form.credito}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Carrera *</label>
                    <input
                      name="carrera"
                      placeholder="Carrera (coincide con carrera.nombre)"
                      value={form.carrera}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Semestre *</label>
                    <input
                      name="semestre"
                      type="number"
                      placeholder="Semestre"
                      value={form.semestre}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="btn-submit">
                      {editUA ? 'Guardar Cambios' : 'Crear'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={closeModal}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

