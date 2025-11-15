import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import CrownIcon from "../assets/images/crown.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileHeader({ user }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/image.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.0)", "rgba(33,57,35,0.5)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.overlay}
        />

        <View style={styles.circle}>
          <Image
            source={{ uri: user.photoUrl }}
            style={styles.circleImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.name}>{user.name}</Text>
      </ImageBackground>

      <View style={styles.transparentBox}>
        <View style={styles.statsContainer}>
          <View style={styles.levelBox}>
            <CrownIcon width={28} height={28} />
            <Text style={styles.levelText}>lv.{user.level}</Text>
          </View>

          {/* divisória */}
          <View style={styles.divider} />

          <View style={styles.statsTextBox}>
            <Text style={styles.statsText}>
              <Text style={styles.bold}>{user.points}</Text> points earned
            </Text>
            <Text style={styles.statsText}>
              <Text style={styles.bold}>{user.plants}</Text> plants still standing
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 70,
  },
  header: {
    width: "100%",
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  circleImage: {
    borderRadius: 100,
    width: "80%",
    height: "80%",
  },
  name: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },

  transparentBox: {
    position: "absolute",
    bottom: -50,
    width: 300,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.23)", 
    borderWidth: 2,
    borderColor: "rgba(207, 207, 207, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    zIndex: 1,
  },
  statsContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  levelBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "#ddd",
    marginHorizontal: 35,
  },
  levelText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    marginTop: 4,
  },
  statsTextBox: {
    flexDirection: "column",
    justifyContent: "center",
  },
  statsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#555",
  },
  bold: {
    fontFamily: "Poppins-SemiBold",
    color: "#000",
  },
});
