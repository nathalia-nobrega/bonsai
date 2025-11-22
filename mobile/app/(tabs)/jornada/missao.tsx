import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import Sproutie from "../../../assets/images/sproutie.svg";

import MissionHeader from "../../../components/MissionHeader";
import PlantsScroll from "../../../components/PlantsScroll";

export default function MissaoScreen() {
  const params = useLocalSearchParams();
  const missionId = params?.id;

  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  const API_URL = `http://${host}:3000/api/journeys/`;

  useEffect(() => {
    async function loadMission() {
      try {
        if (!missionId) {
          console.log("Nenhum ID recebido na tela de missão");
          return;
        }

        const response = await fetch(API_URL + missionId);

        const data = await response.json();
        console.log("Missão carregada:", data);

        setMission(data);
      } catch (err) {
        console.log("Erro ao carregar missão:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMission();
  }, [missionId]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#5C9F60" />
      </View>
    );
  }

  if (!mission) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontSize: 16 }}>Missão não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <MissionHeader missionId={missionId} />

      <Text style={styles.desc}>{mission.description}</Text>

      <View style={styles.infocontainer}>
        <View style={styles.card}>
          <Text style={styles.bold}>
            {mission.activitiesCompleted}/{mission.activitiesFinal}
          </Text>
          <Text style={styles.text}>activities completed</Text>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <Sproutie width="35" height="35" />
            <Text style={styles.bold}>{mission.pointsEarned}</Text>
          </View>
          <Text style={styles.text}>points earned</Text>
        </View>
      </View>

      <PlantsScroll plantIds={mission.relatedPlants} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#2B2B2B",
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
  },
  infocontainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  card: {
    backgroundColor: "#5C9F60",
    width: 130,
    height: 130,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bold: {
    fontWeight: "500",
    color: "#FFFFFF",
    fontSize: 30,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
});
