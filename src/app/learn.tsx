import BottomNavigation from "@/components/BottomNavigation";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EEF8" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1F2E59" }}>
          Learn Screen
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          Coming Soon...
        </Text>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}
