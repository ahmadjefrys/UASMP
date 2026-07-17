import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Linking, Image, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../services/authStore";

const { width } = Dimensions.get("window");

type CategoryType = "ANXIETY" | "INSOMNIA";
type StepType = "INPUT" | "PROCESSING" | "RESULT";

interface Symptom {
  id: string;
  text: string;
  checked: boolean;
}

export default function DiagnosisScreen() {
  const router = useRouter();
  const { addHistoryLog, isDarkMode } = useAuthStore();

  const styles: any = {};
  for (const key in staticStyles) {
    styles[key] = (staticStyles as any)[key];
  }

  Object.assign(styles, {
    container: [staticStyles.container, { backgroundColor: isDarkMode ? "#121212" : "#EAF2FA" }],
    scrollContainer: [staticStyles.scrollContainer, { backgroundColor: isDarkMode ? "#121212" : "#EAF2FA" }],
    header: [staticStyles.header, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderBottomColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    headerTitle: [staticStyles.headerTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    mainTitle: [staticStyles.mainTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    mainDesc: [staticStyles.mainDesc, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    sectionHeader: [staticStyles.sectionHeader, { color: isDarkMode ? "#E5E7EB" : "#1E2C4F" }],
    categoryCard: [staticStyles.categoryCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    categoryCardActive: [staticStyles.categoryCardActive, { backgroundColor: isDarkMode ? "#1E2C4F" : "#F3F7FD", borderColor: isDarkMode ? "#38BDF8" : "#2E5788" }],
    categoryTitle: [staticStyles.categoryTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    categorySubtitle: [staticStyles.categorySubtitle, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    importantNoteBox: [staticStyles.importantNoteBox, { backgroundColor: isDarkMode ? "#1F1F1F" : "#EBF3FC", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    noteTitle: [staticStyles.noteTitle, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    noteText: [staticStyles.noteText, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    symptomRowCard: [staticStyles.symptomRowCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    symptomRowCardChecked: [staticStyles.symptomRowCardChecked, { backgroundColor: isDarkMode ? "#1E2C4F" : "#F0F7FF", borderColor: isDarkMode ? "#38BDF8" : "#BAD3F8" }],
    symptomRowText: [staticStyles.symptomRowText, { color: isDarkMode ? "#E5E7EB" : "#374151" }],
    confidenceCard: [staticStyles.confidenceCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    confidenceTitle: [staticStyles.confidenceTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    sliderLabel: [staticStyles.sliderLabel, { color: isDarkMode ? "#9CA3AF" : "#4B5563" }],
    sliderLabelSub: [staticStyles.sliderLabelSub, { color: isDarkMode ? "#9CA3AF" : "#9CA3AF" }],
    sliderLabelActive: [staticStyles.sliderLabelActive, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    sliderLabelSubActive: [staticStyles.sliderLabelSubActive, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    sliderNodeActive: [staticStyles.sliderNodeActive, { backgroundColor: isDarkMode ? "#38BDF8" : "#2E5788", borderColor: isDarkMode ? "#1E2C4F" : "#EBF3FC" }],
    secondaryButton: [staticStyles.secondaryButton, { backgroundColor: isDarkMode ? "#1F1F1F" : "#E2F1FF", borderColor: isDarkMode ? "#374151" : "#BAD3F8" }],
    secondaryButtonText: [staticStyles.secondaryButtonText, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    boldText: [staticStyles.boldText, { color: isDarkMode ? "#38BDF8" : "#1E2C4F" }],
    boldRule: [staticStyles.boldRule, { color: isDarkMode ? "#38BDF8" : "#1E2C4F" }],
    ruleName: [staticStyles.ruleName, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    factLabel: [staticStyles.factLabel, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    sectionSubtitle: [staticStyles.sectionSubtitle, { color: isDarkMode ? "#FFFFFF" : "#4B5563" }],
    mathStepText: [staticStyles.mathStepText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    finalCfLabel: [staticStyles.finalCfLabel, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    processingCard: [staticStyles.processingCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    resultLabelName: [staticStyles.resultLabelName, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    topSummaryCard: [staticStyles.topSummaryCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    summaryTitle: [staticStyles.summaryTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    summaryDesc: [staticStyles.summaryDesc, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    kepastianCard: [staticStyles.kepastianCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    kepastianSubtext: [staticStyles.kepastianSubtext, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    explanationCard: [staticStyles.explanationCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    explanationHeaderTitle: [staticStyles.explanationHeaderTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    explanationBody: [staticStyles.explanationBody, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    observationHeader: [staticStyles.observationHeader, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    observationText: [staticStyles.observationText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    resultSectionHeader: [staticStyles.resultSectionHeader, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    selfCareCard: [staticStyles.selfCareCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    selfCareTitle: [staticStyles.selfCareTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    selfCareSubtitle: [staticStyles.selfCareSubtitle, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    emergencySupportCard: [staticStyles.emergencySupportCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    emergencyTitle: [staticStyles.emergencyTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    emergencyDesc: [staticStyles.emergencyDesc, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    emergencyContactBtn: [staticStyles.emergencyContactBtn, { backgroundColor: isDarkMode ? "#1E2C4F" : "#2E5788", borderWidth: isDarkMode ? 1.2 : 0, borderColor: isDarkMode ? "#38BDF8" : "transparent" }],
    emergencyContactBtnText: [staticStyles.emergencyContactBtnText, { color: isDarkMode ? "#38BDF8" : "#FFFFFF" }],
    eduSectionTitle: [staticStyles.eduSectionTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    eduSectionDesc: [staticStyles.eduSectionDesc, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    eduLinkText: [staticStyles.eduLinkText, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    articleCard: [staticStyles.articleCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    articleTitle: [staticStyles.articleTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    articleMeta: [staticStyles.articleMeta, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    factRow: [staticStyles.factRow, { borderBottomColor: isDarkMode ? "#374151" : "#EBF3FC" }],
    factName: [staticStyles.factName, { color: isDarkMode ? "#E5E7EB" : "#374151" }],
    factCf: [staticStyles.factCf, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    fadedText: [staticStyles.fadedText, { color: isDarkMode ? "#6B7280" : "#9CA3AF" }],
    graphLabel: [staticStyles.graphLabel, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    glassLabelBanner: [staticStyles.glassLabelBanner, { backgroundColor: isDarkMode ? "#374151" : "#F3F4F6" }],
    glassLabelText: [staticStyles.glassLabelText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    ruleBlockItem: [staticStyles.ruleBlockItem, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#BAD3F8" }],
    ruleHeaderName: [staticStyles.ruleHeaderName, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    ruleBodyContent: [staticStyles.ruleBodyContent, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    completedBadge: [staticStyles.completedBadge, { backgroundColor: isDarkMode ? "#1E2C4F" : "#ECFDF5" }],
    completedBadgeText: [staticStyles.completedBadgeText, { color: isDarkMode ? "#34D399" : "#059669" }],
    kepastianRing: [staticStyles.kepastianRing, { borderColor: isDarkMode ? "#38BDF8" : "#2E5788" }],
    kepastianRingValue: [staticStyles.kepastianRingValue, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    kepastianRingLabel: [staticStyles.kepastianRingLabel, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    backToStartText: [staticStyles.backToStartText, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    cfRingOuter: [staticStyles.cfRingOuter, { borderColor: isDarkMode ? "#38BDF8" : "#2E5788", backgroundColor: isDarkMode ? "#1E2C4F" : "#F0F7FF" }],
    cfRingVal: [staticStyles.cfRingVal, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    cfRingSub: [staticStyles.cfRingSub, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    cfStepTitle: [staticStyles.cfStepTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    cfStepText: [staticStyles.cfStepText, { color: isDarkMode ? "#9CA3AF" : "#4B5563" }],
    expertOpinionBox: [staticStyles.expertOpinionBox, { backgroundColor: isDarkMode ? "#1E2C4F" : "#EBF3FC", borderColor: isDarkMode ? "#374151" : "#BAD3F8" }],
    expertTitleText: [staticStyles.expertTitleText, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    expertBodyContent: [staticStyles.expertBodyContent, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    boldTextUnderline: [staticStyles.boldTextUnderline, { color: isDarkMode ? "#38BDF8" : "#1E2C4F" }],
    resultMeterContainer: [staticStyles.resultMeterContainer, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    resultMeterWheel: [staticStyles.resultMeterWheel, { borderColor: isDarkMode ? "#38BDF8" : "#2E5788", backgroundColor: isDarkMode ? "#1E2C4F" : "#F3F7FD" }],
    resultMeterValue: [staticStyles.resultMeterValue, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    resultMeterLabel: [staticStyles.resultMeterLabel, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    resultMeterSub: [staticStyles.resultMeterSub, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    resultDiagnosisName: [staticStyles.resultDiagnosisName, { color: isDarkMode ? "#C084FC" : "#7C3AED" }],
    resultBlock: [staticStyles.resultBlock, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    blockHeaderTitle: [staticStyles.blockHeaderTitle, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    blockBodyText: [staticStyles.blockBodyText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    warningAlertBox: [staticStyles.warningAlertBox, { backgroundColor: isDarkMode ? "#1E2C4F" : "#EEF2FF" }],
    warningAlertText: [staticStyles.warningAlertText, { color: isDarkMode ? "#818CF8" : "#3730A3" }],
    obsRow: [staticStyles.obsRow, { borderBottomColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    obsText: [staticStyles.obsText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    recommendationCard: [staticStyles.recommendationCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    recRow: [staticStyles.recRow, { borderBottomColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    recNumber: [staticStyles.recNumber, { backgroundColor: isDarkMode ? "#064E3B" : "#D1FAE5" }],
    recNumberText: [staticStyles.recNumberText, { color: isDarkMode ? "#34D399" : "#065F46" }],
    recText: [staticStyles.recText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
    specialistCard: [staticStyles.specialistCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#BAD3F8" }],
    specialistIconCircle: [staticStyles.specialistIconCircle, { backgroundColor: isDarkMode ? "#1E293B" : "#EBF3FC" }],
    specialistTitle: [staticStyles.specialistTitle, { color: isDarkMode ? "#FFFFFF" : "#2E5788" }],
    specialistDesc: [staticStyles.specialistDesc, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    doctorContactButton: [staticStyles.doctorContactButton, { backgroundColor: isDarkMode ? "#2E5788" : "#2E5788" }],
    doctorContactButtonText: [staticStyles.doctorContactButtonText, { color: isDarkMode ? "#FFFFFF" : "#FFFFFF" }],
    header: [staticStyles.header, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderBottomColor: isDarkMode ? "#374151" : "#E5E7EB" }],
    headerTitle: [staticStyles.headerTitle, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    shareReportBtn: [staticStyles.shareReportBtn, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF", borderColor: isDarkMode ? "#38BDF8" : "#2E5788" }],
    shareReportBtnText: [staticStyles.shareReportBtnText, { color: isDarkMode ? "#38BDF8" : "#2E5788" }],
    kepastianCard: [staticStyles.kepastianCard, { backgroundColor: isDarkMode ? "#1F1F1F" : "#FFFFFF" }],
    kepastianSubtext: [staticStyles.kepastianSubtext, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }],
    observationsContainer: [staticStyles.observationsContainer, { backgroundColor: isDarkMode ? "#1E2C4F" : "#F9FAFB" }],
    observationHeader: [staticStyles.observationHeader, { color: isDarkMode ? "#FFFFFF" : "#1E2C4F" }],
    observationText: [staticStyles.observationText, { color: isDarkMode ? "#E5E7EB" : "#4B5563" }],
  });

  const [category, setCategory] = useState<CategoryType>("ANXIETY");
  const [step, setStep] = useState<StepType>("INPUT");
  const [confidence, setConfidence] = useState<number>(1); // 0: Tidak Yakin, 1: Cukup Yakin, 2: Sangat Yakin

  const getFormattedDate = () => {
    const today = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  };

  const handleSaveResult = () => {
    const isAnxiety = category === "ANXIETY";
    const dateStr = getFormattedDate();
    const newLog = {
      id: String(Date.now()),
      date: dateStr,
      title: isAnxiety ? "Penilaian Anxiety" : "Penilaian Insomnia",
      category: category as "ANXIETY" | "INSOMNIA",
      tags: [
        { text: "stres", type: "stres" as const },
        { text: isAnxiety ? "khawatir" : "kurang tidur", type: "kurang_makan" as const },
      ],
      description: isAnxiety
        ? "Jawaban Anda menunjukkan bahwa Anda sedang mengalami tingkat kecemasan sedang. Latihan pernapasan teratur dapat membantu menenangkan sistem saraf Anda."
        : "Jawaban Anda menunjukkan bahwa Anda sedang mengalami tingkat insomnia ringan. Mengatur rutinitas tidur yang konsisten akan membantu memperbaiki sirkulasi biologis.",
      detail: {
        kepastian: isAnxiety ? 82 : 74,
        summary: isAnxiety
          ? "Tingkat kecemasan sedang terdeteksi. Beberapa gejala fisik seperti ketegangan otot dan kekhawatiran berlebih mengindikasikan perlunya intervensi manajemen stres yang lebih intensif."
          : "Insomnia ringan terdeteksi. Kualitas tidur Anda yang kurang optimal kemungkinan dipicu oleh paparan cahaya biru di malam hari dan kecemasan akademik.",
        recommendations: isAnxiety
          ? [
              "Lakukan pernapasan mindfulness 4-7-8 secara rutin dua kali sehari.",
              "Matikan semua layar perangkat elektronik minimal 1 jam sebelum tidur.",
              "Sempatkan aktivitas fisik ringan seperti berjalan kaki selama 15 menit.",
            ]
          : [
              "Pertahankan jadwal bangun tidur yang konsisten setiap harinya.",
              "Ciptakan lingkungan kamar yang sejuk, sunyi, dan gelap gulita.",
              "Hindari konsumsi kafein atau makanan berat di sore dan malam hari.",
            ],
      },
    };

    addHistoryLog(newLog);
    alert("Diagnosis berhasil disimpan ke riwayat konsultasi Anda!");
    router.push("/history");
  };

  // Anxiety symptoms list
  const [anxietySymptoms, setAnxietySymptoms] = useState<Symptom[]>([
    { id: "a1", text: "Jantung berdebar kencang", checked: false },
    { id: "a2", text: "Sulit untuk berkonsentrasi", checked: true },
    { id: "a3", text: "Merasa tegang atau gelisah", checked: false },
    { id: "a4", text: "Kekhawatiran yang sulit dikontrol", checked: false },
    { id: "a5", text: "Gemetar atau berkeringat", checked: true },
    { id: "a6", text: "Sering merasa lelah", checked: true },
  ]);

  // Insomnia symptoms list
  const [insomniaSymptoms, setInsomniaSymptoms] = useState<Symptom[]>([
    { id: "i1", text: "Kesulitan memulai tidur (Sleep Onset)", checked: true },
    { id: "i2", text: "Sering terbangun di malam hari", checked: true },
    { id: "i3", text: "Bangun terlalu pagi dan sulit tidur kembali", checked: false },
    { id: "i4", text: "Merasa lelah saat bangun tidur", checked: false },
    { id: "i5", text: "Mengantuk berlebihan di siang hari", checked: false },
    { id: "i6", text: "Kualitas tidur terasa buruk", checked: true },
  ]);

  const toggleSymptom = (id: string) => {
    if (category === "ANXIETY") {
      setAnxietySymptoms(
        anxietySymptoms.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
      );
    } else {
      setInsomniaSymptoms(
        insomniaSymptoms.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
      );
    }
  };

  const handleContactDoctor = (type: "ANXIETY" | "INSOMNIA") => {
    const phoneNumber = "6281234567890";
    const diagnosisName = type === "ANXIETY" ? "Anxiety Sedang" : "Insomnia Ringan";
    const message = `Halo Dr. Aulia, saya Ziza. Saya ingin berkonsultasi mengenai hasil diagnosis Stay Care saya yang menunjukkan tingkat ${diagnosisName}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          alert("WhatsApp is not installed on your device.");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <MaterialCommunityIcons name="spa" size={24} color={isDarkMode ? "#38BDF8" : "#2E5788"} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>STAY CARE</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <MaterialCommunityIcons name="bell-outline" size={22} color={isDarkMode ? "#E5E7EB" : "#1E2C4F"} />
      </TouchableOpacity>
    </View>
  );

  // STEP 1: Symptom picker
  const renderInputScreen = () => {
    const activeSymptoms = category === "ANXIETY" ? anxietySymptoms : insomniaSymptoms;

    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Diagnosis Kesehatan Mental</Text>
        <Text style={styles.mainDesc}>
          Mari mulai dengan memahami kondisi Anda saat ini. Jawaban yang jujur akan membantu kami memberikan rekomendasi yang tepat.
        </Text>

        {/* Kategori Utama */}
        <Text style={styles.sectionHeader}>Kategori Utama</Text>
        <View style={styles.categoryContainer}>
          {/* Anxiety Option */}
          <TouchableOpacity
            style={[styles.categoryCard, category === "ANXIETY" && styles.categoryCardActive]}
            onPress={() => setCategory("ANXIETY")}
            activeOpacity={0.8}
          >
            <View style={[styles.categoryIconCircle, { backgroundColor: isDarkMode ? "#1E293B" : "#EBF3FC" }]}>
              <MaterialCommunityIcons name="head-cog-outline" size={22} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>Anxiety</Text>
              <Text style={styles.categorySubtitle}>Kecemasan berlebih</Text>
            </View>
          </TouchableOpacity>

          {/* Insomnia Option */}
          <TouchableOpacity
            style={[styles.categoryCard, category === "INSOMNIA" && styles.categoryCardActive]}
            onPress={() => setCategory("INSOMNIA")}
            activeOpacity={0.8}
          >
            <View style={[styles.categoryIconCircle, { backgroundColor: isDarkMode ? "#2E1A47" : "#F3E8FF" }]}>
              <MaterialCommunityIcons name="weather-night" size={22} color={isDarkMode ? "#C084FC" : "#7C3AED"} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>Insomnia</Text>
              <Text style={styles.categorySubtitle}>Gangguan tidur</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Catatan Penting Banner */}
        <View style={styles.importantNoteBox}>
          <MaterialCommunityIcons name="information-outline" size={18} color={isDarkMode ? "#38BDF8" : "#2E5788"} style={styles.noteIcon} />
          <View style={styles.noteTextWrapper}>
            <Text style={styles.noteTitle}>Catatan Penting</Text>
            <Text style={styles.noteText}>
              Diagnosis ini bersifat awal dan bukan pengganti saran medis profesional. Jika Anda dalam keadaan darurat, segera hubungi layanan kesehatan terdekat.
            </Text>
          </View>
        </View>

        {/* Symptom Checklist */}
        <Text style={styles.sectionHeader}>Pilih Gejala yang Dirasakan</Text>
        <View style={styles.symptomsList}>
          {activeSymptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom.id}
              style={[styles.symptomRowCard, symptom.checked && styles.symptomRowCardChecked]}
              onPress={() => toggleSymptom(symptom.id)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={symptom.checked ? "checkbox-marked" : "checkbox-blank-outline"}
                size={22}
                color={symptom.checked ? (isDarkMode ? "#38BDF8" : "#2E5788") : "#9CA3AF"}
                style={styles.checkboxIcon}
              />
              <Text style={styles.symptomRowText}>{symptom.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confidence scale slider */}
        <View style={styles.confidenceCard}>
          <Text style={styles.confidenceTitle}>Seberapa yakin Anda dengan gejala ini?</Text>

          <View style={styles.sliderTrackWrapper}>
            <View style={[styles.sliderLine, { backgroundColor: "#E5E7EB" }]} />
            {/* Dynamic fill line */}
            <View style={[styles.sliderLineFill, { width: confidence === 0 ? "0%" : confidence === 1 ? "50%" : "100%" }]} />
            <View style={styles.nodesRow}>
              {[0, 1, 2].map((idx) => {
                const isActive = confidence === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.sliderNode, isActive && styles.sliderNodeActive]}
                    onPress={() => setConfidence(idx)}
                  />
                );
              })}
            </View>
          </View>

          {/* Slider labels */}
          <View style={styles.labelsRow}>
            <TouchableOpacity onPress={() => setConfidence(0)} style={styles.sliderLabelBtn}>
              <Text style={[styles.sliderLabel, confidence === 0 && styles.sliderLabelActive]}>Tidak Yakin</Text>
              <Text style={[styles.sliderLabelSub, confidence === 0 && styles.sliderLabelSubActive]}>0%</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setConfidence(1)} style={styles.sliderLabelBtn}>
              <Text style={[styles.sliderLabel, confidence === 1 && styles.sliderLabelActive]}>Cukup Yakin</Text>
              <Text style={[styles.sliderLabelSub, confidence === 1 && styles.sliderLabelSubActive]}>50%</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setConfidence(2)} style={styles.sliderLabelBtn}>
              <Text style={[styles.sliderLabel, confidence === 2 && styles.sliderLabelActive]}>Sangat Yakin</Text>
              <Text style={[styles.sliderLabelSub, confidence === 2 && styles.sliderLabelSubActive]}>100%</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Button CTAs */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => setStep("PROCESSING")}>
          <Text style={styles.primaryButtonText}>Mulai Diagnosis</Text>
          <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => alert("Draft diagnosis disimpan!")}>
          <Text style={styles.secondaryButtonText}>Simpan Draft</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // STEP 2: Inference matching screen
  const renderProcessingScreen = () => {
    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Text style={styles.mainTitle}>Mesin Inferensi</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Pemrosesan Langsung</Text>
          </View>
        </View>
        <Text style={styles.mainDesc}>
          Proses Forward Chaining sedang berlangsung. Mengevaluasi input mahasiswa untuk mencocokkan protokol klinis dan menentukan faktor kepastian.
        </Text>

        {/* Memori Kerja */}
        <Text style={styles.sectionHeader}>MEMORI KERJA</Text>
        <View style={styles.processingCard}>
          {category === "ANXIETY" ? (
            <>
              <View style={styles.factRow}>
                <View style={styles.factLeft}>
                  <Text style={styles.factName}>sulit untuk berkonsentrasi</Text>
                  <Text style={styles.factCf}>CF: 0.85</Text>
                </View>
                <MaterialCommunityIcons name="brain" size={20} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
              </View>
              <View style={styles.factRow}>
                <View style={styles.factLeft}>
                  <Text style={styles.factName}>Gemetar atau berkeringat</Text>
                  <Text style={styles.factCf}>CF: 0.70</Text>
                </View>
                <MaterialCommunityIcons name="pulse" size={20} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
              </View>
              <View style={styles.factRow}>
                <View style={styles.factLeft}>
                  <Text style={styles.factName}>sering merasa lelah</Text>
                  <Text style={styles.factCf}>CF: 0.60</Text>
                </View>
                <MaterialCommunityIcons name="account" size={20} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.factRow}>
                <View style={styles.factLeft}>
                  <Text style={styles.factName}>Kesulitan memulai tidur</Text>
                  <Text style={styles.factCf}>CF: 0.85</Text>
                </View>
                <MaterialCommunityIcons name="weather-night" size={20} color={isDarkMode ? "#C084FC" : "#7C3AED"} />
              </View>
              <View style={styles.factRow}>
                <View style={styles.factLeft}>
                  <Text style={styles.factName}>Sering terbangun di malam hari</Text>
                  <Text style={styles.factCf}>CF: 0.70</Text>
                </View>
                <MaterialCommunityIcons name="alarm-off" size={20} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
              </View>
              <View style={styles.factRow}>
                <View style={styles.factLeft}>
                  <Text style={styles.factName}>Kualitas tidur terasa buruk</Text>
                  <Text style={styles.factCf}>CF: 0.60</Text>
                </View>
                <MaterialCommunityIcons name="cloud-outline" size={20} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
              </View>
            </>
          )}
          <Text style={styles.fadedText}>Menunggu Input Selanjutnya...</Text>
        </View>

        {/* Grafik Inferensi */}
        <Text style={styles.sectionHeader}>GRAFIK INFERENSI</Text>
        <View style={styles.processingCard}>
          <View style={styles.graphContainer}>
            <View style={styles.graphNodeWrapper}>
              <View style={[styles.graphCircle, { backgroundColor: isDarkMode ? "#1E293B" : "#D1E2F5" }]}>
                <MaterialCommunityIcons name="code-brackets" size={18} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
              </View>
              <Text style={styles.graphLabel}>Fakta</Text>
            </View>
            <View style={styles.graphLine} />
            <View style={styles.graphNodeWrapper}>
              <View style={[styles.graphCircle, { backgroundColor: isDarkMode ? "#2E1A47" : "#EBF3FC", borderWidth: 1.5, borderColor: "#7C3AED" }]}>
                <MaterialCommunityIcons name="cog-outline" size={18} color="#7C3AED" />
              </View>
              <Text style={[styles.graphLabel, { color: "#7C3AED", fontWeight: "bold" }]}>Pencocokan</Text>
            </View>
            <View style={styles.graphLine} />
            <View style={styles.graphNodeWrapper}>
              <View style={[styles.graphCircle, { backgroundColor: isDarkMode ? "#064E3B" : "#D1FAE5" }]}>
                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={18} color={isDarkMode ? "#34D399" : "#065F46"} />
              </View>
              <Text style={styles.graphLabel}>Kesimpulan</Text>
            </View>
          </View>

          {/* Animated rule tracker label */}
          <View style={styles.glassLabelBanner}>
            <Text style={styles.glassLabelText}>Memproses Aturan #142...</Text>
          </View>
        </View>

        {/* Aturan Aktif */}
        <Text style={styles.sectionHeader}>ATURAN AKTIF</Text>
        <View style={styles.rulesListContainer}>
          <View style={[styles.ruleBlockItem, { borderColor: isDarkMode ? "#374151" : "#BAD3F8" }]}>
            <Text style={[styles.ruleHeaderName, { color: isDarkMode ? "#38BDF8" : "#2E5788" }]}>RULE_042 (TERPICU)</Text>
            <Text style={styles.ruleBodyContent}>
              JIKA Tidur Buruk DAN Stres Tinggi MAKA Tingkatkan Indeks Risiko Depresi.
            </Text>
          </View>

          <View style={[styles.ruleBlockItem, { borderColor: isDarkMode ? "#374151" : "#D1C4E9" }]}>
            <Text style={[styles.ruleHeaderName, { color: isDarkMode ? "#C084FC" : "#7C3AED" }]}>RULE_089 (EVALUASI)</Text>
            <Text style={styles.ruleBodyContent}>
              JIKA Kecemasan &gt; 0.7 DAN Isolasi Sosial MAKA Pemicu Protokol Panik.
            </Text>
          </View>
        </View>

        {/* Faktor Kepastian */}
        <Text style={styles.sectionHeader}>FAKTOR KEPASTIAN</Text>
        <View style={styles.processingCard}>
          <View style={styles.cfFlexRow}>
            <View style={styles.cfRingOuter}>
              <Text style={styles.cfRingVal}>0.75</Text>
              <Text style={styles.cfRingSub}>CF</Text>
            </View>
            <View style={styles.cfMathLog}>
              <Text style={styles.cfStepTitle}>Langkah Kalkulasi:</Text>
              <Text style={styles.cfStepText}>
                • CF_kombinasi(1,2) = 0.85 + 0.7(1 - 0.85) = 0.955
              </Text>
              <Text style={styles.cfStepText}>
                • Normalisasi Bobot Gejala = 0.75 Final
              </Text>
            </View>
          </View>
        </View>

        {/* Rekomendasi Pakar */}
        <View style={styles.expertOpinionBox}>
          <View style={styles.expertHeaderRow}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={18} color={isDarkMode ? "#38BDF8" : "#2E5788"} style={styles.expertIcon} />
            <Text style={styles.expertTitleText}>REKOMENDASI PAKAR</Text>
          </View>
          <Text style={styles.expertBodyContent}>
            "Berdasarkan iterasi saat ini, ditemukan probabilitas sebesar {category === "ANXIETY" ? "92%" : "88%"} untuk indikasi{" "}
            <Text style={styles.boldTextUnderline}>
              {category === "ANXIETY" ? "Kelelahan Tengah Semester (Mid-Semester Burnout)" : "Insomnia Ringan"}
            </Text>."
          </Text>
        </View>

        {/* Action triggers */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => setStep("RESULT")}>
          <Text style={styles.primaryButtonText}>Terapkan Protokol</Text>
          <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" style={styles.arrowIcon} />
        </TouchableOpacity>
      </ScrollView>
    );
  };

  // STEP 3: Results screen
  const renderResultScreen = () => {
    const isAnxiety = category === "ANXIETY";

    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Hasil Diagnosis</Text>
        <Text style={styles.resultLabelName}>{isAnxiety ? "Anxiety Sedang" : "Insomnia Ringan"}</Text>

        {/* Top summary card */}
        <View style={styles.topSummaryCard}>
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>• Analisis Selesai</Text>
          </View>
          <Text style={styles.summaryTitle}>{isAnxiety ? "Anxiety Sedang" : "Insomnia Ringan"}</Text>
          <Text style={styles.summaryDesc}>
            {isAnxiety
              ? "Jawaban Anda menunjukkan bahwa Anda sedang mengalami tingkat kecemasan sedang. Ini adalah kondisi yang dapat dikelola dengan panduan yang tepat."
              : "Jawaban Anda menunjukkan bahwa Anda sedang mengalami tingkat insomnia ringan. Kondisi ini biasanya berkaitan dengan rutinitas tidur yang kurang konsisten."}
          </Text>
          <View style={styles.summaryBtnRow}>
            <TouchableOpacity style={styles.saveResultBtn} onPress={handleSaveResult}>
              <MaterialCommunityIcons name="content-save-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.saveResultBtnText}>Simpan Hasil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareReportBtn}>
              <MaterialCommunityIcons name="share-variant-outline" size={16} color={isDarkMode ? "#38BDF8" : "#2E5788"} style={styles.btnIcon} />
              <Text style={styles.shareReportBtnText}>Bagikan Laporan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kepastian Progress Meter */}
        <View style={styles.kepastianCard}>
          <View style={styles.kepastianRing}>
            <Text style={styles.kepastianRingValue}>{isAnxiety ? "82%" : "74%"}</Text>
            <Text style={styles.kepastianRingLabel}>Kepastian</Text>
          </View>
          <Text style={styles.kepastianSubtext}>
            Berdasarkan algoritma forward-chaining dan certainty factor.
          </Text>
        </View>

        {/* Memahami Kondisi Anda */}
        <View style={styles.explanationCard}>
          <View style={styles.explanationHeader}>
            <MaterialCommunityIcons name="information-outline" size={20} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
            <Text style={styles.explanationHeaderTitle}>Memahami Kondisi Anda</Text>
          </View>
          <Text style={styles.explanationBody}>
            {isAnxiety
              ? "Anxiety Sedang (Kecemasan Sedang) ditandai dengan kecemasan, khawatir, atau ketegangan yang terus-menerus yang mungkin mengganggu aktivitas sehari-hari tetapi tidak melumpuhkan sepenuhnya. Anda mungkin merasakan gejala fisik seperti detak jantung cepat atau ketegangan otot.\n\nDalam kasus spesifik Anda, skor menunjukkan bahwa stres akademik dan ketidakteraturan tidur adalah pemicu utama yang berkontribusi pada kondisi ini."
              : "Hasil diagnosis menunjukkan Anda mengalami Insomnia Ringan. Kondisi ini biasanya berkaitan dengan rutinitas tidur yang kurang konsisten atau faktor lingkungan yang menghambat kualitas istirahat Anda.\n\nDalam kasus spesifik Anda, paparan layar di malam hari dan kecemasan akademik adalah faktor pemicu utama."}
          </Text>

          {/* Bulleted Observations */}
          <View style={styles.observationsContainer}>
            <Text style={styles.observationHeader}>Observasi Kunci</Text>
            {isAnxiety ? (
              <>
                <View style={styles.observationItem}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={isDarkMode ? "#34D399" : "#2E5788"} style={styles.obsCheck} />
                  <Text style={styles.observationText}>Khawatir secara konsisten tentang kejadian di masa depan.</Text>
                </View>
                <View style={styles.observationItem}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={isDarkMode ? "#34D399" : "#2E5788"} style={styles.obsCheck} />
                  <Text style={styles.observationText}>Siklus tidur terganggu (rata-rata 5.5 jam).</Text>
                </View>
                <View style={styles.observationItem}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={isDarkMode ? "#34D399" : "#2E5788"} style={styles.obsCheck} />
                  <Text style={styles.observationText}>Peningkatan sensitivitas terhadap interaksi sosial.</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.observationItem}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={isDarkMode ? "#34D399" : "#2E5788"} style={styles.obsCheck} />
                  <Text style={styles.observationText}>Terlambat mulai tidur</Text>
                </View>
                <View style={styles.observationItem}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={isDarkMode ? "#34D399" : "#2E5788"} style={styles.obsCheck} />
                  <Text style={styles.observationText}>Jendela tidur konsisten 6 jam</Text>
                </View>
                <View style={styles.observationItem}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color={isDarkMode ? "#34D399" : "#2E5788"} style={styles.obsCheck} />
                  <Text style={styles.observationText}>Kelelahan siang hari ringan</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Rekomendasi Perawatan Mandiri */}
        <Text style={styles.resultSectionHeader}>Rekomendasi Perawatan Mandiri</Text>
        <View style={styles.selfCareList}>
          {isAnxiety ? (
            <>
              {/* Rec 1 */}
              <TouchableOpacity style={styles.selfCareCard}>
                <View style={[styles.selfCareIconCircle, { backgroundColor: isDarkMode ? "#2D1B48" : "#F3E8FF" }]}>
                  <MaterialCommunityIcons name="brain" size={20} color={isDarkMode ? "#C084FC" : "#7C3AED"} />
                </View>
                <View style={styles.selfCareInfo}>
                  <Text style={styles.selfCareTitle}>Pernapasan Mindfulness</Text>
                  <Text style={styles.selfCareSubtitle}>Lakukan pernapasan 4-7-8 selama 5 menit dua kali sehari.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Rec 2 */}
              <TouchableOpacity style={styles.selfCareCard}>
                <View style={[styles.selfCareIconCircle, { backgroundColor: isDarkMode ? "#064E3B" : "#ECFDF5" }]}>
                  <MaterialCommunityIcons name="cellphone-off" size={20} color={isDarkMode ? "#34D399" : "#059669"} />
                </View>
                <View style={styles.selfCareInfo}>
                  <Text style={styles.selfCareTitle}>Detoks Digital</Text>
                  <Text style={styles.selfCareSubtitle}>Matikan semua layar 1 jam sebelum waktu tidur.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Rec 3 */}
              <TouchableOpacity style={styles.selfCareCard}>
                <View style={[styles.selfCareIconCircle, { backgroundColor: isDarkMode ? "#172554" : "#EFF6FF" }]}>
                  <MaterialCommunityIcons name="run" size={20} color={isDarkMode ? "#60A5FA" : "#2563EB"} />
                </View>
                <View style={styles.selfCareInfo}>
                  <Text style={styles.selfCareTitle}>Aktivitas Fisik Ringan</Text>
                  <Text style={styles.selfCareSubtitle}>Jalan pagi selama 15 menit untuk regulasi kortisol.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Rec 1 */}
              <TouchableOpacity style={styles.selfCareCard}>
                <View style={[styles.selfCareIconCircle, { backgroundColor: isDarkMode ? "#064E3B" : "#ECFDF5" }]}>
                  <MaterialCommunityIcons name="cellphone-off" size={20} color={isDarkMode ? "#34D399" : "#059669"} />
                </View>
                <View style={styles.selfCareInfo}>
                  <Text style={styles.selfCareTitle}>Detoks Digital</Text>
                  <Text style={styles.selfCareSubtitle}>1 jam sebelum tidur.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Rec 2 */}
              <TouchableOpacity style={styles.selfCareCard}>
                <View style={[styles.selfCareIconCircle, { backgroundColor: isDarkMode ? "#172554" : "#EBF3FC" }]}>
                  <MaterialCommunityIcons name="clock-outline" size={20} color={isDarkMode ? "#60A5FA" : "#2E5788"} />
                </View>
                <View style={styles.selfCareInfo}>
                  <Text style={styles.selfCareTitle}>Waktu Bangun Konsisten</Text>
                  <Text style={styles.selfCareSubtitle}>Tidur dan bangun pada jam yang sama.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Rec 3 */}
              <TouchableOpacity style={styles.selfCareCard}>
                <View style={[styles.selfCareIconCircle, { backgroundColor: isDarkMode ? "#2D1B48" : "#F3E8FF" }]}>
                  <MaterialCommunityIcons name="theme-light-dark" size={20} color={isDarkMode ? "#C084FC" : "#7C3AED"} />
                </View>
                <View style={styles.selfCareInfo}>
                  <Text style={styles.selfCareTitle}>Lingkungan Kamar Sejuk & Gelap</Text>
                  <Text style={styles.selfCareSubtitle}>Gunakan masker mata atau gorden tebal jika perlu.</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Dukungan Darurat Card */}
        <View style={styles.emergencySupportCard}>
          <View style={styles.emergencyIconCircle}>
            <MaterialCommunityIcons name="briefcase-outline" size={24} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
          </View>
          <Text style={styles.emergencyTitle}>Dukungan Darurat</Text>
          <Text style={styles.emergencyDesc}>
            Bila Anda merasa kewalahan atau gejala ini menetap lebih dari dua minggu, silakan hubungi konselor profesional kami.
          </Text>
          <TouchableOpacity style={styles.emergencyContactBtn} onPress={() => handleContactDoctor(category)}>
            <MaterialCommunityIcons name="phone-outline" size={16} color={isDarkMode ? "#38BDF8" : "#2E5788"} style={styles.btnIcon} />
            <Text style={styles.emergencyContactBtnText}>Hubungi Profesional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.findClinicBtn} onPress={() => Linking.openURL("https://maps.google.com/?q=mental+health+clinic")}>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.findClinicBtnText}>Cari Klinik Terdekat</Text>
          </TouchableOpacity>
        </View>

        {/* Sumber Edukasi Section */}
        <View style={styles.eduHeaderRow}>
          <Text style={styles.eduSectionTitle}>Sumber Edukasi</Text>
          <TouchableOpacity onPress={() => router.push("/learn")}>
            <View style={styles.eduLinkRow}>
              <Text style={styles.eduLinkText}>Lihat Semua</Text>
              <MaterialCommunityIcons name="arrow-right" size={14} color={isDarkMode ? "#38BDF8" : "#2E5788"} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.eduSectionDesc}>Pelajari lebih lanjut tentang mengelola kesehatan mental Anda.</Text>

        {/* Articles List */}
        <View style={styles.articlesList}>
          {isAnxiety ? (
            <>
              {/* Article 1 */}
              <TouchableOpacity style={styles.articleCard} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=yYJ4S436Fmg")}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop" }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>Mengatasi Kecemasan Kuliah</Text>
                  <Text style={styles.articleMeta}>Tonton Video • Satu Persen</Text>
                </View>
              </TouchableOpacity>

              {/* Article 2 */}
              <TouchableOpacity style={styles.articleCard} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=F3q382h-lrs")}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop" }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>Kekuatan Menulis Jurnal</Text>
                  <Text style={styles.articleMeta}>Tonton Video • Satu Persen</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Article 1 */}
              <TouchableOpacity style={styles.articleCard} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=mDmg4WcW294")}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1511295742364-927d44fa62d5?q=80&w=600&auto=format&fit=crop" }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>Higiene Tidur Terbaik</Text>
                  <Text style={styles.articleMeta}>Tonton Video • Satu Persen</Text>
                </View>
              </TouchableOpacity>

              {/* Article 2 */}
              <TouchableOpacity style={styles.articleCard} onPress={() => Linking.openURL("https://www.youtube.com/watch?v=HpyzO8Nl63E")}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop" }}
                  style={styles.articleImage}
                  resizeMode="cover"
                />
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>Meditasi Sebelum Tidur</Text>
                  <Text style={styles.articleMeta}>Tonton Video • Guided Meditation</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Restart Button */}
        <TouchableOpacity style={styles.backToStartButton} onPress={() => setStep("INPUT")}>
          <Text style={styles.backToStartText}>Ulangi Diagnosis</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {step === "INPUT" && renderInputScreen()}
      {step === "PROCESSING" && renderProcessingScreen()}
      {step === "RESULT" && renderResultScreen()}
    </View>
  );
}

const staticStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2FA",
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 12 : 44,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
    color: "#1E2C4F",
    letterSpacing: 0.5,
  },
  notificationButton: {
    padding: 4,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 6,
  },
  mainDesc: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#6B7280",
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    flex: 0.48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryCardActive: {
    borderColor: "#2E5788",
    backgroundColor: "#F3F7FD",
    borderWidth: 1.5,
  },
  categoryIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E2C4F",
  },
  categorySubtitle: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 1,
  },
  importantNoteBox: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  noteIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  noteTextWrapper: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2E5788",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 15,
  },
  symptomsList: {
    marginBottom: 20,
  },
  symptomRowCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  symptomRowCardChecked: {
    backgroundColor: "#F0F7FF",
    borderColor: "#BAD3F8",
  },
  checkboxIcon: {
    marginRight: 12,
  },
  symptomRowText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#1E2C4F",
  },
  confidenceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  confidenceTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 16,
  },
  sliderTrackWrapper: {
    height: 30,
    justifyContent: "center",
    position: "relative",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  sliderLine: {
    height: 6,
    borderRadius: 3,
    position: "absolute",
    left: 10,
    right: 10,
  },
  sliderLineFill: {
    height: 6,
    backgroundColor: "#2E5788",
    borderRadius: 3,
    position: "absolute",
    left: 10,
  },
  nodesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D1D5DB",
  },
  sliderNodeActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2E5788",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderLabelBtn: {
    alignItems: "center",
    width: width * 0.25,
  },
  sliderLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  sliderLabelActive: {
    color: "#2E5788",
    fontWeight: "bold",
  },
  sliderLabelSub: {
    fontSize: 9,
    color: "#9CA3AF",
    marginTop: 2,
  },
  sliderLabelSubActive: {
    color: "#2E5788",
    fontWeight: "600",
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#2E5788",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  arrowIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#2E5788",
  },
  secondaryButtonText: {
    color: "#2E5788",
    fontSize: 15,
    fontWeight: "bold",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#065F46",
    marginRight: 6,
  },
  liveText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#065F46",
  },
  processingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  factRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  factLeft: {
    flex: 1,
  },
  factName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E2C4F",
  },
  factCf: {
    fontSize: 11,
    color: "#2E5788",
    marginTop: 2,
    fontWeight: "bold",
  },
  fadedText: {
    fontSize: 11,
    color: "#9CA3AF",
    fontStyle: "italic",
    marginTop: 12,
    textAlign: "center",
  },
  graphContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  graphNodeWrapper: {
    alignItems: "center",
    width: width * 0.2,
  },
  graphCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  graphLabel: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
  },
  graphLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#E5E7EB",
    marginBottom: 20,
  },
  glassLabelBanner: {
    backgroundColor: "#EBF3FC",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  glassLabelText: {
    color: "#2E5788",
    fontSize: 12,
    fontWeight: "700",
  },
  rulesListContainer: {
    marginBottom: 16,
  },
  ruleBlockItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  ruleHeaderName: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ruleBodyContent: {
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 15,
  },
  cfFlexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cfRingOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#2E5788",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    marginRight: 16,
  },
  cfRingVal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E5788",
  },
  cfRingSub: {
    fontSize: 9,
    color: "#6B7280",
    fontWeight: "700",
  },
  cfMathLog: {
    flex: 1,
  },
  cfStepTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 4,
  },
  cfStepText: {
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 15,
    marginTop: 2,
  },
  expertOpinionBox: {
    backgroundColor: "#EBF3FC",
    borderWidth: 1,
    borderColor: "#BAD3F8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  expertHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  expertIcon: {
    marginRight: 8,
  },
  expertTitleText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2E5788",
    letterSpacing: 1,
  },
  expertBodyContent: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  boldTextUnderline: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#1E2C4F",
  },
  resultLabelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E5788",
    marginBottom: 20,
  },
  topSummaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  completedBadge: {
    backgroundColor: "#EDE9FE",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  completedBadgeText: {
    color: "#7C3AED",
    fontSize: 10,
    fontWeight: "700",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 8,
  },
  summaryDesc: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 20,
  },
  summaryBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveResultBtn: {
    flex: 0.48,
    flexDirection: "row",
    backgroundColor: "#2E5788",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveResultBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  shareReportBtn: {
    flex: 0.48,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#2E5788",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  shareReportBtnText: {
    color: "#2E5788",
    fontSize: 12,
    fontWeight: "bold",
  },
  btnIcon: {
    marginRight: 6,
  },
  kepastianCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  kepastianRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: "#2E5788",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    marginBottom: 14,
  },
  kepastianRingValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E5788",
  },
  kepastianRingLabel: {
    fontSize: 8,
    color: "#6B7280",
    fontWeight: "700",
    marginTop: 2,
  },
  kepastianSubtext: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 15,
    paddingHorizontal: 8,
  },
  explanationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  explanationHeaderTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginLeft: 8,
  },
  explanationBody: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  observationsContainer: {
    marginTop: 18,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
  },
  observationHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 10,
  },
  observationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  obsCheck: {
    marginRight: 10,
  },
  observationText: {
    flex: 1,
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },
  resultSectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginTop: 12,
    marginBottom: 12,
  },
  selfCareList: {
    marginBottom: 20,
  },
  selfCareCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  selfCareIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  selfCareInfo: {
    flex: 1,
    paddingRight: 8,
  },
  selfCareTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 2,
  },
  selfCareSubtitle: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 14,
  },
  emergencySupportCard: {
    backgroundColor: "#1E2C4F",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 28,
  },
  emergencyIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  emergencyDesc: {
    fontSize: 12,
    color: "#E2F1FF",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  emergencyContactBtn: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emergencyContactBtnText: {
    color: "#2E5788",
    fontSize: 13,
    fontWeight: "bold",
  },
  findClinicBtn: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderWidth: 1.2,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  findClinicBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  eduHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eduSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E2C4F",
  },
  eduLinkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eduLinkText: {
    fontSize: 12,
    color: "#2E5788",
    fontWeight: "bold",
    marginRight: 4,
  },
  eduSectionDesc: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 16,
  },
  articlesList: {
    marginBottom: 20,
  },
  articleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },
  articleImage: {
    width: "100%",
    height: 140,
  },
  articleContent: {
    padding: 14,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2C4F",
    marginBottom: 4,
  },
  articleMeta: {
    fontSize: 10,
    color: "#6B7280",
  },
  backToStartButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  backToStartText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  boldText: {
    fontWeight: "bold",
  },
});
