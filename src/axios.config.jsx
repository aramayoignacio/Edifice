import axios from 'axios';
import useAccount from './hooks/useAccount';

// Base URL de la API
const BASE_URL = import.meta.env.VITE_API_HOST;

// Configuración de Axios
const configureAxios = () => {
  const session = useAccount();

  // Configurar interceptores de solicitud
  axios.interceptors.request.use((config) => {
    if (!config.headers) {
      config.headers = {};
    }
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    config.headers.Accept = '*/*';
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Configurar interceptores de respuesta
  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  });
};

export default configureAxios;
