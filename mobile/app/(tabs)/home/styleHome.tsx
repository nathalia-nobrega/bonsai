import { StyleSheet, View, Text } from 'react-native';

 export const s = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    zIndex: 2,
  },
  halfWhiteBackground: {
  width: "100%",
  height: "70%",
  marginTop: "auto",
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingHorizontal: 24,
  paddingTop: 18, // mantém conteúdo abaixo do título
  justifyContent: "flex-start",
  zIndex: 2,
},
title: {
  position: "absolute",
  top: 5,            // exatamente na borda superior do painel
  left: 20,          // alinhado com paddingHorizontal
  fontSize: 17,
  color: "#5C9F60",
  fontFamily: "Nunito-ExtraBold",
  paddingTop: 10,     // se quiser pequeno "respiro" visual (opcional)
  zIndex: 5,
},
});