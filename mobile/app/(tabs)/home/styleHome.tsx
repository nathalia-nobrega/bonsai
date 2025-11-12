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
  imageWrapper: {
    position: "absolute",
    top: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  halfWhiteBackground: {
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 70,
    paddingVertical: 250,
    zIndex: 1,
  },
});
