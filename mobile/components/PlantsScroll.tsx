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

export default function PlantsScroll({ plantIds }: { plantIds: string[] }) {
  const [plants, setPlants] = useState<any[]>([]);
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

        const results: any[] = [];
        for (const id of plantIds) {
          try {
            const res = await fetch(API_URL + id);
            const data = await res.json();
            // only push valid objects with an id/_id
            if (data && (data.id || data._id)) {
              results.push(data);
            } else {
              console.warn("PlantsScroll: resposta inválida para id", id, data);
            }
          } catch (e) {
            console.warn("PlantsScroll: erro buscando planta", id, e);
          }
        }

        // remove duplicados (por id ou _id)
        const unique = results.filter(
          (p, index, self) =>
            index ===
            self.findIndex(
              (x) => (x.id && x.id === p.id) || (x._id && x._id === p._id)
            )
        );

        setPlants(unique);
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

  if (!plants || plants.length === 0) return null;

  return (
    <View style={styles.container}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {plants
          .filter((p) => p && (p.id || p._id)) // garante itens válidos
          .map((p, index) => {
            const key = p.id ?? p._id ?? `plant-${index}`;
            const photoUri =
              p.photoUrl ||
              p.regular_url ||
              p.medium_url ||
              p.small_url ||
              p.thumbnail ||
              null;

            return (
              <Pressable
                key={key}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/plantas/plant",
                    params: { id: key },
                  })
                }
                style={{
                  width: 140,
                  height: 140 * 1.4,
                  borderRadius: 15,
                  backgroundColor: "#ffffff22",
                  marginHorizontal: 2,
                  marginRight:10
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri: photoUri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />

                  <View style={StyleSheet.absoluteFill} pointerEvents="none">
                    <LinearGradient
                      colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 4 }}
                      style={styles.overlay}
                    />
                    <BlurView intensity={10} tint="dark" style={styles.blur} />
                  </View>
                </View>

                <View style={styles.textBox}>
                  <Text style={styles.name}>
                    {p.chosenName || p.commonName}
                  </Text>

                  <Text style={styles.namesci} numberOfLines={2}>
                    {p.scientificName}
                  </Text>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:20,
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
  textBox: {
  position: "absolute",
  bottom: 8,
  left: 10,
  right: 10,
},

name: {
  fontFamily: "Poppins-Bold",
  color: "#FFFFFF",
  fontSize: 12,
},

namesci: {
  fontFamily: "Poppins-Regular",
  color: "#FFFFFF",
  fontSize: 11,
  marginTop: 2,
},

});
