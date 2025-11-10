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
  useWindowDimensions,
} from "react-native";
import Flor from "../assets/images/flower.svg";
import Balao from "../assets/images/balao bg.svg"
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"

export default function Signup() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
          source={require("../assets/images/image.png")}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={styles.background}
      resizeMode="cover"
    >

      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(33, 57, 35, 1)"]}
        start={{ x: 0.5, y: 0.1 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.overlay}
      />
      {/* Flor e balão, utilizando width e height aqui pq não pode utilizar ambos dentro do stylesheets create!! */}
      <View style={styles.floatingImage}>
        <Flor width={width * 0.25} height={height * 0.15} />
          <View style={[styles.speakerBubble, { width: width * 0.35, height: height * 0.15 }]}>
            <Balao width={width * 0.35} height={height * 0.15} />
            <Text style={styles.speakerText}>Nice to meet you!</Text>
          </View>
      </View>

          {/* Metade inferior branca */}
      <View style={[styles.halfWhiteBackground, { paddingTop: height * 0.15, paddingVertical: height * 0.1 }]}>
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.container}>
          <Text style={styles.label}>Email Adress</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
      {/* Botao de criar conta */}
        <TouchableOpacity
            style={[styles.button, { width: width * 0.9 }]}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    paddingTop: 200,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 250,
  },

  label: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#5C9F60",
    marginBottom: 10,
    marginTop: 15,
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
    color: "#5C9F60",
    marginBottom: 30,
    fontFamily: "Nunito-ExtraBold",
  },
  button: {
    backgroundColor: "#5C9F60",
    borderRadius: 25,
    paddingVertical: 15,
    alignSelf: "center",
    marginTop: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Nunito-ExtraBold",
    fontSize: 16,
    textAlign: "center",
  },
});
