import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { PlantListItem } from "../app/(tabs)/plantas/plantapi";
import { useRouter } from "expo-router";

export default function PlantCard({ plant }: { plant: PlantListItem }) {
  const router = useRouter();

  const img = plant.default_image;
  const imageUri =
    img?.thumbnail ||
    img?.small_url ||
    img?.medium_url ||
    img?.regular_url ||
    img?.original_url ||
    "https://via.placeholder.com/90.png?text=🌿";

  const scientific =
    Array.isArray(plant.scientific_name)
      ? plant.scientific_name[0]
      : plant.scientific_name || "Sem nome científico";

  return (
    <View style={s.card}>
      <Image source={{ uri: imageUri }} style={s.image} />

      <View style={s.textContainer}>
        <View style={s.topRow}>
          <Text style={s.common} numberOfLines={1} ellipsizeMode="tail">
            {plant.common_name || "Nome desconhecido"}
          </Text>

          <TouchableOpacity
            style={s.circle}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/plantas/addPlant",
                params: { id: plant.id },
              })
            }
          >
            <View style={s.horizontal} />
            <View style={s.vertical} />
          </TouchableOpacity>
        </View>

        <Text style={s.scientific}>{scientific}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#e8ffe6",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  common: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 18,
    color: "#3C3C3C",
    flex: 1,
    marginRight: 8,
  },
  scientific: {
    fontSize: 12,
    color: "#3C3C3C",
    fontFamily: "Poppins-Medium",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 0,
  },
  horizontal: {
    position: "absolute",
    width: 18,
    height: 4,
    backgroundColor: "#5C9F60",
    borderRadius: 2,
  },
  vertical: {
    position: "absolute",
    width: 4,
    height: 18,
    backgroundColor: "#5C9F60",
    borderRadius: 2,
  },
});
