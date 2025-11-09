// app/signin.tsx
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Flor from "../assets/images/flower.svg";
import Balao from "../assets/images/balao bg.svg";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Signin() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require("../assets/images/image.png")}
          style={styles.background}
          resizeMode="cover"
        >
          {/* Gradiente escuro */}
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(33, 57, 35, 1)"]}
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.overlay}
          />

          {/* Flor e balao */}
          <View style={styles.floatingImage}>
            <Flor width={120} height={130} />
            <View style={styles.speakerBubble}>
              <Balao width={150} height={120} style={styles.speakerBubble} />
              <Text style={styles.speakerText}>Welcome back!</Text>
            </View>
          </View>

          {/* Metade inferior branca */}
          <View style={styles.halfWhiteBackground}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.container}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.container}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder="Enter your password"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(tabs)/home")}
            >
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },

  container: {
    zIndex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  floatingImage: {
    position: "absolute",
    bottom: "80%",
    left: 15,
    width: 20,
    height: 1,
    marginBottom: -10,
    resizeMode: "contain",
  },

  speakerBubble: {
    position: "absolute",
    top: -40,
    left: 15,
    width: 140,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  speakerText: {
    position: "absolute",
    top: -1,
    left: 20,
    color: "#3C3C3C",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 8,
  },

  halfWhiteBackground: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 200,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 250,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5C9F60",
    marginBottom: 10,
    marginTop: 10,
    left: 10,
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f2f2f208",
    borderRadius: 30,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#5C9F60",
    textAlign: "left",
    textAlignVertical: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5C9F60",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#5C9F60",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 160,
    marginTop: 50,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
