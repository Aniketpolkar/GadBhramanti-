import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
//   baseURL: 'https://gadbhramanti-backend.onrender.com',
});

// If storing token in localStorage:
API.interceptors.request.use(config => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default API;
