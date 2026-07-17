import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, StatusBar } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthStore } from "../../services/authStore";

const { width } = Dimensions.get("window");

export default function AdminDashboardScreen() {
  const { user, logout, isDarkMode, toggleDarkMode } = useAuthStore();

  // Theme setup
  const theme = {
    bg: isDarkMode ? "#121212" : "#EAF2FA",
    card: isDarkMode ? "#1F1F1F" : "#FFFFFF",
    text: isDarkMode ? "#E5E7EB" : "#1E2C4F",
    subtext: isDarkMode ? "#9CA3AF" : "#6B7280",
    border: isDarkMode ? "#374151" : "#E5E7EB",
    headerBg: isDarkMode ? "#1F1F1F" : "#FFFFFF",
    headerText: isDarkMode ? "#FFFFFF" : "#1E2C4F",
    blueTint: isDarkMode ? "#1E293B" : "#EBF3FC",
    purpleTint: isDarkMode ? "#2E1A47" : "#F3E8FF",
    greenTint: isDarkMode ? "#064E3B" : "#ECFDF5",
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const adminActions = [
    {
      id: "clinicians",
      title: "Kelola Tim Spesialis & Klinik",
      desc: "Lihat, tambah, atau perbarui nomor WhatsApp dokter spesialis kebugaran mental.",
      icon: "briefcase-outline" as const,
      color: "#2E5788",
      bgColor: theme.blueTint,
    },
    {
      id: "rules",
      title: "Editor Aturan Pakar (CF)",
      desc: "Modifikasi basis aturan Forward Chaining dan Certainty Factor gejala insomnia & anxiety.",
      icon: "cog-transfer-outline" as const,
      color: "#7C3AED",
      bgColor: theme.purpleTint,
    },
    {
      id: "logs",
      title: "Riwayat & Log Konsultasi Mahasiswa",
      desc: "Pantau seluruh log hasil diagnosis anonim mahasiswa untuk evaluasi tingkat stres kampus.",
      icon: "chart-timeline-variant-shimmer" as const,
      color: "#16A34A",
      bgColor: theme.greenTint,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="spa" size={24} color={isDarkMode ? "#38BDF8" : "#2E5788"} style={styles.headerLogo} />
          <Text style={[styles.headerTitle, { color: theme.headerText }]}>STAY CARE</Text>
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>ADMIN</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.themeBtn} onPress={toggleDarkMode}>
          <MaterialCommunityIcons
            name={isDarkMode ? "weather-sunny" : "weather-night"}
            size={22}
            color={isDarkMode ? "#FFD700" : "#1E2C4F"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeRow}>
          <Text style={[styles.mainTitle, { color: theme.text }]}>Dashboard Admin</Text>
          <Text style={[styles.mainDesc, { color: theme.subtext }]}>
            Selamat datang, {user?.username || "Admin Stay Care"}. Kelola basis pengetahuan sistem pakar dan mitra spesialis di sini.
          </Text>
        </View>

        {/* Stats Grid */}
        <Text style={[styles.sectionHeader, { color: theme.subtext }]}>STATISTIK SISTEM</Text>
        <View style={styles.statsGrid}>
          {/* Active Users */}
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.statNum, { color: isDarkMode ? "#38BDF8" : "#2E5788" }]}>142</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Pengguna Aktif</Text>
          </View>

          {/* Consultations */}
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.statNum, { color: isDarkMode ? "#C084FC" : "#7C3AED" }]}>84</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Total Diagnosis</Text>
          </View>

          {/* Success Rate */}
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.statNum, { color: isDarkMode ? "#34D399" : "#16A34A" }]}>99.2%</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Akurasi Inferensi</Text>
          </View>
        </View>

        {/* Action List */}
        <Text style={[styles.sectionHeader, { color: theme.subtext, marginTop: 14 }]}>MENU ADMINISTRASI</Text>
        <View style={styles.actionList}>
          {adminActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => alert(`Fitur "${action.title}" sedang disiapkan untuk konfigurasi database.`)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: action.bgColor }]}>
                <MaterialCommunityIcons name={action.icon} size={22} color={isDarkMode ? "#38BDF8" : action.color} />
              </View>
              <View style={styles.actionInfo}>
                <Text style={[styles.actionTitle, { color: theme.text }]}>{action.title}</Text>
                <Text style={[styles.actionDesc, { color: theme.subtext }]}>{action.desc}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout CTA */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <MaterialCommunityIcons name="logout" size={18} color="#FFFFFF" style={styles.btnIcon} />
          <Text style={styles.logoutBtnText}>Keluar Admin Panel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 12 : 44,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  adminBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  adminBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  themeBtn: {
    padding: 6,
  },
  welcomeRow: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mainDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "31%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statNum: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
  actionList: {
    marginBottom: 28,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  actionInfo: {
    flex: 1,
    paddingRight: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnIcon: {
    marginRight: 8,
  },
});
