import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },

  halfWhiteBackground: {
    width: "100%",
    minHeight: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    color: "#5C9F60",
    fontFamily: "Nunito-ExtraBold",
    marginBottom: 20,
    marginTop: 30,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 1,
  },

  namesci: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    fontSize: 11,
  },
  name: {
    position: "absolute",
    left: 10,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    fontSize: 11,
  },

  second_title: {
    fontSize: 16,
    color: "#5C9F60",
    fontFamily: "Nunito-ExtraBold",
    marginBottom: 10,
    left: 1,
  },

  container2: {
    width: "100%",
    height: 75,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#8F8F8F",
    borderRadius: 25,
    marginTop: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },

  textcontainer: {
    fontFamily: "Nunito-SemiBold",
    color: "#3C3C3C",
    fontSize: 15,
    flexShrink: 1,
    maxWidth: "80%",
    marginTop: 5,
  },

  secondtext: {
    fontFamily: "Nunito-ExtraBold",
    color: "#3C3C3C",
    fontSize: 15,
    flexShrink: 1,
  },

  desctext: {
    fontFamily: "Poppins-Regular",
    color: "#3C3C3C",
    fontSize: 11,
    flexShrink: 1,
    marginTop: 5,
  },
  
  desctextname: {
    fontFamily: "Poppins-Bold",
    color: "#3C3C3C",
    fontSize: 11,
    flexShrink: 1,
    maxWidth: "80%",
  },

  circleButton: {
  width: 40,
  height: 40,
  borderRadius: 40,
  backgroundColor: "transparent",
  borderWidth: 8,
  borderColor: "#5C9F60",
  marginRight: 15,
  left: 260,
  top:5
},
  scrollView: {
    width: "100%",
  },

  scrollViewContent: {
    paddingBottom: 60,
  },

  fadeTop: {
    height: 10,
  },
  circularImagesContainer: {
    position:  "absolute",
    top: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 60,
    marginHorizontal: -50,
    height: 120,
  },
  circularImageWrapper: {
    marginHorizontal: 15,
  },
  secondImageWrapper: {
    marginHorizontal: 15,
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  secondImage: {
    width: 108,
    height: 108,
    borderRadius: 35,
  },
missionContainer: {
    alignItems: 'center',
}
});
