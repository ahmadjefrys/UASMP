// User types
export interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
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
  name: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface DiagnosisCategory {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

export interface DiagnosisSymptomOption {
  id: string;
  label: string;
  categoryIds: string[];
}

export interface DiagnosisPayload {
  categoryId: string;
  symptomIds: string[];
  confidence: number;
}

export interface DiagnosisResult {
  title: string;
  description: string;
  certainty: number;
  recommendations: string[];
  categoryId: string;
}

export interface DiagnosisMetadataResponse {
  categories: DiagnosisCategory[];
  symptoms: DiagnosisSymptomOption[];
}

export interface DiagnosisResponse {
  result: DiagnosisResult;
}

// Form error type
export interface FormErrors {
  [key: string]: string;
}
