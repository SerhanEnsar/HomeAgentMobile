# 📱 HomeAgent Mobile — Cross-Platform Companion App

HomeAgent Mobile is a cross-platform mobile client for the [HomeAgent](https://github.com/serhanensar/HomeAgent) smart home system, built with **Expo (React Native)**. It runs on both Android and iOS and provides system monitoring and device info from your Raspberry Pi.

> ⚠️ **Status:** This is an older prototype. The actively maintained Android client is [HomeAgent-Mobile-K](https://github.com/serhanensar/HomeAgent-Mobile-K) (Jetpack Compose). This project is preserved for reference.

## ✨ Features

- **Status Page** — CPU, RAM, Disk usage from the HomeAgent backend
- **Info Page** — Pi hostname, IP address, Wi-Fi SSID
- **Cross-Platform** — Runs on Android, iOS, and Expo Go

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo (React Native) |
| Language | TypeScript |
| Navigation | Expo Router (file-based) |
| Networking | Fetch API |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- A running [HomeAgent](https://github.com/serhanensar/HomeAgent) backend

### Installation

```bash
git clone https://github.com/serhanensar/HomeAgentMobile.git
cd HomeAgentMobile
npm install
```

### Configuration

Create a `.env` file in the project root (never commit this file):

```env
EXPO_PUBLIC_BASE_URL=http://<PI_IP>:8000
EXPO_PUBLIC_API_KEY=your_api_key_here
```

> The API key must match the `API_KEY` set in your HomeAgent `.env` file.

### Run

```bash
npx expo start
```

Open in:
- **Expo Go** app (scan QR code)
- **Android emulator** (`a` key in terminal)
- **iOS simulator** (`i` key in terminal)

## 🔒 Security

- API key and server URL are loaded from environment variables — never hardcoded.
- `.env` is listed in `.gitignore` and must not be committed.

## 🔗 HomeAgent Ecosystem

| Project | Description |
|---|---|
| [HomeAgent](https://github.com/serhanensar/HomeAgent) | Python FastAPI backend (Raspberry Pi) |
| [HomeAgent-Mobile-K](https://github.com/serhanensar/HomeAgent-Mobile-K) | Actively maintained Android app |
| [HomeAgent_Wear](https://github.com/serhanensar/HomeAgent_Wear) | Wear OS companion app |

## 👨‍💻 Developer

Created and developed by **[Serhan Ensar](https://github.com/SerhanEnsar)**.

## 📄 License

MIT
