import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroTarea() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ titulo: '', descripcion: '' });
  const [estudiante, setEstudiante] = useState(null);

  useEffect(() => {
    const seleccionado = JSON.parse(localStorage.getItem('estudianteSeleccionado'));
    if (!seleccionado) {
      alert('No se seleccionó ningún estudiante.');
      navigate('/profesor');
      return;
    }
    setEstudiante(seleccionado);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.titulo || !form.descripcion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Obtener tareas actuales de este estudiante
    const key = `tareas_${estudiante.nombre}`;
    const tareasActuales = JSON.parse(localStorage.getItem(key)) || [];

    // Agregar la nueva tarea
    const nuevaTarea = `${form.titulo}: ${form.descripcion}`;
    const tareasActualizadas = [...tareasActuales, nuevaTarea];

    // Guardar de nuevo en localStorage
    localStorage.setItem(key, JSON.stringify(tareasActualizadas));

    alert('Tarea agregada correctamente.');

    // Limpiar formulario
    setForm({ titulo: '', descripcion: '' });

    // Redirigir a la vista de tareas
    navigate('/profesor-tar');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
      }}>
        <h4 className="mb-4 text-center">Nueva tarea para {estudiante?.nombre}</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">*Título:</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              value={form.titulo}
              onChange={handleChange}
              required
              placeholder="Ej. Leer capítulo 3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">*Descripción:</label>
            <textarea
              name="descripcion"
              className="form-control"
              rows="3"
              value={form.descripcion}
              onChange={handleChange}
              required
              placeholder="Detalles de la tarea"
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Agregar nueva tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

