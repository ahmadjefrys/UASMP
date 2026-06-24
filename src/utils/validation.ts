import { FormErrors, LoginPayload, RegisterPayload } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 20;
};

export const validateLoginForm = (payload: LoginPayload): FormErrors => {
  const errors: FormErrors = {};

  if (!payload.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(payload.email)) {
    errors.email = 'Email is invalid';
  }

  if (!payload.password?.trim()) {
    errors.password = 'Password is required';
  } else if (!validatePassword(payload.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateRegisterForm = (payload: RegisterPayload): FormErrors => {
  const errors: FormErrors = {};

  if (!payload.username?.trim()) {
    errors.username = 'Username is required';
  } else if (!validateUsername(payload.username)) {
    errors.username = 'Username must be 3-20 characters';
  }

  if (!payload.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(payload.email)) {
    errors.email = 'Email is invalid';
  }

  if (!payload.password?.trim()) {
    errors.password = 'Password is required';
  } else if (!validatePassword(payload.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!payload.confirmPassword?.trim()) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (payload.password !== payload.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
