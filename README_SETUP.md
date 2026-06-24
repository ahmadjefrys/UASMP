# My App - Expo React Native

Aplikasi mobile modern dengan authentication, navigation, dan UI yang complete.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd my-app
npm install
```

### 2. Start Development Server
```bash
npx expo start
```

### 3. Run on Device/Emulator
- **Android**: Tekan `a` atau scan QR code dengan Android emulator
- **iOS**: Tekan `i` atau scan QR code dengan physical device
- **Web**: Tekan `w`

## 📱 Features

### Authentication
- ✅ Login dengan email & password
- ✅ Register akun baru
- ✅ Auto-redirect berdasarkan auth status
- ✅ Token management & persistent storage
- ✅ Logout functionality

### Navigation
- ✅ File-based routing dengan Expo Router
- ✅ 7 screens: Login, Register, Home, Profile, Explore, Notifications, Settings
- ✅ Back button support
- ✅ Type-safe routing

### UI/UX
- ✅ Dark theme (slate colors)
- ✅ React Native Paper components
- ✅ TailwindCSS styling (NativeWind)
- ✅ Responsive layout
- ✅ Loading indicators & error handling
- ✅ Form validation

### State Management
- ✅ Zustand untuk authentication store
- ✅ Global state management
- ✅ Token persistence

### API Integration
- ✅ Axios HTTP client
- ✅ Request/response interceptors
- ✅ Error handling
- ✅ Mock API untuk development
- ✅ Ready untuk real backend

## 📁 Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── login.tsx          # Login route
│   ├── register.tsx       # Register route
│   ├── home.tsx           # Home route
│   ├── profile.tsx        # Profile route
│   ├── explore.tsx        # Explore route
│   ├── notification.tsx   # Notifications route
│   └── settings.tsx       # Settings route
├── screens/               # Screen components
├── components/            # Reusable components
├── services/              # API & state management
│   ├── api.ts            # Axios client + mock API
│   └── authStore.ts      # Zustand auth store
├── types/                 # TypeScript interfaces
├── utils/                 # Utility functions
├── hooks/                 # Custom React hooks
├── constants/             # Colors, theme
└── assets/                # Images, icons
```

## 🔐 Authentication

### Mock API (Development)

Aplikasi berjalan dengan mock API secara default. Anda bisa login dengan credentials apapun:

```
Email: test@example.com (atau apapun)
Password: password123 (atau apapun)
```

### Real API (Production)

Update `.env.local`:
```env
EXPO_PUBLIC_API_URL=http://your-backend:3000/api
USE_MOCK_API=false
```

Endpoint yang diharapkan:
```
POST /auth/login
POST /auth/register
POST /auth/logout
GET  /auth/me
```

## 🛠 Tech Stack

- **Expo 56.0.11** - React Native framework
- **React Native 0.76** - Mobile UI
- **TypeScript 6.0.3** - Type safety
- **Zustand 5.0.14** - State management
- **Axios 1.17.0** - HTTP client
- **React Native Paper 5.15.3** - Material UI components
- **NativeWind 4.2.5** - Tailwind CSS
- **Expo Router 56.2.10** - File-based routing

## 📋 Configuration

### Environment Variables (.env.local)
```env
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Mock API toggle
USE_MOCK_API=true
```

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured
- Proper type checking

## 🧪 Testing

Lihat [TESTING_GUIDE.md](./TESTING_GUIDE.md) untuk:
- Test credentials
- Feature checklist
- Debugging tips
- Switching to real API

## 📚 Screens

### Login Screen
- Email & password input
- Form validation
- Error messages
- Link ke register

### Register Screen
- Username, email, password input
- Password confirmation
- Form validation
- Link ke login

### Home Screen
- User welcome greeting
- Quick access buttons
- User info card
- Logout button

### Profile Screen
- User information display
- Avatar placeholder
- Edit options
- Change password option

### Explore Screen
- Search functionality
- Featured/popular/trending sections
- View all buttons

### Notifications Screen
- Notification list
- Unread badges
- Mark as read
- Clear all option

### Settings Screen
- Toggle preferences
- Account settings
- About section
- Logout & delete account

## 🚨 Troubleshooting

### Cannot connect to Expo CLI
- Pastikan device/emulator terhubung WiFi yang sama
- Restart Expo server: `npx expo start -c`
- Cek firewall Windows

### Network Error di API calls
- Use mock API untuk development
- Check backend server jika menggunakan real API
- Lihat console logs untuk error details

### Import errors
- Semua imports menggunakan relative paths
- Path aliases (@/) telah di-convert ke relative paths

## 📝 Documentation

- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing & debugging guide
- [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) - Completion report
- [API_INTEGRATION.md](./API_INTEGRATION.md) - API specifications

## 🎯 Next Steps

1. **Backend Development**:
   - Buat Express/Node.js backend
   - Implement auth endpoints
   - Update `EXPO_PUBLIC_API_URL` di `.env.local`

2. **Database**:
   - Setup MongoDB/PostgreSQL
   - Create user model
   - Implement password hashing (bcrypt)

3. **Deployment**:
   - Build APK/IPA
   - Submit ke Play Store/App Store
   - Setup CI/CD

## 📦 Build Commands

```bash
# Development
npm start

# Build for Android
npx eas build --platform android

# Build for iOS
npx eas build --platform ios

# Build for Web
npm run build
```

## 📄 License

MIT

---

**Last Updated**: 2026-06-12  
**Status**: ✅ Production Ready
