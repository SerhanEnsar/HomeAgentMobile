// Copyright (c) 2026 Serhan Ensar. All rights reserved.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { biometricAuth, isAuthenticated, login } from '../lib/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const auth = await isAuthenticated();
    if (auth) {
      const bio = await biometricAuth();
      if (bio) {
        router.replace('/(tabs)');
        return;
      }
    }
    setChecking(false);
  }

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre gerekli');
      return;
    }
    setLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Hata', 'Kullanıcı adı veya şifre yanlış');
      }
    } catch (e) {
      Alert.alert('Hata', 'Bağlantı kurulamadı');
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#22d3ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 HomeAgent</Text>
      <Text style={styles.sub}>Giriş Yap</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı adı"
          placeholderTextColor="#64748b"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080c14',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#22d3ee',
    marginBottom: 8,
  },
  sub: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
  },
  form: {
    width: '100%',
    gap: 12,
  },
  input: {
    backgroundColor: '#0f1623',
    borderWidth: 1,
    borderColor: '#1e2d45',
    borderRadius: 12,
    padding: 14,
    color: '#e2e8f0',
    fontSize: 15,
  },
  btn: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});