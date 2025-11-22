import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable
} from "react-native";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";

{/* ICONS */}
import EditIcon from "../../../assets/images/editgreen.svg";
import AddIcon from "../../../assets/images/add.svg";
import TypeIcon from "../../../assets/images/sheet.svg";
import CycleIcon from "../../../assets/images/reload.svg";
import GrowthIcon from "../../../assets/images/up.svg";
import CareIcon from "../../../assets/images/heart.svg";
import MaintenanceIcon from "../../../assets/images/config.svg";
import LigthIcon from "../../../assets/images/sun.svg";
import WaterIcon from "../../../assets/images/drop.svg";
import FlowerIcon from "../../../assets/images/flowers.svg";
import TrimmingIcon from "../../../assets/images/scissors.svg";
import TemperatureIcon from "../../../assets/images/temperature.svg";
import TimeIcon from "../../../assets/images/time.svg";
import WorldIcon from "../../../assets/images/world.svg";
import CalendarIcon from "../../../assets/images/calendar.svg";

export default function PlantScreen() {
  const params = useLocalSearchParams();
  const plantId = params?.id;

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  const API_URL = `http://${host}:3000/api/plants/`;

  useEffect(() => {
    async function loadPlant() {
      try {
        if (!plantId) {
          console.log("Sem plantId na navegação");
          return;
        }

        const res = await fetch(API_URL + plantId);
        const data = await res.json();

        console.log("Planta carregada:", data);

        setPlant(data);
      } catch (err) {
        console.log("Erro ao carregar planta:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPlant();
  }, [plantId]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#5C9F60" />
      </View>
    );

  if (!plant)
    return (
      <View style={{ padding: 20 }}>
        <Text>Erro ao carregar planta.</Text>
      </View>
    );


  return (
    <ScrollView style={styles.container}>

      <View style={styles.options}>
      <Pressable style={styles.iconButton}>
        <BlurView intensity={40} tint="light" style={styles.blurButton}>
          <EditIcon width={36} height={36} />
        </BlurView>
      </Pressable>

      <Pressable style={styles.iconButton}>
        <BlurView intensity={40} tint="light" style={styles.blurButton}>
          <AddIcon width={36} height={36} />
        </BlurView>
      </Pressable>
    </View>


      {/* CARD PRINCIPAL */}
      <BlurView intensity={40} tint="light" style={styles.mainCard}>

        <BlurView style={styles.blurImage}>
          <Image
            source={{ uri: plant.photoUrl }}
            style={styles.plantImage}
            resizeMode="cover"
          />
        </BlurView>

        {/* NOMES */}
        <Text style={styles.namePlant}>{plant.chosenName}</Text>
        <Text style={styles.nameScientPlant}>{plant.commonName}</Text>

        {/* CARDS COM ÍCONES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.infosIconCards}
        >
          {/* TYPE */}
          <View style={styles.iconCard}>
            <TypeIcon width={42} height={42} />
            <Text style={styles.iconTitle}>{plant.type}</Text>
            <Text style={styles.iconSubTitle}>type</Text>
          </View>

          {/* CYCLE */}
          <View style={styles.iconCard}>
            <CycleIcon width={40} height={40} />
            <Text style={styles.iconTitle}>{plant.cycle}</Text>
            <Text style={styles.iconSubTitle}>cycle</Text>
          </View>

          {/* GROWTH */}
          <View style={styles.iconCard}>
            <GrowthIcon width={38} height={38} />
            <Text style={styles.iconTitle}>{plant.growthRate}</Text>
            <Text style={styles.iconSubTitle}>growth</Text>
          </View>

          {/* CARE */}
          <View style={styles.iconCard}>
            <CareIcon width={40} height={40} />
            <Text style={styles.iconTitle}>{plant.careLevel}</Text>
            <Text style={styles.iconSubTitle}>care</Text>
          </View>

          {/* MAINTENCANCE*/}
          <View style={styles.iconCard}>
            <MaintenanceIcon width={38} height={38} />
            <Text style={styles.iconTitle}>{plant.maintenance}</Text>
            <Text style={styles.iconSubTitle}>maintenance</Text>
          </View>
        </ScrollView>

        {/* QUADRADÕES */}
        <View style={styles.infoCards}>
          {/* LIGHT */}
          <View style={styles.infoCardBox}>
            <View style={{flexDirection:"row", gap:8}}>
              <LigthIcon width={20} height={20} />
              <Text style={[styles.infoTitle,{color:"#FFC573"}]}>Light</Text>
            </View>
            <Text style={styles.infoText}>
              {plant.sunlightType}
            </Text>
            <View style={{flexDirection:"row", gap:8, marginTop:5}}>
              <TimeIcon width={20} height={20}/>
              <Text style={styles.infoText}>{plant.sunlightDuration}</Text>
            </View>
          </View>

          {/* WATER */}
          <View style={styles.infoCardBox}>
            <View style={{flexDirection:"row", gap:8}}>
              <WaterIcon width={24} height={24} />
              <Text style={[styles.infoTitle,{color:"#5EA0CF"}]}>Water</Text>
            </View>
            <Text style={styles.infoText}>{plant.wateringPeriod}</Text>
            <View style={{flexDirection:"row", gap:8, marginTop:5}}>
              <TemperatureIcon width={20} height={20}/>
              <Text style={styles.infoText}> {plant.wateringBasedTemperature}° Celsius</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCards}>
          {/* FLOWERING */}
          <View style={styles.infoCardBox}>
            <View style={{flexDirection:"row", gap:8}}>
              <FlowerIcon width={24} height={24} />
              <Text style={[styles.infoTitle,{color:"#D87779"}]}>Flowering</Text>
            </View>
            <Text style={styles.infoText}>
              {plant.floweringHasFlowering ? "Has flowers!" : "Doesn't flower"}
            </Text>
            <View style={{flexDirection:"row", gap:8, marginTop:5}}>
              <WorldIcon width={18} height={18}/>
              <Text style={styles.infoText}>{plant.floweringSeason}</Text>
            </View>
          </View>

          {/* TRIMMING */}
          <View style={styles.infoCardBox}>
            <View style={{flexDirection:"row", gap:8}}>
              <TrimmingIcon width={24} height={24} />
              <Text style={[styles.infoTitle,{color:"#8177D8"}]}>Trimming</Text>
            </View>
            <Text style={styles.infoText}>
              {plant.trimmingCount > 0
                ? `${plant.trimmingCount}x · Yearly`
                : "None"}
            </Text>
            <View style={{flexDirection:"row", gap:8, marginTop:5}}>
              <CalendarIcon width={18} height={18}/>
              <Text style={styles.infoText}>{plant.trimmingMonths.join(", ")}</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1ff",
  },

  options: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },

  blurButton: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)", 
    justifyContent: "center",
    alignItems: "center",
  },

  mainCard: {
    marginTop: 10,
    borderRadius: 30,
    paddingBottom: 40,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    marginBottom: 70
  },

  blurImage: {
    borderRadius: 20,
    overflow: "hidden",
    width: 200,
    height: 260,
    marginTop: 10,
    padding:16,
    backgroundColor: "#ffffff6c"
  },

  plantImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  namePlant: {
    marginTop: 12,
    fontSize: 22,
    fontFamily: "Nunito-ExtraBold",
    color: "#555555ff",
  },

  nameScientPlant: {
    fontSize: 16,
    color: "#555555ff",
    fontFamily: "Nunito-Medium",
    marginBottom: 20,
  },

  infosIconCards: {
    width: "100%",
    paddingLeft: 20,
    marginBottom: 20
  },

  iconCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 110,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  iconTitle: {
    fontSize: 16,
    color: "#555555ff",
    fontFamily: "Nunito-ExtraBold",
    marginTop:8
  },

  iconSubTitle: {
    fontSize: 13,
    color: "#555555ff",
    fontFamily: "Nunito-Medium",
  },

  infoCards: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10
  },

  infoCardBox: {
    backgroundColor: "#fff",
    width: "45%",
    padding: 15,
    borderRadius: 16,
  },

  infoTitle: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 15,
    color: "#3C3C3C",
    fontFamily: "Nunito-Medium"
  },
});
