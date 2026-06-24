# 🏗️ Architecture & Best Practices

## Project Architecture

### Layered Architecture
```
┌─────────────────────────────────────────┐
│         Screens (UI Layer)              │
│   (HomeScreen, LoginScreen, etc.)       │
├─────────────────────────────────────────┤
│      Components (Presentation)          │
│     (AppHeader, CustomButton, etc.)     │
├─────────────────────────────────────────┤
│    Services (Business Logic)            │
│   (API, AuthStore, Utils)               │
├─────────────────────────────────────────┤
│    Types & Constants                    │
│     (Interfaces, Enums, Config)         │
└─────────────────────────────────────────┘
```

## Directory Organization

### `/src/app` - Route Files
- Direct routes using Expo Router file-based routing
- Keep minimal - just import and export screens
- Example: `export { default } from '@/screens/HomeScreen';`

### `/src/screens` - Screen Components
- Full-page components that correspond to routes
- Contain layout and handle screen-specific logic
- Import smaller components and use state management

### `/src/components` - Reusable Components
- Small, focused, reusable UI components
- Should be presentational (no side effects)
- Example: `AppHeader`, `Loading`, `CustomInput`

### `/src/services` - Business Logic
- **api.ts**: Axios instance and API calls
- **authStore.ts**: Zustand store for authentication
- Handles all external integrations

### `/src/types` - TypeScript Definitions
- Centralized type definitions
- API response types
- Application models

### `/src/utils` - Helper Functions
- **validation.ts**: Form validation functions
- Pure utility functions
- Reusable logic

### `/src/constants` - Constants
- **colors.ts**: Theme colors
- **theme.ts**: Theme configuration
- Application-wide constants

## State Management with Zustand

### Why Zustand?
- ✅ Simple and lightweight
- ✅ No provider hell
- ✅ Great TypeScript support
- ✅ Easy to debug

### Store Structure
```typescript
interface State {
  // Data
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (payload) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<State>((set, get) => ({
  // initial state
  user: null,
  isLoading: false,
  error: null,
  
  // actions
  login: async (payload) => {
    // implementation
  },
}));
```

### Using Store in Components
```typescript
import { useAuthStore } from '@/services/authStore';

export function MyComponent() {
  const { user, isLoading, login } = useAuthStore();
  
  return (
    <View>
      <Text>{user?.username}</Text>
    </View>
  );
}
```

## API Service Pattern

### Centralized API Client
```typescript
// services/api.ts
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add interceptors for auth, errors, etc.
apiClient.interceptors.response.use(...);

// Export methods for each endpoint
export async function login(payload) {
  return apiClient.post('/auth/login', payload);
}
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
```

## Form Validation Pattern

### Validation Functions
```typescript
export function validateLoginForm(data) {
  const errors: FormErrors = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  }
  
  return errors;
}
```

### Using in Components
```typescript
const handleSubmit = () => {
  const errors = validateLoginForm(formData);
  
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  
  // Submit form
};
```

## Component Best Practices

### ✅ DO
- Keep components small and focused
- Use TypeScript for type safety
- Extract repeated logic to utilities
- Use proper error handling
- Add loading states
- Validate user input
- Handle edge cases

### ❌ DON'T
- Create mega components (>500 lines)
- Use `any` type in TypeScript
- Hardcode strings (use constants)
- Forget error handling
- Mix concerns (UI + logic)
- Ignore loading states

## Navigation Best Practices

### Screen Hierarchy
```
Root
├── Auth Stack
│   ├── Login
│   └── Register
└── Main Stack
    ├── Home
    ├── Profile
    ├── Explore
    ├── Notifications
    └── Settings
```

### Navigation Patterns
```typescript
// Push - navigate forward
router.push('/profile');

// Replace - replace current screen
router.replace('/home');

// Back - go to previous screen
router.back();
```

## Performance Optimization

### 1. Memoization
```typescript
import { useMemo, useCallback } from 'react';

const MyComponent = () => {
  const expensiveValue = useMemo(() => {
    return complexCalculation();
  }, [dependency]);
};
```

### 2. Code Splitting
- Organize code by feature
- Lazy load when possible

### 3. API Caching
- Implement response caching
- Avoid duplicate requests

## Error Handling

### Try-Catch Pattern
```typescript
try {
  const response = await apiService.login(payload);
  // handle success
} catch (error) {
  // handle error
  const message = error.response?.data?.message || 'Error occurred';
  setError(message);
}
```

### User Feedback
- Show loading states
- Display error messages
- Provide retry mechanisms

## TypeScript Best Practices

### Strict Mode
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Type Definitions
```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Avoid
type User = {
  id: any;
  name: any;
  email: any;
};
```

## Testing Strategy

### Unit Tests
- Test utilities and helpers
- Test store actions
- Test API functions

### Integration Tests
- Test screen components
- Test navigation flows
- Test form submissions

## Deployment Checklist

- [ ] Remove debug logs
- [ ] Validate API endpoints
- [ ] Check error handling
- [ ] Test on multiple devices
- [ ] Verify authentication flow
- [ ] Check performance
- [ ] Run linter: `npm run lint`
- [ ] Update version number

## Code Style

### Naming Conventions
```typescript
// Components - PascalCase
const MyComponent = () => {};

// Functions - camelCase
const handleSubmit = () => {};

// Constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'http://api.example.com';

// Types - PascalCase
interface UserData {}
type Status = 'loading' | 'success' | 'error';
```

### File Organization
```typescript
// 1. Imports
import React, { useState } from 'react';
import { View } from 'react-native';

// 2. Types
interface Props {}

// 3. Component
export default function Component() {}

// 4. Styles/Constants (if needed)
const STYLES = {};
```

---

**Remember: Write code for humans first, machines second! 💻**
