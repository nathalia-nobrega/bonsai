import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

export default function Noplants({ missionsCarousel }) {
  // Se não tiver plantas, mostra a tela vazia
  if (!missionsCarousel || missionsCarousel.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image 
          source={require('../assets/images/nomissions.png')}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>No missions available</Text>
        <Text style={styles.emptySubtext}>Plant new seeds and work them out!</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/images/botao.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Go to Garden</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return null;
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyImage: {
    width: 140,
    height: undefined,
    aspectRatio: 280/150,
    marginBottom: 70,
    paddingTop: 100,
    alignContent: "center",
    marginTop: -100,
  },
  emptyText: {
    position: "absolute",
    top: 65,
    fontSize: 17,
    fontFamily: 'Nunito-ExtraBold',
    color: '#3C3C3C',
    left: -5,
  },
  emptySubtext: {
    position: "absolute",
    top: 90,
    left: -10,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#3C3C3C',
    textAlign: 'center',
  },
  button: {
    position: "absolute",
    top: 115,
    backgroundColor: "#5C9F60",
    borderRadius: 35,
    paddingVertical: 9,
    paddingHorizontal: 20,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    marginLeft: 8,
    textAlign: "right",
  },
  buttonIcon: {
    width: 25,
    height: 25,
  },
});