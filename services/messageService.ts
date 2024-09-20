import { Alert } from "react-native";
import api from "./api/api";
import { theresConnection } from "@/utils/functions";

async function fetchData(friendId: number) {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\n Conecte-se a uma rede para carregar os dados!");
  }

  try {
    const request = await api.get(`messages?friendId=${friendId}`);
    const response = request.data;

    return response;
  } catch (error) {
    console.warn("Não foi possível baixar conversas" + error);
    Alert.alert("Não foi possível carregar as mensagens\n Estamos resolvendo!");
  }
}

export const messageService = { fetchData };
