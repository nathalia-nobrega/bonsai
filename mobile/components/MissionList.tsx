import React from "react";
import { View } from "react-native";
import MissionItem from "./MissionItem";

export default function MissionList({ missions }) {
  return (
    <View style={{ alignItems: "center" }}>
      {missions.map((mission) => (
        <MissionItem
          key={mission.order}  
          id={mission.id}
          title={mission.name}
          status={mission.status}    
          order={mission.order}      
        />
      ))}
    </View>
  );
}
