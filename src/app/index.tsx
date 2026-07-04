import { AppLogo } from '@/components/AppLogo';
import { useAuthStore } from '@/services/authStore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    async function bootstrap() {
      await checkAuth();
      const authenticated = useAuthStore.getState().isAuthenticated;
      setTimeout(() => {
        router.replace(authenticated ? '/home-dashboard' : '/login' as any);
      }, 1000);
    }

    bootstrap();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#E8F3FF', justifyContent: 'center', padding: 24 }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 32,
          paddingVertical: 36,
          paddingHorizontal: 28,
          shadowColor: '#1F2E59',
          shadowOffset: { width: 0, height: 14 },
          shadowOpacity: 0.08,
          shadowRadius: 28,
          elevation: 12,
        }}
      >
        <View
          style={{
            width: 130,
            height: 130,
            borderRadius: 36,
            backgroundColor: '#E8F3FF',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 26,
          }}
        >
          <AppLogo size={72} />
        </View>

        <Text
          style={{
            fontSize: 34,
            fontWeight: '800',
            color: '#1F2E59',
            textAlign: 'center',
            letterSpacing: 0.5,
          }}
        >
          Stay Care
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontSize: 16,
            color: '#5B7DAA',
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          Your mental health companion for calm and clarity.
        </Text>
      </View>

      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#355E8E" />
        <Text
          style={{
            marginTop: 16,
            color: '#5B7DAA',
            fontSize: 13,
            letterSpacing: 1.3,
            textTransform: 'uppercase',
          }}
        >
          Loading serenity
        </Text>
      </View>
    </View>
  );
}
