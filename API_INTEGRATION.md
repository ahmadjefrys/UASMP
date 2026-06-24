# 🔗 API Integration Guide

## Backend API Endpoints Required

Setup frontend sudah selesai. Berikut adalah endpoint yang dibutuhkan dari backend.

---

## Authentication Endpoints

### 1. Login
**POST** `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-id-123",
      "username": "johndoe",
      "email": "user@example.com",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Response (Error 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. Register
**POST** `/api/auth/register`

**Request:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success 201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-id-123",
      "username": "johndoe",
      "email": "user@example.com",
      "createdAt": "2024-01-15T00:00:00Z"
    }
  }
}
```

**Validation Errors (400):**
```json
{
  "success": false,
  "message": "Username already exists"
}
```

---

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-id-123",
      "username": "johndoe",
      "email": "user@example.com",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Response (Unauthorized 401):**
```json
{
  "success": false,
  "message": "Token expired or invalid"
}
```

---

### 4. Logout
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success 200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Standard Response Format

Semua endpoint harus mengembalikan response dengan format ini:

```typescript
interface ApiResponse<T> {
  success: boolean;      // true/false
  message: string;       // Status message
  data?: T;             // Response data (optional untuk error)
}
```

---

## Error Handling

### Status Codes
| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Invalid token/credentials |
| 403 | Forbidden | Not allowed |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Backend error |

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication

### JWT Token
- Token should be included in Authorization header
- Format: `Authorization: Bearer <token>`
- Token placed in `data.token` dari response

### Token Persistence
- Frontend menyimpan token di Zustand store
- Token digunakan untuk semua subsequent requests
- Token included di header setiap request: `Authorization: Bearer <token>`

---

## Testing dengan cURL/Postman

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your-token>"
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <your-token>"
```

---

## Frontend Implementation

### API Service (services/api.ts)
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Login
export async function login(email: string, password: string) {
  return apiClient.post('/auth/login', { email, password });
}

// Register
export async function register(username: string, email: string, password: string) {
  return apiClient.post('/auth/register', { username, email, password });
}

// Get Current User
export async function getCurrentUser() {
  return apiClient.get('/auth/me');
}

// Logout
export async function logout() {
  return apiClient.post('/auth/logout');
}
```

---

## Configuration

### Environment Variables (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_ENV=development
```

**Production:**
```
EXPO_PUBLIC_API_URL=https://api.yourapp.com/api
EXPO_PUBLIC_ENV=production
```

---

## Security Considerations

1. **HTTPS**: Use HTTPS in production
2. **Token**: Store securely (AsyncStorage encrypted)
3. **CORS**: Configure CORS on backend
4. **Rate Limiting**: Implement on backend
5. **Input Validation**: Validate on both client & server
6. **Error Messages**: Don't expose sensitive info in errors

---

## Additional Endpoints (Optional)

Untuk fitur lengkap di masa depan:

### User Profile
```
PATCH /api/users/profile
PUT /api/users/password
DELETE /api/users/account
```

### Notifications
```
GET /api/notifications
POST /api/notifications/read
DELETE /api/notifications/:id
```

### Settings
```
GET /api/settings
PATCH /api/settings
```

---

## Testing Checklist

- [ ] Test login dengan email dan password
- [ ] Test register dengan data baru
- [ ] Test login dengan credentials salah
- [ ] Test register dengan email yang sudah ada
- [ ] Test get current user dengan valid token
- [ ] Test get current user dengan invalid token
- [ ] Test logout
- [ ] Test API error handling

---

## Debugging Tips

### Network Requests
```typescript
// Lihat di console
const response = await apiService.login(payload);
console.log('Response:', response);
```

### Check Token
```typescript
const { token } = useAuthStore();
console.log('Current Token:', token);
```

### API Errors
```typescript
try {
  await login(email, password);
} catch (error) {
  console.error('API Error:', error.response?.data);
}
```

---

## Integration Steps

1. **Setup Backend** dengan endpoint di atas
2. **Update .env** dengan API URL
3. **Test API** dengan Postman/cURL
4. **Run Frontend** dengan `npm start`
5. **Test Flow**: Register → Login → Home → Logout

---

**Status**: Ready for Backend Integration ✅

Next: Coordinate dengan backend developer untuk implementasi endpoint!
