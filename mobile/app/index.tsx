import React from "react";
import { 
  View, 
  Text, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // ✅ import correto
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.0)", "rgba(33,57,35,0.5)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.overlay}
      />

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
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.signInText} onPress={() => router.push("/signin")}>
            Sign In
          </Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    zIndex: 2,
  },
  imageWrapper: {
    position: "absolute",
    top: -100,
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
    position: "absolute",
    top: 180,
    fontSize: 32,
    color: "white",
    textAlign: "left",
    right: -140,
    fontFamily: "Nunito-ExtraBold",
},
  button: {
    position: "absolute",
    top: 290,
    backgroundColor: "white",
    borderRadius: 28,
    paddingVertical: 15,
    paddingHorizontal: 115,
    right: -170,
  },
  buttonText: {
    color: "#5C9F60",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  footerText: {
    position: "absolute",
    top: 380,
    fontWeight: "200",
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  signInText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
});
