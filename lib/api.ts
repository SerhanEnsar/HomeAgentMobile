const BASE_URL = "http://AgentJee.local:8000";
const API_KEY = "YOUR_API_KEY";

export async function getStatus() {
  const res = await fetch(`${BASE_URL}/api/status?api_key=${API_KEY}`);
  return res.json();
}

export async function getInfo() {
  const res = await fetch(`${BASE_URL}/api/info?api_key=${API_KEY}`);
  return res.json();
}
