import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AccountModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAccount: (accountName: string, email: string) => void;
}

export default function AccountModal({ visible, onClose, onSelectAccount }: AccountModalProps) {
  const dummyAccounts = [
    { name: "Stay Care Admin", email: "admin@staycare.com" },
    { name: "Ziza (User)", email: "ziza@gmail.com" },
    { name: "Default Account", email: "your@mail.com" },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Click outside backdrop to close */}
        <TouchableOpacity style={styles.absoluteClose} activeOpacity={1} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Header */}
          <Text style={styles.modalTitle}>Account</Text>
          <Text style={styles.modalSubtitle}>select an account to proceed to Stay Care</Text>

          {/* Account Options */}
          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {dummyAccounts.map((account, index) => (
              <View key={index}>
                <TouchableOpacity 
                  style={styles.optionRow} 
                  onPress={() => onSelectAccount(account.name, account.email)}
                >
                  <View style={styles.avatarCircle}>
                    <MaterialCommunityIcons name="account" size={22} color="#FFFFFF" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.optionLabel}>{account.name}</Text>
                    <Text style={styles.optionEmail}>{account.email}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.dividerLine} />
              </View>
            ))}

            {/* Add Account Option */}
            <TouchableOpacity 
              style={styles.optionRow} 
              onPress={() => onSelectAccount("New Account", "add-new-account")}
            >
              <View style={styles.addIconCircle}>
                <MaterialCommunityIcons name="account-plus-outline" size={22} color="#000000" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.addAccountLabel}>Add account</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)", // Semi-transparent blurred dark overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  absoluteClose: {
    ...StyleSheet.absoluteFill,
  },
  modalCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E2C4F",
    textAlign: "center",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  optionsList: {
    width: "100%",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    width: "100%",
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000000", // Dark circle matching the mockup
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  addIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2C4F",
  },
  optionEmail: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 1,
  },
  addAccountLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2C4F",
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
});
