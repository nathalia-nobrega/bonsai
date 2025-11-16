import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function PlantsScroll({ id_mission }) {

  // MOCK TEMPORÁRIO
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
      <Text style={styles.title}>Plants still on the run!</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {plants.map((p) => (
          <View
            key={p.id}
            style={{
              width: 160,
              height: 160 * 1.8,
              borderRadius: 15,
              backgroundColor: "#ffffff22",
              marginHorizontal: 2
            }}
          >
            <View
              style={{
                width: "90%",
                height: "70%",
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              <Image
                source={p.image}
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: 0,
                }}
                resizeMode="cover"
              />

              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0, 0, 0, 1)"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 4 }}
                style={styles.overlay}
              />

              <BlurView
                intensity={10}
                tint="dark"
                pointerEvents="none"
                style={styles.blur}
              />
            </View>

            <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.namesci}>{p.species}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingLeft: 18,
    marginBottom: 80,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 15,
    color: "#5C9F60",
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },

  namesci: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 11,
  },

  name: {
    position: "absolute",
    bottom: 25,
    left: 10,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    fontSize: 11,
  },
});
