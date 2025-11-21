import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
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
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import PlantsHome from "@/components/PlantsHome";


const plants = [
  { 
    id: 1, 
    name: "Cassandra",
    species: "aloe vera",
    image: require("../../../assets/images/Jason.jpeg")
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
  require("../../../assets/images/mission4icon.png"),
  require("../../../assets/images/mission5icon.png"),
];

const host =
  Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
  Constants?.expoConfig?.hostUri?.split(":")[0];

export default function Index() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null);

  const loadJourneys = React.useCallback(async () => {
    let userId = await AsyncStorage.getItem("userId");

    console.log("ID do user no home:", userId);

    // Se ID inválido → limpar e sair
    if (!userId || userId.trim() === "" || userId.length < 10) {
      await AsyncStorage.removeItem("userId");
      return;
    }

    try {
      // Função que tenta dar parse SEM quebrar
      async function safeJSON(res: Response) {
        const text = await res.text();
        if (!text) return null;
        try {
          return JSON.parse(text);
        } catch {
          console.log("JSON inválido recebido, limpando userId");
          await AsyncStorage.removeItem("userId");
          return null;
        }
      }

      const resAll = await fetch(
        `http://${host}:3000/api/journeys/user/${userId}`
      );
      const dataAll = await safeJSON(resAll);

      const resActive = await fetch(
        `http://${host}:3000/api/journeys/user/${userId}/active`
      );
      const active = await safeJSON(resActive);

      // Se backend retornou nada → user não existe mais
      if (!dataAll) {
        console.log("Usuário não existe mais. Limpando storage...");
        await AsyncStorage.removeItem("userId");
        return;
      }

      setJourneys(dataAll);
      setActiveJourney(active);
    } catch (err) {
      console.log("Erro ao carregar journeys", err);
    }
  }, []);


  const hasNoPlants = !plants || plants.length === 0;
  const hasNoMissions = !journeys || journeys.length === 0;

  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const initialWhiteHeight = height * 0.75;

  const calculateMaxHeight = () => {
    const titleHeight = 20;
    const secondTitleHeight = 30;
    const missionsHeight = 4 * 77 + 3 * 10;
    const paddingExtra = 100;

    const totalContentHeight =
      titleHeight +
      secondTitleHeight +
      missionsHeight +
      paddingExtra;

    return Math.min(totalContentHeight, height * 1);
  };

  const MAX_HEIGHT = calculateMaxHeight();
  const SCROLL_LIMIT = 200;

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

            <View style={s.circularImagesContainer}>
              {circularImages.map((image, index) => (
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

            {/* ANIMAÇÃO DO FUNDO BRANCO */}
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

              {/* DAILY MISSIONS */}
              <Text style={s.second_title}>Daily Missions</Text>

              <View>
                {plants.map((p, index) => {
                  const isWater = index < 2;
                  const action = isWater ? "Water" : "Trim";
                  const freq = isWater
                    ? "needs to be watered daily!"
                    : "needs to be trimmed every week!";

                  return (
                    <View key={p.id} style={s.container2}>
                      <Text style={s.textcontainer}>
                        {action} <Text style={s.secondtext}>{p.name}</Text>
                      </Text>

                      <Text style={s.desctextname}>
                        {p.species} <Text style={s.desctext}>{freq}</Text>
                      </Text>

                      <TouchableOpacity style={s.circleButton}></TouchableOpacity>
                    </View>
                  );
                })}
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
