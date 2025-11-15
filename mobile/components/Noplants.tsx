import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

export default function Noplants({ carouselData }) {
  if (!carouselData || carouselData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image 
          source={require('../assets/images/noplant.png')} // Altere para o caminho da sua imagem
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>No plants in your garden...</Text>
        <Text style={styles.emptySubtext}>Plant new seeds and watch them bloom!</Text>
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
};

const styles = StyleSheet.create({
emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 70,
    left: -120,
  },
  emptyText: {
    position: "absolute",
    top: 35,
    fontSize: 17,
    fontFamily: 'Nunito-ExtraBold',
    color: '#3C3C3C',
    left: 10,
  },
  emptySubtext: {
    position: "absolute",
    top: 65,
    left: 10,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#3C3C3C',
    textAlign: 'center',
  },
button: {
  position: "absolute",
  top: 90,
  backgroundColor: "#5C9F60",
  borderRadius: 35,
  paddingVertical: 9,
  paddingHorizontal: 20,
  right: -40,
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