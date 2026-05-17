// Copyright (c) 2026 Serhan Ensar. All rights reserved.
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://AgentJee.local:8000";
const SESSION_KEY = "homeagent_session";

export async function login(
  username: string,
  password: string,
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    redirect: "manual",
  });

  if (res.status === 200 || res.status === 302) {
    await SecureStore.setItemAsync(SESSION_KEY, "authenticated");
    return true;
  }
  return false;
}

export async function isAuthenticated(): Promise<boolean> {
  const val = await SecureStore.getItemAsync(SESSION_KEY);
  return val === "authenticated";
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

export async function biometricAuth(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) return false;

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) return false;

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "HomeAgent'e giriş yap",
    fallbackLabel: "Şifre kullan",
  });

  return result.success;
}
