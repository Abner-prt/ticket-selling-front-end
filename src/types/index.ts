export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  totalTickets: number;
  availableTickets: number;
  // Campos visuales (a implementar en la base de datos después o se mapean localmente)
  imageUrl?: string;
  category?: 'Concierto' | 'Deportes' | 'Teatro' | 'Festival' | 'Familiar';
}

// Wrapper unificado de respuestas del API
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  status: string;
  data: T;
}

// Solicitud de inicio de sesion
export interface LoginRequest {
  email: string;
  password: string;
}

// Solicitud de registro de usuario
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Datos del usuario autenticado
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  roles: string[];
}

// Tokens de autenticacion JWT
export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Respuesta combinada de login y registro
export interface AuthData {
  user: UserData;
  token: TokenData;
}
