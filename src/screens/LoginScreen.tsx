import { useAuthStore } from "@/services/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLogo } from "../components/AppLogo";
import { GoogleIcon } from "../components/GoogleIcon";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await login({ email, password });
      router.replace("/home-dashboard" as any);
    } catch (err: any) {
      Alert.alert("Login failed", err.message || error || "Unable to login");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1F2E59" }}>
      <View style={{ flex: 0.34, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 124,
            height: 124,
            borderRadius: 32,
            backgroundColor: "rgba(255,255,255,0.18)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppLogo size={72} />
        </View>
      </View>

      <View
        style={{
          flex: 0.66,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          paddingHorizontal: 28,
          paddingTop: 28,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "800", color: "#1F2E59", textAlign: "center", marginBottom: 24 }}>
          Sign In
        </Text>

        <Text style={{ marginBottom: 8, fontWeight: "600", color: "#1F2E59" }}>Email</Text>
        <TextInput
          mode="outlined"
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!isLoading}
          activeOutlineColor="#355E8E"
          outlineColor="#CBD5E1"
          style={{ marginBottom: 16, backgroundColor: "#FFFFFF" }}
        />

        <Text style={{ marginBottom: 8, fontWeight: "600", color: "#1F2E59" }}>Password</Text>
        <TextInput
          mode="outlined"
          secureTextEntry
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
          activeOutlineColor="#355E8E"
          outlineColor="#CBD5E1"
          style={{ marginBottom: 24, backgroundColor: "#FFFFFF" }}
        />

        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={handleLogin}
          style={{ borderRadius: 12, marginBottom: 16 }}
          contentStyle={{ height: 52 }}
        >
          Login user/Admin
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 18 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E2E8F0" }} />
          <Text style={{ marginHorizontal: 12, color: "#94A3B8" }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E2E8F0" }} />
        </View>

        <Button
          mode="outlined"
          icon={() => <GoogleIcon />}
          disabled={isLoading}
          style={{ borderRadius: 12, borderColor: "#CBD5E1" }}
          contentStyle={{ height: 52 }}
          onPress={() => Alert.alert("Google sign-in", "Google sign-in is not configured yet.")}
        >
          Continue with Google
        </Button>

        <TouchableOpacity onPress={() => router.push("/register" as any)} disabled={isLoading} style={{ marginTop: 22 }}>
          <Text style={{ textAlign: "center", color: "#355E8E", fontWeight: "600" }}>
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
