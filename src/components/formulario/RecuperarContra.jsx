import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecuperarContra.css';

export default function RecuperarContra() {
  const [step, setStep] = useState(1);
  const [boleta, setBoleta] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [changePasswordToken, setChangePasswordToken] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [tokenSendTime, setTokenSendTime] = useState(null);
  const navigate = useNavigate();
  const API = 'http://localhost:4000';

  // Timer para la cuenta regresiva
  useEffect(() => {
    let interval;
    if (step === 2 && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setError('El token ha expirado. Por favor solicita uno nuevo.');
            setStep(1);
            setBoleta('');
            setEmail('');
            setToken('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!boleta.trim() || !email.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/recuperar-contrasena/enviar-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boleta, email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setTimeLeft(300); // Reiniciar timer a 5 minutos
        setTokenSendTime(Date.now());
        setStep(2);
      } else {
        setError(data.message || 'Error al enviar el correo');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateToken = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token.trim()) {
      setError('Por favor ingresa el token');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/recuperar-contrasena/validar-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          boleta, 
          email, 
          token: token.toLowerCase() // Enviar en minúsculas
        }),
      });

      const data = await response.json();
      console.log("Response from validar-token:", data);

      if (data.success) {
        console.log("changePasswordToken recibido:", data.changePasswordToken);
        setChangePasswordToken(data.changePasswordToken);
        setMessage(data.message);
        setStep(3);
      } else {
        setError(data.message || 'Token inválido');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al validar el token');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!nuevaContrasena.trim() || !confirmarContrasena.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (nuevaContrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/recuperar-contrasena/cambiar-contrasena`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changePasswordToken,
          nuevaContrasena,
          confirmarContrasena,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Contraseña actualizada correctamente. Redirigiendo al login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(data.message || 'Error al cambiar la contraseña');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError('');
    setMessage('');
    if (step === 2) {
      setToken('');
      setTimeLeft(300);
    } else if (step === 3) {
      setNuevaContrasena('');
      setConfirmarContrasena('');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="recuperar-contra-container">
      <div className="recuperar-contra-card">
        <h1>Cambiar Contraseña</h1>

        {step === 1 && (
          <form onSubmit={handleSendEmail}>
            <div className="form-group">
              <label htmlFor="boleta">Id</label>
              <input
                type="text"
                id="boleta"
                placeholder="Ingresa tu id"
                value={boleta}
                onChange={(e) => setBoleta(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo asociado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <div className="alert error">{error}</div>}
            {message && <div className="alert success">{message}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Correo'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleValidateToken}>
            <p className="info-text">
              Se ha enviado un código de verificación a tu correo electrónico.
              Por favor ingresa el código para continuar.
            </p>

            <div className="countdown-box">
              <span className="countdown-label">Tiempo restante:</span>
              <span className={`countdown-timer ${timeLeft <= 60 ? 'warning' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="token">Código de Verificación</label>
              <input
                type="text"
                id="token"
                placeholder="Ingresa el código recibido"
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                disabled={loading}
              />
            </div>

            {error && <div className="alert error">{error}</div>}
            {message && <div className="alert success">{message}</div>}

            <div className="button-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={loading}
              >
                Volver
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Validando...' : 'Validar Código'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleChangePassword}>
            <p className="info-text">
              Ingresa tu nueva contraseña para completar la recuperación.
            </p>

            <div className="form-group">
              <label htmlFor="nuevaContrasena">Nueva Contraseña</label>
              <input
                type="password"
                id="nuevaContrasena"
                placeholder="Ingresa tu nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmarContrasena"
                placeholder="Confirma tu nueva contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <div className="alert error">{error}</div>}
            {message && <div className="alert success">{message}</div>}

            <div className="button-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={loading}
              >
                Volver
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
