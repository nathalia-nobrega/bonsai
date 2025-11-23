import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "./stylePlants";
import PlantGrid from "@/components/PlantGrid";
import { useRouter } from "expo-router";

import SunFilter from "../../../assets/images/sunfilter.svg";
import SunNoFilter from "../../../assets/images/sunnofilter.svg";
import GotaFilter from "../../../assets/images/gotafilter.svg";
import GotaNoFilter from "../../../assets/images/gotanofilter.svg";
import TrimFilter from "../../../assets/images/trimfilter.svg";
import TrimNoFilter from "../../../assets/images/trimnofilter.svg";

export default function PlantasScreen() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [plants, setPlants] = useState([]); // manteremos os objetos por compatibilidade, mas passamos só ids
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0] ||
    "localhost";

  function toggleFilter(filter) {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  }

  const filtros = ["water", "sunlight", "trim"];

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

  useEffect(() => {
    async function loadPlants() {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          console.log("Nenhum userId encontrado no AsyncStorage");
          return;
        }

        console.log("Buscando plantas do usuário:", userId);

        const res = await fetch(`http://${host}:3000/api/plants/user/${userId}`);
        const data = await res.json();

        console.log("Plantas encontradas:", data);

        setPlants(data || []); // guardamos os objetos localmente se precisar
      } catch (err) {
        console.log("Erro ao carregar plantas:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPlants();
  }, []);

  // extrai os ids para passar ao PlantGrid (aceita id ou _id)
  const plantIds = (plants || []).map((p) => p.id ?? p._id ?? String(p._id ?? p.id ?? "")).filter(Boolean);

  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <Text style={s.title}>Your Garden</Text>

        <TouchableOpacity style={s.circle} onPress={() => router.push("/plantas/search")}>
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
              style={[s.filterButton, isActive && s.activeFilter]}
              onPress={() => toggleFilter(item)}
            >
              <View style={s.filterContent}>
                {isActive ? filtrosIcons[item].active : filtrosIcons[item].inactive}
                <Text style={[s.filterText, isActive && s.activeFilterText]}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#5C9F60" />
      ) : (
        // agora passamos apenas plantIds
        <PlantGrid plantIds={plantIds} host={host} />
      )}
    </View>
  );
}
