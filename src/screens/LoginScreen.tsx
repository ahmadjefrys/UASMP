import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1F2E59" }}>
      {/* Logo Area */}
      <View
        style={{
          flex: 0.35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 90,
            height: 90,
          }}
          resizeMode="contain"
        />
      </View>

      {/* Form Area */}
      <View
        style={{
          flex: 0.65,
          backgroundColor: "#fff",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          padding: 25,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            color: "#355E8E",
            marginBottom: 25,
          }}
        >
          Sign In
        </Text>

        <Text>Email</Text>

        <TextInput
          mode="outlined"
          placeholder="your@email.com"
          style={{ marginTop: 5 }}
        />

        <Text style={{ marginTop: 15 }}>Password</Text>

        <TextInput
          mode="outlined"
          secureTextEntry
          placeholder="********"
          style={{ marginTop: 5 }}
        />

        <Button
          mode="contained"
          style={{
            marginTop: 25,
            borderRadius: 10,
          }}
        >
          Login user/Admin
        </Button>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#ccc",
            }}
          />

          <Text style={{ marginHorizontal: 10 }}>
            Or
          </Text>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
        </View>

        <Button
          mode="outlined"
          icon="google"
        >
          Google
        </Button>

        <TouchableOpacity
          onPress={() => router.push("/register")}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}