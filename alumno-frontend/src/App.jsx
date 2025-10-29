import { useState, useEffect } from 'react';
import AlumnoList from './components/AlumnoList';
import AlumnoForm from './components/AlumnoForm';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { getAlumnos, createAlumno, updateAlumno, deleteAlumno } from './api/alumnosApi';
import './App.css';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para paginación y búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCarrera, setFilterCarrera] = useState('');

  useEffect(() => {
    loadAlumnos();
  }, [currentPage, searchTerm, filterCarrera]);

  const loadAlumnos = async () => {
    setLoading(true);
    try {
      const data = await getAlumnos(currentPage, itemsPerPage, searchTerm, filterCarrera);
      setAlumnos(data.items);
      setTotalPages(data.total_pages);
      setTotalItems(data.total);
    } catch (error) {
      console.error('Error al cargar alumnos:', error);
      alert('Error al cargar la lista de alumnos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAlumno(null);
    setShowForm(true);
  };

  const handleEdit = (alumno) => {
    setEditingAlumno(alumno);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingAlumno) {
        await updateAlumno(editingAlumno.id, formData);
        alert('Alumno actualizado exitosamente');
      } else {
        await createAlumno(formData);
        alert('Alumno registrado exitosamente');
      }
      setShowForm(false);
      setEditingAlumno(null);
      setCurrentPage(1);
      loadAlumnos();
    } catch (error) {
      console.error('Error al guardar alumno:', error);
      alert('Error al guardar el alumno');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      try {
        await deleteAlumno(id);
        alert('Alumno eliminado exitosamente');
        
        // Si la página actual queda vacía, volver a la anterior
        if (alumnos.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          loadAlumnos();
        }
      } catch (error) {
        console.error('Error al eliminar alumno:', error);
        alert('Error al eliminar el alumno');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAlumno(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterCarrera = (carrera) => {
    setFilterCarrera(carrera);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <header>
        <h1>Sistema de Gestión de Alumnos</h1>
        <p className="subtitle">CRUD completo con paginación y búsqueda avanzada</p>
      </header>

      <main className="container">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        ) : (
          <>
            {!showForm && (
              <>
                <div className="top-actions">
                  <button onClick={handleCreate} className="btn-new">
                    + Nuevo Alumno
                  </button>
                </div>

                <SearchBar 
                  onSearch={handleSearch}
                  onFilterCarrera={handleFilterCarrera}
                />

                <AlumnoList
                  alumnos={alumnos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                {totalItems > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}

            {showForm && (
              <div className="form-container">
                <h2>{editingAlumno ? 'Editar Alumno' : 'Registrar Nuevo Alumno'}</h2>
                <AlumnoForm
                  alumno={editingAlumno}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;