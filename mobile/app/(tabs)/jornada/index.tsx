// app/(tabs)/jornada/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JornadaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Jornada</Text>
      <Text>Acompanhe seu progresso!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C9F60",
    marginBottom: 10,
  },
});