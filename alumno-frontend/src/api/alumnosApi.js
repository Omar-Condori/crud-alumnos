import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Obtener alumnos con paginación y búsqueda
export const getAlumnos = async (page = 1, limit = 10, search = '', carrera = '') => {
  let url = `${API_URL}/alumnos?page=${page}&limit=${limit}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (carrera) {
    url += `&carrera=${encodeURIComponent(carrera)}`;
  }
  
  const response = await axios.get(url);
  return response.data;
};

export const getAlumno = async (id) => {
  const response = await axios.get(`${API_URL}/alumnos/${id}`);
  return response.data;
};

export const createAlumno = async (alumno) => {
  const response = await axios.post(`${API_URL}/alumnos`, alumno);
  return response.data;
};

export const updateAlumno = async (id, alumno) => {
  const response = await axios.put(`${API_URL}/alumnos/${id}`, alumno);
  return response.data;
};

export const deleteAlumno = async (id) => {
  const response = await axios.delete(`${API_URL}/alumnos/${id}`);
  return response.data;
};

export const getCarreras = async () => {
  const response = await axios.get(`${API_URL}/carreras`);
  return response.data.carreras;
};