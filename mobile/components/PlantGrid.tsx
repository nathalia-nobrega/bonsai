import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

import SadFace from "../assets/images/sadface.svg";
import MediumFace from "../assets/images/mediumface.svg";
import GoodFace from "../assets/images/goodface.svg";

// Imagem local de fallback (troque se quiser)
const PLACEHOLDER = require("../assets/images/Jason.jpeg");

export default function PlantGrid({ plantIds = [], host: hostProp }) {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const host =
    hostProp ||
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0] ||
    "localhost";

  const API_URL = `http://${host}:3000/api/plants/`;

  useEffect(() => {
    let mounted = true;

    async function loadPlants() {
      setLoading(true);
      try {
        if (!plantIds || plantIds.length === 0) {
          if (mounted) {
            setPlants([]);
            setLoading(false);
          }
          return;
        }

        const results = [];
        // busca sequencial para lidar com respostas problemáticas — pode trocar por Promise.all se preferir
        for (const id of plantIds) {
          try {
            const res = await fetch(API_URL + id);
            const data = await res.json();
            if (data && (data.id || data._id)) {
              results.push(data);
            } else {
              console.warn("PlantGrid: resposta inválida para id", id, data);
            }
          } catch (e) {
            console.warn("PlantGrid: erro buscando planta", id, e);
          }
        }

        // remover duplicados por id/_id
        const unique = results.filter(
          (p, index, self) =>
            index ===
            self.findIndex(
              (x) => (x.id && x.id === p.id) || (x._id && x._id === p._id)
            )
        );

        if (mounted) setPlants(unique);
      } catch (err) {
        console.log("Erro ao carregar plantas no PlantGrid:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPlants();

    return () => {
      mounted = false;
    };
  }, [plantIds, host]);

  const moods = {
    sad: SadFace,
    medium: MediumFace,
    good: GoodFace,
  };

  const navigateToPlant = (plant) => {
    const key = plant.id ?? plant._id;
    if (!key) {
      console.warn("PlantGrid: plant sem id, não é possível navegar", plant);
      return;
    }

    // segue o mesmo formato usado no PlantsScroll
    router.push({
      pathname: "/(tabs)/plantas/plant",
      params: { id: String(key) },
    });
  };

  const renderItem = ({ item, index }) => {
    const key = item.id ?? item._id ?? index;
    const photoUri =
      item.photoUrl ||
      item.regular_url ||
      item.medium_url ||
      item.small_url ||
      item.thumbnail ||
      null;

    const FaceIcon = moods[item.mood] || MediumFace;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigateToPlant(item)}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} resizeMode="cover" />
          ) : (
            <Image source={PLACEHOLDER} style={styles.image} resizeMode="cover" />
          )}

          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 4 }}
            style={styles.overlay}
          />

          <BlurView intensity={10} tint="dark" style={styles.blur} />

          {/* botão pequeno (ainda navega para a planta) */}
          <TouchableOpacity
            style={styles.glassmorphismButton}
            onPress={(e) => {
              // evitar que o onPress do pai dispare duas vezes em algumas plataformas
              e.stopPropagation && e.stopPropagation();
              navigateToPlant(item);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.glassButtonContent}>
              <View style={styles.innerCircle} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{item.chosenName || item.commonName}</Text>
        <Text style={styles.namesci}>
          {item.commonName || item.scientificName}
        </Text>

        <View style={styles.moodIcon}>
          <FaceIcon width={20} height={20} />
        </View>
      </TouchableOpacity>
    );
  };

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
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item, idx) => String(item.id ?? item._id ?? idx)}
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
  },

  glassmorphismButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 9,
  },

  glassButtonContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
});