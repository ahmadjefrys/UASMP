import { create } from 'zustand';
import { User, LoginPayload, RegisterPayload } from '../types';
import apiService from './api';

export interface HistoryItem {
  id: string;
  date: string;
  title: string;
  category: "ANXIETY" | "INSOMNIA";
  tags: { text: string; type: "stres" | "kurang_makan" }[];
  description: string;
  detail: {
    kepastian: number;
    summary: string;
    recommendations: string[];
  };
}

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  historyLogs: HistoryItem[];
  isDarkMode: boolean;

  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
  addHistoryLog: (log: HistoryItem) => void;
  toggleDarkMode: () => void;
}
const getRelativeDateStr = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const defaultHistoryLogs: HistoryItem[] = [
  {
    id: "1",
    date: getRelativeDateStr(1),
    title: "Penilaian Kecemasan Ringan",
    category: "ANXIETY",
    tags: [
      { text: "stres", type: "stres" },
      { text: "kurang makan nasi", type: "kurang_makan" },
    ],
    description: "Cobalah untuk tidur dan bangun pada jam yang sama setiap hari, termasuk saat akhir pekan, untuk mengatur jam biologis tubuh Anda.",
    detail: {
      kepastian: 68,
      summary: "Kecemasan ringan dideteksi berdasarkan indikator stres harian Anda. Kondisi ini umumnya bersifat sementara dan dapat dikelola dengan latihan pernapasan teratur dan relaksasi pikiran.",
      recommendations: [
        "Lakukan latihan pernapasan kotak 4x4 saat merasa tegang.",
        "Batasi konsumsi berita atau media sosial sebelum tidur.",
        "Pastikan asupan nutrisi Anda teratur dan cukup karbohidrat.",
      ],
    },
  },
  {
    id: "2",
    date: getRelativeDateStr(2),
    title: "Penilaian Anxiety",
    category: "ANXIETY",
    tags: [
      { text: "stres", type: "stres" },
      { text: "kurang makan nasi", type: "kurang_makan" },
    ],
    description: "Cobalah untuk tidur dan bangun pada jam yang sama setiap hari, termasuk saat akhir pekan, untuk mengatur jam biologis tubuh Anda.",
    detail: {
      kepastian: 82,
      summary: "Tingkat kecemasan sedang terdeteksi. Beberapa gejala fisik seperti ketegangan otot dan kekhawatiran berlebih mengindikasikan perlunya intervensi manajemen stres yang lebih intensif.",
      recommendations: [
        "Lakukan pernapasan mindfulness 4-7-8 secara rutin dua kali sehari.",
        "Matikan semua layar perangkat elektronik minimal 1 jam sebelum tidur.",
        "Sempatkan aktivitas fisik ringan seperti berjalan kaki selama 15 menit.",
      ],
    },
  },
  {
    id: "3",
    date: getRelativeDateStr(3),
    title: "Penilaian Insomnia",
    category: "INSOMNIA",
    tags: [
      { text: "stres", type: "stres" },
      { text: "kurang makan nasi", type: "kurang_makan" },
    ],
    description: "Cobalah untuk tidur dan bangun pada jam yang sama setiap hari, termasuk saat akhir pekan, untuk mengatur jam biologis tubuh Anda.",
    detail: {
      kepastian: 74,
      summary: "Insomnia ringan terdeteksi. Kualitas tidur Anda yang kurang optimal kemungkinan dipicu oleh paparan cahaya biru di malam hari dan kecemasan akademik.",
      recommendations: [
        "Pertahankan jadwal bangun tidur yang konsisten setiap harinya.",
        "Ciptakan lingkungan kamar yang sejuk, sunyi, dan gelap gulita.",
        "Hindari konsumsi kafein atau makanan berat di sore dan malam hari.",
      ],
    },
  },
  {
    id: "4",
    date: getRelativeDateStr(4),
    title: "Penilaian Kecemasan Ringan",
    category: "ANXIETY",
    tags: [
      { text: "stres", type: "stres" },
      { text: "kurang makan nasi", type: "kurang_makan" },
    ],
    description: "Cobalah untuk tidur dan bangun pada jam yang sama setiap hari, termasuk saat akhir pekan, untuk mengatur jam biologis tubuh Anda.",
    detail: {
      kepastian: 65,
      summary: "Kecemasan tingkat awal dideteksi. Menunjukkan respons tubuh terhadap kelelahan fisik ringan atau tekanan akademik jangka pendek.",
      recommendations: [
        "Terapkan relaksasi otot progresif saat beristirahat.",
        "Kurangi asupan minuman berkafein tinggi setelah jam makan siang.",
        "Tuliskan beban pikiran harian dalam jurnal sebelum beristirahat.",
      ],
    },
  },
];

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  historyLogs: defaultHistoryLogs,
  isDarkMode: false,

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
        historyLogs: defaultHistoryLogs, // Reset to defaults on logout
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

  // Add history log
  addHistoryLog: (log: HistoryItem) => {
    set((state) => ({
      historyLogs: [log, ...state.historyLogs],
    }));
  },

  // Toggle Dark Mode
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
