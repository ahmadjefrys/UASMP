# 🚀 Quick Start Guide

## ⚡ Setup Cepat

### 1. Install Dependencies
```bash
cd my-app
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env dengan API URL Anda
```

### 3. Run Application
```bash
npm start
```

Pilih platform:
- **Android**: Press `a`
- **iOS**: Press `i`
- **Web**: Press `w`

## 📁 File Structure

```
src/
├── app/                  # Route files (Expo Router)
├── screens/              # Screen components
├── components/           # Reusable components
│   └── AppHeader.tsx    # Header dengan navigation
├── services/
│   ├── api.ts          # API client
│   └── authStore.ts    # State management
├── types/              # TypeScript types
└── utils/              # Helper functions
```

## 🔐 Authentication Flow

### Login
```typescript
import { useAuthStore } from '@/services/authStore';

const { login, isLoading, error } = useAuthStore();

await login({ 
  email: 'user@example.com', 
  password: 'password123' 
});
// Navigate to /home on success
```

### Register
```typescript
await register({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'
});
```

### Logout
```typescript
await logout();
// Redirect to /login
```

## 🎨 Available Screens

| Route | Screen | Description |
|-------|--------|-------------|
| `/login` | Login | User authentication |
| `/register` | Register | New account creation |
| `/home` | Home | Main dashboard |
| `/profile` | Profile | User profile view |
| `/explore` | Explore | Browse content |
| `/notification` | Notifications | Notification list |
| `/settings` | Settings | App settings |

## 📱 Components

### AppHeader
```tsx
<AppHeader 
  title="Page Title"
  showBack={true}
  showLogout={false}
/>
```

## 🔗 Navigation

```typescript
import { router } from 'expo-router';

// Navigate to page
router.push('/profile');

// Replace (don't create history)
router.replace('/login');

// Go back
router.back();
```

## ✅ Form Validation

```typescript
import { validateLoginForm } from '@/utils/validation';

const errors = validateLoginForm({ email, password });

// Result: { email: 'error message', password: 'error message' }
```

## 🛠️ API Integration

### Make API Call
```typescript
import apiService from '@/services/api';

// Login via API
const response = await apiService.login({
  email: 'user@example.com',
  password: 'password'
});
// Response format:
// {
//   success: true,
//   data: { token: '...', user: {...} }
// }
```

### Set Auth Token
```typescript
apiService.setAuthToken('your-token-here');
```

## 🎯 Common Tasks

### Change Home Page Welcome Text
Edit [src/screens/HomeScreen.tsx](src/screens/HomeScreen.tsx#L19)

### Add New Screen
1. Create file in `src/screens/` (e.g., `NewScreen.tsx`)
2. Create route in `src/app/` (e.g., `new.tsx`)
3. Add to navigation in `src/app/_layout.tsx`

### Customize Colors
Edit [src/constants/colors.ts](src/constants/colors.ts)

### Add API Endpoint
Update [services/api.ts](services/api.ts)

## 🐛 Troubleshooting

### App won't start
```bash
npm install
npm start
```

### Styling not applied
- Check Tailwind classes are correct
- Clear cache: `npm start --reset-cache`

### API calls failing
- Verify API URL in `.env`
- Check backend is running
- Look at network tab in debugger

### State not persisting
- Token is stored in Zustand store
- Persists across app restart if implemented with AsyncStorage

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Native Paper](https://callstack.github.io/react-native-paper)
- [NativeWind](https://www.nativewind.dev)

## 👨‍💻 Development Tips

1. Use React DevTools for debugging state
2. Check network tab for API issues
3. Use `console.log()` for debugging
4. Test on actual device for best experience
5. Keep components small and reusable

---

**Happy Coding! 🎉**

For more details, see [FRONTEND_SETUP.md](FRONTEND_SETUP.md)
