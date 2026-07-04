import { useAuthStore } from "@/services/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLogo } from "../components/AppLogo";
import { GoogleIcon } from "../components/GoogleIcon";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await register({ name, email, password, confirmPassword });
      router.replace("/home-dashboard" as any);
    } catch (err: any) {
      Alert.alert("Registration failed", err.message || error || "Unable to register");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1F2E59" }}>
      <View style={{ flex: 0.32, justifyContent: "center", alignItems: "center", paddingTop: 28 }}>
        <View
          style={{
            width: 132,
            height: 132,
            borderRadius: 34,
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
          flex: 0.68,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          paddingHorizontal: 28,
          paddingTop: 28,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: 32, fontWeight: "800", textAlign: "center", color: "#1F2E59", marginBottom: 24 }}>
            Sign Up
          </Text>

          <Text style={{ marginBottom: 8, fontWeight: "600", color: "#1F2E59" }}>Full Name</Text>
          <TextInput
            mode="outlined"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
            activeOutlineColor="#355E8E"
            outlineColor="#CBD5E1"
            style={{ marginBottom: 16, backgroundColor: "#FFFFFF" }}
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
            activeOutlineColor="#355E8E"
            outlineColor="#CBD5E1"
            style={{ marginBottom: 16, backgroundColor: "#FFFFFF" }}
          />

          <Text style={{ marginBottom: 8, fontWeight: "600", color: "#1F2E59" }}>Confirm Password</Text>
          <TextInput
            mode="outlined"
            secureTextEntry
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
            activeOutlineColor="#355E8E"
            outlineColor="#CBD5E1"
            style={{ marginBottom: 24, backgroundColor: "#FFFFFF" }}
          />

          <Button
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
            onPress={handleRegister}
            style={{ borderRadius: 12, marginBottom: 18 }}
            contentStyle={{ height: 52 }}
          >
            Create Account
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
            style={{ borderRadius: 12, borderColor: "#CBD5E1", marginBottom: 20 }}
            contentStyle={{ height: 52 }}
            onPress={() => Alert.alert("Google sign-in", "Google sign-in is not configured yet.")}
          >
            Continue with Google
          </Button>

          <TouchableOpacity onPress={() => router.push("/login" as any)} disabled={isLoading}>
            <Text style={{ textAlign: "center", color: "#355E8E", fontWeight: "600" }}>
              Already have an account? Sign In here
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
