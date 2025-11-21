import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import SadFace from "../assets/images/sadface.svg";
import MediumFace from "../assets/images/mediumface.svg";
import GoodFace from "../assets/images/goodface.svg";

export default function PlantGrid() {

  const plants = [
    { id: 1, name: "Cassandra", species: "aloe vera", image: require("../assets/images/Jason.jpeg"), mood: "sad" },
    { id: 2, name: "Timothy", species: "pothos", image: require("../assets/images/Tim.jpeg"), mood: "medium" },
    { id: 3, name: "Damian", species: "bambu", image: require("../assets/images/Damian.jpeg"), mood: "good" },
  ];

  const moods = {
    sad: SadFace,
    medium: MediumFace,
    good: GoodFace
  };

  const renderItem = ({ item }) => {
    const FaceIcon = moods[item.mood];

    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />

          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 4 }}
            style={styles.overlay}
          />

          <BlurView intensity={10} tint="dark" style={styles.blur} />
        </View>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.namesci}>{item.species}</Text>

        <View style={styles.moodIcon}>
          <FaceIcon width={20} height={20} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 80,
  },

  card: {
    flex: 1,
    maxWidth: "33%",
    height: 220,
    backgroundColor: "#ffffff22",
    borderRadius: 15,
    position: "relative",
    overflow: "hidden",
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
    bottom: 65,
    left: 10,
    fontFamily: "Poppins-Bold",
    color: "#FFF",
    fontSize: 11,
  },

  namesci: {
    position: "absolute",
    bottom: 50,
    left: 10,
    fontFamily: "Poppins-Regular",
    color: "#FFF",
    fontSize: 11,
  },

  moodIcon: {
    position: "absolute",
    bottom: 55,
    right: 8,
  }
});
