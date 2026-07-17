import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function LoadScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 3D Meditation Illustration Container */}
      <View style={styles.imageCard}>
        <Image 
          source={require("../assets/meditation.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* App Logo & Title */}
      <View style={styles.brandRow}>
        <Image 
          source={require("../assets/logo.png")}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.brandText}>STAY CARE</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Your Mental Health Companion</Text>

      {/* Loading Spinner & Sync Message */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E2C4F" style={styles.spinner} />
        <Text style={styles.syncText}>SYNCING SERENITY</Text>
      </View>

      {/* Bottom Dot Indicators */}
      <View style={styles.dotContainer}>
        <View style={[styles.dot, styles.blueDot]} />
        <View style={[styles.dot, styles.purpleDot]} />
        <View style={[styles.dot, styles.greenDot]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2F1FF", // Light pastel blue
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  imageCard: {
    width: width * 0.75,
    height: width * 0.75,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1E2C4F",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 40,
  },
  illustration: {
    width: "85%",
    height: "85%",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logoIcon: {
    width: 28,
    height: 28,
    tintColor: "#1E2C4F", // Matches logo tint in mockup
    marginRight: 8,
  },
  brandText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E2C4F",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 48,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    transform: [{ scale: 1.2 }],
    marginBottom: 14,
  },
  syncText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5A75A3",
    letterSpacing: 2,
  },
  dotContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  blueDot: {
    backgroundColor: "#3b5998",
  },
  purpleDot: {
    backgroundColor: "#7c5cb7",
  },
  greenDot: {
    backgroundColor: "#427b58",
  },
});
