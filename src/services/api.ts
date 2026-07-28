import axios from 'axios';
import type { TokenData } from '../types';

// Cliente HTTP configurado para conectarse al backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5077',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor que inyecta el token JWT en cada peticion
api.interceptors.request.use(
  (config: any) => {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr) {
      const tokenData = JSON.parse(tokenStr) as TokenData;
      config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

export default api;
