import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E8EEF8",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Image
        source={{
          uri: "https://picsum.photos/300",
        }}
        style={{
          width: 240,
          height: 240,
          borderRadius: 40,
          marginBottom: 30,
        }}
      />

      <Text
        style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "#2E5A88",
        }}
      >
        STAYCARE
      </Text>

      <Text
        style={{
          fontSize: 20,
          color: "#4B5563",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Your Mental Health Companion
      </Text>

      <Button
        mode="contained"
        onPress={() => router.push("/login")}
        style={{
          marginTop: 30,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        }}
      >
        Get Started
      </Button>

        
    </View>
  );
}