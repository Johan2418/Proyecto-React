// src/pages/SeguimientoTutorias.jsx
import React, { useEffect, useState } from 'react';

export default function SeguimientoTutorias() {
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tutorias = JSON.parse(localStorage.getItem('tutorias')) || [];

    const profesoresFiltrados = usuarios.filter(u => u.rol === 'docente');

    const profesoresConEstudiantes = profesoresFiltrados.map((prof) => {
      // Buscar tutorías creadas por este profesor
      const tutoriasDelProfesor = tutorias.filter(
        t => t.creadoPor === prof.email
      );

      // Obtener estudiantes únicos asignados a sus tutorías
      const estudiantesAsignados = [];
      const vistos = new Set();

      tutoriasDelProfesor.forEach((tut) => {
        const estudianteEmail = tut.asignadoA;
        const estudiante = usuarios.find(
          u => u.rol === 'estudiante' && u.email === estudianteEmail
        );
        if (estudiante && !vistos.has(estudiante.email)) {
          vistos.add(estudiante.email);
          const tutoriasAsignadas = tutoriasDelProfesor.filter(t => t.asignadoA === estudiante.email);
          estudiantesAsignados.push({
            ...estudiante,
            tutorias: tutoriasAsignadas
          });
        }
      });

      return {
        ...prof,
        estudiantes: estudiantesAsignados,
      };
    });

    setProfesores(profesoresConEstudiantes);
  }, []);

  // Estilos
  const contentStyle = {
    padding: '20px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  };
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };
  const estudianteStyle = {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
  };
  const tutoriaStyle = {
    fontSize: '0.9rem',
    marginLeft: '15px',
    color: '#333',
  };

  return (
    <div style={contentStyle}>
      <h4 className="mb-4">Seguimiento de Tutorías por Profesor</h4>

      {profesores.map((prof, idx) => (
        <div key={idx} style={cardStyle}>
          <h5>{prof.nombre}</h5>
          {prof.estudiantes.length === 0 ? (
            <p className="text-muted">No tiene estudiantes asignados.</p>
          ) : (
            prof.estudiantes.map((est, i) => (
              <div key={i} style={estudianteStyle}>
                <strong>{est.nombre}</strong>
                <ul>
                  {est.tutorias.map((t, j) => (
                    <li key={j} style={tutoriaStyle}>
                      📘 {t.titulo} — {t.fecha} — Asistido: {t.asistido ? '✅' : '❌'}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      ))}

      <button
        className="btn btn-outline-secondary mt-3"
        onClick={() => window.history.back()}
      >
        Volver
      </button>
    </div>
  );
}
