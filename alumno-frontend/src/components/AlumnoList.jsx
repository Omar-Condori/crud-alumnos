const AlumnoList = ({ alumnos, onEdit, onDelete }) => {
  return (
    <div className="alumno-list">
      <h2>Lista de Alumnos</h2>
      {alumnos.length === 0 ? (
        <p className="no-alumnos">No hay alumnos registrados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Grado/Ciclo</th>
              <th>Carrera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.grado_ciclo}</td>
                <td>{alumno.carrera}</td>
                <td>
                  <button
                    onClick={() => onEdit(alumno)}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(alumno.id)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AlumnoList;