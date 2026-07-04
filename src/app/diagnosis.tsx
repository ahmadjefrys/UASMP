import BottomNavigation from "@/components/BottomNavigation";
import apiService from "@/services/api";
import { DiagnosisCategory, DiagnosisResult, DiagnosisSymptomOption } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CertaintyLevel = {
  label: string;
  value: number;
};

const certaintyLevels: CertaintyLevel[] = [
  { label: "Tidak Yakin", value: 0.05 },
  { label: "Cukup Yakin", value: 0.5 },
  { label: "Sangat Yakin", value: 0.95 },
];

export default function DiagnosisScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [categories, setCategories] = useState<DiagnosisCategory[]>([]);
  const [symptomOptions, setSymptomOptions] = useState<DiagnosisSymptomOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("anxiety");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0.5);
  const [stage, setStage] = useState<"form" | "inference" | "result">("form");
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const filteredSymptoms = useMemo(
    () => symptomOptions.filter((item) => item.categoryIds.includes(selectedCategory)),
    [selectedCategory, symptomOptions]
  );

  const completionPercent = useMemo(() => {
    const base = selectedSymptoms.length / Math.max(filteredSymptoms.length, 1);
    return Math.round((base * 0.5 + confidence * 0.5) * 100);
  }, [selectedSymptoms.length, filteredSymptoms.length, confidence]);

  useEffect(() => {
    async function loadMetadata() {
      setIsLoadingMetadata(true);
      try {
        const response = await apiService.getDiagnosisMetadata();
        if (response.data) {
          setCategories(response.data.categories);
          setSymptomOptions(response.data.symptoms);
          if (response.data.categories.length > 0) {
            const catParam = params.category as string | undefined;
            if (catParam && response.data.categories.find((c) => c.id === catParam)) {
              setSelectedCategory(catParam);
            } else {
              setSelectedCategory(response.data.categories[0].id);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load diagnosis metadata", error);
      } finally {
        setIsLoadingMetadata(false);
      }
    }

    loadMetadata();
  }, []);

  const selectedCategoryData = useMemo(
    () => categories.find((item) => item.id === selectedCategory) ?? categories[0],
    [categories, selectedCategory]
  );

  const whatsappNumber = "6281234567890";
  const whatsappText = encodeURIComponent(
    `Halo, saya ingin konsultasi terkait hasil diagnosis STAYCARE. Gejala: ${selectedSymptoms
      .map((id) => symptomOptions.find((item) => item.id === id)?.label)
      .filter(Boolean)
      .join(", ")}. Confidence: ${certaintyLevels.find((item) => item.value === confidence)?.label || "Cukup Yakin"}.`
  );

  const openWhatsApp = async () => {
    const url = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    await Linking.openURL(url);
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const submitDiagnosis = async () => {
    setSubmissionError(null);
    setIsSubmitting(true);
    try {
      const response = await apiService.submitDiagnosis({
        categoryId: selectedCategory,
        symptomIds: selectedSymptoms,
        confidence,
      });
      if (response.data) {
        setDiagnosisResult(response.data.result);
        setStage("result");
      }
    } catch (error) {
      setSubmissionError("Gagal memproses diagnosis. Coba lagi.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EEF8" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#6B7B99", fontSize: 12, fontWeight: "600" }}>Step 2 of 4</Text>
            <Text style={{ color: "#1F2E59", fontSize: 12, fontWeight: "600" }}>Diagnosis Kategori</Text>
          </View>

          <Text style={{ fontSize: 28, fontWeight: "800", color: "#1F2E59", marginTop: 18, marginBottom: 10 }}>
            Diagnosis Kesehatan Mental
          </Text>
          <Text style={{ color: "#556277", fontSize: 14, lineHeight: 22 }}>
            Pilih kategori dan gejala untuk mendapatkan diagnosis awal dengan rekomendasi.
          </Text>

          <View style={{ marginTop: 24, gap: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59", marginBottom: 12 }}>
              Kategori Utama
            </Text>
            {isLoadingMetadata ? (
              <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 20, alignItems: "center" }}>
                <ActivityIndicator size="small" color="#355E8E" />
                <Text style={{ marginTop: 12, color: "#556277" }}>Memuat kategori diagnosis...</Text>
              </View>
            ) : (
              categories.map((category) => {
                const active = selectedCategory === category.id;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => {
                      setSelectedCategory(category.id);
                      setSelectedSymptoms([]);
                    }}
                    style={{
                      backgroundColor: active ? "#F0F5FF" : "#FFFFFF",
                      borderWidth: 1,
                      borderColor: active ? "#5B8AC5" : "#D6DCEB",
                      borderRadius: 18,
                      padding: 18,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          backgroundColor: category.color,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 14,
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>{category.icon}</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59" }}>{category.title}</Text>
                        <Text style={{ color: "#6B7B99", fontSize: 13, marginTop: 4 }}>{category.subtitle}</Text>
                      </View>
                    </View>
                    <Text style={{ color: active ? "#5B8AC5" : "#B0BCCF", fontSize: 18 }}>{active ? "›" : ""}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 18,
              borderWidth: 1,
              borderColor: "#E0E8F5",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#1F2E59", marginBottom: 10 }}>Catatan Penting</Text>
            <Text style={{ color: "#5B7B99", fontSize: 13, lineHeight: 20 }}>
              Diagnosis ini bersifat awal dan bukan pengganti saran medis profesional. Jika Anda dalam keadaan darurat, segera hubungi layanan kesehatan terdekat.
            </Text>
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59", marginBottom: 12 }}>
              Pilih Gejala yang Dirasakan
            </Text>
            {filteredSymptoms.map((item) => {
              const active = selectedSymptoms.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleSymptom(item.id)}
                  style={{
                    backgroundColor: active ? "#EFF4FF" : "#FFFFFF",
                    borderColor: active ? "#5B8AC5" : "#E6EBF4",
                    borderWidth: 1,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ flex: 1, color: "#1F2E59", fontSize: 14 }}>{item.label}</Text>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      backgroundColor: active ? "#355E8E" : "#F1F5F9",
                      borderWidth: active ? 0 : 1,
                      borderColor: "#CBD5E1",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {active ? <Text style={{ color: "#fff", fontSize: 14 }}>✓</Text> : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#E0E8F5" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59" }}>Seberapa yakin Anda dengan gejala ini?</Text>
            <Text style={{ color: "#5B7B99", fontSize: 12, marginTop: 6 }}>Tingkat keyakinan membantu akurasi diagnosis.</Text>
            <View style={{ marginTop: 14, backgroundColor: "#EAF0FF", borderRadius: 14, height: 10, overflow: "hidden" }}>
              <View style={{ width: `${Math.max(10, completionPercent)}%`, height: 10, backgroundColor: "#5B8AC5" }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
              {certaintyLevels.map((item) => {
                const active = item.value === confidence;
                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setConfidence(item.value)}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      borderRadius: 14,
                      backgroundColor: active ? "#EFF4FF" : "#F8FAFC",
                      borderWidth: active ? 1 : 1,
                      borderColor: active ? "#5B8AC5" : "#E2E8F0",
                    }}
                  >
                    <Text style={{ color: active ? "#355E8E" : "#6B7B99", fontSize: 13, fontWeight: active ? "700" : "500" }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            onPress={submitDiagnosis}
            disabled={isSubmitting || selectedSymptoms.length === 0}
            style={{
              marginTop: 24,
              backgroundColor: selectedSymptoms.length === 0 ? "#B0BCCF" : "#355E8E",
              borderRadius: 18,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
              {isSubmitting ? "Memproses..." : "Mulai Diagnosis"}
            </Text>
          </TouchableOpacity>
          {submissionError ? (
            <Text style={{ color: "#D0463B", marginTop: 12, textAlign: "center" }}>{submissionError}</Text>
          ) : null}
        </View>

        {stage !== "form" && (
          <View style={{ paddingHorizontal: 20, paddingTop: 28 }}>
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#1F2E59", marginBottom: 16 }}>Mesin Inferensi</Text>
            <Text style={{ color: "#556277", fontSize: 14, lineHeight: 22, marginBottom: 18 }}>
              Proses Forward Chaining sedang berlangsung. Mengevaluasi input Anda untuk mencocokkan protokol klinis dan menentukan faktor kepastian.
            </Text>

            <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 18, marginBottom: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59", marginBottom: 12 }}>Memori Kerja</Text>
              <View style={{ backgroundColor: "#F7F9FF", borderRadius: 16, padding: 14, marginBottom: 10 }}>
                <Text style={{ color: "#1F2E59", fontWeight: "700", fontSize: 14 }}>Evaluasi Gejala</Text>
                <Text style={{ color: "#5B7B99", fontSize: 13, marginTop: 6 }}>Meninjau status saat ini berdasarkan input yang dipilih.</Text>
              </View>
              <Text style={{ color: "#9BB1D4", fontSize: 13 }}>Menunggu input selanjutnya...</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 18 }}>
              {[
                { label: "Fakta", color: "#EFF8FF" },
                { label: "Pencocokan", color: "#F8EFFB" },
                { label: "Kesimpulan", color: "#EFFDF5" },
              ].map((item) => (
                <View key={item.label} style={{ flex: 1, marginHorizontal: 4, backgroundColor: item.color, borderRadius: 16, padding: 14, alignItems: "center" }}>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: "#375D8A" }}>{item.label}</Text>
                </View>
              ))}
            </View>

            <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 18, marginBottom: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59", marginBottom: 14 }}>Faktor Kepastian</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: "#1F2E59", fontWeight: "700" }}>CF Prediksi</Text>
                <Text style={{ fontSize: 20, fontWeight: "800", color: "#355E8E" }}>{(completionPercent / 100).toFixed(2)}</Text>
              </View>
              <Text style={{ color: "#5B7B99", fontSize: 13, marginTop: 10 }}>Kombinasi input gejala dan keyakinan.</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={{ backgroundColor: "#fff", borderRadius: 22, padding: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: "#1F2E59", marginBottom: 10 }}>{completionPercent}%</Text>
                <Text style={{ color: "#5B7B99", fontSize: 13, lineHeight: 20 }}>Skor prediksi berdasarkan input Anda.</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setStage("result")}
              style={{
                backgroundColor: "#355E8E",
                borderRadius: 18,
                paddingVertical: 16,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Lihat Hasil Diagnosis</Text>
            </TouchableOpacity>
          </View>
        )}

        {stage === "result" && diagnosisResult ? (
          <View style={{ paddingHorizontal: 20, paddingTop: 0, paddingBottom: 30 }}>
            <View style={{ backgroundColor: "#fff", borderRadius: 24, padding: 22, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#5B7B99", marginBottom: 8 }}>Analisis Selesai</Text>
              <Text style={{ fontSize: 24, fontWeight: "800", color: "#1F2E59", marginBottom: 10 }}>{diagnosisResult.title}</Text>
              <Text style={{ color: "#556277", fontSize: 14, lineHeight: 22 }}>{diagnosisResult.description}</Text>

              <View style={{ marginTop: 22, backgroundColor: "#EFF4FF", borderRadius: 20, padding: 18, alignItems: "center" }}>
                <Text style={{ fontSize: 36, fontWeight: "800", color: "#355E8E" }}>{Math.round(diagnosisResult.certainty * 100)}%</Text>
                <Text style={{ color: "#5B7B99", fontSize: 13, marginTop: 6 }}>Kepastian</Text>
              </View>

              {diagnosisResult.recommendations.length > 0 ? (
                <View style={{ marginTop: 20, backgroundColor: "#F7FAFF", borderRadius: 20, padding: 18 }}>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#1F2E59", marginBottom: 12 }}>Rekomendasi</Text>
                  {diagnosisResult.recommendations.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Text style={{ color: "#355E8E", fontWeight: "800", marginRight: 10 }}>•</Text>
                      <Text style={{ color: "#556277", fontSize: 13, lineHeight: 20, flex: 1 }}>{item}</Text>
                    </View>
                  ))}
                </View>
              ) : null}

              <TouchableOpacity
                onPress={openWhatsApp}
                style={{
                  marginTop: 20,
                  backgroundColor: "#355E8E",
                  borderRadius: 18,
                  paddingVertical: 16,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Konsultasi ke WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}
