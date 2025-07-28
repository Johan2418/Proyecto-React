import React, { useEffect } from 'react';

function Main() {
  useEffect(() => {
    // Solo una vez al montar el componente
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const admin = {
      nombre: 'Administrador',
      email: 'admin@uleam.edu.ec',
      password: 'admin123',
      rol: 'admin',
    };

    const existeAdmin = usuarios.some(u => u.email === admin.email);
    if (!existeAdmin) {
      usuarios.push(admin);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('Administrador creado en localStorage');
    }
  }, []);

  const images = [
    "https://www.uleam.edu.ec/wp-content/uploads/2025/03/SLIDER-VINCULACION-2025.png",
    "https://www.uleam.edu.ec/wp-content/uploads/2025/06/SLIDER-ANIVERSARIO-AGENDA-1-2048x868.png",
    "https://www.uleam.edu.ec/wp-content/uploads/2025/06/PROMO-HORIZONTAL-6883PX-X-2917PX-PROPUESTA-2-RGB-CURVAS-2048x868.png",
    "https://www.uleam.edu.ec/wp-content/uploads/2025/06/SLIDER-CONVOCATORIA-1-2048x868.png",
    "https://www.uleam.edu.ec/wp-content/uploads/2025/04/SLIDER-NEUROCIENCIAS-2048x868.png",
    "https://www.uleam.edu.ec/wp-content/uploads/2025/03/sliders_OFERTA-ACADEMICA-3-2048x868.png"
  ];

  return (
    <main className="text-center my-5">
      <h4 className="mb-4">Software para registro y control de trabajos de titulación</h4>

      <div className="container-fluid p-5" style={{ backgroundColor: '#ffffffff' }}>
        <div id="carouselExample" className="carousel slide mx-auto" data-bs-ride="carousel" style={{ maxWidth: '1500px' }}>
          <div className="carousel-inner">
            {images.map((url, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img src={url} className="d-block w-100 rounded shadow" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Main;

