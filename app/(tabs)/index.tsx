import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getStatus } from "../../lib/api";

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const result = await getStatus();
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#22d3ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 HomeAgent</Text>

      <View style={styles.card}>
        <Text style={styles.label}>CPU</Text>
        <Text style={styles.value}>{data?.cpu_percent?.toFixed(1)}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>RAM</Text>
        <Text style={styles.value}>{data?.ram_percent?.toFixed(1)}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Disk</Text>
        <Text style={styles.value}>{data?.disk_percent?.toFixed(1)}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Sıcaklık</Text>
        <Text
          style={[
            styles.value,
            { color: data?.cpu_temp > 70 ? "#ef4444" : "#22c55e" },
          ]}
        >
          {data?.cpu_temp}°C
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080c14",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#22d3ee",
    marginBottom: 24,
  },
  card: {
    width: "100%",
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
    fontSize: 28,
    fontWeight: "800",
    color: "#3b82f6",
  },
});
