import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { s } from "./styleHome";
import * as React from "react";
import Noplants from "@/components/Noplants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import PlantsHome from "@/components/PlantsHome";

// mock
const plants = [
  {
    id: 1,
    name: "Cassandra",
    species: "aloe vera",
    image: require("../../../assets/images/Jason.jpeg"),
  },
  {
    id: 2,
    name: "Timothy",
    species: "pothos",
    image: require("../../../assets/images/Tim.jpeg"),
  },
  {
    id: 3,
    name: "Damian",
    species: "bambu",
    image: require("../../../assets/images/Damian.jpeg"),
  },
];

interface Journey {
  name: string;
  status: string;
  order: number;
}

const circularImages = [
  require("../../../assets/images/mission1icon.png"),
  require("../../../assets/images/mission2icon.png"),
  require("../../../assets/images/mission3icon.png"),
];

const host =
  Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
  Constants?.expoConfig?.hostUri?.split(":")[0];

export default function Index() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const initialWhiteHeight = height * 0.75;

  const calculateMaxHeight = () => {
    const titleHeight = 20;
    const secondTitleHeight = 30;
    const missionsHeight = 4 * 77 + 3 * 10;
    const paddingExtra = 100;
    return Math.min(
      titleHeight + secondTitleHeight + missionsHeight + paddingExtra,
      height * 1
    );
  };

  const MAX_HEIGHT = calculateMaxHeight();
  const SCROLL_LIMIT = 200;

  // Parse seguro
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

  // ==========================================================
  //               loadJourneys()
  // ==========================================================
  const loadJourneys = React.useCallback(async () => {
    setLoadingUser(true);

    let userId = await AsyncStorage.getItem("userId");
    console.log("ID do user no home:", userId);

    if (!userId || userId.trim() === "" || userId.length < 10) {
      await AsyncStorage.removeItem("userId");
      router.replace("/index");
      return;
    }

    // ---------- JOURNEYS ----------
    try {
      const resAll = await fetch(
        `http://${host}:3000/api/journeys/user/${userId}`
      ).catch(() => null);

      const dataAll = await safeJSON(resAll);

      if (!dataAll || (Array.isArray(dataAll) && dataAll.length === 0)) {
        console.log("Usuário não existe mais. Limpando storage...");
        await AsyncStorage.removeItem("userId");
        router.replace("/index");
        return;
      }

      const resActive = await fetch(
        `http://${host}:3000/api/journeys/user/${userId}/active`
      ).catch(() => null);

      const active = await safeJSON(resActive);

      setJourneys(dataAll);
      setActiveJourney(active);
    } catch (err) {
      console.log("Erro ao carregar journeys:", err);
    }

    // ---------- MISSÕES ----------
    try {
      console.log("Buscando missões para o usuário:", userId);

      const resMissions = await fetch(
        `http://${host}:3000/api/missions/user/${userId}`
      );

      if (!resMissions.ok) {
        throw new Error(`Erro HTTP ao buscar missões: ${resMissions.status}`);
      }

      const dataMissions = await safeJSON(resMissions);
      console.log("➜ Missoes carregadas:", dataMissions);

      if (Array.isArray(dataMissions)) {
        setMissions(dataMissions);
      } else {
        console.log("⚠️ Formato inesperado das missões:", dataMissions);
      }
    } catch (err) {
      console.log("❌ Erro ao carregar missoes:", err);
    }

    setLoadingUser(false);
  }, [host]);

  // Executa quando volta para a tela
  useFocusEffect(
    React.useCallback(() => {
      loadJourneys();
    }, [loadJourneys])
  );

  const hasNoPlants = !plants || plants.length === 0;

  if (loadingUser) return null;

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
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={{ height: height * 0.3 }} />

            {/* ícones de missões */}
            <View style={s.circularImagesContainer}>
              {circularImages.slice(0, 3).map((image, index) => (
                <View
                  key={index}
                  style={[
                    s.circularImageWrapper,
                    index === (activeJourney?.order ?? 1) - 1 &&
                      s.secondImageWrapper,
                  ]}
                >
                  <View style={s.missionContainer}>
                    <Image
                      source={image}
                      style={[
                        s.circularImage,
                        index === (activeJourney?.order ?? 1) - 1 &&
                          s.secondImage,
                      ]}
                      resizeMode="cover"
                    />

                    {index === (activeJourney?.order ?? 1) - 1 && (
                      <View
                        style={{
                          marginTop: 5,
                          alignItems: "center",
                          marginBottom: -55,
                        }}
                      >
                        <Text style={s.current}>Current Mission:</Text>
                        <Text style={s.mission}>{activeJourney?.name}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* fundo animado */}
            <Animated.View
              style={[
                s.halfWhiteBackground,
                {
                  height: scrollY.interpolate({
                    inputRange: [0, SCROLL_LIMIT],
                    outputRange: [initialWhiteHeight, MAX_HEIGHT],
                    extrapolate: "clamp",
                  }),
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

              <PlantsHome />

              <Text style={s.second_title}>Daily Missions</Text>

              <View>
                {journeys.map((j) => (
                  <View key={j.order} style={s.container2}>
                    <Text style={s.textcontainer}>
                      Mission: <Text style={s.secondtext}>{j.name}</Text>
                    </Text>

                    <Text style={s.desctextname}>
                      Status: <Text style={s.desctext}>{j.status}</Text>
                    </Text>

                    <TouchableOpacity style={s.circleButton}></TouchableOpacity>
                  </View>
                ))}
              </View>

              <LinearGradient
                colors={["rgba(255,255,255,0)", "rgba(255,255,255,0)"]}
                style={s.fadeTop}
              />

              <View
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
