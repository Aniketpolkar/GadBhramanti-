import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: 'https://gadbhramanti-backend.onrender.com',
});

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;
API.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

export default API;
