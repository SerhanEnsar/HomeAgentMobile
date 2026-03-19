import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeAgent</Text>
      <Text style={styles.sub}>Bağlanıyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080c14",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#22d3ee",
  },
  sub: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
  },
});
