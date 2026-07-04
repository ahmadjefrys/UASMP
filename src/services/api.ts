import axios, { AxiosInstance } from 'axios';
import {
    ApiResponse,
    AuthResponse,
    DiagnosisMetadataResponse,
    DiagnosisPayload,
    DiagnosisResponse,
    LoginPayload,
    RegisterPayload,
} from '../types';

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
          name: 'Test User',
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
          username: payload.username || payload.email.split('@')[0],
          name: payload.name || payload.email.split('@')[0],
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

    private async mockGetDiagnosisMetadata(): Promise<ApiResponse<DiagnosisMetadataResponse>> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Diagnosis metadata fetched',
            data: {
              categories: [
                {
                  id: 'anxiety',
                  title: 'Anxiety',
                  subtitle: 'Kecemasan berlebihan',
                  color: '#E8F0FF',
                  icon: '💨',
                },
                {
                  id: 'insomnia',
                  title: 'Insomnia',
                  subtitle: 'Gangguan tidur',
                  color: '#F1E8FF',
                  icon: '🌙',
                },
              ],
              symptoms: [
                {
                  id: 'rapid_heartbeat',
                  label: 'Detak jantung cepat atau tidak teratur',
                  categoryIds: ['anxiety'],
                },
                {
                  id: 'restless_mind',
                  label: 'Pikiran sulit tenang',
                  categoryIds: ['anxiety'],
                },
                {
                  id: 'muscle_tension',
                  label: 'Otot tegang dan kaku',
                  categoryIds: ['anxiety'],
                },
                {
                  id: 'sleep_onset',
                  label: 'Kesulitan memulai tidur',
                  categoryIds: ['insomnia'],
                },
                {
                  id: 'awake_night',
                  label: 'Sering terbangun di malam hari',
                  categoryIds: ['insomnia'],
                },
                {
                  id: 'day_drowsy',
                  label: 'Mengantuk berlebihan di siang hari',
                  categoryIds: ['insomnia'],
                },
              ],
            },
          });
        }, 400);
      });
    }

    private async mockSubmitDiagnosis(payload: DiagnosisPayload): Promise<ApiResponse<DiagnosisResponse>> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const symptomCount = payload.symptomIds.length;
          const certainty = Math.min(0.99, Math.max(0.1, payload.confidence * 0.6 + symptomCount * 0.1));
          const category = payload.categoryId;

          let title = '';
          let description = '';
          let recommendations: string[] = [];

          if (category === 'anxiety') {
            if (certainty >= 0.75) {
              title = 'Anxiety Tinggi';
              description = 'Gejala Anda menunjukkan tingkat kecemasan yang tinggi dan perlu perhatian segera.';
            } else if (certainty >= 0.45) {
              title = 'Anxiety Sedang';
              description = 'Gejala Anda menunjukkan kecemasan sedang yang dapat dibantu dengan teknik pengelolaan yang teratur.';
            } else {
              title = 'Anxiety Ringan';
              description = 'Gejala Anda cenderung ringan, tetapi pantauan rutin tetap disarankan.';
            }
            recommendations = [
              'Latihan napas dalam 4-7-8 setiap pagi dan malam hari.',
              'Catat pemicu kecemasan dan cari pola yang berulang.',
              'Istirahatkan otak dengan aktivitas relaksasi seperti meditasi singkat.',
            ];
          } else {
            if (certainty >= 0.75) {
              title = 'Insomnia Kronis';
              description = 'Gejala tidur Anda masuk kategori insomnia kronis dan memerlukan perbaikan pola tidur serta pemeriksaan lebih lanjut.';
            } else if (certainty >= 0.45) {
              title = 'Insomnia Sedang';
              description = 'Gejala Anda menunjukkan insomnia sedang yang masih bisa diatasi dengan rutinitas tidur yang sehat.';
            } else {
              title = 'Insomnia Ringan';
              description = 'Gejala Anda ringan, tetapi perbaikan kebiasaan tidur akan membantu mencegah memburuk.';
            }
            recommendations = [
              'Tetapkan jam tidur dan bangun yang konsisten setiap hari.',
              'Hindari layar dan kafein 2 jam sebelum tidur.',
              'Buat lingkungan tidur yang gelap, tenang, dan sejuk.',
            ];
          }

          resolve({
            success: true,
            message: 'Diagnosis complete',
            data: {
              result: {
                title,
                description,
                certainty,
                recommendations,
                categoryId: category,
              },
            },
          });
        }, 700);
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

  async getDiagnosisMetadata(): Promise<ApiResponse<DiagnosisMetadataResponse>> {
    if (USE_MOCK_API) {
      return this.mockGetDiagnosisMetadata();
    }
    return this.apiClient.get('/diagnosis/metadata');
  }

  async submitDiagnosis(payload: DiagnosisPayload): Promise<ApiResponse<DiagnosisResponse>> {
    if (USE_MOCK_API) {
      return this.mockSubmitDiagnosis(payload);
    }
    return this.apiClient.post('/diagnosis/submit', payload);
  }
}

export default new ApiService();
