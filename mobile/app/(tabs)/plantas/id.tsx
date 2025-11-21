import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { usePlants } from "@/hooks/usePlants";

export default function PlantDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { details, loading, loadDetails } = usePlants();

  useEffect(() => {
    loadDetails(Number(id));
  }, []);

  if (loading || !details) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const img = details.default_image;
  const uri =
    img?.regular_url ||
    img?.medium_url ||
    img?.small_url ||
    img?.thumbnail ||
    "https://via.placeholder.com/400.png?text=🌿";

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image source={{ uri }} style={s.banner} />
      <View style={{ padding: 20 }}>
        <Text style={s.title}>{details.common_name}</Text>
        <Text style={s.scientific}>
          {Array.isArray(details.scientific_name)
            ? details.scientific_name[0]
            : details.scientific_name}
        </Text>

        <Text style={s.label}>Descrição</Text>
        <Text style={s.text}>{details.description || "Sem descrição disponível."}</Text>

        <Text style={s.label}>Rega</Text>
        <Text style={s.text}>{details.watering || "Sem informação"}</Text>

        <Text style={s.label}>Luz solar</Text>
        <Text style={s.text}>
          {details.sunlight?.join(", ") || "Sem informação"}
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
    },
  banner: { 
    width: "100%", 
    height: 260 
    },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginTop: 10 
    },
  scientific: { 
    fontSize: 16, 
    fontStyle: "italic", 
    color: "#6a6", 
    marginBottom: 15 
    },
  label: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginTop: 20 
    },
  text: { 
    fontSize: 15, 
    marginTop: 6, 
    lineHeight: 20 
    },
});
