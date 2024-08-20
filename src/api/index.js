import axios from 'axios';

// Base URL de la API
const BASE_URL = import.meta.env.VITE_API_HOST;

// Función para manejar las respuestas y errores
const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

// Funciones para hacer solicitudes HTTP
export const get = async (resource, headers) => {
  return handleResponse(axios.get(`${BASE_URL}/${resource}`, { headers }));
};

export const post = async (resource, data, headers) => {
  return handleResponse(axios.post(`${BASE_URL}/${resource}`, data, { headers }));
};

export const put = async (resource, data, headers) => {
  return handleResponse(axios.put(`${BASE_URL}/${resource}`, data, { headers }));
};

export const patch = async (resource, data, headers) => {
  return handleResponse(axios.patch(`${BASE_URL}/${resource}`, data, { headers }));
};

export const remove = async (resource, headers) => {
  return handleResponse(axios.delete(`${BASE_URL}/${resource}`, { headers }));
};
