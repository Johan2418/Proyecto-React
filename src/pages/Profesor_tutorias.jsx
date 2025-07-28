import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroTutoria = () => {
  const [tutorias, setTutorias] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tutoriasGuardadas = JSON.parse(localStorage.getItem('tutorias')) || [];
    setTutorias(tutoriasGuardadas);

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const estudiantesFiltrados = usuarios.filter(u => u.rol === 'estudiante');
    setEstudiantes(estudiantesFiltrados);
  }, []);

  const handleAsignarEstudiante = (index, emailEstudiante) => {
    const actualizadas = [...tutorias];
    actualizadas[index].asignadoA = emailEstudiante;
    setTutorias(actualizadas);
    localStorage.setItem('tutorias', JSON.stringify(actualizadas));
  };

  const handleMarcarAsistido = (index) => {
    const actualizadas = [...tutorias];
    actualizadas[index].asistido = !actualizadas[index].asistido;
    setTutorias(actualizadas);
    localStorage.setItem('tutorias', JSON.stringify(actualizadas));
  };

  const handleAgregarTutoria = () => {
    navigate('/profesor-aggtut');
  };

  const handleVolver = () => {
    navigate('/profesor');
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Tutorías Registradas</h3>

      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-secondary" onClick={handleVolver}>
          ← Volver
        </button>
        <button className="btn btn-success" onClick={handleAgregarTutoria}>
          + Agregar tutoría
        </button>
      </div>

      {tutorias.length === 0 ? (
        <p className="text-center">No hay tutorías registradas aún.</p>
      ) : (
        tutorias.map((tutoria, index) => (
          <div key={index} style={cardStyle}>
            <h5>{tutoria.titulo}</h5>
            <p><strong>Descripción:</strong> {tutoria.descripcion}</p>
            <p><strong>Fecha:</strong> {tutoria.fecha}</p>
            <p><strong>Tareas:</strong></p>
            <ul>
              {tutoria.tareas.map((tarea, i) => (
                <li key={i}>{tarea}</li>
              ))}
            </ul>

            <div className="mb-3">
              <label style={labelStyle}>Asignar a estudiante:</label>
              <select
                className="form-select"
                value={tutoria.asignadoA || ''}
                onChange={(e) => handleAsignarEstudiante(index, e.target.value)}
              >
                <option value="">-- Seleccionar estudiante --</option>
                {estudiantes.map((est) => (
                  <option key={est.email} value={est.email}>
                    {est.nombre} ({est.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`asistido-${index}`}
                checked={!!tutoria.asistido}
                onChange={() => handleMarcarAsistido(index)}
              />
              <label className="form-check-label" htmlFor={`asistido-${index}`}>
                Marcar asistencia
              </label>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RegistroTutoria;



