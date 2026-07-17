import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Dimensions, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useAuthStore } from "../services/authStore";

const { width, height } = Dimensions.get("window");

interface ArticleItem {
  id: string;
  title: string;
  image: string;
  category: "ANXIETY" | "INSOMNIA";
  readTime: string;
  summary: string;
  content: string;
}

export default function LearnScreen() {
  const params = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ANXIETY" | "INSOMNIA">("ALL");
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const { isDarkMode } = useAuthStore();

  const articlesData: ArticleItem[] = [
    {
      id: "anxiety_college",
      title: "Mengatasi Kecemasan Kuliah",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop",
      category: "ANXIETY",
      readTime: "5 menit",
      summary: "Kecemasan akademik adalah hal yang umum di kalangan mahasiswa. Temukan strategi jitu untuk mengatasinya.",
      content: "Kehidupan perkuliahan membawa banyak perubahan besar, mulai dari tugas akademik yang menumpuk, ujian, hingga adaptasi lingkungan sosial baru. Tidak heran jika banyak mahasiswa merasakan kecemasan berlebih (Academic Anxiety).\n\nGejala kecemasan kuliah sering kali meliputi detak jantung cepat, sulit berkonsentrasi, khawatir berlebih tentang masa depan, hingga gangguan tidur.\n\nBerikut adalah tips praktis untuk meredakannya:\n\n1. Atur Waktu dengan Skala Prioritas\nBuat daftar tugas harian menggunakan metode matriks Eisenhower (Penting-Mendesak). Selesaikan satu demi satu untuk menghindari rasa kewalahan.\n\n2. Terapkan Teknik Pernapasan Box Breathing\nHirup napas dalam 4 detik, tahan 4 detik, embuskan 4 detik, dan tahan 4 detik. Ulangi 5 kali untuk menenangkan sistem saraf.\n\n3. Jangan Ragu Bercerita\nBicarakan tekanan Anda dengan teman terpercaya atau gunakan layanan konseling mahasiswa di kampus Anda.",
    },
    {
      id: "journaling",
      title: "Kekuatan Menulis Jurnal",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
      category: "ANXIETY",
      readTime: "4 menit",
      summary: "Bagaimana meluangkan waktu 10 menit untuk jurnal ekspresif dapat meredakan stres harian Anda.",
      content: "Menulis jurnal ekspresif adalah salah satu terapi mandiri yang paling terbukti secara ilmiah untuk meredakan ketegangan mental dan stres akademik.\n\nDengan menuliskan kecemasan, pikiran negatif, dan beban harian Anda di atas kertas tanpa filter, Anda memproses emosi tersebut keluar dari otak Anda.\n\nCara memulai journaling yang efektif:\n\n1. Atur Waktu Rutin\nSediakan waktu 10 menit sebelum tidur atau setelah bangun pagi untuk menulis tanpa gangguan.\n\n2. Tulis Tanpa Filter\nJangan khawatir tentang tata bahasa atau ejaan. Fokuslah menumpahkan segala emosi, kekhawatiran, dan hal yang Anda syukuri.\n\n3. Lakukan Refleksi\nSetelah menulis, tarik napas dalam-dalam dan sadari bahwa Anda telah melepaskan beban pikiran tersebut ke atas kertas.",
    },
    {
      id: "screen_time",
      title: "Higiene Tidur & Gadget",
      image: "https://images.unsplash.com/photo-1511295742364-92b9345f6852?q=80&w=600&auto=format&fit=crop",
      category: "INSOMNIA",
      readTime: "6 menit",
      summary: "Bahaya paparan cahaya biru gadget di malam hari bagi produksi hormon melatonin Anda.",
      content: "Apakah Anda sering kesulitan tidur setelah bermain ponsel di kasur? Paparan cahaya biru (blue light) dari layar gadget adalah musuh utama kualitas tidur Anda.\n\nCahaya biru menekan produksi hormon melatonin—hormon alami yang memberi sinyal pada tubuh Anda untuk beristirahat. Akibatnya, jam biologis tubuh terganggu dan memicu insomnia.\n\nBerikut langkah-langkah detoks gadget untuk tidur lebih nyenyak:\n\n1. Matikan Layar 1 Jam Sebelum Tidur\nBuat aturan bebas gadget minimal 60 menit sebelum Anda memejamkan mata.\n\n2. Pindahkan Ponsel dari Kasur\nLetakkan pengisi daya ponsel di seberang ruangan agar Anda tidak tergoda untuk memeriksanya di malam hari.\n\n3. Ganti dengan Buku Fisik\nJika Anda membutuhkan stimulasi ringan sebelum tidur, pilihlah membaca buku fisik atau mendengarkan musik meditasi instrumen.",
    },
    {
      id: "circadian_rhythm",
      title: "Mengatur Jam Biologis",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
      category: "INSOMNIA",
      readTime: "5 menit",
      summary: "Mengapa konsistensi jam bangun dan tidur sangat menentukan kebugaran fisik dan mental Anda.",
      content: "Jam biologis tubuh kita, atau ritme sirkadian, bekerja layaknya jam otomatis dalam sel tubuh Anda. Ritme ini mengatur siklus tidur-bangun, pencernaan, hingga suhu tubuh Anda.\n\nJika jam tidur Anda berubah-ubah setiap hari, ritme sirkadian akan kacau, menyebabkan kelelahan kronis dan penurunan fokus.\n\nTips menjaga jam biologis tubuh tetap prima:\n\n1. Pertahankan Jam Bangun yang Sama\nUsahakan untuk selalu bangun pada jam yang sama setiap hari, bahkan pada akhir pekan atau hari libur.\n\n2. Dapatkan Paparan Sinar Matahari Pagi\nSinar matahari pagi membantu menyetel ulang jam biologis Anda dan merangsang produksi hormon serotonin.\n\n3. Hindari Kafein di Sore Hari\nBatasi konsumsi kopi atau minuman berkafein lainnya setelah jam 14.00 siang agar tidak mengganggu sinyal tidur alami tubuh.",
    },
  ];

  // Monitor parameter changes securely
  const targetArticleId = params?.articleId;
  useEffect(() => {
    if (targetArticleId) {
      const matched = articlesData.find((art) => art.id === targetArticleId);
      if (matched) {
        setSelectedArticle(matched);
      }
    }
  }, [targetArticleId]);

  const filteredData = articlesData.filter((item) => {
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
        <Text style={[styles.mainTitle, { color: theme.text }]}>Edukasi Kesehatan</Text>
        <Text style={[styles.mainDesc, { color: theme.subtext }]}>
          Pelajari berbagai tips praktis dan informasi berbasis ilmiah untuk mengelola kecemasan dan memperbaiki pola tidur Anda.
        </Text>

        {/* Filter Pills row */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === "ALL" ? styles.filterPillActive : { borderColor: theme.border }]}
            onPress={() => setActiveFilter("ALL")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === "ALL" && styles.filterPillTextActive, activeFilter !== "ALL" && { color: theme.subtext }]}>
              semua artikel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === "ANXIETY" ? styles.filterPillActive : { borderColor: theme.border }]}
            onPress={() => setActiveFilter("ANXIETY")}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === "ANXIETY" && styles.filterPillTextActive, activeFilter !== "ANXIETY" && { color: theme.subtext }]}>
              anxiety
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

        {/* Articles List */}
        <View style={styles.articlesList}>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.articleCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => setSelectedArticle(item)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.articleImage} resizeMode="cover" />
              <View style={styles.articleCardContent}>
                <View style={styles.metaRow}>
                  <Text style={[styles.categoryTag, item.category === "ANXIETY" ? styles.tagAnxiety : styles.tagInsomnia]}>
                    {item.category === "ANXIETY" ? "Anxiety" : "Insomnia"}
                  </Text>
                  <Text style={styles.readTimeText}>{item.readTime}</Text>
                </View>
                <Text style={[styles.articleTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.articleSummary, { color: theme.subtext }]} numberOfLines={2}>
                  {item.summary}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Reader Modal Overlay */}
      {selectedArticle && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedArticle(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalSheet, { backgroundColor: theme.sheetBg }]}>
              {/* Drag line indicator */}
              <View style={styles.dragBar} />

              <View style={styles.modalHeader}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.modalMeta}>
                    {selectedArticle.category === "ANXIETY" ? "Anxiety" : "Insomnia"} • {selectedArticle.readTime}
                  </Text>
                  <Text style={[styles.modalTitle, { color: theme.text }]} numberOfLines={1}>{selectedArticle.title}</Text>
                </View>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedArticle(null)}>
                  <MaterialCommunityIcons name="close" size={22} color={isDarkMode ? "#9CA3AF" : "#4B5563"} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <Image source={{ uri: selectedArticle.image }} style={styles.modalImage} resizeMode="cover" />
                <Text style={[styles.modalContentText, { color: theme.text }]}>{selectedArticle.content}</Text>
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
    marginBottom: 6,
  },
  mainDesc: {
    fontSize: 13,
    lineHeight: 18,
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
  articlesList: {
    gap: 20,
  },
  articleCard: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  articleImage: {
    width: "100%",
    height: 150,
  },
  articleCardContent: {
    padding: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryTag: {
    fontSize: 9,
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  tagAnxiety: {
    backgroundColor: "#EBF3FC",
    color: "#2E5788",
  },
  tagInsomnia: {
    backgroundColor: "#F3E8FF",
    color: "#7C3AED",
  },
  readTimeText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  articleSummary: {
    fontSize: 11,
    lineHeight: 16,
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
  modalMeta: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#9CA3AF",
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
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    marginBottom: 16,
  },
  modalContentText: {
    fontSize: 12,
    lineHeight: 20,
  },
});
