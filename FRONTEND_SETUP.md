# Frontend Setup Guide

Dokumentasi lengkap setup front-end aplikasi Expo React Native dengan TypeScript.

## 📁 Struktur Project

```
src/
├── app/                 # Expo Router pages
│   ├── _layout.tsx     # Root layout dengan navigation
│   ├── home.tsx        # Home page
│   ├── login.tsx       # Login page
│   ├── register.tsx    # Register page
│   ├── profile.tsx     # Profile page
│   ├── explore.tsx     # Explore page
│   ├── notification.tsx # Notifications page
│   └── settings.tsx    # Settings page
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── exploreScreen.tsx
│   ├── NotificationScreen.tsx
│   └── SettingsScreen.tsx
├── components/         # Reusable components
│   ├── AppHeader.tsx   # Header dengan back button
│   ├── ui/
│   └── ...
├── services/           # API & State management
│   ├── api.ts         # Axios instance & API calls
│   └── authStore.ts   # Zustand auth store
├── types/             # TypeScript interfaces
│   └── index.ts
├── utils/             # Utility functions
│   └── validation.ts  # Form validation
├── hooks/             # Custom React hooks
└── constants/         # Constants & theme
```

## 🔐 Authentication

### State Management (Zustand)
```typescript
import { useAuthStore } from '@/services/authStore';

const { user, token, isAuthenticated, isLoading, error, login, register, logout } = useAuthStore();
```

### API Service
```typescript
import apiService from '@/services/api';

// Login
await apiService.login({ email: 'user@example.com', password: 'password' });

// Register
await apiService.register({ username: 'john', email: 'john@example.com', password: '123456', confirmPassword: '123456' });

// Get current user
await apiService.getCurrentUser();
```

## ✅ Form Validation

```typescript
import { validateLoginForm, validateRegisterForm } from '@/utils/validation';

const errors = validateLoginForm({ email, password });
if (Object.keys(errors).length > 0) {
  // Handle errors
}
```

## 🎨 Components

### AppHeader
Header component dengan back button dan logout functionality.

```typescript
<AppHeader 
  title="Home" 
  showBack={true} 
  showLogout={true}
/>
```

## 🔄 Navigation

Menggunakan Expo Router dengan automatic route detection dari file structure.

**Route mapping:**
- `/login` → LoginScreen
- `/register` → RegisterScreen
- `/home` → HomeScreen
- `/profile` → ProfileScreen
- `/explore` → ExploreScreen
- `/notification` → NotificationScreen
- `/settings` → SettingsScreen

**Navigasi:**
```typescript
import { router } from 'expo-router';

router.push('/home');        // Navigate
router.replace('/login');    // Replace (untuk auth redirect)
router.back();               // Back
```

## 🎯 Features

### ✨ Login Screen
- Email validation
- Password validation
- Error handling
- Loading state
- Link ke Register

### ✨ Register Screen
- Username validation (3-20 chars)
- Email validation
- Password validation (min 6 chars)
- Confirm password validation
- Error handling
- Link ke Login

### ✨ Home Screen
- Welcome message
- User info card
- Quick access links
- Activity stats
- Responsive layout

### ✨ Profile Screen
- User avatar
- Account information
- Edit profile action
- Change password action

### ✨ Explore Screen
- Search functionality
- Featured/Popular/Trending/New sections
- Card-based layout
- Responsive design

### ✨ Notification Screen
- List of notifications
- Unread badge
- Mark as read functionality
- Clear all action

### ✨ Settings Screen
- Account settings
- Preferences (notifications, dark mode, analytics)
- About section
- Logout & Delete account

## 🛠️ Environment Setup

1. **Create `.env` file:**
```bash
cp .env.example .env
```

2. **Update API URL:**
```
EXPO_PUBLIC_API_URL=http://your-api-url/api
```

## 📦 Dependencies

- `expo` - Framework
- `expo-router` - File-based routing
- `react-native-paper` - UI components
- `nativewind` - Tailwind CSS support
- `zustand` - State management
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Persistent storage
- `react-native-reanimated` - Animations
- `typescript` - Type safety

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run di Android
npm run android

# Run di iOS
npm run ios

# Run di Web
npm run web
```

## 📝 API Response Format

```typescript
{
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
    }
  }
}
```

## 🔗 Alur Autentikasi

1. User membuka app
2. App check auth status dari stored token
3. Jika authenticated → redirect ke `/home`
4. Jika tidak → redirect ke `/login`
5. User bisa login atau register
6. Setelah success → token disimpan dan redirect ke `/home`
7. User bisa logout → token dihapus dan redirect ke `/login`

## 🎨 Styling

Menggunakan NativeWind (Tailwind CSS untuk React Native).

```tsx
<View className="flex-1 bg-slate-950 px-5 py-6">
  <Text className="text-white text-2xl font-bold">
    Hello World
  </Text>
</View>
```

## 📱 Responsive Design

Semua screens sudah responsive menggunakan Tailwind CSS utilities.

## 🔒 Security Tips

1. Jangan store sensitive data di state biasa
2. Gunakan AsyncStorage untuk token (dengan encryption jika possible)
3. Implement token refresh mechanism
4. Validate input di client dan server
5. Use HTTPS untuk API calls

## ❓ Troubleshooting

### Token tidak persist
- Check if AsyncStorage sudah installed
- Verify auth store middleware

### Navigation tidak bekerja
- Check route names di _layout.tsx
- Verify screen components exist

### API calls error
- Check EXPO_PUBLIC_API_URL di .env
- Verify backend running
- Check CORS settings

---

**Last Updated:** 2024
**Version:** 1.0.0
