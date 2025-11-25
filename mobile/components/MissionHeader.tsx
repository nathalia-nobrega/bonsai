import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

import Stars from "../assets/images/stars.svg";
import SeedIcon from "../assets/images/mission #1 icon.svg";
import SproutIcon from "../assets/images/misson #2 icon.svg";
import BloomIcon from "../assets/images/misson #3 icon.svg";
import WaterIcon from "../assets/images/mission #4 icon.svg";
import LeafIcon from "../assets/images/mission #5 icon.svg";

export default function MissionHeader({ missionId }) {
  const [mission, setMission] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  const API_URL = `http://${host}:3000/api/journeys/`;

  // ----------- CARREGAR MISSÃO -------------
  useEffect(() => {
    async function loadMission() {
      try {
        if (!missionId) {
          console.log("Nenhum missionId recebido.");
          setLoaded(true);
          return;
        }

        console.log("Buscando missão:", missionId);

        const response = await fetch(API_URL + missionId);
        const data = await response.json();

        console.log("RESPOSTA DO BACKEND:", data);

        // Se o backend retorna { mission: { ... } }
        if (data?.mission) {
          setMission(data.mission);
        } else {
          setMission(data);
        }

      } catch (err) {
        console.log("Erro ao carregar missão:", err);
      } finally {
        setLoaded(true);
      }
    }

    loadMission();
  }, [missionId]);

  // ----------- LOADING -------------
  if (!loaded) {
    return (
      <View style={{ marginTop: 100 }}>
        <ActivityIndicator size="large" color="#3F7642" />
      </View>
    );
  }

  // ----------- MISSÃO NÃO ENCONTRADA -------------
  if (!mission) {
    return (
      <View style={{ padding: 40 }}>
        <Text style={{ color: "#333", fontSize: 16 }}>
          Missão não encontrada.
        </Text>
      </View>
    );
  }

  // ----------- CÁLCULO DE PROGRESSO -------------
  const progress = mission.activitiesFinal > 0
    ? Math.round((mission.activitiesCompleted / mission.activitiesFinal) * 100)
    : 0;

  const ICON_SIZE = 120;

  const getIcon = () => {
    switch (mission.order) {
      case 1: return <SeedIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 2: return <SproutIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 3: return <BloomIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 4: return <WaterIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 5: return <LeafIcon width={ICON_SIZE} height={ICON_SIZE} />;
      default: return <SeedIcon width={ICON_SIZE} height={ICON_SIZE} />;
    }
  };

  const renderStars = () => {
    if (progress > 100) {
      return (
        <View style={styles.starsContainer}>
          <Stars width={150} height={150} />
        </View>
      );
    }
    return null;
  };

  // ----------- UI PRINCIPAL -------------
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

        {renderStars()}

        <BlurView intensity={40} tint="light" style={styles.blurCircle}>
          {getIcon()}
        </BlurView>
      </ImageBackground>

      <BlurView intensity={40} tint="light" style={styles.infoBox}>
        <View style={styles.box}>
          <Text style={styles.title}>{mission.name}</Text>

          <View style={styles.row}>
            <Text style={styles.level}>Lv.{mission.order}</Text>

            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${progress}%` }]} />
            </View>

            <Text style={styles.percent}>{progress}%</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 70 },

  header: {
    width: "100%",
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },

  overlay: { ...StyleSheet.absoluteFillObject },

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

  infoBox: {
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
  },

  box: {
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
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

  level: { fontSize: 12, fontFamily: "Poppins-Medium", color: "#3C3C3C" },

  percent: { fontSize: 12, fontFamily: "Poppins-Medium", color: "#3C3C3C" },

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
  },

  starsContainer: { position: "absolute", top: 10 },
});
