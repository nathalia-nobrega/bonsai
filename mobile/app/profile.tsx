import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";

export default function Index() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const { width, height } = useWindowDimensions();

  const { userId } = useLocalSearchParams();
  const [name, setName] = useState("");
  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handlePickImage = async () => {
    if (!hasPermission) {
      Alert.alert(
        "Permissão necessária",
        "Você precisa permitir o acesso à galeria para escolher uma foto."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCreateUser = async () => {
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Empty Field :(",
        text2: "Please, enter your name to proceed.",
        position: "bottom",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.15.16:3000/api/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            photoUrl: "https://pbs.twimg.com/media/FKyTCh7WQAQQNUr.jpg",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        Toast.show({
          type: "error",
          text1: "Something went wrong...",
          text2: errorData.message || "Could not update your profile.",
          position: "top",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Hello {name}!",
        text2: "Welcome to Bonsai!",
        position: "top",
      });

      router.push("/home");
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <ImageBackground
          source={require("../assets/images/image.png")}
          style={styles.background}
          resizeMode="cover"
        >
          {/* blur */}
          <LinearGradient
            colors={["rgba(0,0,0,0.0)", "rgba(33,57,35,0.5)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.overlay}
          />

          {/* Círculo */}
          <View style={styles.circle}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.circleImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../assets/images/default.png")}
                style={styles.circleImage}
                resizeMode="cover"
              />
            )}

            {/* Botão de edição */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={handlePickImage}
            >
              <Ionicons name="pencil-outline" size={22} color="#68B36D" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={setName}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { width: width * 0.55, height: 50 }]} //rebecca
            onPress={handleCreateUser}
          >
            <Text
              style={styles.buttonText}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              Next
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },

  inputContainer: {
    width: "80%",
    marginTop: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffffff",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#5C9F60",
    textAlignVertical: "center",
  },

  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    zIndex: 1,
  },
  circleImage: {
    borderRadius: 100,
    width: "80%",
    height: "80%",
    zIndex: 1,
  },
  editButton: {
    position: "absolute",
    bottom: 13,
    right: 10,
    backgroundColor: "rgba(253, 249, 249, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 9,
    zIndex: 5,
    elevation: 5,
  },
  button: {
    position: "absolute",
    bottom: 40,
    right: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  buttonText: {
    color: "#5C9F60",
    fontWeight: "700",
    fontSize: 20,
    left: 1,
    marginTop: 10,
    textAlign: "center",
    textAlignVertical: "center",
    flexShrink: 1,
  },
});
