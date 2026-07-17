import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { useAuthStore } from "../../services/authStore";

export default function TabsLayout() {
  const { isDarkMode } = useAuthStore();

  const theme = {
    tabBarBg: isDarkMode ? "#1F1F1F" : "#FFFFFF",
    tabBarBorder: isDarkMode ? "#374151" : "#E5E7EB",
    activeBg: isDarkMode ? "#2E5788" : "#7EA5DE",
    activeLabel: isDarkMode ? "#FFFFFF" : "#1F2E59",
    inactiveLabel: isDarkMode ? "#9CA3AF" : "#4B5563",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide the default text labels entirely
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.tabBarBg, borderTopColor: theme.tabBarBorder }],
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? [styles.activeTabContainer, { backgroundColor: theme.activeBg }] : styles.inactiveTabContainer}>
              <MaterialCommunityIcons 
                name={focused ? "home" : "home-outline"} 
                size={22} 
                color={focused ? theme.activeLabel : theme.inactiveLabel} 
              />
              <Text style={[focused ? styles.activeLabel : styles.inactiveLabel, { color: focused ? theme.activeLabel : theme.inactiveLabel }]} numberOfLines={1}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="diagnosis"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? [styles.activeTabContainer, { backgroundColor: theme.activeBg }] : styles.inactiveTabContainer}>
              <MaterialCommunityIcons 
                name={focused ? "head-cog" : "head-cog-outline"} 
                size={22} 
                color={focused ? theme.activeLabel : theme.inactiveLabel} 
              />
              <Text style={[focused ? styles.activeLabel : styles.inactiveLabel, { color: focused ? theme.activeLabel : theme.inactiveLabel }]} numberOfLines={1}>Diagnosis</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? [styles.activeTabContainer, { backgroundColor: theme.activeBg }] : styles.inactiveTabContainer}>
              <MaterialCommunityIcons 
                name={focused ? "history" : "clock-outline"} 
                size={22} 
                color={focused ? theme.activeLabel : theme.inactiveLabel} 
              />
              <Text style={[focused ? styles.activeLabel : styles.inactiveLabel, { color: focused ? theme.activeLabel : theme.inactiveLabel }]} numberOfLines={1}>History</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? [styles.activeTabContainer, { backgroundColor: theme.activeBg }] : styles.inactiveTabContainer}>
              <MaterialCommunityIcons 
                name={focused ? "book-open-page-variant" : "book-open-outline"} 
                size={20} 
                color={focused ? theme.activeLabel : theme.inactiveLabel} 
              />
              <Text style={[focused ? styles.activeLabel : styles.inactiveLabel, { color: focused ? theme.activeLabel : theme.inactiveLabel }]} numberOfLines={1}>Learn</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? [styles.activeTabContainer, { backgroundColor: theme.activeBg }] : styles.inactiveTabContainer}>
              <MaterialCommunityIcons 
                name={focused ? "account" : "account-outline"} 
                size={22} 
                color={focused ? theme.activeLabel : theme.inactiveLabel} 
              />
              <Text style={[focused ? styles.activeLabel : styles.inactiveLabel, { color: focused ? theme.activeLabel : theme.inactiveLabel }]} numberOfLines={1}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 76,
    borderTopWidth: 1,
    paddingBottom: 4,
    paddingTop: 4,
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarIcon: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabContainer: {
    borderRadius: 16,
    paddingHorizontal: 2,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginHorizontal: 2,
    height: 58,
  },
  inactiveTabContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginHorizontal: 2,
    height: 58,
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },
  inactiveLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },
});
