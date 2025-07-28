import {Link} from 'react-router-dom'
import uleamLogo from '../assets/logo-uleam.png';

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light px-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={uleamLogo} alt="ULEAM Logo" width="70" className="me-3" />
        <input className="form-control flex-grow-1"  type="search" style={{ width: '700px' }} placeholder="Buscar..." />
            <button className="btn btn-outline-secondary">
                <i className="bi bi-search"></i>
            </button>
            <button className="btn btn-outline-secondary">
                <i className="bi bi-mic-fill"></i>
            </button>
      </div>
      <Link to="/login">
      <button className="btn btn-primary" style={{backgroundColor:'#9ff7f9ff', color:'#000000ff'}}>Iniciar sesión</button>
      </Link>
    </nav>
  );
}

export default Navbar;


