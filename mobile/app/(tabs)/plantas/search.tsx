import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getPlantsByName } from "../../(tabs)/plantas/plantapi";

export default function PlantsScreen() {
  const { q } = useLocalSearchParams();

  const [search, setSearch] = useState(q || "");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPlants(text) {
    if (!text) return;
    setLoading(true);
    try {
      const result = await getPlantsByName(text);
      setPlants(result);
    } catch (err) {
      console.log("Erro:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (q) loadPlants(q);
  }, [q]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>

      <View style={s.container}>
        <TextInput
          placeholder="Look up new plants..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => loadPlants(search)}
          style={{ fontSize: 16 }}
        />
      </View>

      {loading && <ActivityIndicator size="large" />}

      {/* 📌 RESULTADOS */}
      <ScrollView style={{ flex: 1 }}>
        {plants.map((plant) => {
          const imageUri =
            plant.default_image?.thumbnail_url ||
            plant.default_image?.small_url ||
            plant.default_image?.medium_url ||
            plant.default_image?.regular_url ||
            plant.default_image?.original_url ||
            "https://via.placeholder.com/90x90.png?text=🌿";

          const scientific = Array.isArray(plant.scientific_name)
            ? plant.scientific_name[0]
            : plant.scientific_name || "Sem nome científico";

          return (
            <View
              key={plant.id}
              style={{
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                marginBottom: 14,
                padding: 12,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 4,
                marginHorizontal: 14,
              }}
            >
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 12,
                  backgroundColor: "#e8ffe6",
                }}
              />

              <View style={{ marginLeft: 12, flex: 1, justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>
                  {plant.common_name || "Nome desconhecido"}
                </Text>

                <Text style={{ color: "#5A7D5A", fontStyle: "italic", fontSize: 14 }}>
                  {scientific}
                </Text>

                {plant.cycle && (
                  <Text style={{ color: "#444", marginTop: 6 }}>
                    Ciclo: {plant.cycle}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 40,
                  backgroundColor: "#F3F7F3",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8,
                }}
              >
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius: 25,
    borderColor: "#5C9F60",
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 0,
    marginTop: 50,
  },
});
