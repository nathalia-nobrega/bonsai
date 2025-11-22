import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import Constants from "expo-constants";

export default function PlantsScroll({ plantIds }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  const API_URL = `http://${host}:3000/api/plants/`;

  useEffect(() => {
    async function loadPlants() {
      try {
        if (!plantIds || plantIds.length === 0) {
          setLoading(false);
          return;
        }

        const results = [];
        for (const id of plantIds) {
          const res = await fetch(API_URL + id);
          const data = await res.json();
          results.push(data);
        }

        setPlants(results);
      } catch (err) {
        console.log("Erro ao carregar plantas:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPlants();
  }, [plantIds]);

  if (loading) {
    return (
      <View style={{ marginTop: 20 }}>
        <ActivityIndicator size="large" color="#5C9F60" />
      </View>
    );
  }

  if (plants.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plants still on the run!</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {plants.map((p) => (
          <Pressable
            key={p.id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/plantas/plant",
                params: { id: p.id },
              })
            }
            style={{
              width: 160,
              height: 160 * 1.8,
              borderRadius: 15,
              backgroundColor: "#ffffff22",
              marginHorizontal: 2,
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
                source={{ uri: p.photoUrl }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 4 }}
                style={styles.overlay}
              />
              <BlurView intensity={10} tint="dark" style={styles.blur} />
            </View>

            <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
              <Text style={styles.name}>{p.chosenName}</Text>
              <Text style={styles.namesci}>{p.scientificName}</Text>
            </View>
          </Pressable>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 1,
  },
  name: {
    position: "absolute",
    bottom: 25,
    left: 10,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    fontSize: 12,
  },
  namesci: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 11,
  },
});
