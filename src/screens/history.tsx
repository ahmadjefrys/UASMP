import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthStore, HistoryItem } from "../services/authStore";

const { width, height } = Dimensions.get("window");

interface ReportDetail {
  kepastian: number;
  summary: string;
  recommendations: string[];
}

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ANXIETY" | "INSOMNIA">("ALL");
  const [selectedReport, setSelectedReport] = useState<HistoryItem | null>(null);

  const { historyLogs, isDarkMode } = useAuthStore();

  const filteredData = historyLogs.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.category === activeFilter;
  });

  // Theme configuration
  const theme = {
    bg: isDarkMode ? "#121212" : "#EAF2FA",
    card: isDarkMode ? "#1F1F1F" : "#FFFFFF",
    text: isDarkMode ? "#E5E7EB" : "#1E2C4F",
    subtext: isDarkMode ? "#9CA3AF" : "#6B7280",
    border: isDarkMode ? "#374151" : "#E5E7EB",
    headerBg: isDarkMode ? "#1F1F1F" : "#FFFFFF",
    headerText: isDarkMode ? "#FFFFFF" : "#1E2C4F",
    sheetBg: isDarkMode ? "#2D2D2D" : "#FFFFFF",
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border }]}>
      <View style={styles.headerLeft}>
        <MaterialCommunityIcons name="spa" size={24} color="#2E5788" style={styles.headerLogo} />
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>STAY CARE</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <MaterialCommunityIcons name="bell-outline" size={22} color={isDarkMode ? "#9CA3AF" : "#1E2C4F"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {renderHeader()}

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.mainTitle, { color: theme.text }]}>Riwayat Konsultasi</Text>

        {/* Filter Pills row */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === "ALL" ? styles.filterPillActive : { borderColor: theme.border }]}
            onPress={() => setActiveFilter("ALL")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === "ALL" && styles.filterPillTextActive, activeFilter !== "ALL" && { color: theme.subtext }]}>
              semua konsultasi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === "ANXIETY" ? styles.filterPillActive : { borderColor: theme.border }]}
            onPress={() => setActiveFilter("ANXIETY")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === "ANXIETY" && styles.filterPillTextActive, activeFilter !== "ANXIETY" && { color: theme.subtext }]}>
              Anxiety
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === "INSOMNIA" ? styles.filterPillActive : { borderColor: theme.border }]}
            onPress={() => setActiveFilter("INSOMNIA")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === "INSOMNIA" && styles.filterPillTextActive, activeFilter !== "INSOMNIA" && { color: theme.subtext }]}>
              insomnia
            </Text>
          </TouchableOpacity>
        </View>

        {/* History Cards List */}
        <View style={styles.cardsList}>
          {filteredData.map((item) => (
            <View key={item.id} style={[styles.historyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.cardDate, { color: theme.subtext }]}>{item.date}</Text>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>

              {/* Tag Badges */}
              <View style={styles.tagsContainer}>
                {item.tags.map((tag, tIdx) => {
                  const isStres = tag.type === "stres";
                  return (
                    <View
                      key={tIdx}
                      style={[
                        styles.tagBadge,
                        isStres ? styles.tagBadgeStres : styles.tagBadgeMakan,
                      ]}
                    >
                      <Text style={[styles.tagBadgeText, isStres ? styles.tagBadgeTextStres : styles.tagBadgeTextMakan]}>
                        {tag.text}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <Text style={[styles.cardDesc, { color: theme.text }]}>{item.description}</Text>

              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => setSelectedReport(item)}
                activeOpacity={0.85}
              >
                <Text style={styles.detailsBtnText}>Lihat Laporan lengkap</Text>
                <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Detailed consultation modal viewer */}
      {selectedReport && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedReport(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalSheet, { backgroundColor: theme.sheetBg }]}>
              {/* Drag line bar */}
              <View style={styles.dragBar} />

              <View style={styles.modalHeader}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={[styles.modalDate, { color: theme.subtext }]}>{selectedReport.date}</Text>
                  <Text style={[styles.modalTitle, { color: theme.text }]} numberOfLines={1}>{selectedReport.title}</Text>
                </View>
                <TouchableOpacity style={[styles.closeBtn, { backgroundColor: isDarkMode ? "#374151" : "#F3F4F6" }]} onPress={() => setSelectedReport(null)}>
                  <MaterialCommunityIcons name="close" size={22} color={isDarkMode ? "#9CA3AF" : "#4B5563"} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {/* CF Score meter */}
                <View style={styles.scoreRow}>
                  <View style={[styles.scoreRing, { borderColor: isDarkMode ? "#38BDF8" : "#2E5788" }]}>
                    <Text style={[styles.scoreValue, { color: isDarkMode ? "#38BDF8" : "#2E5788" }]}>{selectedReport.detail.kepastian}%</Text>
                    <Text style={[styles.scoreSub, { color: isDarkMode ? "#9CA3AF" : "#2E5788" }]}>KEPASTIAN</Text>
                  </View>
                  <View style={styles.scoreExplain}>
                    <Text style={[styles.scoreExplainTitle, { color: theme.text }]}>Hasil Kepastian Algoritma</Text>
                    <Text style={[styles.scoreExplainText, { color: theme.subtext }]}>
                      Tingkat keyakinan forward chaining certainty factor didasarkan pada kombinasi gejala yang Anda laporkan.
                    </Text>
                  </View>
                </View>

                {/* Ringkasan Analisis */}
                <Text style={[styles.modalSectionTitle, { color: theme.text }]}>Ringkasan Analisis Pakar</Text>
                <View style={[styles.summaryBox, { backgroundColor: isDarkMode ? "#374151" : "#F9FAFB" }]}>
                  <Text style={[styles.summaryText, { color: theme.text }]}>{selectedReport.detail.summary}</Text>
                </View>

                {/* Rekomendasi Mandiri */}
                <Text style={[styles.modalSectionTitle, { color: theme.text }]}>Rekomendasi Higiene Diri</Text>
                <View style={styles.recContainer}>
                  {selectedReport.detail.recommendations.map((rec, rIdx) => (
                    <View key={rIdx} style={styles.recItemRow}>
                      <View style={[styles.recDot, { backgroundColor: isDarkMode ? "#1E2C4F" : "#EBF3FC" }]}>
                        <Text style={[styles.recDotText, { color: isDarkMode ? "#34D399" : "#2E5788" }]}>{rIdx + 1}</Text>
                      </View>
                      <Text style={[styles.recItemText, { color: theme.text }]}>{rec}</Text>
                    </View>
                  ))}
                </View>

                {/* Export CTA */}
                <TouchableOpacity
                  style={styles.modalActionBtn}
                  onPress={() => {
                    alert("Laporan berhasil diunduh ke perangkat Anda!");
                    setSelectedReport(null);
                  }}
                >
                  <MaterialCommunityIcons name="download" size={18} color="#FFFFFF" style={styles.downloadIcon} />
                  <Text style={styles.modalActionText}>Unduh Laporan PDF</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
  notificationButton: {
    padding: 4,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  filterPill: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: "transparent",
  },
  filterPillActive: {
    borderColor: "#2E5788",
    backgroundColor: "#F0F7FF",
    borderWidth: 1.5,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: "500",
  },
  filterPillTextActive: {
    color: "#2E5788",
    fontWeight: "bold",
  },
  cardsList: {
    gap: 20,
  },
  historyCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  cardDate: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  tagBadge: {
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  tagBadgeStres: {
    backgroundColor: "#ECFDF5",
    borderColor: "#059669",
  },
  tagBadgeMakan: {
    backgroundColor: "#FFF7ED",
    borderColor: "#F97316",
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  tagBadgeTextStres: {
    color: "#059669",
  },
  tagBadgeTextMakan: {
    color: "#EA580C",
  },
  cardDesc: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 18,
  },
  detailsBtn: {
    flexDirection: "row",
    backgroundColor: "#2E5788",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 6,
  },
  arrowIcon: {
    marginTop: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
    maxHeight: height * 0.85,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 18,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  modalDate: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeBtn: {
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalScroll: {
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  scoreRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#2E5788",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E5788",
  },
  scoreSub: {
    fontSize: 7,
    fontWeight: "800",
    color: "#2E5788",
    marginTop: 2,
  },
  scoreExplain: {
    flex: 1,
  },
  scoreExplainTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  scoreExplainText: {
    fontSize: 11,
    lineHeight: 15,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryBox: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 12,
    lineHeight: 18,
  },
  recContainer: {
    gap: 12,
    marginBottom: 26,
  },
  recItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  recDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EBF3FC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  recDotText: {
    color: "#2E5788",
    fontSize: 9,
    fontWeight: "bold",
  },
  recItemText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  modalActionBtn: {
    backgroundColor: "#2E5788",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E5788",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  modalActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  downloadIcon: {
    marginRight: 8,
  },
});
