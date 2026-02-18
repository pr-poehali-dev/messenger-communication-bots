import funcUrls from "../../backend/func2url.json";

const API_URL = funcUrls["messenger-api"];
const USER_ID = "user-me";

async function request(action: string, options?: { method?: string; body?: Record<string, unknown>; params?: Record<string, string> }) {
  const method = options?.method || "GET";
  const params = new URLSearchParams({ action, ...options?.params });

  const res = await fetch(`${API_URL}?${params}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": USER_ID,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  return res.json();
}

export async function getChats() {
  const data = await request("chats");
  return data.chats || [];
}

export async function getMessages(chatId: string) {
  const data = await request("messages", { params: { chat_id: chatId } });
  return data.messages || [];
}

export async function getContacts(search = "") {
  const data = await request("contacts", { params: { search } });
  return data.contacts || [];
}

export async function sendMessage(chatId: string, text: string) {
  const data = await request("send", { method: "POST", body: { chat_id: chatId, text } });
  return data.message;
}

export async function markRead(chatId: string) {
  await request("read", { method: "POST", body: { chat_id: chatId } });
}
