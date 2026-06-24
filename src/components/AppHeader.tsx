import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { useAuthStore } from "../services/authStore";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  showLogout?: boolean;
  onBackPress?: () => void;
}

export function AppHeader({
  title = "My App",
  showBack = false,
  showLogout = false,
  onBackPress,
}: AppHeaderProps) {
  const { logout } = useAuthStore();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login" as any);
  };

  return (
    <View className="bg-slate-900 px-4 py-4 flex-row justify-between items-center border-b border-slate-800">
      <View className="flex-1 flex-row items-center">
        {showBack && (
          <Pressable
            onPress={handleBack}
            className="mr-3 w-10 h-10 justify-center items-center"
          >
            <Text className="text-2xl">←</Text>
          </Pressable>
        )}
        <Text variant="titleLarge" className="text-white font-bold flex-1">
          {title}
        </Text>
      </View>

      {showLogout && (
        <Pressable
          onPress={handleLogout}
          className="bg-red-600 px-3 py-2 rounded-lg"
        >
          <Text className="text-white text-sm font-semibold">Logout</Text>
        </Pressable>
      )}
    </View>
  );
}
