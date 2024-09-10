import { Alert } from "react-native";
import api from "./api/api";

async function fetchData() {
  const request = await api.get("info");

  const response = request.data;
  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

async function fetchFriendships(id: number) {
  const request = await api.get("friendship");
  const response = request.data;
  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

export const friendshipService = { fetchData, fetchFriendships };
