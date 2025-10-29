import { useState, useEffect } from 'react';
import { getCarreras } from '../api/alumnosApi';

const SearchBar = ({ onSearch, onFilterCarrera }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    loadCarreras();
  }, []);

  const loadCarreras = async () => {
    try {
      const data = await getCarreras();
      setCarreras(data);
    } catch (error) {
      console.error('Error al cargar carreras:', error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCarreraChange = (e) => {
    const value = e.target.value;
    setSelectedCarrera(value);
    onFilterCarrera(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCarrera('');
    onSearch('');
    onFilterCarrera('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido, ciclo o carrera..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <select
          value={selectedCarrera}
          onChange={handleCarreraChange}
          className="filter-select"
        >
          <option value="">Todas las carreras</option>
          {carreras.map((carrera, index) => (
            <option key={index} value={carrera}>
              {carrera}
            </option>
          ))}
        </select>
      </div>

      {(searchTerm || selectedCarrera) && (
        <button onClick={handleClear} className="btn-clear">
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default SearchBar;