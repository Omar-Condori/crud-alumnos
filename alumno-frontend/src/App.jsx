import { useState, useEffect } from 'react';
import AlumnoList from './components/AlumnoList';
import AlumnoForm from './components/AlumnoForm';
import { getAlumnos, createAlumno, updateAlumno, deleteAlumno } from './api/alumnosApi';
import './App.css';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async () => {
    setLoading(true);
    try {
      const data = await getAlumnos();
      setAlumnos(data);
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
        loadAlumnos();
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

  return (
    <div className="App">
      <header>
        <h1>Sistema de Gestión de Alumnos</h1>
      </header>

      <main className="container">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {!showForm && (
              <button onClick={handleCreate} className="btn-new">
                + Nuevo Alumno
              </button>
            )}

            {showForm ? (
              <div className="form-container">
                <h2>{editingAlumno ? 'Editar Alumno' : 'Registrar Nuevo Alumno'}</h2>
                <AlumnoForm
                  alumno={editingAlumno}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </div>
            ) : (
              <AlumnoList
                alumnos={alumnos}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;