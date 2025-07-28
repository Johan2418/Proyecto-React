import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import uleamLogo from '../assets/logo-uleam.png';

export default function Profesor_tarea() {
  const navigate = useNavigate();

  const [estudiante, setEstudiante] = useState(null);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const seleccionado = JSON.parse(localStorage.getItem('estudianteSeleccionado'));
    if (!seleccionado) {
      alert('No hay estudiante seleccionado.');
      navigate('/profesor');
      return;
    }
    setEstudiante(seleccionado);

    // Cargar tareas para ese estudiante
    const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas_${seleccionado.nombre}`)) || [];
    setTareas(tareasGuardadas);
  }, [navigate]);

  const handleCerrarSesion = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleVolver = () => {
    navigate('/profesor');
  };

  const handleAgregarTarea = () => {
    console.log('Redirigiendo a agregar tarea...');
    // Ejemplo:
    navigate('/profesor-aggtar');
  };

  // Estilos inline
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'column',
  };

  const bodyStyle = {
    flex: 1,
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const footerStyle = {
    backgroundColor: '#fff',
    padding: '10px 20px',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <header style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>Tareas asignadas a {estudiante ? estudiante.nombre : ''}</h2>
      </header>

      <main style={bodyStyle}>
        {tareas.length === 0 ? (
          <p>No hay tareas asignadas a este estudiante.</p>
        ) : (
          <ul className="list-group">
            {tareas.map((tarea, index) => (
              <li key={index} className="list-group-item">
                {tarea}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleAgregarTarea}>
            Agregar tarea
          </button>
          <div>
            <button className="btn btn-secondary me-2" onClick={handleVolver}>
              Volver
            </button>
            <button className="btn btn-danger" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>

      <footer style={footerStyle}>
        <img src={uleamLogo} alt="ULEAM Logo" style={{ height: '40px' }} />
        <small className="text-muted">Universidad Laica Eloy Alfaro de Manabí</small>
      </footer>
    </div>
  );
}

