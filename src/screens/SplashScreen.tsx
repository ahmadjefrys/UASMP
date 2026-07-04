import { Text, View } from "react-native";
import { Button } from "react-native-paper";

interface HomeScreenProps {
  onSignOut: () => void;
}

export default function HomeScreen({ onSignOut }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "#EAF4FF", padding: 24, justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 28,
          padding: 28,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 12 },
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#1F2E59", marginBottom: 12 }}>
          Welcome to Stay Care
        </Text>
        <Text style={{ fontSize: 16, color: "#52607A", lineHeight: 24, marginBottom: 28 }}>
          You have successfully signed in. Explore mood tracking, guided breathing, and daily wellness support in your new mental health companion.
        </Text>
        <Button mode="contained" onPress={onSignOut} style={{ borderRadius: 12 }} contentStyle={{ height: 52 }}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}

