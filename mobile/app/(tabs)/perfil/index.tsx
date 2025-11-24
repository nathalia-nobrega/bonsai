import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import AchievementIcon from "../../../components/AchievementIcon";

import SeedIcon from "../../../assets/images/first mission.svg";
import SproutIcon from "../../../assets/images/second mission.svg";
import BloomIcon from "../../../assets/images/third mission.svg";
import WaterIcon from "../../../assets/images/fourth mission.svg";
import LeafIcon from "../../../assets/images/fifth mission.svg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { SvgProps } from "react-native-svg";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [plantsCount, setPlantsCount] = useState(0);
  const [finishedMissions, setFinishedMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0] ||
    "localhost";

  useEffect(() => {
    async function loadAll() {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (!id) {
          console.log("Nenhum userId encontrado");
          return;
        }

        const userRes = await fetch(`http://${host}:3000/api/users/${id}`);
        const userData = await userRes.json();

        setUser({
          name: userData.name || userData._name,
          photoUrl: userData.photoUrl || userData._photoUrl,
          level: userData.level || userData._level || 1,
          points: userData.pointsGained || userData._pointsGained || 0,
        });

        const plantsRes = await fetch(`http://${host}:3000/api/plants/user/${id}`);
        const plantsData = await plantsRes.json();
        const alivePlants = (plantsData || []).filter((p) => !p.dead);
        setPlantsCount(alivePlants.length);

        const missionsRes = await fetch(`http://${host}:3000/api/journeys/user/${id}`);
        const missionsData = await missionsRes.json();
        const finished = (missionsData || []).filter((m) => m.status === "finished");
        setFinishedMissions(finished);
      } catch (err) {
        console.log("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5C9F60" />
      </View>
    );
  }

  if (!user) return null;

  // achievements agora vêm das missões concluídas
  const achievements = finishedMissions.map((m) => ({
    id: m.id,
    icon: SeedIcon, // troque se cada missão tiver seu próprio ícone
    title: m.title,
  }));

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader user={{ ...user, plants: plantsCount }} />

      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsTitle}>Achievements</Text>
        <View style={styles.iconsGrid}>
          {achievements.map((a) => (
            <AchievementIcon key={a.id} Icon={a.icon} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  section: { marginTop: 25, marginBottom: 15, paddingHorizontal: 25 },
  title: { fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#5C9F60", marginBottom: 8 },
  empty: { fontFamily: "Poppins-Regular", fontSize: 14, color: "#777" },
  mission: { fontFamily: "Poppins-Regular", fontSize: 15, marginBottom: 4, color: "#444" },
  achievementsContainer: { marginTop: 20, alignItems: "flex-start" },
  achievementsTitle: { fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#5C9F60", marginBottom: 10, marginLeft: 25 },
  iconsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", marginLeft: 20 },
});
