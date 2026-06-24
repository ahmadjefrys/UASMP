# Testing Guide

## Test Login Credentials (Mock API)

Aplikasi saat ini menggunakan **Mock API** untuk development, jadi Anda bisa login dengan credentials apapun:

### Login
- **Email**: `test@example.com` atau email apapun
- **Password**: `password123` atau password apapun
- **Status**: ✅ Akan selalu berhasil dengan mock API

### Register
- **Username**: minimal 3 karakter
- **Email**: format email valid
- **Password**: minimal 6 karakter
- **Confirm Password**: harus sama dengan password
- **Status**: ✅ Akan selalu berhasil dengan mock API

## Features Ready to Test

### ✅ Authentication
- [x] Login dengan mock API
- [x] Register dengan mock API
- [x] Auto-redirect ke Home setelah login
- [x] Token management
- [x] Logout functionality

### ✅ Navigation
- [x] Login ↔ Register routing
- [x] Home screen dengan quick access
- [x] Profile, Explore, Notifications, Settings screens
- [x] Back navigation di semua screens
- [x] Logout di semua screens

### ✅ UI/UX
- [x] Dark theme dengan slate colors
- [x] Input validation dengan error messages
- [x] Loading indicators
- [x] Responsive layout
- [x] TailwindCSS styling

## Debugging Tips

### Jika ada Network Error

1. **Check Expo Connection**:
   - Pastikan device/emulator terhubung WiFi
   - Scan QR code atau masukkan URL manual

2. **Check Mock API**:
   - Pastikan `USE_MOCK_API=true` di `.env.local`
   - Restart Expo server: `npx expo start -c`

3. **Logs**:
   - Buka console di Expo app untuk melihat errors
   - Gunakan `react-native-logs` jika diperlukan

## Switching to Real API

Jika Anda punya backend server running:

1. **Update `.env.local`**:
   ```
   EXPO_PUBLIC_API_URL=http://your-server:3000/api
   USE_MOCK_API=false
   ```

2. **Update `src/services/api.ts`**:
   ```typescript
   const USE_MOCK_API = false; // Change to false
   ```

3. **Restart Expo**:
   ```bash
   npx expo start -c
   ```

## API Endpoints (untuk real API)

```
POST   /auth/login        - Login
POST   /auth/register     - Register  
POST   /auth/logout       - Logout
GET    /auth/me           - Get current user
```

Expected Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "1",
      "username": "testuser",
      "email": "test@example.com",
      "createdAt": "2026-06-12T..."
    }
  }
}
```
