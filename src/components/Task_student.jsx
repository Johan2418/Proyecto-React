  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  export default function TaskSection() {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.rol !== 'estudiante') return;

      const key = `tareas_${user.nombre}`;
      const tareasGuardadas = JSON.parse(localStorage.getItem(key)) || [];

      setTareas(tareasGuardadas);
    }, []);

    const handleVerMas = () => {
      navigate('/estudiante-tar');
    };

    return (
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Tareas Asignadas</h5>
          <button className="btn btn-outline-light btn-sm" onClick={handleVerMas}>
            Más tareas
          </button>
        </div>
        <div className="card-body">
          {tareas.length > 0 ? (
            <ul className="list-group list-group-flush">
              {tareas.map((tarea, index) => (
                <li key={index} className="list-group-item">
                  {tarea}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No tienes tareas asignadas.</p>
          )}
        </div>
      </div>
    );
  }


