import { 
  View, 
  Text, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { s } from "./styleHome";
import Carousel from "react-native-reanimated-carousel";
import * as React from "react";
import { BlurView } from "expo-blur";

const carouselData = [
  {
    name: "Cassandra",
    species: "aloe vera",
    image: require("../../../assets/images/Jason.jpeg"),
  },
  {
    name: "Timothy",
    species: "pothos",
    image: require("../../../assets/images/Tim.jpeg"),
  },
  {
    name: "Damian",
    species: "bambu",
    image: require("../../../assets/images/Damian.jpeg"),
  },
];

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();


  const GAP = 18; 
  const VISIBLE_ITEMS = 2.3;


  const ITEM_WIDTH = (width - GAP * (VISIBLE_ITEMS + 1)) / VISIBLE_ITEMS;

  const renderItem = ({ item }) => (
  <View
    style={{
      width: ITEM_WIDTH,
      height: ITEM_WIDTH * 1.7,
      borderRadius: 15,
      backgroundColor: "#ffffff22",
      marginHorizontal: GAP / 2,
      marginTop: 20,
    }}
  >
    <View
      style={{
        width: "90%",
        height: "70%",
        borderRadius: 15,
        overflow: "hidden",
      }}
    >
      <Image
        source={item.image}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0, 0, 0, 1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 4 }}
        style={s.overlay}
        />
        <BlurView intensity={10} tint="dark" pointerEvents="none" style={s.blur} />
       
    </View>

    <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.namesci}>{item.species}</Text>
    </View>
  </View>
);

  return (
    <ImageBackground
      source={require("../../../assets/images/image.png")}
      style={s.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(33, 57, 35, 1)"]}
        start={{ x: 0.5, y: 0.1 }}
        end={{ x: 0.5, y: 0.9 }}
        style={s.overlay}
      />

      <View
        style={[
          s.halfWhiteBackground,
          {
            paddingTop: height * 0.11,
            paddingBottom: height * 0.25,
          },
        ]}
      >
        <Text style={s.title}>Your garden</Text>

        {/* CARROSSEL */}
        <View
          style={{
            width: "100%",
            height: ITEM_WIDTH * 1.6,
            marginTop: -30,
            marginLeft: -20,
            overflow: "visible",
          }}
        >
          <Carousel
              loop={false}
              pagingEnabled={false}
              mode="parallax"
              modeConfig={{
                parallaxScrollingOffset: 0,
                parallaxScrollingScale: 0.98,
                parallaxAdjacentItemScale: 1,
              }}
              width={ITEM_WIDTH + GAP}
              height={ITEM_WIDTH * 1.8}
              data={carouselData}
              scrollAnimationDuration={0}
              renderItem={renderItem}
              snapEnabled={false}
              style={{
                width: "10%",
                alignSelf: "flex-start",
                overflow: "visible",
              }}
            />
        </View>
        <Text style={s.second_title}>Daily Missions</Text>
          <View style={s.container2}>
            <Text style={s.textcontainer}> 
              Water {""}
            <Text style={s.secondtext}>Cassandra</Text>
            </Text>
            <Text style={s.desctextname}>Aloe Vera {""}
            <Text style={s.desctext}>needs to be watered daily!</Text>
            </Text>
            <TouchableOpacity style={s.circleButton}></TouchableOpacity>
          </View>
      </View>
    </ImageBackground>
  );
}
