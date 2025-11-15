import React from "react";
import { View } from "react-native";
import MissionItem from "./MissionItem";

export default function MissionList({ missions, activeMission }) {
  return (
    <View style={{ alignItems: "center" }}>
      {missions.map((mission) => (
        <MissionItem
          key={mission.id}
          id={mission.id}  
          title={mission.title}
          active={mission.id === activeMission}
        />
      ))}
    </View>
  );
}
