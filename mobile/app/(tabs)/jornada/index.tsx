import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import BackgroundSVG from "../../../assets/images/path.svg";
import PathwaySVG from "../../../assets/images/pathway.svg";

import MissionList from "../../../components/MissionList";

import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Journey {
  name: string;
  status: string;
  order: number;
}

const host =
  Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
  Constants?.expoConfig?.hostUri?.split(":")[0];

export default function JornadaScreen() {
  const scrollRef = useRef(null);

  const [missions, setMissions] = useState<Journey[]>([]);
  const [activeMission, setActiveMission] = useState<Journey | null>(null);

  const loadMissions = React.useCallback(async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;

    try {
      const resAll = await fetch(
        `http://${host}:3000/api/journeys/user/${userId}`
      );
      const dataAll = await resAll.json();

      const resActive = await fetch(
        `http://${host}:3000/api/journeys/user/${userId}/active`
      );
      const active = await resActive.json();

      setMissions(dataAll);
      setActiveMission(active);
    } catch (err) {
      console.log("Erro ao carregar missões", err);
    }
  }, []);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  return (
    <View style={styles.container}>
      <BackgroundSVG width="100%" height="100%" style={styles.background} />

      <View style={styles.cropContainer}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.trailContainer}>
            {missions.slice(0, -1).map((_, index) => (
              <PathwaySVG
                key={index}
                width={230}
                height={260}
                style={{
                  position: "absolute",
                  top: index * 190,
                  left: index % 2 === 0 ? 10 : 110,
                  transform: [{ scaleX: index % 2 === 0 ? 1 : -1 }],
                }}
              />
            ))}
          </View>
          <MissionList
            missions={missions}
            activeMission={activeMission?.order}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: "absolute", top: 0, left: 0, zIndex: -10 },
  cropContainer: { flex: 1, marginTop: 180, overflow: "hidden" },
  scrollContent: { paddingBottom: 200 },
  trailContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: -1,
  },
});
