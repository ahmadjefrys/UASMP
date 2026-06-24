import { create } from 'zustand';
import { User, LoginPayload, RegisterPayload } from '../types';
import apiService from './api';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Login action
  login: async (payload: LoginPayload) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiService.login(payload);

      if (response.data) {
        const { token, user } = response.data;
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        apiService.setAuthToken(token);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Register action
  register: async (payload: RegisterPayload) => {
    try {
      set({ isLoading: true, error: null });
      const response = await apiService.register(payload);

      if (response.data) {
        const { token, user } = response.data;
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        apiService.setAuthToken(token);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    try {
      set({ isLoading: true });
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      apiService.removeAuthToken();
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Set user
  setUser: (user: User | null) => set({ user }),

  // Set token
  setToken: (token: string | null) => {
    if (token) {
      apiService.setAuthToken(token);
    } else {
      apiService.removeAuthToken();
    }
    set({ token });
  },

  // Check auth
  checkAuth: async () => {
    const { token } = get();
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      set({ isLoading: true });
      apiService.setAuthToken(token);
      const response = await apiService.getCurrentUser();

      if (response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      apiService.removeAuthToken();
    }
  },
}));
