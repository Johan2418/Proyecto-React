import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TutorialSection = () => {
  const [tutorias, setTutorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const estudiante = JSON.parse(localStorage.getItem('user'));
    if (!estudiante || !estudiante.email) return;

    const todasLasTutorias = JSON.parse(localStorage.getItem('tutorias')) || [];
    const filtradas = todasLasTutorias.filter(
      (t) => t.email === estudiante.email
    );

    setTutorias(filtradas);
  }, []); // <- Dependencias vacías: se ejecuta solo una vez

  const handleVerMas = () => {
    navigate('/estudiante-tut');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Tutorías Asignadas</h5>
        <button className="btn btn-outline-light btn-sm" onClick={handleVerMas}>
          Más tutorías
        </button>
      </div>
      <div className="card-body">
        {tutorias.length > 0 ? (
          <ul className="list-group list-group-flush">
            {tutorias.map((t, i) => (
              <li className="list-group-item" key={i}>
                <strong>{t.titulo}</strong><br />
                <span className="text-muted">{t.descripcion}</span><br />
                <small>Asistido: {t.asistido ? '✅ Sí' : '❌ No'}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No tienes tutorías asignadas.</p>
        )}
      </div>
    </div>
  );
};

export default TutorialSection;






