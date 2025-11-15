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

  // TÍTULO — removido position absolute
  title: {
    fontSize: 16,
    color: "#5C9F60",
    fontFamily: "Nunito-ExtraBold",
    marginBottom: 35,
    marginTop: 30,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    zIndex: 1,
  },

  // nomes dentro do card — OK usar absolute aqui (dentro do card)
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
    bottom: 25,
    left: 10,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    fontSize: 11,
  },

  second_title: {
    fontSize: 16,
    color: "#5C9F60",
    fontFamily: "Nunito-ExtraBold",
    marginTop: -20,
    marginBottom: 10,
    left: 1,
  },

  // CARD DAS MISSÕES — removido 'position absolute' e 'top', 'left'
  container2: {
    width: "100%",
    height: 77,
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
  },

  secondtext: {
    fontFamily: "Nunito-ExtraBold",
    color: "#3C3C3C",
    fontSize: 15,
  },

  desctext: {
    fontFamily: "Poppins-Regular",
    color: "#3C3C3C",
    fontSize: 11,
  },
  
  desctextname: {
    fontFamily: "Poppins-Bold",
    color: "#3C3C3C",
    fontSize: 11,
  },

  circleButton: {
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "transparent",
    borderWidth: 8,
    borderColor: "#5C9F60",
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
});
