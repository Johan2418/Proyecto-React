import Footer from '../components/Footer';
import TaskSection from '../components/Task_student';
import TutorialSection from '../components/Tutoria_student';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Cierra sesión
    navigate('/'); // Redirige al inicio
  };

  // (Opcional) Redirigir si alguien entra sin estar logueado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.rol !== 'estudiante') {
      navigate('/'); // Evita acceso directo sin login
    }
  }, [navigate]);

  return (
    <>
      {/* Título y botón de salir */}
      <div className="bg-info py-3 px-4 d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0 ">Panel Estudiante</h1>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <TaskSection />
          </div>
          <div className="col-md-6">
            <TutorialSection />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;

