import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import Login from './pages/Login';
import Student from './pages/Estudiante'
import Admin from './pages/Admin'
import Profe from './pages/Profesor'
import Reg_pro from './pages/Registro_profesor'
import Reg_est from './pages/Registro_estudiante'
import RutaProtegida from './components/RutaProtegida'
import Profesor_tut from './pages/Profesor_tutorias'
import Profesor_agg_tut from './pages/Profesor_agg_tutorias'
import Admin_view_student from './pages/Admin_ver_student'
import Admin_asg_tutor from './pages/Admin_asg_tutor'
import Profesor_tar from './pages/Profesor_tarea'
import Profesor_agg_tar from './pages/Profesor_agg_tarea'
import Estudiante_tar from './pages/Estudiante_tareas'
import Estudiante_subir_tar from './pages/Estudiante_subir_tar'
import Estudiante_tutoria from './pages/Estudiante_tutorias'
import Estudiante_asistir from './pages/Estudiante_asistir'
import All_task from './pages/Admin_tareas'
import Admin_tuto from './pages/Admin_tutorias'

useEffect(() => {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const admin = { nombre: 'Administrador', email: 'admin@uleam.edu.ec', password: 'admin123', rol: 'admin' };
  if (!usuarios.some(u => u.email === admin.email)) {
    usuarios.push(admin);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
}, []);



function AppContent() {
  const location = useLocation();

  // Mostrar solo en la página principal
  const showNavbarAndFooter = location.pathname === '/';

  return (
    <>
      {showNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />

        <Route path="/student" element={<RutaProtegida rolPermitido="estudiante"><Student /></RutaProtegida>} />
        <Route path="/admin" element={<RutaProtegida rolPermitido="admin"><Admin /></RutaProtegida> }/>
        <Route path="/profesor" element={<RutaProtegida rolPermitido="docente"><Profe /></RutaProtegida>} />
        
        <Route path="/registro-pro" element={<RutaProtegida rolPermitido="admin"><Reg_pro /></RutaProtegida>} />
        <Route path="/registro-est" element={<RutaProtegida rolPermitido="admin"><Reg_est /></RutaProtegida>} />
        <Route path="/ver-stu" element={<RutaProtegida rolPermitido="admin"><Admin_view_student/></RutaProtegida>} />
        <Route path="/asg-tut" element={<RutaProtegida rolPermitido="admin"><Admin_asg_tutor/></RutaProtegida>} />
        <Route path="/admin-tareas" element={<RutaProtegida rolPermitido="admin"><All_task/></RutaProtegida>} />
        <Route path="/admin-tuto" element={<RutaProtegida rolPermitido="admin"><Admin_tuto/></RutaProtegida>} />


        <Route path="/profesor-tut" element={<RutaProtegida rolPermitido="docente"><Profesor_tut /></RutaProtegida>} />
        <Route path="/profesor-aggtut" element={<RutaProtegida rolPermitido="docente"><Profesor_agg_tut /></RutaProtegida>} />
        <Route path="/profesor-tar" element={<RutaProtegida rolPermitido="docente"><Profesor_tar /></RutaProtegida>} />
        <Route path="/profesor-aggtar" element={<RutaProtegida rolPermitido="docente"><Profesor_agg_tar /></RutaProtegida>} />

        <Route path="/estudiante-tar" element={<RutaProtegida rolPermitido="estudiante"><Estudiante_tar /></RutaProtegida>} />
        <Route path="/estudiante-subir" element={<RutaProtegida rolPermitido="estudiante"><Estudiante_subir_tar /></RutaProtegida>} />
        <Route path="/estudiante-tut" element={<RutaProtegida rolPermitido="estudiante"><Estudiante_tutoria /></RutaProtegida>} />
        <Route path="/estudiante-asi" element={<RutaProtegida rolPermitido="estudiante"><Estudiante_asistir /></RutaProtegida>} />


      </Routes>

      {showNavbarAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
   
      <AppContent />

  );
}

export default App;





