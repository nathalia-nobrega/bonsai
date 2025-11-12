import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    borderWidth: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginHorizontal: 20,
    justifyContent: `flex-start`,
    shadowColor: "#ffffffff",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text1: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#000",
    paddingRight: 40,
  },
  text2: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#1b1b1bff",
    paddingRight: 40,
  },
});

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.container, { shadowColor: "#1e1e1eff", shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 1 }]}>
      {text1 && (
        <Text style={[styles.text1, { color: "#79120aff" }]}>{text1}</Text>
      )}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.container, { shadowColor: "#1e1e1eff", shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 1 }]}>
      {text1 && (
        <Text style={[styles.text1, { color: "#5C9F60" }]}>{text1}</Text>
      )}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
  delete: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.container, { shadowColor: "#1e1e1eff", shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 1 }]}>
      {text1 && (
        <Text style={[styles.text1, { color: "#79120aff" }]}>{text1}</Text>
      )}
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
};

export default toastConfig;
