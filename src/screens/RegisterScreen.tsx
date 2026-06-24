import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function RegisterScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1F2E59" }}>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 120,
            height: 120,
          }}
        />
      </View>

      <View
        style={{
          flex: 0.5,
          backgroundColor: "white",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          padding: 20,
        }}
      >
        <Button
          mode="contained"
          style={{ marginBottom: 20 }}
          onPress={() => router.push("/login")}
        >
          Sign In
        </Button>

        <Button
          mode="outlined"
          style={{ marginBottom: 20 }}
        >
          Sign Up
        </Button>

        <Button
          mode="outlined"
          icon="google"
        >
          Google
        </Button>
      </View>
    </View>
  );
}