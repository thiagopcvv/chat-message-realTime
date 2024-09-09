import api from "./api/api";

async function fetchData() {
  const request = await api.get("conversas");

  return request.data;
}

export const conversationService = { fetchData };
