import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getAlumnos = async () => {
  const response = await axios.get(`${API_URL}/alumnos`);
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