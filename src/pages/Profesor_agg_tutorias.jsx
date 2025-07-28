import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroTutoriaNueva = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    tareas: [],
  });
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [estudiante, setEstudiante] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const seleccionado = JSON.parse(localStorage.getItem('estudianteSeleccionado'));
    if (!seleccionado) {
      alert('No se seleccionó ningún estudiante.');
      navigate('/profesor');
    } else {
      setEstudiante(seleccionado);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAgregarTarea = () => {
    if (nuevaTarea.trim()) {
      setFormData(prev => ({
        ...prev,
        tareas: [...prev.tareas, nuevaTarea],
      }));
      setNuevaTarea('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!estudiante) {
      alert('No hay estudiante seleccionado');
      return;
    }

    const nuevaTutoria = {
      ...formData,
      estudiante: estudiante.nombre, // clave para identificar al estudiante
      email: estudiante.email,
      asistido: false
    };

    const tutoriasExistentes = JSON.parse(localStorage.getItem('tutorias')) || [];
    const nuevasTutorias = [...tutoriasExistentes, nuevaTutoria];
    localStorage.setItem('tutorias', JSON.stringify(nuevasTutorias));

    alert('Tutoría registrada con éxito ✅');
    navigate('/profesor-tut');
  };

  const handleCancelar = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      tareas: [],
    });
    navigate('/profesor-tut');
  };

  // Estilos (los mismos)
  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const inputStyle = {
    marginBottom: '15px',
  };

  const tareasStyle = {
    listStyle: 'none',
    paddingLeft: '0',
    marginTop: '10px',
  };

  const tareaItemStyle = {
    backgroundColor: '#f1f3f5',
    padding: '8px 12px',
    borderRadius: '6px',
    marginBottom: '6px',
  };

  return (
    <div style={containerStyle}>
      <h3 className="text-center mb-4">Crear nueva tutoría para {estudiante?.nombre}</h3>
      <form onSubmit={handleSubmit}>
        <div style={inputStyle}>
          <label>* Título:</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div style={inputStyle}>
          <label>* Descripción:</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div style={inputStyle}>
          <label>* Fecha:</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Agregar nueva tutoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroTutoriaNueva;



