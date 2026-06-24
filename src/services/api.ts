import axios, { AxiosInstance } from 'axios';
import { LoginPayload, RegisterPayload, AuthResponse, ApiResponse } from '../types';

// For development, use mock API
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://mock-api/api';
const USE_MOCK_API = true; // Toggle this to use mock API

// Mock data storage (simulated backend)
const mockUsers: any = {
  'test@example.com': {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    createdAt: new Date().toISOString(),
  },
}

const mockTokens: any = {
  'mock-token-123': {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    createdAt: new Date().toISOString(),
  },
};

class ApiService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptors
    this.apiClient.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Mock API methods
  private async mockLogin(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock: accept any email/password for testing
        const token = 'mock-token-' + Date.now();
        const user = {
          id: '1',
          username: payload.email.split('@')[0],
          email: payload.email,
          createdAt: new Date().toISOString(),
        };
        
        mockTokens[token] = user;
        
        resolve({
          success: true,
          message: 'Login successful',
          data: {
            token,
            user,
          },
        });
      }, 500);
    });
  }

  private async mockRegister(payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[payload.email]) {
          reject(new Error('User already exists'));
          return;
        }
        
        const token = 'mock-token-' + Date.now();
        const user = {
          id: String(Object.keys(mockUsers).length + 1),
          username: payload.username,
          email: payload.email,
          createdAt: new Date().toISOString(),
        };
        
        mockUsers[payload.email] = { ...user, password: payload.password };
        mockTokens[token] = user;
        
        resolve({
          success: true,
          message: 'Registration successful',
          data: {
            token,
            user,
          },
        });
      }, 500);
    });
  }

  private async mockLogout(): Promise<ApiResponse<null>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Logout successful',
        });
      }, 300);
    });
  }

  private async mockGetCurrentUser(token: string): Promise<ApiResponse<AuthResponse>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockTokens[token];
        if (!user) {
          reject(new Error('Invalid token'));
          return;
        }
        
        resolve({
          success: true,
          message: 'User fetched',
          data: {
            token,
            user,
          },
        });
      }, 300);
    });
  }

  // Auth endpoints
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
    if (USE_MOCK_API) {
      return this.mockLogin(payload);
    }
    return this.apiClient.post('/auth/login', payload);
  }

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> {
    if (USE_MOCK_API) {
      return this.mockRegister(payload);
    }
    const { confirmPassword, ...data } = payload;
    return this.apiClient.post('/auth/register', data);
  }

  async logout(): Promise<ApiResponse<null>> {
    if (USE_MOCK_API) {
      return this.mockLogout();
    }
    return this.apiClient.post('/auth/logout', {});
  }

  // Set authorization token
  setAuthToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Remove authorization token
  removeAuthToken() {
    delete this.apiClient.defaults.headers.common['Authorization'];
  }

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<AuthResponse>> {
    if (USE_MOCK_API) {
      const authHeader = this.apiClient.defaults.headers.common['Authorization'];
      const token = typeof authHeader === 'string' ? authHeader.replace('Bearer ', '') : '';
      if (!token) {
        return Promise.reject(new Error('No token provided'));
      }
      return this.mockGetCurrentUser(token);
    }
    return this.apiClient.get('/auth/me');
  }
}

export default new ApiService();
