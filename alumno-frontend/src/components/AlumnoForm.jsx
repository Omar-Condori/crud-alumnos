import { useState, useEffect } from 'react';
import { getCarreras } from '../api/alumnosApi';

const AlumnoForm = ({ alumno, onSubmit, onCancel }) => {
  const [carreras, setCarreras] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    grado_ciclo: '',
    carrera: ''
  });

  useEffect(() => {
    loadCarreras();
    if (alumno) {
      setFormData(alumno);
    }
  }, [alumno]);

  const loadCarreras = async () => {
    try {
      const data = await getCarreras();
      setCarreras(data);
    } catch (error) {
      console.error('Error al cargar carreras:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="alumno-form">
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Grado/Ciclo:</label>
        <input
          type="text"
          name="grado_ciclo"
          value={formData.grado_ciclo}
          onChange={handleChange}
          required
          placeholder="Ej: 5to ciclo"
        />
      </div>

      <div className="form-group">
        <label>Carrera:</label>
        <select
          name="carrera"
          value={formData.carrera}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una carrera</option>
          {carreras.map((carrera, index) => (
            <option key={index} value={carrera}>
              {carrera}
            </option>
          ))}
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {alumno ? 'Actualizar' : 'Registrar'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AlumnoForm;