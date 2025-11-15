import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import AchievementIcon from "../../../components/AchievementIcon";

import SeedIcon from "../../../assets/images/first mission.svg";
import SproutIcon from "../../../assets/images/second mission.svg";
import BloomIcon from "../../../assets/images/third mission.svg";
import WaterIcon from "../../../assets/images/fourth mission.svg";
import LeafIcon from "../../../assets/images/fifth mission.svg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgProps } from "react-native-svg";


//tirar tudo isso depois -> só pra impedir erros 
interface User {
  name: string;
  photoUrl: string;
  level: number;
  points: number;
  plants: number;
}

interface Achievement {
  id: number;
  icon: React.FC<SvgProps>;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function loadUser() {
      try {
        const id = await AsyncStorage.getItem("userId");
        console.log("User ID carregado no Profile:", id);

        if (!id) {
          console.log("Nenhum userId encontrado");
          return;
        }
        const response = await fetch(
          `http://192.168.15.13:3000/api/users/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Dados do user recebidos:", data);
          const user = {
            name: data._name || data.name,
            photoUrl: data._photoUrl || data.photoUrl,
            level: data._level || data.level || 1,
            points: data._pointsGained || data.pointsGained || 0,
            plants: 0, 
          };
          setUser(user);
          
          const defaultAchievements = [
            { id: 1, icon: SeedIcon },
            { id: 2, icon: SproutIcon },
            { id: 3, icon: BloomIcon },
            { id: 4, icon: WaterIcon },
            { id: 5, icon: LeafIcon },
          ];
          setAchievements(defaultAchievements);
        } else {
          console.log("Falha na API, usando mock.");
          fallbackMock();
        }
      } catch (e) {
        console.log("Erro ao carregar user:", e);
        fallbackMock();
      }
    }

    function fallbackMock() {
      const mockUser = {
        name: "Ana Júlia",
        photoUrl:
          "https://i.namu.wiki/i/_VTch3qje-Av02jxUqo7fqRuyUAs2eqRsExYk-bO_sPG3wG9hDTUlPylSTH1zEKLWVAoSuKV5LQWVqMyo5OtCw.webp",
        level: 2,
        points: 145,
        plants: 7,
      };

      const mockAchievements = [
        { id: 1, icon: SeedIcon },
        { id: 2, icon: SproutIcon },
        { id: 3, icon: BloomIcon },
        { id: 4, icon: WaterIcon },
        { id: 5, icon: LeafIcon },
      ];

      setUser(mockUser);
      setAchievements(mockAchievements);
    }

    loadUser();
  }, []);

  if (!user) return null;

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader user={user} />

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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  achievementsContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
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
