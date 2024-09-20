import { theresConnection } from "@/utils/functions";
import api from "./api/api";
import { Alert } from "react-native";

async function fetchData() {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\n Conecte-se a uma rede para carregar os dados!");
  }
  const request = await api.get("conversas");

  return request.data;
}

export const conversationService = { fetchData };
