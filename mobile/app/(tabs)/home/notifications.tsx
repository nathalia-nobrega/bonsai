import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationsScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const host =
    Constants?.expoGoConfig?.hostUri?.split(":")[0] ||
    Constants?.expoConfig?.hostUri?.split(":")[0];

  const API_URL = `http://${host}:3000/api/notifications/`;

  async function loadNotifications() {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        console.log("Nenhum userId encontrado no AsyncStorage");
        return;
      }

      const response = await fetch(API_URL + "user/" + userId);
      const data = await response.json();

      console.log("Notificações carregadas:", data);

      setNotifications(data);
    } catch (err) {
      console.log("Erro ao carregar notificações:", err);
    } finally {
      setLoading(false);
    }
  }

  async function markAllAsRead() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      await fetch(API_URL + "read-all/" + userId, { method: "PUT" });
      loadNotifications(); // recarrega depois do PUT
    } catch (err) {
      console.log("Erro ao marcar todas como lidas:", err);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#5C9F60" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Notifications</Text>

      {/* Marcar todas como lidas */}
      {notifications.length > 0 && (
        <TouchableOpacity style={styles.readAllBtn} onPress={markAllAsRead}>
          <Text style={styles.readAllText}>Mark all as read</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.card, item.isRead && styles.cardRead]}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMessage}>{item.message}</Text>
            <Text style={styles.cardDate}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No notifications found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5C9F60",
    marginBottom: 10,
  },
  readAllBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  readAllText: {
    color: "#5C9F60",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardRead: {
    opacity: 0.5,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2B2B2B",
  },
  cardMessage: {
    marginTop: 6,
    color: "#444",
  },
  cardDate: {
    marginTop: 10,
    fontSize: 12,
    color: "#777",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
    fontSize: 16,
  },
});
