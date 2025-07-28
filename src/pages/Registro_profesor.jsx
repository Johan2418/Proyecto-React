import React, { useState } from 'react';
import uleamLogo from '../assets/logo-uleam.png';
import {Link} from 'react-router-dom'

const RegistroProfesor = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    repetirContrasena: '',
    carrera: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, email, contrasena, repetirContrasena, carrera } = formData;

    // Validación: campos vacíos
    if (!nombre || !email || !contrasena || !repetirContrasena || !carrera) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Validación: formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('El correo electrónico no es válido.');
      return;
    }

    // Validación: contraseña mínima de 6 caracteres
    if (contrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Validación: contraseñas coinciden
    if (contrasena !== repetirContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validación: email no registrado ya
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const yaExiste = usuarios.some(user => user.email === email);
    if (yaExiste) {
      alert('Este email ya está registrado.');
      return;
    }

    // Crear nuevo profesor
    const nuevoProfesor = {
      nombre,
      email,
      password: contrasena,
      carrera,
      rol: 'docente',
    };

    // Guardar en localStorage
    usuarios.push(nuevoProfesor);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('✅ Profesor registrado con éxito');

    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      contrasena: '',
      repetirContrasena: '',
      carrera: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      email: '',
      contrasena: '',
      repetirContrasena: '',
      carrera: '',
    });
  };

  // 🎨 Estilos internos
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
  };

  const logoStyle = {
    width: '120px',
  };

  const mutedText = {
    color: '#6c757d',
    marginTop: '8px',
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Registro de Profesor</h2>

        <div className="mb-3">
          <label>* Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>* Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>* Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>* Repetir Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="repetirContrasena"
            value={formData.repetirContrasena}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>* Carrera:</label>
          <input
            type="text"
            className="form-control"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Link to="/admin"><button type="button" className="btn btn-danger" onClick={handleCancel}>
            Cancelar
          </button>
          </Link>
          <button type="submit" className="btn btn-success">
            Registrar
          </button>
        </div>

        <div className="text-center mt-5">
          <img src={uleamLogo} alt="ULEAM Logo" style={logoStyle} />
          <p style={mutedText}>Eloy Alfaro de Manabí</p>
        </div>
      </form>
    </div>
  );
};

export default RegistroProfesor;

