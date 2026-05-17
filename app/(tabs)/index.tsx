// Copyright (c) 2026 Serhan Ensar. All rights reserved.
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getStatus } from "../../lib/api";

function MetricCard({ label, value, color, unit, max = 100 }: {
  label: string;
  value: number;
  color: string;
  unit: string;
  max?: number;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color }]}>
          {value?.toFixed(1)}{unit}
        </Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%` as any, backgroundColor: color }]} />
      </View>
    </View>
  );
}

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

      <MetricCard
        label="CPU"
        value={data?.cpu_percent}
        color="#3b82f6"
        unit="%"
      />
      <MetricCard
        label="RAM"
        value={data?.ram_percent}
        color="#8b5cf6"
        unit="%"
      />
      <MetricCard
        label="Disk"
        value={data?.disk_percent}
        color="#22c55e"
        unit="%"
      />
      <MetricCard
        label="Sıcaklık"
        value={data?.cpu_temp}
        color={data?.cpu_temp > 70 ? '#ef4444' : data?.cpu_temp > 55 ? '#f59e0b' : '#22c55e'}
        unit="°C"
        max={100}
      />
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  barBg: {
    height: 8,
    backgroundColor: '#1e2d45',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
  },
});
