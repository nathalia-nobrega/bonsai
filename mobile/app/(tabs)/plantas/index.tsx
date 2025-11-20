import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlantasScreen() {
  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0] ||
    "localhost";

  const criarPlantaTeste = async () => {
    const id = await AsyncStorage.getItem("userId");
    console.log("User ID carregado no Profile:", id);

    try {
      const response = await fetch(`http://${host}:3000/api/plants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chosenName: "My Beautiful Fern",
          userId: id,
          commonName: "Boston Fern",
          scientificName: "Nephrolepis exaltata",
          otherName: "Sword Fern",
          family: "Lomariopsidaceae",
          type: "Fern",
          cycle: "Perennial",
          wateringPeriod: "Weekly",
          wateringBasedTemperature: "Moderate",
          growthRate: "Medium",
          careLevel: "Easy",
          maintenance: "Low",
          sunlightType: "Indirect",
          sunlightDuration: "4-6 hours",
          floweringHasFlowering: false,
          floweringSeason: "N/A",
          trimmingCount: 2,
          trimmingMonths: ["Spring", "Fall"],
          photoUrl: "https://example.com/plant.jpg",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        Toast.show({
          type: "error",
          text1: "Error",
          text2: errorData?.message || "Tente novamente mais tarde.",
          position: "bottom",
        });

        return;
      }

      const data = await response.json();
      console.log("Planta criada:", data);

      Toast.show({
        type: "success",
        text1: "Planta criada!",
        text2: "A planta de teste foi adicionada com sucesso.",
        position: "bottom",
      });
    } catch (err) {
      console.error(err);

      Toast.show({
        type: "error",
        text1: "Erro de conexão",
        text2: "Não foi possível conectar ao servidor.",
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Plantas</Text>
      <Text>Veja sua coleção de plantas!</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Adicionar Planta Teste" onPress={criarPlantaTeste} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C9F60",
    marginBottom: 10,
  },
});
