import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Sproutie from "../../../assets/images/sproutie.svg"

import MissionHeader from "../../../components/MissionHeader";
import PlantsScroll from "../../../components/PlantsScroll";

export default function MissaoScreen({ }) {
   const params = useLocalSearchParams(); 
  const id_mission = params?.id ? Number(params.id) : undefined;

  // MOCK TEMPORÁRIO 
  const [missionData, setMissionData] = useState({
    activitiesCompleted: 20,
    totalActivities: 40,
    pointsEarned: 15,
    description: "Water your plants everyday for a week.",
  });

  return (
    <ScrollView style={styles.container}>
        <MissionHeader id_mission={id_mission}/>

        <Text style={styles.desc}>{missionData.description}</Text>

        <View style={styles.infocontainer}>
          <View style={styles.card}>
            <Text style={styles.bold}>{missionData.activitiesCompleted}/{missionData.totalActivities}</Text>
            <Text style={styles.text}>activities completed</Text>
          </View>

          <View style={styles.card}>
            <View style={ {flexDirection: "row", }}>
              <Sproutie width="35" height="35"/>
              <Text style={styles.bold}>{missionData.pointsEarned}</Text>
            </View>
            <Text style={styles.text}>points earned</Text>
          </View>
        </View>

      <PlantsScroll id_mission={id_mission} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    gap: 20
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
    fontWeight:"500",
    color: "#FFFFFF",
    fontSize: 30,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 14,
    textAlign:"center"
  },
});
