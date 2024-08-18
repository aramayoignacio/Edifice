import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_HOST;
const token = localStorage.getItem('authToken') || "";

const handleResponse = (response) => {
  if(response.data.statusCode === 401){
    window.location.href = '/login';
  }
  return { ...response.data, success: response.data.statusCode === 200 };
};

axios.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {};
  config.headers.Authorization = Bearer ${token};
  config.headers.Accept = "*/*";
  return config;
});

export const get = async (resource, headers) => {
  return axios
    .get(${BASE_URL}/${resource}, { headers })
    .then(handleResponse)
    .catch(handleResponse);
};

export const post = async (resource, data, headers) => {
  return axios
    .post(${BASE_URL}/${resource}, data, { headers })
    .then(handleResponse)
    .catch(handleResponse);
};

export const put = async (resource, data, headers) => {
  return axios
    .put(${BASE_URL}/${resource}, data, { headers })
    .then(handleResponse)
    .catch(handleResponse);
};

export const patch = async (resource, data, headers) => {
  return axios
    .patch(${BASE_URL}/${resource}, data, { headers })
    .then(handleResponse)
    .catch(handleResponse);
};

export const remove = async (resource, data, headers) => {
  return axios
    .delete(${BASE_URL}/${resource}, { data, headers })
    .then(handleResponse)
    .catch(handleResponse);
};