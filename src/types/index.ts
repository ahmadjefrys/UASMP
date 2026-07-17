// User types
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

// Auth response types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Form error type
export interface FormErrors {
  [key: string]: string;
}
