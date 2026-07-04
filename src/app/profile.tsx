import BottomNavigation from "@/components/BottomNavigation";
import { useAuthStore } from "@/services/authStore";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace("/login" as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EEF8" }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#1F2E59",
              marginBottom: 16,
            }}
          >
            Profile
          </Text>

          {/* User Card */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#5B8AC5",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 28 }}>👤</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#1F2E59",
                  }}
                >
                  {user?.name || "User"}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#666",
                    marginTop: 2,
                  }}
                >
                  {user?.email || "user@example.com"}
                </Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#5B8AC5", marginRight: 12 }}>
                ⚙️
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#1F2E59",
                }}
              >
                Settings
              </Text>
            </View>
            <Text style={{ fontSize: 20, color: "#999" }}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#5B8AC5", marginRight: 12 }}>
                ❓
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#1F2E59",
                }}
              >
                Help & Support
              </Text>
            </View>
            <Text style={{ fontSize: 20, color: "#999" }}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 32,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#5B8AC5", marginRight: 12 }}>
                ℹ️
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#1F2E59",
                }}
              >
                About
              </Text>
            </View>
            <Text style={{ fontSize: 20, color: "#999" }}>›</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "#FF6B6B",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "#fff", marginRight: 8 }}>
              🚪
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}
