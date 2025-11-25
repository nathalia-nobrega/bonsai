import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function NoMissions() {
  const router = useRouter();

  return (
    <View style={styles.emptyContainer}>
      <Image 
        source={require("../assets/images/nomissions.png")}
        style={styles.emptyImage}
      />

      <Text style={styles.emptyText}>No missions available</Text>
      <Text style={styles.emptySubtext}>Plant new seeds and work them out!</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/(tabs)/plantas")}
      >
        <Image
          source={require("../assets/images/botao.png")}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Go to Garden</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },

  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  emptySubtext: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginBottom: 20,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  buttonIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
