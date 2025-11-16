import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import Stars from "../assets/images/stars.svg"

import SeedIcon from "../assets/images/mission #1 icon.svg";
import SproutIcon from "../assets/images/misson #2 icon.svg";
import BloomIcon from "../assets/images/misson #3 icon.svg";
import WaterIcon from "../assets/images/mission #4 icon.svg";
import LeafIcon from "../assets/images/mission #5 icon.svg";

export default function MissionHeader({ id_mission }) {

  const mission = {
    id: id_mission,
    title: "Raining Season",
    progress: 100,
  };

  const ICON_SIZE = 120;

  // Escolher ícone baseado no ID
  const getIcon = () => {
    switch (id_mission) {
      case 1:
        return <SeedIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 2:
        return <SproutIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 3:
        return <BloomIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 4:
        return <WaterIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 5:
        return <LeafIcon width={ICON_SIZE} height={ICON_SIZE} />;
      default:
        return <SeedIcon width={ICON_SIZE} height={ICON_SIZE} />;
    }
  };

  const renderStars = () => {
    if (mission.progress === 100) {
      return (
        <View style={styles.starsContainer}>
          <Stars width={150} height={150} />
        </View>
      );
    }
    return null;
  };

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

      {/* CÍRCULO COM BLUR */}
      {renderStars()}
      <BlurView
        intensity={40}
        tint="light"
        style={styles.blurCircle}
      >
        {getIcon()}
      </BlurView>
      </ImageBackground>

      {/* CAIXA BRANCA */}
      <BlurView
        intensity={40}
        tint="light"
        style={{
        position: "absolute",
        bottom: -50,
        width: 300,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "rgba(207,207,207,0.4)",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        overflow: "hidden",
        }}
    >
        <View style={styles.box}>
            <Text style={styles.title}>{mission.title}</Text>

            <View style={styles.row}>
                <Text style={styles.level}>Lv.{mission.id}</Text>

                <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${mission.progress}%` }]} />
                </View>

                <Text style={styles.percent}>{mission.progress}%</Text>
            </View>
            </View>
        </BlurView>
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

  blurCircle: {
    borderRadius: 100,
    overflow: "hidden",
    borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderWidth: 1,
    marginTop: 40,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 18,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#3C3C3C",
    marginBottom: 8,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  level: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#3C3C3C",
    width: 27,
    textAlign: "left",
  },

  percent: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#3C3C3C",
    width: 30,
    textAlign: "right",
  },

  barBackground: {
    flex: 1,
    height: 12,
    backgroundColor: "#5C9F60",
    borderRadius: 20,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#3F7642",
    borderRadius: 20,
  },
  starsContainer: {
    position: "absolute",
    top: 10,
  },
});
