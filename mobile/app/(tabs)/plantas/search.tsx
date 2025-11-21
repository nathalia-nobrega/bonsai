import { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getPlantsByName, PlantListItem } from "../plantas/plantapi";
import PlantCard from "@/components/PlantCard";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [plants, setPlants] = useState<PlantListItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchPlants(text: string) {
    if (!text.trim()) return;

    setLoading(true);

    const result = await getPlantsByName(text);

    setPlants(result);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      
      <View
        style={s.container}
      >
        <TextInput
          placeholder="Look up for new plants..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => searchPlants(searchText)}
          style={s.placeholder}
        />
      </View>

      {/* Loading */}
      {loading && <ActivityIndicator size="large" />}

      {/* Lista */}
      <ScrollView>
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create ({
    container: {
      borderWidth: 1,
      borderColor: "#5C9F60",
      borderRadius: 25,
      paddingHorizontal: 20,
      marginBottom: 20,
      marginTop: 40,
    },
    placeholder: {
      height: 55, 
      fontSize: 14, 
      fontFamily: "Poppins-Regular",
    },
})
