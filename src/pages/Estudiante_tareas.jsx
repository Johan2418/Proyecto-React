// src/pages/RegistroTareasSemanal.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroTareasSemanal() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.rol !== 'estudiante') return;

    const key = `tareas_${user.nombre}`;
    const tareasGuardadas = JSON.parse(localStorage.getItem(key)) || [];
    setTareas(tareasGuardadas);
  }, []);

  const handleSeleccionarTarea = (tarea) => {
    localStorage.setItem('tareaSeleccionada', JSON.stringify(tarea));
    navigate('/estudiante-subir');
  };

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

  const tareaBtnStyle = {
    width: '100%',
    textAlign: 'left',
    marginBottom: '10px',
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
      <div style={contentStyle}>
        <button
          className="btn btn-outline-secondary"
          style={volverBtnStyle}
          onClick={() => window.history.back()}
        >
          Volver
        </button>

        <h5>Tareas Asignadas</h5>
        {tareas.length > 0 ? (
          tareas.map((tarea, idx) => (
            <button
              key={idx}
              className="btn btn-outline-primary"
              style={tareaBtnStyle}
              onClick={() => handleSeleccionarTarea(tarea)}
            >
              {tarea}
            </button>
          ))
        ) : (
          <p className="text-muted">No tienes tareas asignadas.</p>
        )}
      </div>

    </div>
  );
}
