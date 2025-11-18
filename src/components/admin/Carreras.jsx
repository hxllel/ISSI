// src/pages/Carreras.jsx
import { useEffect, useState } from 'react';
import { AdminSidebar } from "./AdminSidebar";
import "./Carreras.css";

const API = 'http://localhost:4000';

export function Carreras() {
  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNombre, setEditNombre] = useState(null);
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
    <div className="admin-container">
      <AdminSidebar activeRoute="carreras" />

      <main className="main-content">
        <section className="admin-section">
          <div className="admin-header">
            <h1>Carreras</h1>
            <button className="btn-primary" onClick={openCreate}>+ Nueva Carrera</button>
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
                    <th>Créditos Iniciales</th>
                    <th>Prefijo Grupo</th>
                    <th>Duración Máx</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? (
                    list.map((c) => (
                      <tr key={c.nombre}>
                        <td>{c.nombre}</td>
                        <td>{c.creditos_iniciales}</td>
                        <td>{c.prefijo_grupo}</td>
                        <td>{c.duracion_max}</td>
                        <td>
                          <button className="btn-edit" onClick={() => openEdit(c)}>Editar</button>
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
                <h3>{editNombre ? 'Editar Carrera' : 'Nueva Carrera'}</h3>
                <form onSubmit={onSubmit} className="form-grid">
                  <div className="form-group">
                    <label>Nombre (PK) *</label>
                    <input
                      name="nombre"
                      placeholder="Nombre"
                      value={form.nombre}
                      onChange={onChange}
                      required
                      disabled={!!editNombre}
                    />
                  </div>
                  <div className="form-group">
                    <label>Créditos Iniciales *</label>
                    <input
                      name="creditos_iniciales"
                      type="number"
                      placeholder="Créditos iniciales"
                      value={form.creditos_iniciales}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Prefijo Grupo *</label>
                    <input
                      name="prefijo_grupo"
                      placeholder="Prefijo de grupo (ej. ISC)"
                      value={form.prefijo_grupo}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Duración Máx (Semestres) *</label>
                    <input
                      name="duracion_max"
                      type="number"
                      placeholder="Duración máx"
                      value={form.duracion_max}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="btn-submit">
                      {editNombre ? 'Guardar Cambios' : 'Crear'}
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

