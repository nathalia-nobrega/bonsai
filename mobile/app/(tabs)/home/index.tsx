import { 
  View, 
  Text, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet,
  useWindowDimensions,
  Animated,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { s } from "./styleHome";
import Carousel from "react-native-reanimated-carousel";
import * as React from "react";
import { BlurView } from "expo-blur";
import Noplants from "@/components/Noplants";

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

const missionCarousel = [
  {
    mission: "First Sprout!",
    image: require("../../../assets/images/mission1icon.png"),
  },
  {
    mission: "New Life!",
    image: require("../../../assets/images/mission2icon.png"),
  },
  {
    mission: "Triple Threat!",
    image: require("../../../assets/images/mission3icon.png"),
  },
  {
    mission: "Raining Season!",
    image: require("../../../assets/images/mission4icon.png"),
  },
  {
    mission: "Its time to trim!",
    image: require("../../../assets/images/mission5icon.png")
  },
]

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const GAP = 18;
  const VISIBLE_ITEMS = 2.3;
  const ITEM_WIDTH = (width - GAP * (VISIBLE_ITEMS + 1)) / VISIBLE_ITEMS;


  const initialWhiteHeight = height * 0.75;
  
  // calculo de altura
  const calculateMaxHeight = () => {
    const titleHeight = 20;
    const carouselHeight = ITEM_WIDTH * 1.6;
    const secondTitleHeight = 30;
    const missionsHeight = (4 * 77) + (3 * 10);
    const paddingExtra = 100;
    
    const totalContentHeight = titleHeight + carouselHeight + secondTitleHeight + missionsHeight + paddingExtra;
    
    return Math.min(totalContentHeight, height * 1);
  };

  const MAX_HEIGHT = calculateMaxHeight();
  const SCROLL_LIMIT = 200;

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

  const hasNoPlants = !carouselData || carouselData.length === 0;
  const hasNoMissions = !missionCarousel || missionCarousel.length === 0;

  return (
  <ImageBackground
    source={require("../../../assets/images/image.png")}
    style={s.background}
    resizeMode="cover"
  >
    <Noplants carouselData={carouselData} />

    {carouselData && carouselData.length > 0 && (
      <>
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(33, 57, 35, 1)"]}
          start={{ x: 0.5, y: 0.1 }}
          end={{ x: 0.5, y: 0.9 }}
          style={s.overlay}
        />
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={{ height: height * 0.3 }} />
            {/* faz a animação certinha para o hwb subir tranquilamente */}
            <Animated.View
              style={[
                s.halfWhiteBackground,
                {
                  height: scrollY.interpolate({
                    inputRange: [0, SCROLL_LIMIT],
                    outputRange: [initialWhiteHeight, MAX_HEIGHT],
                    extrapolate: 'clamp',
                }),
                transform: [
                {
              translateY: scrollY.interpolate({
                inputRange: [0, SCROLL_LIMIT],
                outputRange: [0, 30],
                extrapolate: 'clamp',
              }),
                    },
                  ],
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

              <View>
                <View style={s.container2}>
                  <Text style={s.textcontainer}>
                    Water <Text style={s.secondtext}>{carouselData[0].name}</Text>
                  </Text>
                  <Text style={s.desctextname}>
                    {carouselData[0].species}{" "}
                    <Text style={s.desctext}>needs to be watered daily!</Text>
                  </Text>
                  <TouchableOpacity style={s.circleButton}></TouchableOpacity>
                </View>

                <View style={s.container2}>
                  <Text style={s.textcontainer}>
                    Water <Text style={s.secondtext}>{carouselData[1].name}</Text>
                  </Text>
                  <Text style={s.desctextname}>
                    {carouselData[1].species}{" "}
                    <Text style={s.desctext}>needs to be watered daily!</Text>
                  </Text>
                  <TouchableOpacity style={s.circleButton}></TouchableOpacity>
                </View>

                <View style={s.container2}>
                  <Text style={s.textcontainer}>
                    Trim <Text style={s.secondtext}>{carouselData[2].name}</Text>
                  </Text>
                  <Text style={s.desctextname}>
                    {carouselData[2].species}{" "}
                    <Text style={s.desctext}>needs to be trimmed every week!</Text>
                  </Text>
                  <TouchableOpacity style={s.circleButton}></TouchableOpacity>
                </View>

                <View style={s.container2}>
                  <Text style={s.textcontainer}>
                    Trim <Text style={s.secondtext}>{carouselData[2].name}</Text>
                  </Text>
                  <Text style={s.desctextname}>
                    {carouselData[2].species}{" "}
                    <Text style={s.desctext}>needs to be trimmed every week!</Text>
                  </Text>
                  <TouchableOpacity style={s.circleButton}></TouchableOpacity>
                </View>
              </View>    
              <LinearGradient
                colors={["rgba(255,255,255,0)", "rgba(255,255,255,0)"]}
                style={s.fadeTop}
              />
              {/* cobre o que restava do branco! */}
              <View 
                style={{
                  position: 'absolute',
                  bottom: -100,
                  left: 0,
                  right: 0,
                  height: 100,
                  backgroundColor: 'white',
                }}
              />
            </Animated.View>
          </ScrollView>
        </>
      )}
    </ImageBackground>
  );
}