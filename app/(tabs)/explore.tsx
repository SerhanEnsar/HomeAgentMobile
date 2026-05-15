import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "http://AgentJee.local:8000";

export default function FilesScreen() {
  const [devices, setDevices] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [currentMount, setCurrentMount] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"devices" | "files">("devices");

  async function downloadFile(name: string, path: string) {
    const fullPath = currentPath ? `${currentPath}/${name}` : name;
    const url = `${BASE_URL}/api/files/download?mount=${encodeURIComponent(currentMount)}&path=${encodeURIComponent(fullPath)}`;
    const localUri = FileSystem.documentDirectory + name;

    const { uri } = await FileSystem.downloadAsync(url, localUri);
    await Sharing.shareAsync(uri);
  }

  async function loadDevices() {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/api/files/devices`);
    const data = await res.json();
    setDevices(data.filter((d: any) => d.filesystem !== "tmpfs"));
    setLoading(false);
    setView("devices");
  }

  async function loadDir(mount: string, path: string) {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/files/list?mount=${encodeURIComponent(mount)}&path=${encodeURIComponent(path)}`
      );
      const data = await res.json();
      setCurrentMount(mount);
      setCurrentPath(path);
      setItems(data.items || []);
      setView('files');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    if (!currentPath) {
      loadDevices();
    } else {
      const parts = currentPath.split("/");
      parts.pop();
      loadDir(currentMount, parts.join("/"));
    }
  }

  useState(() => {
    loadDevices();
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#22d3ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📁 Files</Text>

      {view === "files" && (
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backText}>⬅ Back</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumb} numberOfLines={1}>
            {currentMount}/{currentPath}
          </Text>
        </View>
      )}

      <FlatList
        data={view === "devices" ? devices : items}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          if (view === "devices") {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => loadDir(item.mount, "")}
              >
                <Text style={styles.itemName}>💾 {item.mount}</Text>
                <Text style={styles.itemMeta}>
                  {item.used} / {item.size} ({item.percent})
                </Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                if (item.type === "dir") {
                  const newPath = currentPath
                    ? `${currentPath}/${item.name}`
                    : item.name;
                  loadDir(currentMount, newPath);
                }
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.itemName}>
                  {item.type === 'dir' ? '📁' : '📄'} {item.name}
                </Text>
                {item.type === 'file' && (
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      downloadFile(item.name, currentPath);
                    }}
                    style={styles.dlBtn}>
                    <Text style={styles.dlText}>⬇</Text>
                  </TouchableOpacity>
                )}
              </View>
              {item.size != null && (
                <Text style={styles.itemMeta}>
                  {(Number(item.size) / 1024).toFixed(1)} KB
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080c14",
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#22d3ee",
    marginBottom: 16,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  backBtn: {
    backgroundColor: "#1e2d45",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backText: {
    color: "#e2e8f0",
    fontSize: 13,
  },
  breadcrumb: {
    flex: 1,
    color: "#64748b",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#0f1623",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1e2d45",
  },
  itemName: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },
  itemMeta: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 4,
  },

  dlBtn: {
    backgroundColor: '#1e3a5f',
    borderRadius: 8,
    padding: 6,
  },
  dlText: {
    color: '#3b82f6',
    fontSize: 16,
  },
});


