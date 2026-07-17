import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from "react-native";
import { Avatar, Badge } from "react-native-paper";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface NavbarProps {
  title: string;
  showBack?: boolean;
  showProfile?: boolean;
  profileRole?: string;
  showNotification?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  rightElement?: React.ReactNode;
}

export default function Navbar({
  title,
  showBack = false,
  showProfile = false,
  profileRole = "User",
  showNotification = false,
  notificationCount = 0,
  onNotificationPress,
  rightElement,
}: NavbarProps) {
  const handleBack = () => {
    router.back();
  };

  const handleProfilePress = () => {
    router.push("/profil");
  };

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbarContent}>
        {/* Left Side: Back Button or Profile/Logo */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity onPress={handleBack} style={styles.iconButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#1F2E59" />
            </TouchableOpacity>
          ) : showProfile ? (
            <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton} activeOpacity={0.8}>
              <Avatar.Text
                size={36}
                label={profileRole.charAt(0).toUpperCase()}
                style={styles.avatar}
                labelStyle={styles.avatarLabel}
              />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons name="leaf" size={26} color="#2E5A88" style={styles.logoIcon} />
          )}
        </View>

        {/* Center: Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right Side: Notifications or custom right elements */}
        <View style={styles.rightSection}>
          {rightElement ? (
            rightElement
          ) : showNotification ? (
            <TouchableOpacity 
              onPress={onNotificationPress || (() => alert("Membuka Notifikasi"))} 
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="bell-outline" size={24} color="#1F2E59" />
              {notificationCount > 0 && (
                <Badge style={styles.badge} size={16}>
                  {notificationCount}
                </Badge>
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingTop: Platform.OS === "ios" ? 44 : 20, // Handle status bar heights
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  navbarContent: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftSection: {
    width: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    width: 48,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2E59",
    letterSpacing: 0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(46, 90, 136, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileButton: {
    borderRadius: 18,
    overflow: "hidden",
  },
  avatar: {
    backgroundColor: "#2E5A88",
  },
  avatarLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  logoIcon: {
    marginLeft: 4,
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#EF4444",
    color: "#FFF",
    fontWeight: "bold",
  },
});
