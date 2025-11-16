import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import BackgroundSVG from "../../../assets/images/path.svg";
import PathwaySVG from "../../../assets/images/pathway.svg";

import MissionList from "../../../components/MissionList";

export default function JornadaScreen() {
  const scrollRef = useRef(null);

  const [missions, setMissions] = useState([]);

  const missionsMock = [
    { id: "1", title: "First Sprout" },
    { id: "2", title: "New Life" },
    { id: "3", title: "Triple Threat" },
    { id: "4", title: "Rainy Season" },
    { id: "5", title: "Trimming Time" },
  ];

  useEffect(() => {
    setTimeout(() => setMissions(missionsMock), 200);
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

          <MissionList missions={missions} activeMission="2" />
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
    top: 30,   // ajuste fino para alinhar com a primeira missão
    left: 20,  // shift horizontal para bater certinho no centro
    zIndex: -1,
  },

});
