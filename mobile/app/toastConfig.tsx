import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginVertical: 6,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  text1: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#222",
    marginBottom: 2,
  },
  text2: {
    fontFamily: "Poppins-Regular",
    fontSize: 12.5,
    color: "#444",
    lineHeight: 18,
  },
});

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={[
        styles.container,
        { borderLeftWidth: 4, borderLeftColor: "#E53935" },
      ]}
    >
      {text1 && (
        <Text style={[styles.text1, { color: "#D32F2F" }]}>{text1}</Text>
      )}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),

  success: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={[
        styles.container,
        { borderLeftWidth: 4, borderLeftColor: "#43A047" },
      ]}
    >
      {text1 && (
        <Text style={[styles.text1, { color: "#388E3C" }]}>{text1}</Text>
      )}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),

  delete: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={[
        styles.container,
        { borderLeftWidth: 4, borderLeftColor: "#C62828" },
      ]}
    >
      {text1 && (
        <Text style={[styles.text1, { color: "#B71C1C" }]}>{text1}</Text>
      )}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
};

export default toastConfig;
