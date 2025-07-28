import React, { useState, useEffect } from 'react';
import uleamLogo from '../assets/logo-uleam.png';
import { useNavigate } from 'react-router-dom';

export default function RegistroTitulacion() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('Tesis');
  const [estado, setEstado] = useState('Aprobado');
  const [tutor, setTutor] = useState('');
  const [profesores, setProfesores] = useState([]);

  // Cargar datos del estudiante y docentes desde localStorage
  useEffect(() => {
    const estudiante = JSON.parse(localStorage.getItem('estudianteSeleccionado'));
    if (estudiante) {
      setNombre(estudiante.nombre);
      setEmail(estudiante.email);
    } else {
      alert('No se seleccionó un estudiante.');
      navigate('/ver-stu');
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const docentes = usuarios.filter(u => u.rol === 'docente');
    setProfesores(docentes);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Actualizar tutor y estado en el estudiante
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuariosActualizados = usuarios.map(u => {
      if (u.email === email) {
        return { ...u, tutor, estadoTitulacion: estado };
      }
      return u;
    });
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

    // 2. Actualizar relación tutor -> lista de estudiantes
    const asignaciones = JSON.parse(localStorage.getItem('asignacionesTutores')) || {};

    if (!asignaciones[tutor]) {
      asignaciones[tutor] = [];
    }

    const yaAsignado = asignaciones[tutor].some(est => est.email === email);
    if (!yaAsignado) {
      asignaciones[tutor].push({ nombre, email });
    }

    localStorage.setItem('asignacionesTutores', JSON.stringify(asignaciones));

    alert('Titulación y tutor asignado correctamente');
    navigate('/ver-stu');
  };

  const handleCancel = () => {
    navigate('/ver-stu');
  };

  // 🎨 Estilos inline
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
  };
  const bodyStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };
  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  };
  const footerStyle = {
    padding: '10px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
  };

  return (
    <div style={containerStyle}>
      <main style={bodyStyle}>
        <div style={cardStyle}>
          <h5 className="text-center mb-4">Asignar Tutor</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={nombre} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de titulación</label>
              <input type="text" className="form-control" value={tipo} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Estado de titulación</label>
              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option>Aprobado</option>
                <option>En Proceso</option>
                <option>Pendiente</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Tutor</label>
              <select
                className="form-select"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                required
              >
                <option value="">-- Seleccionar tutor --</option>
                {profesores.map((prof, i) => (
                  <option key={i} value={prof.nombre}>
                    {prof.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer style={footerStyle}>
        <img src={uleamLogo} alt="ULEAM Logo" style={{ height: '40px' }} />
      </footer>
    </div>
  );
}
