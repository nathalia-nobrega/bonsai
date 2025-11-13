import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileHeader from "../../../components/ProfileHeader";
import AchievementIcon from "../../../components/AchievementIcon";

// SVGs
import SeedIcon from "../../../assets/images/first mission.svg";
import SproutIcon from "../../../assets/images/second mission.svg";
import BloomIcon from "../../../assets/images/third mission.svg";
import WaterIcon from "../../../assets/images/fourth mission.svg";
import LeafIcon from "../../../assets/images/fifth mission.svg";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);

  // Simulação de fetch (mockado, depois substitui pela API real)
  useEffect(() => {
    const mockUser = {
      name: "Ana Júlia",
      photoUrl: "https://i.namu.wiki/i/_VTch3qje-Av02jxUqo7fqRuyUAs2eqRsExYk-bO_sPG3wG9hDTUlPylSTH1zEKLWVAoSuKV5LQWVqMyo5OtCw.webp",
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
    alignItems: "left",
  },
  achievementsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#5C9F60",
    marginBottom: 10,
    marginLeft:25
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
    marginLeft:20
  },
});
