import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅️ Agregado useNavigate
import { Button } from 'react-bootstrap';
import uleamLogo from '../assets/logo-uleam.png';

export default function Administrador() {
  const navigate = useNavigate(); // ⬅️ Hook para redirección

  const handleLogout = () => {
    localStorage.removeItem('user'); // ⬅️ Elimina la sesión
    navigate('/'); // ⬅️ Redirige al inicio
  };

  return (
    <div>
      {/* Cuerpo principal */}
      <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
        {/* Sidebar izquierda */}
        <div className="bg-light border-end" style={{ width: '250px' }}>
          <div className="d-flex flex-column gap-3 p-3">
            <Link to="/admin-tareas "><Button variant="outline-primary">Ver trabajos asignados</Button></Link>
            <Link to="/ver-stu"><Button variant="outline-primary">Estudiantes inscritos</Button></Link>
            <Link to="/registro-pro"><Button variant="outline-primary">Agregar un nuevo profesor</Button></Link>
            <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button> {/* ⬅️ Conectado */}
          </div>
        </div>

        {/* Centro */}
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-muted">Bienvenido al panel administrativo de ULEAM</h2>
          <img
            src="https://www.uleam.edu.ec/wp-content/uploads/2025/02/Banner-Web-2048x868.png"
            alt="ULEAM Campus"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '1000px' }}
          />
        </div>

        {/* Sidebar derecha */}
        <div className="bg-light border-start d-flex flex-column justify-content-between" style={{ width: '250px' }}>
          <div className="d-flex flex-column gap-3 p-3">
            <Link to="/admin-tuto"><Button variant="outline-success">Información de tutorías</Button></Link>
            <Link to="/registro-est"><Button variant="outline-success">Inscribir un nuevo estudiante</Button></Link>
          </div>
          <div className="text-center mt-auto p-3">
            <img src={uleamLogo} alt="ULEAM Logo" width="100" />
            <p className="mt-2 mb-0 text-muted small">Universidad Laica Eloy Alfaro de Manabí</p>
          </div>
        </div>
      </div>
    </div>
  );
}

