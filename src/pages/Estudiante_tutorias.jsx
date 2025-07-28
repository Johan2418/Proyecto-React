// src/pages/RegistroTutorias.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroTutorias() {
  const [tutorias, setTutorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.rol !== 'estudiante') return;

    const todasLasTutorias = JSON.parse(localStorage.getItem('tutorias')) || [];
    const asignadas = todasLasTutorias.filter((t) => t.email === user.email);

    setTutorias(asignadas);
  }, []);

  // Estilos embebidos
  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
  };

  const volverBtnStyle = {
    marginBottom: '20px',
  };

  const sectionStyle = {
    marginBottom: '30px',
  };

  const tutorBtnStyle = {
    width: '100%',
    textAlign: 'left',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* Contenido principal */}
      <div style={contentStyle}>
        <button
          className="btn btn-outline-secondary"
          style={volverBtnStyle}
          onClick={() => window.history.back()}
        >
          Volver
        </button>

        <div style={sectionStyle}>
          <h5>Tutorías asignadas</h5>
          {tutorias.length > 0 ? (
            tutorias.map((tut, idx) => (
              <button
                key={idx}
                className="btn btn-outline-primary"
                style={tutorBtnStyle}
                onClick={() => {
                  localStorage.setItem('tutoriaSeleccionada', JSON.stringify(tut));
                  navigate('/estudiante-asi'); // Redirige a la vista de asistencia
                }}
              >
                {tut.titulo} – {tut.fecha}
              </button>
            ))
          ) : (
            <p className="text-muted">No tienes tutorías asignadas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
