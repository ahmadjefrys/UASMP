import BottomNavigation from "@/components/BottomNavigation";
import DailyMoodTracker from "@/components/DailyMoodTracker";
import { useAuthStore } from "@/services/authStore";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeDashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login" as any);
    }
  }, [isAuthenticated]);

  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#E8EEF8" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          scrollIndicatorInsets={{ right: 1 }}
        >
          {/* Header with Logo and Notification */}
          <View
            style={{
              backgroundColor: "#5B8AC5",
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 28,
                  marginRight: 8,
                }}
              >
                🍃
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#fff",
                  letterSpacing: 1,
                }}
              >
                STAYCARE
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={{ fontSize: 24 }}>🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Greeting Section */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#1F2E59",
                marginBottom: 4,
              }}
            >
              Hello, {firstName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                marginBottom: 16,
              }}
            >
              How are you feeling this morning?
            </Text>
          </View>

          {/* Quote Card */}
          <View
            style={{
              marginHorizontal: 16,
              marginBottom: 16,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
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
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#5B8AC5",
                  marginRight: 8,
                }}
              >
                99
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1F2E59",
                lineHeight: 26,
                marginBottom: 12,
              }}
            >
              "The greatest wealth is mental health. Your journey to serenity
              starts with a single step."
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#5B8AC5",
                fontWeight: "500",
              }}
            >
              — Wellness Guide
            </Text>
          </View>

          {/* Stats Grid */}
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              {/* Consultations Card */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
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
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginBottom: 4,
                      }}
                    >
                      Consultations
                    </Text>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: "#1F2E59",
                      }}
                    >
                      12
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#C8E6C9",
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#2E7D32",
                      }}
                    >
                      +2
                    </Text>
                  </View>
                </View>
              </View>

              {/* Minutes Guided Card */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
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
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginBottom: 4,
                      }}
                    >
                      Minutes Guided
                    </Text>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: "#1F2E59",
                      }}
                    >
                      480
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Daily Mood Tracker */}
          <DailyMoodTracker
            onMoodSelect={(mood) => {
              console.log("Mood selected:", mood);
            }}
          />

          {/* Featured Sections */}
          <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1F2E59",
                marginBottom: 12,
              }}
            >
              Recommended for You
            </Text>

            {/* Anxiety Center Card */}
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={() => router.push('/diagnosis?category=anxiety')}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "#5B8AC5",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 24 }}>❤️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1F2E59",
                    marginBottom: 2,
                  }}
                >
                  Anxiety Center
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  Understand triggers and practice calming techniques.
                </Text>
              </View>
              <Text style={{ fontSize: 20, color: "#999" }}>›</Text>
            </TouchableOpacity>

            {/* Sleep Hygiene Card */}
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={() => router.push('/diagnosis?category=insomnia')}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "#9C7DD1",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 24 }}>🌙</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1F2E59",
                    marginBottom: 2,
                  }}
                >
                  Sleep Hygiene
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  Improve your sleep quality with proven techniques.
                </Text>
              </View>
              <Text style={{ fontSize: 20, color: "#999" }}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}
