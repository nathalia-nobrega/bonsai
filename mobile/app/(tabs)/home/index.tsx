import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { s } from "./styleHome";
import Noplants from "@/components/Noplants";
import NoMissions from "@/components/Nomissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import PlantsScroll from "../../../components/PlantsScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


interface Mission {
  id: string;
  idPlant?: string;
  userId?: string;
  title: string;
  description?: string;
  type?: string;
  hourlyFrequency?: number;
  points?: number;
  lastCompletedAt?: string | null;
  nextAvailableAt?: string | null;
  isAvailable?: boolean;
}

interface Journey {
  id?: string;
  name?: string;
  order?: number;
  status?: string;
  relatedPlants?: string[];
}

const circularImages = [
  require("../../../assets/images/mission1icon.png"),
  require("../../../assets/images/mission2icon.png"),
  require("../../../assets/images/mission3icon.png"),
  require("../../../assets/images/mission4icon.png"),
  require("../../../assets/images/mission5icon.png"),
];

export default function Index() {
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null); // USADO apenas para o ícone do topo
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const initialWhiteHeight = height * 0.75;
  const SCROLL_LIMIT = 200;

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0] ||
    "localhost";

  async function safeJSON(res: Response | null) {
    if (!res) return null;
    try {
      if (!res.ok) return null;
      const text = await res.text();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        console.log("JSON inválido recebido, limpando userId");
        return null;
      }
    } catch (err) {
      console.log("Erro ao ler resposta:", err);
      return null;
    }
  }

  const fetchActiveJourney = useCallback(
    async (userId: string) => {
      try {
        const res = await fetch(
          `http://${host}:3000/api/journeys/user/${userId}/active`
        ).catch(() => null);
        const data = await safeJSON(res);
        if (data) {
          setActiveJourney({
            id: data.id ?? data._id,
            name: data.name ?? data.title ?? data.journeyName,
            order: data.order ?? data.position,
            status: data.status ?? undefined,
            relatedPlants: data.relatedPlants ?? []
          });
        } else {
          setActiveJourney(null);
        }
      } catch (err) {
        console.log("Erro ao buscar activeJourney:", err);
        setActiveJourney(null);
      }
    },
    [host]
  );

  // fetch missions
  const fetchMissions = useCallback(
    async (userId: string) => {
      try {
        const res = await fetch(
          `http://${host}:3000/api/missions/user/${userId}`
        ).catch(() => null);

        const data = await safeJSON(res);

        console.log("data:", data);

        if (Array.isArray(data)) {
          console.log(
            "TIPOS DE MISSÕES RETORNADAS:",
            data.map((m: any) => m.type)
          );
        } else if (data?.missions && Array.isArray(data.missions)) {
          console.log(
            "TIPOS DE MISSÕES RETORNADAS:",
            data.missions.map((m: any) => m.type)
          );
        }

        if (Array.isArray(data)) {
          setMissions(
            data.map((m: any) => ({
              id: m.id ?? m._id,
              idPlant: m.idPlant ?? m.plantId,
              userId: m.userId,
              title: m.title ?? m.name ?? "Untitled mission",
              description: m.description ?? "",
              type: m.type,
              hourlyFrequency: m.hourlyFrequency,
              points: m.points,
              isAvailable:
                typeof m.isAvailable === "boolean" ? m.isAvailable : true,
            }))
          );
        } else if (data && data.missions && Array.isArray(data.missions)) {
          setMissions(
            data.missions.map((m: any) => ({
              id: m.id ?? m._id,
              idPlant: m.idPlant ?? m.plantId,
              userId: m.userId,
              title: m.title ?? m.name ?? "Untitled mission",
              description: m.description ?? "",
              type: m.type,
              hourlyFrequency: m.hourlyFrequency,
              points: m.points,
              isAvailable:
                typeof m.isAvailable === "boolean" ? m.isAvailable : true,
            }))
          );
        } else {
          console.log("Formato inesperado ao buscar missions:", data);
          setMissions([]);
        }
      } catch (err) {
        console.log("Erro ao buscar missions:", err);
        setMissions([]);
      }
    },
    [host]
  );

  // complete mission
  const handleComplete = useCallback(
    async (missionId: string) => {
      try {
        const res = await fetch(
          `http://${host}:3000/api/missions/${missionId}/complete`,
          {
            method: "PUT",
          }
        ).catch(() => null);

        if (!res || !res.ok) {
          Alert.alert("Erro", "Não foi possível completar a missão.");
          return;
        }

        const userId = await AsyncStorage.getItem("userId");
        if (userId) fetchMissions(userId);
      } catch (err) {
        console.log("Erro complete mission:", err);
      }
    },
    [fetchMissions, host]
  );

  const handleReactivate = useCallback(
    async (missionId: string) => {
      try {
        const res = await fetch(
          `http://${host}:3000/api/missions/${missionId}/reactivate`,
          {
            method: "PUT",
          }
        ).catch(() => null);

        if (!res || !res.ok) {
          Alert.alert("Erro", "Não foi possível reativar a missão.");
          return;
        }

        const userId = await AsyncStorage.getItem("userId");
        if (userId) fetchMissions(userId);
      } catch (err) {
        console.log("Erro reactivate mission:", err);
      }
    },
    [fetchMissions, host]
  );

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem("userId");
      console.log("ID do user no home:", userId);

      if (!userId || userId.trim() === "" || userId.length < 10) {
        await AsyncStorage.removeItem("userId");
        router.replace("/index");
        return;
      }

      // buscar active journey
      await fetchActiveJourney(userId);

      // buscar missions
      await fetchMissions(userId);
      // só mostra toast se existir missão
      setTimeout(() => {
      const hasPending = missions.some(m => m.isAvailable);

      if (hasPending) {
        Toast.show({
          type: "info",
          text1: "Você tem missões pendentes!",
          text2: "Complete para ganhar pontos 🌱",
          position: "top",
        });
      }
    }, 200);

    } catch (err) {
      console.log("Erro no loadData:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchActiveJourney, fetchMissions, router]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const MAX_HEIGHT = Math.min(20 + 30 + 4 * 77 + 3 * 10 + 100, height * 1);

  const hasNoPlants = false;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/image.png")}
      style={s.background}
      resizeMode="cover"
    >
      {hasNoPlants && <Noplants />}

      {!hasNoPlants && (
        <>
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(33, 57, 35, 1)"]}
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 0.9 }}
            style={s.overlay}
          />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: insets.bottom + 120,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={{ height: height * 0.3 }} />
             {/* Ícone no canto direito */}
             <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 40,
                  right: 20,
                  zIndex: 99,
                }}
                onPress={() => router.push("/(tabs)/home/notifications")}
              >
                <Image
                  source={require("../../../assets/images/notification.png")}
                  style={{ width: 28, height: 28 }}
                />
              </TouchableOpacity>
            {/* ícones de missões (usando apenas activeJourney para o ícone maior) */}
            <View style={s.circularImagesContainer}>
              {circularImages.map((image, index) => (
                <View
                  key={index}
                  style={[
                    s.circularImageWrapper,
                    index === (activeJourney?.order ?? 2) - 1 &&
                      s.secondImageWrapper,
                  ]}
                >
                  <View style={s.missionContainer}>
                    <Image
                      source={image}
                      style={[
                        s.circularImage,
                        index === (activeJourney?.order ?? 2) - 1 &&
                          s.secondImage,
                      ]}
                      resizeMode="cover"
                    />

                    {index === (activeJourney?.order ?? 2) - 1 && (
                      <View
                        style={{
                          marginTop: 5,
                          alignItems: "center",
                          marginBottom: -55,
                        }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Current Mission:</Text>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {activeJourney?.name ?? "No active mission"}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <Animated.View
              style={[
                s.halfWhiteBackground,
                {
                  // evita que o conteudo cresça
                  minHeight: scrollY.interpolate({
                    inputRange: [0, SCROLL_LIMIT],
                    outputRange: [initialWhiteHeight, MAX_HEIGHT],
                    extrapolate: "clamp",
                  }),
                  paddingBottom: insets.bottom + 40,
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, SCROLL_LIMIT],
                        outputRange: [0, 30],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
            

              <Text style={s.title}>Your garden</Text>

              <PlantsScroll key={activeJourney?.id} plantIds={activeJourney?.relatedPlants} />

              <Text style={s.second_title}>Daily Missions</Text>

              <View>
                {missions.length === 0 && (
                  <View
                    style={{
                      padding: 20,
                      paddingBottom: insets.bottom + 20,
                    }}
                  >
                    <NoMissions />
                  </View>
                )}

                {missions.map((m) => (
                  <View key={m.id} style={s.container2}>
                    <Text style={s.textcontainer}>
                      <Text style={s.secondtext}>{m.title}</Text>
                    </Text>

                    <Text style={s.desctextname}>
                      <Text style={s.desctext}>{m.description}</Text>
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <TouchableOpacity
                        style={[
                          s.circleButton,
                          { marginRight: -10, marginTop: -50 },
                        ]}
                        onPress={() => handleComplete(m.id)}
                      >
                        <Text style={{ color: "#fff" }}>✓</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              <LinearGradient
                colors={["rgba(255,255,255,0)", "rgba(255,255,255,0)"]}
                style={s.fadeTop}
              />

              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  bottom: -100,
                  left: 0,
                  right: 0,
                  height: 100,
                  backgroundColor: "white",
                }}
              />
            </Animated.View>
          </ScrollView>
        </>
      )}
    </ImageBackground>
  );
}
