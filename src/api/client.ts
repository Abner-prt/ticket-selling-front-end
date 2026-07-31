import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5241/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor genérico para errores
// TODO: Refresh Token se puede agregar aquí luego
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Manejar token expirado, logout, etc
      console.error("Token expirado o inválido");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
