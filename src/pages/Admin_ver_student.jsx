import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import uleamLogo from '../assets/logo-uleam.png';
import {Link} from 'react-router-dom'

export default function RegistroMaestros() {
  const [searchQuery, setSearchQuery] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const estudiantesRegistrados = usuarios.filter(u => u.rol === 'estudiante');
    setEstudiantes(estudiantesRegistrados);
  }, []);

  const handleSeleccionar = (estudiante) => {
    localStorage.setItem('estudianteSeleccionado', JSON.stringify(estudiante));
    navigate('/asg-tut');
  };

  const filtrados = estudiantes.filter(est =>
    est.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <header style={{ backgroundColor: '#fff', padding: '10px 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <center><h2>Estudiantes registrados</h2></center>
      </header>

      <main className="d-flex flex-wrap justify-content-around" style={{ flex: 1, padding: '20px' }}>
        <div className="card shadow-sm p-3" style={{ minWidth: '200px', width: '25%', maxWidth: '240px', marginBottom: '20px' }}>
          <ul className="list-group list-group-flush">
            {filtrados.length > 0 ? (
              filtrados.map((estudiante, index) => (
                <li className="list-group-item d-grid" key={index}>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleSeleccionar(estudiante)}
                  >
                    {estudiante.nombre}
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">Sin estudiantes</li>
            )}
          </ul>
        </div>
      </main>

      <footer className="d-flex align-items-center justify-content-between" style={{ padding: '10px 20px', backgroundColor: '#fff', boxShadow: '0 -2px 4px rgba(0,0,0,0.1)' }}>
        <Link to="/admin"><button className="btn btn-outline-secondary">Volver</button></Link>
        <div className="d-flex align-items-center">
          <img src={uleamLogo} alt="ULEAM Logo" style={{ height: '40px' }} className="me-2" />
          <small className="text-muted">Universidad Laica Eloy Alfaro de Manabí</small>
        </div>
      </footer>
    </div>
  );
}
