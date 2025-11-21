import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import BackgroundSVG from "../../../assets/images/path.svg";
import PathwaySVG from "../../../assets/images/pathway.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MissionList from "../../../components/MissionList";
import Constants from "expo-constants";

export default function JornadaScreen() {
  const scrollRef = useRef(null);

  const [missions, setMissions] = useState([]);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  const API_URL = `http://${host}:3000/api/journeys/user/`;

  useEffect(() => {
    async function load() {
      try {
        const id = await AsyncStorage.getItem("userId");
        console.log("User ID carregado:", id);

        if (!id) {
          console.log("Nenhum userId encontrado");
          return;
        }

        const response = await fetch(API_URL + id);
        
        if (!response.ok) {
          console.log("Erro ao buscar jornadas", response.status);
          return;
        }

        const data = await response.json();
        console.log("Jornadas carregadas:", data);

        setMissions(data || []); 
      } catch (err) {
        console.log("Erro ao carregar missões:", err);
      }
    }

    load();
  }, []);

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

          <MissionList missions={missions} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -10,
  },

  cropContainer: {
    flex: 1,
    marginTop: 180,
    overflow: "hidden",
  },

  scrollContent: {
    paddingBottom: 200,
  },

  trailContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: -1,
  },
});
