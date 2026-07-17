import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Dimensions, Platform, StatusBar, Modal, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../services/authStore";

const { width, height } = Dimensions.get("window");

interface AvatarOption {
  name: string;
  url: string;
}

export default function ProfilScreen() {
  const router = useRouter();
  const { user, logout, setUser, historyLogs, isDarkMode, toggleDarkMode } = useAuthStore();
  const userName = user?.name || "Belum ada nama";

  // State
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop");

  // Modal Visibility States
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [securityModalVisible, setSecurityModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [notifyModalVisible, setNotifyModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Temp form values
  const [inputName, setInputName] = useState(userName);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // Notification toggles
  const [pushNotify, setPushNotify] = useState(true);
  const [emailNotify, setEmailNotify] = useState(false);
  const [reminders, setReminders] = useState(true);

  // Avatar presets
  const avatarOptions: AvatarOption[] = [
    { name: "Eren Yaegar", url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop" },
    { name: "Mikasa Ackermann", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" },
    { name: "Armin Arlert", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" },
    { name: "Ziza (Default)", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" },
  ];

  const getWeekRange = () => {
    const current = new Date();
    const first = current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1);
    const last = first + 6;

    const firstDate = new Date(current.setDate(first));
    const lastDate = new Date(current.setDate(last));

    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${firstDate.getDate()} ${months[firstDate.getMonth()]} - ${lastDate.getDate()} ${months[lastDate.getMonth()]} ${lastDate.getFullYear()}`;
  };

  const isDateInCurrentWeek = (dateStr: string) => {
    try {
      const parts = dateStr.split(" ");
      if (parts.length !== 3) return false;

      const day = parseInt(parts[0], 10);
      const monthStr = parts[1];
      const year = parseInt(parts[2], 10);

      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
      const month = months.indexOf(monthStr);
      if (month === -1) return false;

      const logDate = new Date(year, month, day);

      const current = new Date();
      const first = current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1);
      const monday = new Date(current.setDate(first));
      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      return logDate >= monday && logDate <= sunday;
    } catch (e) {
      return false;
    }
  };

  const getAverageFitness = () => {
    if (!historyLogs || historyLogs.length === 0) return "0%";
    const weeklyLogs = historyLogs.filter((item) => isDateInCurrentWeek(item.date));
    if (weeklyLogs.length === 0) return "0%";
    const sum = weeklyLogs.reduce((acc, item) => acc + item.detail.kepastian, 0);
    const avg = Math.round(sum / weeklyLogs.length);
    return `${avg}%`;
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    logout();
    alert("Anda berhasil keluar akun.");
    router.replace("/");
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Maaf, kami memerlukan izin galeri untuk mengganti foto profil.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatarUrl(result.assets[0].uri);
        setAvatarModalVisible(false);
        alert("Foto profil berhasil diperbarui!");
      }
    } catch (err) {
      alert("Gagal memuat gambar dari galeri.");
      console.log(err);
    }
  };

  const saveName = () => {
    if (!inputName.trim()) {
      alert("Nama tidak boleh kosong.");
      return;
    }
    setUser(user ? { ...user, name: inputName } : { id: "temp", name: inputName, email: "temp@mail.com" });
    setNameModalVisible(false);
    alert("Nama berhasil diperbarui!");
  };

  const selectAvatar = (url: string) => {
    setAvatarUrl(url);
    setAvatarModalVisible(false);
    alert("Foto profil berhasil diperbarui!");
  };

  const handleSavePassword = () => {
    if (!currentPw || !newPw || !confirmPw) {
      alert("Semua kolom kata sandi harus diisi.");
      return;
    }
    if (newPw !== confirmPw) {
      alert("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }
    alert("Kata sandi berhasil diperbarui!");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setSecurityModalVisible(false);
  };

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
    inputBg: isDarkMode ? "#374151" : "#FFFFFF",
    sectionHeaderBg: isDarkMode ? "#2D2D2D" : "#EBF3FC",
    sectionHeaderTitle: isDarkMode ? "#9CA3AF" : "#2E5788",
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.border }]}>
      <View style={styles.headerLeft}>
        <MaterialCommunityIcons name="spa" size={24} color="#2E5788" style={styles.headerLogo} />
        <Text style={[styles.headerTitle, { color: theme.headerText }]}>STAY CARE</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {renderHeader()}

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card Section */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={() => setAvatarModalVisible(true)} activeOpacity={0.8} style={styles.avatarWrapper}>
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            <View style={styles.editPhotoBadge}>
              <MaterialCommunityIcons name="camera" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={styles.nameRow}>
            <Text style={[styles.profileName, { color: theme.text }]}>{userName}</Text>
            <TouchableOpacity
              onPress={() => {
                setInputName(userName);
                setNameModalVisible(true);
              }}
              style={styles.editNameBtn}
            >
              <MaterialCommunityIcons name="pencil" size={16} color="#2E5788" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stacked Stats Cards */}
        <View style={styles.statsStack}>
          {/* Fitness Stat Card */}
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            activeOpacity={0.8}
            onPress={() => router.push("/history")}
          >
            <View style={[styles.statIconCircle, { backgroundColor: "#F0Fdf4" }]}>
              <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#16A34A" />
            </View>
            <View style={styles.statInfo}>
              <Text style={[styles.statVal, { color: theme.text }]}>{getAverageFitness()}</Text>
              <Text style={[styles.statLabel, { color: theme.subtext }]}>skor kebugaran minggu ini (Lihat Riwayat)</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Sesi Stat Card */}
          <TouchableOpacity
            style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            activeOpacity={0.8}
            onPress={() => router.push("/learn")}
          >
            <View style={[styles.statIconCircle, { backgroundColor: "#F0F9FF" }]}>
              <MaterialCommunityIcons name="history" size={24} color="#0284C7" />
            </View>
            <View style={styles.statInfo}>
              <Text style={[styles.statVal, { color: theme.text }]}>40 menit</Text>
              <Text style={[styles.statLabel, { color: theme.subtext }]}>sesi minggu ini (Mulai Edukasi)</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Weekly Usage Activity Bar Chart */}
        <View style={[styles.chartCard, { backgroundColor: theme.card }]}>
          <View style={styles.chartHeaderRow}>
            <Text style={[styles.chartTitle, { color: theme.text }]}>Aktivitas Penggunaan Aplikasi</Text>
            <Text style={[styles.chartSubtitle, { color: theme.subtext }]}>Periode: {getWeekRange()}</Text>
          </View>

          <View style={styles.chartContainer}>
            {/* Monday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.3 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.3 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.4 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Senin</Text>
            </View>

            {/* Tuesday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.35 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.25 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.4 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Selasa</Text>
            </View>

            {/* Wednesday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { height: 130, backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.4 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.3 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.3 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Rabu</Text>
            </View>

            {/* Thursday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { height: 130, backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.45 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.25 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.3 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Kamis</Text>
            </View>

            {/* Friday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { height: 170, backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.35 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.3 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.35 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Jumat</Text>
            </View>

            {/* Saturday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { height: 60, backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.4 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.25 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.35 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Sabtu</Text>
            </View>

            {/* Sunday */}
            <View style={styles.chartColumn}>
              <View style={[styles.barStack, { backgroundColor: isDarkMode ? "#2D2D2D" : "#F3F4F6" }]}>
                <View style={[styles.barSegmentTop, { flex: 0.35 }]} />
                <View style={[styles.barSegmentMid, { flex: 0.2 }]} />
                <View style={[styles.barSegmentBottom, { flex: 0.45 }]} />
              </View>
              <Text style={[styles.chartDayLabel, { color: theme.subtext }]}>Minggu</Text>
            </View>
          </View>
        </View>

        {/* Settings & Preferences */}
        <View style={[styles.settingsSection, { backgroundColor: theme.card }]}>
          <View style={[styles.settingsSectionHeader, { backgroundColor: theme.sectionHeaderBg }]}>
            <Text style={[styles.settingsSectionTitle, { color: theme.sectionHeaderTitle }]}>Pengaturan & Preferensi</Text>
          </View>

          {/* Mode Gelap Toggle */}
          <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="weather-night" size={22} color={isDarkMode ? "#9CA3AF" : "#4B5563"} style={styles.settingIcon} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>Mode Gelap</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#D1D5DB", true: "#BAD3F8" }}
              thumbColor={isDarkMode ? "#2E5788" : "#F3F4F6"}
            />
          </View>

          {/* Keamanan Akun */}
          <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.border }]} activeOpacity={0.8} onPress={() => setSecurityModalVisible(true)}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="shield-check-outline" size={22} color={isDarkMode ? "#9CA3AF" : "#4B5563"} style={styles.settingIcon} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>keamanan akun</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Kebijakan Privasi */}
          <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.border }]} activeOpacity={0.8} onPress={() => setPrivacyModalVisible(true)}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="lock-outline" size={22} color={isDarkMode ? "#9CA3AF" : "#4B5563"} style={styles.settingIcon} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>kebijakan privasi</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Notifikasi */}
          <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.border }]} activeOpacity={0.8} onPress={() => setNotifyModalVisible(true)}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="bell-outline" size={22} color={isDarkMode ? "#9CA3AF" : "#4B5563"} style={styles.settingIcon} />
              <Text style={[styles.settingTitle, { color: theme.text }]}>Notifikasi</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Logout Action */}
          <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]} activeOpacity={0.8} onPress={() => setLogoutModalVisible(true)}>
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="logout" size={22} color="#EF4444" style={styles.settingIcon} />
              <Text style={[styles.settingTitle, { color: "#EF4444", fontWeight: "bold" }]}>Keluar Akun</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 1. Modal: Edit Name */}
      <Modal visible={nameModalVisible} transparent={true} animationType="fade" onRequestClose={() => setNameModalVisible(false)}>
        <View style={styles.modalOverlayCenter}>
          <View style={[styles.alertCard, { backgroundColor: theme.sheetBg }]}>
            <Text style={[styles.alertTitle, { color: theme.text }]}>Ganti Nama Profil</Text>
            <TextInput
              style={[styles.alertInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBg }]}
              value={inputName}
              onChangeText={setInputName}
              placeholder="Masukkan nama baru"
              placeholderTextColor={theme.subtext}
              autoFocus={true}
            />
            <View style={styles.alertBtnRow}>
              <TouchableOpacity style={styles.alertBtnCancel} onPress={() => setNameModalVisible(false)}>
                <Text style={styles.alertBtnCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.alertBtnSave} onPress={saveName}>
                <Text style={styles.alertBtnSaveText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 2. Modal: Avatar Photo Selector */}
      <Modal visible={avatarModalVisible} transparent={true} animationType="slide" onRequestClose={() => setAvatarModalVisible(false)}>
        <View style={styles.modalOverlayBottom}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.sheetBg }]}>
            <View style={styles.dragBar} />
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Pilih Foto Profil</Text>

            {/* Custom Gallery Picker Button */}
            <TouchableOpacity style={styles.galleryPickBtn} onPress={pickImage} activeOpacity={0.8}>
              <MaterialCommunityIcons name="image-multiple-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.galleryPickBtnText}>Pilih dari Galeri HP</Text>
            </TouchableOpacity>

            <Text style={[styles.sheetTitle, { marginTop: 10, marginBottom: 12, fontSize: 13, color: theme.subtext }]}>
              Atau gunakan Karakter Preset:
            </Text>

            <View style={styles.avatarGrid}>
              {avatarOptions.map((opt, oIdx) => (
                <TouchableOpacity
                  key={oIdx}
                  style={[styles.avatarGridItem, { backgroundColor: isDarkMode ? "#374151" : "#F9FAFB", borderColor: theme.border }]}
                  onPress={() => selectAvatar(opt.url)}
                >
                  <Image source={{ uri: opt.url }} style={styles.gridAvatarImg} />
                  <Text style={[styles.gridAvatarName, { color: theme.text }]}>{opt.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.cancelSheetBtn} onPress={() => setAvatarModalVisible(false)}>
              <Text style={styles.cancelSheetBtnText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 3. Modal: Keamanan Akun */}
      <Modal visible={securityModalVisible} transparent={true} animationType="fade" onRequestClose={() => setSecurityModalVisible(false)}>
        <View style={styles.modalOverlayCenter}>
          <View style={[styles.alertCard, { backgroundColor: theme.sheetBg }]}>
            <Text style={[styles.alertTitle, { color: theme.text }]}>Ganti Kata Sandi</Text>
            <TextInput
              style={[styles.alertInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBg }]}
              value={currentPw}
              onChangeText={setCurrentPw}
              placeholder="Kata Sandi Sekarang"
              placeholderTextColor={theme.subtext}
              secureTextEntry={true}
            />
            <TextInput
              style={[styles.alertInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBg }]}
              value={newPw}
              onChangeText={setNewPw}
              placeholder="Kata Sandi Baru"
              placeholderTextColor={theme.subtext}
              secureTextEntry={true}
            />
            <TextInput
              style={[styles.alertInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBg }]}
              value={confirmPw}
              onChangeText={setConfirmPw}
              placeholder="Konfirmasi Kata Sandi Baru"
              placeholderTextColor={theme.subtext}
              secureTextEntry={true}
            />
            <View style={styles.alertBtnRow}>
              <TouchableOpacity style={styles.alertBtnCancel} onPress={() => setSecurityModalVisible(false)}>
                <Text style={styles.alertBtnCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.alertBtnSave} onPress={handleSavePassword}>
                <Text style={styles.alertBtnSaveText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 4. Modal: Kebijakan Privasi */}
      <Modal visible={privacyModalVisible} transparent={true} animationType="slide" onRequestClose={() => setPrivacyModalVisible(false)}>
        <View style={styles.modalOverlayBottom}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.sheetBg }]}>
            <View style={styles.dragBar} />
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Kebijakan Privasi Stay Care</Text>
            <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false}>
              <Text style={[styles.policyText, { color: theme.text }]}>
                Stay Care berkomitmen penuh melindungi data privasi Anda. Semua hasil diagnosis mental, Certainty Factor, dan data catatan medis Anda sepenuhnya bersifat lokal dan rahasia.{"\n\n"}
                Kami tidak membagikan data konseling atau identitas Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda.{"\n\n"}
                Dengan menggunakan layanan Stay Care, Anda menyetujui syarat pengumpulan log gejala secara anonim untuk melatih mesin inferensi sistem pakar kami agar menghasilkan akurasi yang lebih baik di masa mendatang.
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.cancelSheetBtn} onPress={() => setPrivacyModalVisible(false)}>
              <Text style={styles.cancelSheetBtnText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 5. Modal: Notifikasi Preferences */}
      <Modal visible={notifyModalVisible} transparent={true} animationType="slide" onRequestClose={() => setNotifyModalVisible(false)}>
        <View style={styles.modalOverlayBottom}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.sheetBg }]}>
            <View style={styles.dragBar} />
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Pengaturan Notifikasi</Text>

            <View style={[styles.toggleItem, { borderBottomColor: theme.border }]}>
              <Text style={[styles.toggleLabel, { color: theme.text }]}>Notifikasi Push HP</Text>
              <Switch value={pushNotify} onValueChange={setPushNotify} />
            </View>

            <View style={[styles.toggleItem, { borderBottomColor: theme.border }]}>
              <Text style={[styles.toggleLabel, { color: theme.text }]}>Email Mingguan</Text>
              <Switch value={emailNotify} onValueChange={setEmailNotify} />
            </View>

            <View style={[styles.toggleItem, { borderBottomColor: theme.border }]}>
              <Text style={[styles.toggleLabel, { color: theme.text }]}>Pengingat Relaksasi Harian</Text>
              <Switch value={reminders} onValueChange={setReminders} />
            </View>

            <TouchableOpacity style={styles.cancelSheetBtn} onPress={() => setNotifyModalVisible(false)}>
              <Text style={styles.cancelSheetBtnText}>Simpan Pengaturan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 6. Modal: Logout Confirmation */}
      <Modal visible={logoutModalVisible} transparent={true} animationType="fade" onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlayCenter}>
          <View style={[styles.alertCard, { backgroundColor: theme.sheetBg }]}>
            <Text style={[styles.alertTitle, { color: theme.text }]}>Konfirmasi Keluar</Text>
            <Text style={[styles.policyText, { textAlign: "center", marginBottom: 20, color: theme.text }]}>
              Apakah Anda yakin ingin keluar dari akun Stay Care Anda?
            </Text>
            <View style={styles.alertBtnRow}>
              <TouchableOpacity style={styles.alertBtnCancel} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.alertBtnCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.alertBtnSave, { backgroundColor: "#EF4444" }]} onPress={handleLogout}>
                <Text style={styles.alertBtnSaveText}>Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  editNameBtn: {
    marginLeft: 8,
    padding: 4,
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 10,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#BAD3F8",
  },
  editPhotoBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#2E5788",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  statsStack: {
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  statIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statInfo: {
    flex: 1,
  },
  statVal: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
  },
  chartCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  chartHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  chartSubtitle: {
    fontSize: 10,
    fontWeight: "600",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 180,
    paddingBottom: 10,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
  },
  barStack: {
    width: 16,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  barSegmentTop: {
    backgroundColor: "#7C3AED", // Purple top segment
    width: "100%",
  },
  barSegmentMid: {
    backgroundColor: "#2E5788", // Blue middle segment
    width: "100%",
  },
  barSegmentBottom: {
    backgroundColor: "#A7F3D0", // Emerald light segment
    width: "100%",
  },
  chartDayLabel: {
    fontSize: 8,
    fontWeight: "600",
  },
  settingsSection: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsSectionHeader: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  settingsSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalOverlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  alertCard: {
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  alertInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 16,
  },
  alertBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alertBtnCancel: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  alertBtnCancelText: {
    color: "#4B5563",
    fontWeight: "bold",
  },
  alertBtnSave: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#2E5788",
  },
  alertBtnSaveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  bottomSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
    maxHeight: height * 0.8,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 18,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 18,
  },
  galleryPickBtn: {
    flexDirection: "row",
    backgroundColor: "#2E5788",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  galleryPickBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  avatarGridItem: {
    width: "48%",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  gridAvatarImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  gridAvatarName: {
    fontSize: 11,
    fontWeight: "600",
  },
  cancelSheetBtn: {
    backgroundColor: "#2E5788",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelSheetBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  sheetScroll: {
    maxHeight: 250,
    marginBottom: 20,
  },
  policyText: {
    fontSize: 12,
    lineHeight: 18,
  },
  toggleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    marginBottom: 8,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
});
