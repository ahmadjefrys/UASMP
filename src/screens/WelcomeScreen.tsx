import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AccountModal from "../components/AccountModal";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectAccount = (accountName: string, email: string) => {
    setModalVisible(false);
    // Navigate to the main app (home page) on successful account selection
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
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
        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={() => router.push("/login")}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up / Sign Out Button */}
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={() => router.push("/register")}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
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
      </View>

      {/* Google Account Modal */}
      <AccountModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectAccount={handleSelectAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2C4F", // Dark navy top background
  },
  topSection: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    tintColor: "#FFFFFF", // Tinted white logo
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: height * 0.08,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  signInButton: {
    backgroundColor: "#2E5788", // Soft navy blue button
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#2E5788",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#2E5788",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  signUpButtonText: {
    color: "#1E2C4F",
    fontSize: 15,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#1E2C4F",
    fontSize: 15,
    fontWeight: "600",
  },
});
