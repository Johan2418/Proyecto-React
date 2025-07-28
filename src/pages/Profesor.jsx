import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uleamLogo from '../assets/logo-uleam.png';

const Profesores = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const estudiantesRegistrados = usuarios.filter(u => u.rol === 'estudiante');
    setEstudiantes(estudiantesRegistrados);
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const irATutorias = (estudiante) => {
    localStorage.setItem('estudianteSeleccionado', JSON.stringify(estudiante));
    navigate('/profesor-tut');
  };

  const irATareas = (estudiante) => {
    localStorage.setItem('estudianteSeleccionado', JSON.stringify(estudiante));
    navigate('/profesor-tar');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Profesores</h2>
      <div className="row justify-content-center">
        {estudiantes.length > 0 ? (
          estudiantes.map((est, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{est.nombre}</h5>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => irATareas(est)}
                    >
                      Tareas
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => irATutorias(est)}
                    >
                      Tutorías
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No hay estudiantes registrados.</p>
        )}
      </div>

      <div className="text-start mt-4">
        <button className="btn btn-danger" onClick={handleCerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <div className="text-end mt-5">
        <img src={uleamLogo} alt="ULEAM Logo" style={{ width: '200px' }} />
      </div>
    </div>
  );
};

export default Profesores;


