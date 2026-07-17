import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountModal from "../components/AccountModal";
import { useAuthStore } from "../services/authStore";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const { register, login } = useAuthStore();

  const handleRegister = async () => {
    let hasError = false;

    // Name validation
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    // Email validation
    if (!email || !email.includes("@")) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    // Re-password validation
    if (!rePassword || rePassword !== password) {
      setRePasswordError(true);
      hasError = true;
    } else {
      setRePasswordError(false);
    }

    if (!hasError) {
      try {
        await register({ username: name, email, password, confirmPassword: rePassword });
        const currentUser = useAuthStore.getState().user;
        if (currentUser?.role === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/home");
        }
      } catch (err) {
        alert("Registrasi gagal. Silakan coba lagi.");
      }
    }
  };

  const handleSelectAccount = async (accountName: string, selectedEmail: string) => {
    setModalVisible(false);
    try {
      await login({ email: selectedEmail, password: "password123" });
      const currentUser = useAuthStore.getState().user;
      if (currentUser?.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/home");
      }
    } catch (err) {
      router.replace("/home");
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container} bounces={false}>
      {/* Top Navy Blue Section with Logo */}
      <View style={styles.topSection}>
        <Image 
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom White Card */}
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Sign Up</Text>

        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={[styles.input, nameError && styles.inputError]}
            placeholder="Your Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError) setNameError(false);
            }}
          />
        </View>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="your@email.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError(false);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={[styles.passwordInputWrapper, passwordError && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="********"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError(false);
              }}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <MaterialCommunityIcons 
                name={showPassword ? "eye" : "eye-off"} 
                size={20} 
                color="#9CA3AF" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Re-Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Re-Password</Text>
          <View style={[styles.passwordInputWrapper, rePasswordError && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="********"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showRePassword}
              value={rePassword}
              onChangeText={(text) => {
                setRePassword(text);
                if (rePasswordError) setRePasswordError(false);
              }}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)} style={styles.eyeButton}>
              <MaterialCommunityIcons 
                name={showRePassword ? "eye" : "eye-off"} 
                size={20} 
                color="#9CA3AF" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Or Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Button */}
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="google" size={20} color="#DB4437" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Do you have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.footerLink}>login here</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Google Account Modal */}
      <AccountModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectAccount={handleSelectAccount}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#1E2C4F",
  },
  container: {
    flexGrow: 1,
  },
  topSection: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    tintColor: "#FFFFFF",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: height * 0.05,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E2C4F",
    textAlign: "center",
    marginBottom: 28,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#1E2C4F",
    backgroundColor: "#FFFFFF",
  },
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#1E2C4F",
  },
  eyeButton: {
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: "#EF4444", // Red border on validation error
    borderWidth: 1.2,
  },
  registerButton: {
    backgroundColor: "#2E5788",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#1E2C4F",
    fontSize: 15,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    color: "#4B5563",
    fontSize: 14,
  },
  footerLink: {
    color: "#2E5788",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});