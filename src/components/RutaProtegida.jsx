import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children, rolPermitido }) {
  const usuario = JSON.parse(localStorage.getItem('user'));

  // Si no está logueado
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Si tiene rol, pero no es el permitido
  if (rolPermitido && usuario.rol !== rolPermitido) {
    return <Navigate to="/" replace />;
  }

  // Si pasa todo, renderiza el contenido protegido
  return children;
}
