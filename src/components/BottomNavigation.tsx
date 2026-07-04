import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: "🏠", route: "/home-dashboard" },
    { label: "Diagnosis", icon: "📋", route: "/diagnosis" },
    { label: "History", icon: "📜", route: "/history" },
    { label: "Learn", icon: "📚", route: "/learn" },
    { label: "Profile", icon: "👤", route: "/profile" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        paddingBottom: 8,
        paddingTop: 8,
        justifyContent: "space-around",
        alignItems: "flex-end",
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            onPress={() => router.push(item.route as any)}
            style={{
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 12,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 4,
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {item.icon}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: isActive ? "#5B8AC5" : "#999",
                fontWeight: isActive ? "600" : "400",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
