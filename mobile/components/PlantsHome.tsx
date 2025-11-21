import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function PlantsHome() {
  const plants = [
    { 
      id: 1, 
      name: "Cassandra",
      species: "aloe vera",
      image: require("../assets/images/Jason.jpeg")
    },
    { 
      id: 2,
      name: "Timothy",
      species: "pothos",
      image: require("../assets/images/Tim.jpeg"),
    },
    { 
      id: 3, 
      name: "Damian",
      species: "bambu",
      image: require("../assets/images/Damian.jpeg"),
    },
  ];

  return (
    <View style={styles.container}>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 0 }}
        style={{ margin: 0, padding: 0 }}
        >

        <View style={styles.row}>
          {plants.map((p) => (
            <View key={p.id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={p.image}
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Gradiente */}
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0, 0, 0, 1)"]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 4 }}
                  style={styles.overlay}
                />

                {/* Blur */}
                <BlurView intensity={10} tint="dark" style={styles.blur} />
              </View>

              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.namesci}>{p.species}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  card: {
    width: 130,
    height: 220,
    backgroundColor: "#ffffff22",
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },

  imageContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 15,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  name: {
    position: "absolute",
    bottom: 62,
    left: 10,
    color: "#FFF",
    fontFamily: "Poppins-Bold",
    fontSize: 11,
  },

  namesci: {
    position: "absolute",
    bottom: 48,
    left: 10,
    color: "#FFF",
    fontFamily: "Poppins-Regular",
    fontSize: 10,
  },
});
