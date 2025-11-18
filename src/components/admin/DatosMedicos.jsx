// src/pages/DatosMedicos.jsx
import { useState } from 'react';
import { AdminSidebar } from "./AdminSidebar";
import "./DatosMedicos.css";

const API = 'http://localhost:4000';

export function DatosMedicos() {
  const [idUsuario, setIdUsuario] = useState('');
  const [dm, setDm] = useState(null);
  const [enfs, setEnfs] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalDM, setModalDM] = useState(false);
  const [modalEnf, setModalEnf] = useState(false);
  const [editEnf, setEditEnf] = useState(null);

  const [formDM, setFormDM] = useState({ peso: '', altura: '', tipo_sangre: '', nss: '' });
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
    if (!window.confirm('¿Eliminar enfermedad?')) return;
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
    <div className="admin-container">
      <AdminSidebar activeRoute="datosMedicos" />

      <main className="main-content">
        <section className="admin-section">
          <div className="admin-header">
            <h1>Datos Médicos</h1>
          </div>

          {msg && <div className="alert">{msg}</div>}

          <div className="search-container">
            <input
              placeholder="ID Usuario (Boleta)"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              className="search-input"
            />
            <button onClick={cargar} disabled={loading || !idUsuario} className="btn-primary">
              {loading ? 'Cargando...' : 'Cargar'}
            </button>
          </div>

          {!dm ? (
            <div className="no-data-container">
              <p>No hay datos médicos para este usuario.</p>
              {idUsuario && (
                <button onClick={abrirCrearDM} className="btn-primary">
                  + Crear Datos Médicos
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="data-card">
                <h3>Información de Datos Médicos</h3>
                <div className="data-grid">
                  <div className="data-item">
                    <label>Peso:</label>
                    <p>{dm.peso} kg</p>
                  </div>
                  <div className="data-item">
                    <label>Altura:</label>
                    <p>{dm.altura} m</p>
                  </div>
                  <div className="data-item">
                    <label>Tipo de Sangre:</label>
                    <p>{dm.tipo_sangre}</p>
                  </div>
                  <div className="data-item">
                    <label>NSS:</label>
                    <p>{dm.nss}</p>
                  </div>
                </div>
                <button onClick={abrirEditarDM} className="btn-edit">
                  Editar Datos Médicos
                </button>
              </div>

              <div className="enfermedades-section">
                <div className="section-header">
                  <h3>Enfermedades</h3>
                  <button onClick={abrirNuevaEnf} className="btn-primary">
                    + Agregar Enfermedad
                  </button>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enfs.length > 0 ? (
                        enfs.map((e) => (
                          <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.descri}</td>
                            <td>
                              <button className="btn-edit" onClick={() => abrirEditarEnf(e)}>
                                Editar
                              </button>
                              <button className="btn-delete" onClick={() => eliminarEnf(e)}>
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="no-data">Sin registros</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {modalDM && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>{dm ? 'Editar Datos Médicos' : 'Crear Datos Médicos'}</h3>
                <form onSubmit={guardarDM} className="form-grid">
                  <div className="form-group">
                    <label>Peso (kg) *</label>
                    <input
                      name="peso"
                      type="number"
                      step="0.1"
                      placeholder="Peso"
                      value={formDM.peso}
                      onChange={onChangeDM}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Altura (m) *</label>
                    <input
                      name="altura"
                      type="number"
                      step="0.01"
                      placeholder="Altura"
                      value={formDM.altura}
                      onChange={onChangeDM}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo de Sangre *</label>
                    <input
                      name="tipo_sangre"
                      placeholder="Ej: O+"
                      value={formDM.tipo_sangre}
                      onChange={onChangeDM}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>NSS *</label>
                    <input
                      name="nss"
                      placeholder="NSS"
                      value={formDM.nss}
                      onChange={onChangeDM}
                      required
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="btn-submit">Guardar</button>
                    <button type="button" className="btn-cancel" onClick={() => setModalDM(false)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {modalEnf && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>{editEnf ? 'Editar Enfermedad' : 'Nueva Enfermedad'}</h3>
                <form onSubmit={guardarEnf} className="form-grid">
                  <div className="form-group">
                    <label>Descripción *</label>
                    <textarea
                      name="descripcion"
                      placeholder="Descripción de la enfermedad"
                      value={formEnf.descripcion}
                      onChange={onChangeEnf}
                      required
                      rows="4"
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="btn-submit">Guardar</button>
                    <button type="button" className="btn-cancel" onClick={() => setModalEnf(false)}>
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
