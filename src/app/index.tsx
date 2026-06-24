// Redirect to home on app start
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    router.replace('/home' as any);
  }, []);

  return null;
}