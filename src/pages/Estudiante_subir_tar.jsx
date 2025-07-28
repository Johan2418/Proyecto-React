import React, { useEffect, useState } from 'react';

export default function EntregaTarea() {
  const [detalles, setDetalles] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [tarea, setTarea] = useState('');

  useEffect(() => {
    const tareaSeleccionada = JSON.parse(localStorage.getItem('tareaSeleccionada'));
    if (tareaSeleccionada) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea('No se seleccionó tarea');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('No hay usuario autenticado.');
      return;
    }

    const entrega = {
      tarea: tarea,
      detalles,
      archivoNombre: archivo ? archivo.name : null,
      fecha: new Date().toISOString(),
      estudiante: user.nombre,
    };

    // Guardar en localStorage con clave única por estudiante
    const key = `entregas_${user.nombre}`;
    const entregasPrevias = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify([...entregasPrevias, entrega]));

    alert('Entrega registrada con éxito ✅');

    // Limpiar
    setDetalles('');
    setArchivo(null);
    localStorage.removeItem('tareaSeleccionada');
  };

  // 🎨 Estilos embebidos
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <form style={cardStyle} onSubmit={handleSubmit}>
          <h4 className="mb-4">Entrega: {tarea}</h4>

          <div className="mb-3">
            <label className="form-label">Detalles:</label>
            <textarea
              className="form-control"
              rows="4"
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subir archivo:</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={(e) => setArchivo(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Enviar entrega
          </button>
        </form>
      </div>
    </div>
  );
}
