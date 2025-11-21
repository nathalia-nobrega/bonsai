import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "./stylePlants";
import PlantGrid from "@/components/PlantGrid";
import {useRouter} from "expo-router"

import SunFilter from "../../../assets/images/sunfilter.svg";
import SunNoFilter from "../../../assets/images/sunnofilter.svg";
import GotaFilter from "../../../assets/images/gotafilter.svg";
import GotaNoFilter from "../../../assets/images/gotanofilter.svg";
import TrimFilter from "../../../assets/images/trimfilter.svg";
import TrimNoFilter from "../../../assets/images/trimnofilter.svg";

export default function PlantasScreen() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();

  function toggleFilter(filter) {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  }

  const filtros = ["water", "sunlight", "trim"];

  // ÍCONES POR FILTRO
  const filtrosIcons = {
    sunlight: {
      active: <SunNoFilter width={15} height={15} />,
      inactive: <SunFilter width={15} height={15} />,
    },
    water: {
      active: <GotaNoFilter width={15} height={15} />,
      inactive: <GotaFilter width={15} height={15} />,
    },
    trim: {
      active: <TrimNoFilter width={15} height={15} />,
      inactive: <TrimFilter width={15} height={15} />,
    },
  };

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
        headers: { "Content-Type": "application/json" },
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
    <View style={s.container}>

      <View style={s.topRow}>
        <Text style={s.title}>Your Garden</Text>

        <TouchableOpacity style={s.circle} onPress={() => router.push("/plantas/search")} >
          <View style={s.horizontal} />
          <View style={s.vertical} />
        </TouchableOpacity>
      </View>


      <View style={s.filterRow}>
        {filtros.map((item) => {
          const isActive = selectedFilters.includes(item);

          return (
            <TouchableOpacity
              key={item}
              style={[
                s.filterButton,
                isActive && s.activeFilter,
              ]}
              onPress={() => toggleFilter(item)}
            >
              <View style={s.filterContent}>
                {isActive
                  ? filtrosIcons[item].active
                  : filtrosIcons[item].inactive}

                <Text
                  style={[
                    s.filterText,
                    isActive && s.activeFilterText,
                  ]}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <PlantGrid />

    </View>
  );
}
