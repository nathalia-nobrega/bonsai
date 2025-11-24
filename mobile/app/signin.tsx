import React, { useState } from "react";
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
  useWindowDimensions,
} from "react-native";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Flor from "../assets/images/flower.svg";
import Balao from "../assets/images/balao bg.svg";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Signin() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  // const host = Constants?.expoGoConfig?.hostUri?.split(':')[0] || 
  //     Constants?.expoConfig?.hostUri?.split(':')[0]

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Validation error",
  //       text2: "Please fill in all fields",
  //       position: "bottom",
  //     });
  //     return;
  //   }

  //   setLoading(true);
    
  //   try {
  //     const response = await fetch(`http://${host}:3000/api/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.log("Login error data:", errorData);

  //       const messageText =
  //         errorData?.content?.message ||
  //         (Array.isArray(errorData?.message)
  //           ? errorData.message.join("\n")
  //           : errorData?.message) || 
  //         "Invalid email or password";

  //       Toast.show({
  //         type: "error",
  //         text1: "Login failed",
  //         text2: messageText,
  //         position: "bottom",
  //       });
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("Login successful:", data);

  //     if (data.token) {
  //       await AsyncStorage.setItem("token", data.token);
  //       await AsyncStorage.setItem("userId", data.user.id);
  //       await AsyncStorage.setItem("userData", JSON.stringify(data.user));
  //     }

  //     const token = await AsyncStorage.getItem("token");
  //     const userId = await AsyncStorage.getItem("userId");
  //     console.log("Token stored:", token);
  //     console.log("User Id stored:", userId);

  //     Toast.show({
  //       type: "success",
  //       text1: "Welcome back!",
  //       text2: "Login successful",
  //       position: "bottom",
  //     });

  //     router.replace("/(tabs)/home");

  //   } catch (err) {
  //     console.error("Network error:", err);

  //     Toast.show({
  //       type: "error",
  //       text1: "Connection error",
  //       text2: "Please check your internet connection and try again.",
  //       position: "bottom",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            >
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

          {/* Flor e balão */}
          <View style={styles.floatingImage}>
            <Flor width={width * 0.25} height={height * 0.15} />
            <View style={[styles.speakerBubble, { width: width * 0.35, height: height * 0.15 }]}>
              <Balao width={width * 0.35} height={height * 0.15} />
              <Text style={styles.speakerText}>Welcome back!</Text>
            </View>
          </View>

          {/* Metade inferior branca */}
          <View style={[styles.halfWhiteBackground, { paddingTop: height * 0.15, paddingVertical: height * 0.1 }]}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.container}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.container}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { width: width * 0.9 }]}
              onPress={() => router.replace("/(tabs)/home")}
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
  floatingImage: {
    position: "absolute",
    top: 190,
    bottom: "75%",
    left: 15,
    zIndex: 1,
  },
  speakerBubble: {
    position: "absolute",
    top: -85,
    left: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  speakerText: {
    position: "absolute",
    top: 45,
    left: 5,
    color: "#3C3C3C",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 8,
    fontFamily: "Poppins-Medium",
  },
  halfWhiteBackground: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 26,
    color: "#5C9F60",
    fontFamily: "Nunito-ExtraBold",
    paddingBottom: 40,
    marginTop: -100,
  },
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 10,
    gap: 6,
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#5C9F60",
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
    textAlignVertical: "center",
  },
  button: {
    backgroundColor: "#5C9F60",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 30,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito-ExtraBold",
    fontSize: 16,
    textAlign: "center",
  },
});
