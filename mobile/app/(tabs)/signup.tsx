import React from "react";
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Image, 
  TextInput
} from "react-native";

export default function Ihome() {
  return (
    <ImageBackground
    source={require("../../assets/images/image.png")}
    style={styles.background}
    resizeMode="cover"
  >
    {/* Imagem flutuante */}
    <View style={styles.floatingImage}>
      <Image
        source={require("../../assets/images/flor.png")}
        resizeMode="cover"
      />
    </View>
      {/* Metade branca da tela */}
      <View style={styles.halfWhiteBackground}>
        <Text style={styles.title}>
          Sign up.
        </Text>

      <View style={styles.container}>
        <Text style={styles.label}>Email Adress</Text>
        <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Password</Text>
        <TextInput
            style={styles.input}
            keyboardType="password-address"
            autoCapitalize="none"
            />
      </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("botao clicado")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          ----------
          <Text style={styles.footerText}> or sign up with ---------</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

    floatingImage: {
    position: "absolute",
    bottom: "80%",
    left: 20,
    width: 60,   
    height: 60,
    resizeMode: "contain",
    },

    label: {
        fontSize: 16,
        fontWeight: 600,
        color: "#090909ff",
        marginBottom: 10,
        marginTop: 10,
        left: 10,
    },
    input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f2f2f208",
    borderRadius: 30,
    paddingHorizontal: 100,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#5C9F60",
  },

  halfWhiteBackground: {
    width: "100%",
    height: "70%", // metade da tela
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 200,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 300,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5C9F60",
    textAlign: "auto",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5C9F60",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 48,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  footerText: {
    fontWeight: "200",
    color: "#5C9F60",
    textAlign: "center",
    marginTop: 30,
  },
  signInText: {
    fontWeight: "900",
  },
});
