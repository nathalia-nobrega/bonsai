import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground} from "react-native";
import CrownIcon from "../assets/images/crown.svg"
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileHeader({ user }) {
  return (
    <View style={styles.header}>
        <ImageBackground
          source={require("../assets/images/image.png")}
          style={styles.background}
          resizeMode="cover"
        >
        {/* blur */}
        <LinearGradient
        colors={["rgba(0,0,0,0.0)", "rgba(33,57,35,0.5)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.overlay}
        />
        <Image source={{ uri: user.photoUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>

        <View style={styles.statsContainer}>
            <View style={styles.levelBox}>
                <CrownIcon width={50} height={50} />
                <Text style={styles.levelText}>lv.{user.level}</Text>
            </View>
            <View style={styles.statsTextBox}>
            <Text style={styles.statsText}>{user.points} points earned</Text>
            <Text style={styles.statsText}>{user.plants} plants still standing</Text>
            </View>
        </View>
      </ImageBackground>
    </View>
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
    zIndex: 0,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#4C9A2A",
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    marginBottom: 12,
  },
  name: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 20,
    color: "#fff",
  },
  statsContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  levelBox: {
    flexDirection: "column",
    alignItems:"center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 12,
  },
  levelText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#4C9A2A",
  },
  statsTextBox: {
    flexDirection: "column",
  },
  statsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#555",
  },
});
