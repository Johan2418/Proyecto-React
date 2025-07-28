import uleamLogo from '../assets/logo-uleam.png';
import { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      alert('Correo o contraseña incorrectos.');
      setIsLoading(false);
      return;
    }

    // Guardar sesión activa
    const sessionUser = {
      email: usuarioEncontrado.email,
      nombre: usuarioEncontrado.nombre,
      rol: usuarioEncontrado.rol,
    };

    localStorage.setItem('user', JSON.stringify(sessionUser));

    // Redirigir según el rol
    switch (usuarioEncontrado.rol) {
      case 'estudiante':
        navigate('/student');
        break;
      case 'docente':
        navigate('/profesor');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        alert('Rol desconocido');
    }

    setIsLoading(false);
  };

  return (
    <div className="container vh-100 d-flex align-items-center">
      <div className="row w-100">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
          <Card className="login-card shadow">
            <Card.Header className="text-center bg-primary text-white">
              <img src={uleamLogo} alt="ULEAM Logo" width="60" />
              <h4 className="mt-2 mb-0">Iniciar Sesión</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="email"
                    id="floatingEmail"
                    placeholder="nombre@ejemplo.com"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingEmail">Email</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="floatingPassword"
                    placeholder="Contraseña"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="floatingPassword">Contraseña</Form.Label>
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Cargando…
                      </>
                    ) : (
                      'Ingresar'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;


