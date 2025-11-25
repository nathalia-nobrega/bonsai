import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import ProfileHeader from "../../../components/ProfileHeader";
import AchievementIcon from "../../../components/AchievementIcon";

import SeedIcon from "../../../assets/images/first mission.svg";
import SproutIcon from "../../../assets/images/second mission.svg";
import BloomIcon from "../../../assets/images/third mission.svg";
import WaterIcon from "../../../assets/images/fourth mission.svg";
import LeafIcon from "../../../assets/images/fifth mission.svg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [plantsCount, setPlantsCount] = useState(0);
  const [finishedMissions, setFinishedMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0] ||
    "localhost";

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userData");

    router.replace("/index"); // Volta ao index cinza
  };


  const getIcon = (order) => {
    switch (order) {
      case 1: return SeedIcon;
      case 2: return SproutIcon;
      case 3: return BloomIcon;
      case 4: return WaterIcon;
      case 5: return LeafIcon;
      default: return SeedIcon ;
    }
  };

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

        const missionsRes = await fetch(
          `http://${host}:3000/api/journeys/user/${id}`
        );
        const missionsData = await missionsRes.json();
        const finished = (missionsData || []).filter(
          (m) => m.status === "finished"
        );
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
    title: m.title,
    order: m.order,
  }));

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader user={{ ...user, plants: plantsCount }} />

      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsTitle}>Achievements</Text>
        <View style={styles.iconsGrid}>
          {achievements.map((a) => (
            <AchievementIcon key={a.id} Icon={getIcon(a.order)} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  logoutBtn: {
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#D9534F",
    borderRadius: 20,
    marginTop: 150,
  },
  logoutText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },

  achievementsContainer: { marginTop: 20, alignItems: "flex-start" },
  achievementsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#5C9F60",
    marginBottom: 10,
    marginLeft: 25,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
});
