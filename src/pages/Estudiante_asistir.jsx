// src/pages/DetalleTutoria.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetalleTutoria() {
  const [detalles, setDetalles] = useState('');
  const [tutoria, setTutoria] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const seleccionada = JSON.parse(localStorage.getItem('tutoriaSeleccionada'));
    if (!seleccionada) {
      alert('No se encontró información de la tutoría.');
      navigate('/estudiante-tut');
    } else {
      setTutoria(seleccionada);
    }
  }, [navigate]);

  const handleConfirm = () => {
    if (!tutoria) return;

    // Actualizar tutoría en localStorage
    const todas = JSON.parse(localStorage.getItem('tutorias')) || [];
    const actualizadas = todas.map((t) =>
      t.titulo === tutoria.titulo && t.email === tutoria.email
        ? { ...t, asistido: true, observaciones: detalles }
        : t
    );

    localStorage.setItem('tutorias', JSON.stringify(actualizadas));
    alert('¡Asistencia confirmada!');
    navigate('/estudiante-tut'); // Redirige si deseas
  };

  // 🎨 Estilos embebidos
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

  const titleStyle = {
    marginBottom: '16px',
  };

  const textareaStyle = {
    width: '100%',
    resize: 'vertical',
    marginBottom: '20px',
  };

  const confirmBtnStyle = {
    width: '100%',
  };

  const characterStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    width: '80px',
    opacity: 0.8,
  };

  return (
    <div style={containerStyle}>
      {/* Contenido principal */}
      <div style={contentStyle}>
        {tutoria ? (
          <>
            <h5 style={titleStyle}>{tutoria.titulo}</h5>
            <p><strong>Fecha:</strong> {tutoria.fecha}</p>
            <p><strong>Descripción:</strong> {tutoria.descripcion}</p>
            {tutoria.docente && (
              <p><strong>Docente:</strong> {tutoria.docente}</p>
            )}

            <label htmlFor="detalles">Detalles u observaciones:</label>
            <textarea
              id="detalles"
              className="form-control"
              rows={6}
              style={textareaStyle}
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              placeholder="Escribe aquí la información relevante…"
            />

            <button
              className="btn btn-primary"
              style={confirmBtnStyle}
              onClick={handleConfirm}
            >
              Confirmar asistencia
            </button>
          </>
        ) : (
          <p className="text-muted">Cargando tutoría...</p>
        )}
      </div>

      {/* Personaje ilustrativo */}
      <img
        src="/assets/character.png"
        alt="Personaje"
        style={characterStyle}
      />
    </div>
  );
}

