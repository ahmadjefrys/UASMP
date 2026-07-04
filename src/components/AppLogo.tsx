import { View } from "react-native";

interface AppLogoProps {
  size?: number;
}

export function AppLogo({ size = 64 }: AppLogoProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        backgroundColor: "#355E8E",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 5,
      }}
    >
      <View
        style={{
          width: size * 0.56,
          height: size * 0.56,
          borderRadius: size * 0.28,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: size * 0.24,
            height: size * 0.24,
            borderRadius: size * 0.12,
            backgroundColor: "#355E8E",
          }}
        />
      </View>
    </View>
  );
}
