import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthStore } from "../services/authStore";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { user, isDarkMode } = useAuthStore();
  const userName = user?.name;

  const [selectedMood, setSelectedMood] = useState<number | null>(2); // Default to Neutral (index 2)

  const moods = [
    { emoji: "😠", label: "Angry" },
    { emoji: "🙁", label: "Sad" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Happy" },
    { emoji: "😀", label: "Joyful" }
  ];

  // Theme configuration
  const theme = {
    bg: isDarkMode ? "#121212" : "#EAF2FA",
    card: isDarkMode ? "#1F1F1F" : "#FFFFFF",
    text: isDarkMode ? "#E5E7EB" : "#1E2C4F",
    subtext: isDarkMode ? "#9CA3AF" : "#6B7280",
    border: isDarkMode ? "#374151" : "#E5E7EB",
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.brandText}>STAY CARE</Text>
        <Text style={[styles.welcomeText, { color: theme.text }]}>
          {userName ? `Hello, ${userName}` : "Hello!"}
        </Text>
        <Text style={[styles.subtitleText, { color: theme.subtext }]}>How are you feeling this morning?</Text>
      </View>

      {/* Quote Card */}
      <View style={[styles.quoteCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <MaterialCommunityIcons name="format-quote-open" size={32} color="#7EA5DE" style={styles.quoteIcon} />
        <Text style={[styles.quoteText, { color: theme.text }]}>
          "The greatest wealth is mental health. Your journey to serenity starts with a single step."
        </Text>
        <Text style={[styles.quoteAuthor, { color: theme.subtext }]}>— Wellness Guide</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {/* Consultations Stat */}
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.statIconCircle, { backgroundColor: "#EBF3FC" }]}>
            <MaterialCommunityIcons name="calendar-month-outline" size={22} color="#2E5788" />
          </View>
          <View style={styles.statInfo}>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Consultations</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>12</Text>
          </View>
          <View style={styles.badgeGreen}>
            <Text style={styles.badgeGreenText}>+2</Text>
          </View>
        </View>

        {/* Minutes Guided Stat */}
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.statIconCircle, { backgroundColor: "#F3E8FF" }]}>
            <MaterialCommunityIcons name="timer-outline" size={22} color="#7C3AED" />
          </View>
          <View style={styles.statInfo}>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Minutes Guided</Text>
            <Text style={[styles.statValue, { color: "#7C3AED" }]}>480</Text>
          </View>
        </View>
      </View>

      {/* Daily Mood Tracker */}
      <View style={[styles.moodTrackerCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Daily Mood Tracker</Text>
        <View style={styles.emojiRow}>
          {moods.map((mood, index) => {
            const isSelected = selectedMood === index;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.emojiContainer, isSelected && styles.emojiContainerActive]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.emojiText}>{mood.emoji}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={[styles.moodSubtitle, { color: theme.subtext }]}>Tap an emoji to tag your mood</Text>
      </View>

      {/* Anxiety Center */}
      <TouchableOpacity style={[styles.moduleCard, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => router.push("/learn")}>
        <View style={[styles.moduleIconCircle, { backgroundColor: "#EBF3FC" }]}>
          <MaterialCommunityIcons name="head-cog-outline" size={22} color="#2E5788" />
        </View>
        <View style={styles.moduleInfo}>
          <Text style={[styles.moduleTitle, { color: theme.text }]}>Anxiety Center</Text>
          <Text style={[styles.moduleDesc, { color: theme.subtext }]}>Understand triggers and practice calming techniques.</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Sleep Hygiene */}
      <TouchableOpacity style={[styles.moduleCard, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => router.push("/learn")}>
        <View style={[styles.moduleIconCircle, { backgroundColor: "#F3E8FF" }]}>
          <MaterialCommunityIcons name="weather-night" size={22} color="#7C3AED" />
        </View>
        <View style={styles.moduleInfo}>
          <Text style={[styles.moduleTitle, { color: theme.text }]}>Sleep Hygiene</Text>
          <Text style={[styles.moduleDesc, { color: theme.subtext }]}>Tools and routines for a restful night's sleep.</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Confidential Diagnosis CTA Banner */}
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop" }}
        style={styles.diagnosisBanner}
        imageStyle={{ borderRadius: 20 }}
      >
        {/* Dark overlay for text readability */}
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Confidential Diagnosis</Text>
          <Text style={styles.bannerDesc}>
            Our AI-assisted assessment helps you understand your current mental state in under 5 minutes.
          </Text>
          <TouchableOpacity style={styles.assessmentButton} onPress={() => router.push("/diagnosis")}>
            <Text style={styles.assessmentButtonText}>Start Assessment</Text>
            <MaterialCommunityIcons name="arrow-right" size={14} color="#1E2C4F" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  brandText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E5788",
    letterSpacing: 1,
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: "500",
  },
  quoteCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  quoteIcon: {
    marginBottom: 6,
  },
  quoteText: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    marginBottom: 20,
  },
  statCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  badgeGreen: {
    backgroundColor: "#EBFDF5",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  badgeGreenText: {
    color: "#10B981",
    fontSize: 10,
    fontWeight: "bold",
  },
  moodTrackerCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 14,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  emojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiContainerActive: {
    backgroundColor: "#BAD3F8",
    borderWidth: 2,
    borderColor: "#2E5788",
  },
  emojiText: {
    fontSize: 20,
  },
  moodSubtitle: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "500",
  },
  moduleCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  moduleIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  moduleInfo: {
    flex: 1,
    paddingRight: 8,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 3,
  },
  moduleDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  diagnosisBanner: {
    width: "100%",
    height: 180,
    marginTop: 8,
    marginBottom: 20,
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(30, 44, 79, 0.7)", // Dark opacity overlay for readability
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  bannerDesc: {
    fontSize: 11,
    color: "#E2F1FF",
    lineHeight: 16,
    marginBottom: 16,
    paddingRight: 10,
  },
  assessmentButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  assessmentButtonText: {
    color: "#1E2C4F",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 6,
  },
});