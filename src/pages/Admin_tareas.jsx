import React, { useEffect, useState } from 'react';

export default function SeguimientoTareas() {
  const [maestros, setMaestros] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const profesores = usuarios.filter(u => u.rol === 'docente');
    const estudiantes = usuarios.filter(u => u.rol === 'estudiante');

    const profesoresConEstudiantes = profesores.map((prof) => {
      const susEstudiantes = estudiantes.filter(
        (est) => est.profesorAsignado === prof.email
      ).map((est) => {
        const tareas = JSON.parse(localStorage.getItem(`tareas_${est.nombre}`)) || [];
        return { ...est, tareas };
      });

      return {
        ...prof,
        estudiantes: susEstudiantes,
      };
    });

    setMaestros(profesoresConEstudiantes);
  }, []);

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  };

  const maestroSectionStyle = {
    marginBottom: '30px',
  };

  const studentCardStyle = {
    padding: '12px',
    marginBottom: '12px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h4 className="mb-4">Seguimiento de Tareas por Profesor</h4>

      {maestros.length === 0 ? (
        <p>No hay profesores registrados.</p>
      ) : (
        maestros.map((prof) => (
          <section key={prof.email} style={maestroSectionStyle}>
            <h5>{prof.nombre}</h5>

            {prof.estudiantes.length === 0 ? (
              <p className="text-muted">Sin estudiantes asignados.</p>
            ) : (
              prof.estudiantes.map((est) => (
                <div key={est.email} style={studentCardStyle}>
                  <strong>{est.nombre}</strong>
                  {est.tareas.length > 0 ? (
                    <ul className="mt-2">
                      {est.tareas.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0">Sin tareas asignadas.</p>
                  )}
                </div>
              ))
            )}
          </section>
        ))
      )}
    </div>
  );
}


