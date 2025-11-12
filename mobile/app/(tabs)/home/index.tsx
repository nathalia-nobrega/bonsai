//-- this page will answer to home with daily missions, your garden and current mission
import React from "react";
import { 
  View, 
  Text, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // ✅ import correto
import { useRouter } from "expo-router";
import { s } from "./styleHome"

export default function Index() {
  const router = useRouter();
  const {width, height} = useWindowDimensions();
  return (
    <ImageBackground
      source={require("../../../assets/images/image.png")}
      style={s.background}
      resizeMode="cover"
      >
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(33, 57, 35, 1)"]}
        start={{ x: 0.5, y: 0.1 }}
        end={{ x: 0.5, y: 1 }}
        style={s.overlay}
    />

      <View style={[s.halfWhiteBackground, { paddingTop: height * 0.1, paddingVertical: height * 0.1 } ]}></View>
      </ImageBackground>

  );
};