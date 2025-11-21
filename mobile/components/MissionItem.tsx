import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import SeedIcon from "../assets/images/mission #1 icon.svg";
import SproutIcon from "../assets/images/misson #2 icon.svg";
import BloomIcon from "../assets/images/misson #3 icon.svg";
import WaterIcon from "../assets/images/mission #4 icon.svg";
import LeafIcon from "../assets/images/mission #5 icon.svg";

export default function MissionItem({ id, title, status, order }) {
  const isActive = status === "active";

  const ICON_SIZE = isActive ? 80 : 90;
  const CIRCLE_SIZE = isActive ? 125 : 110;

  const getIcon = () => {
    switch (order) {
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

  return (
    <Pressable
      style={[styles.container]}
      onPress={() => router.push({ pathname: "/(tabs)/jornada/missao", params: { id: id }, }) }
    >
      <BlurView
        intensity={50}
        tint="light"
        style={{
          borderRadius: 100,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderWidth: 1,
          borderColor: isActive
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.5)",
        }}
      >
        {getIcon()}
      </BlurView>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 50,
  },
  
  circle: {},

  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
