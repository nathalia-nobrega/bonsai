import React from "react";
import { 
  View, 
  Text, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet
} from "react-native";

import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/images/florfofa.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>
          Grow your Garden.{"\n"}Grow Yourself.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <TouchableOpacity  onPress={() => router.push("/signin")}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    fontFamily: "Nunito", // instale via expo-font se quiser a mesma fonte
  },
  button: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: "#5C9F60",
    fontWeight: "700",
    fontSize: 16,
  },
  footerText: {
    marginTop: 12,
    fontWeight: "200",
    color: "white",
    textAlign: "center",
    fontFamily: "Nunito",
  },
  signInText: {
    fontWeight: "900",
    color: "white",
  },
});
