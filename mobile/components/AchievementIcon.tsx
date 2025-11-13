import React from "react";
import { View, StyleSheet } from "react-native";

export default function AchievementIcon({ Icon }) {
  return (
    <View style={styles.container}>
      <Icon width={100} height={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    margin: 8
  },
});
