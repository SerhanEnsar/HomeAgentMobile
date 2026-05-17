// Copyright (c) 2026 Serhan Ensar. All rights reserved.
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getInfo } from "../../lib/api";
import { logout } from '../../lib/auth';

export default function SettingsScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfo()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#22d3ee" />
      </View>
    );
  }

  const items = [
    { label: "IP", value: data?.ip },
    { label: "WiFi", value: data?.wifi },
    { label: "Hostname", value: data?.hostname },
    { label: "User", value: data?.username },
    { label: "Version", value: data?.version },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>
      {items.map((item) => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value || "—"}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={async () => {
          await logout();
          router.replace('/login');
        }}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080c14",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#22d3ee",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#0f1623",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e2d45",
  },
  label: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e2e8f0",
  },
  logoutBtn: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: {
    color: '#f87171',
    fontWeight: '700',
    fontSize: 15,
  },
});
