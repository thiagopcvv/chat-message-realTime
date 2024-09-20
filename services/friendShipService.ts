import { Alert } from "react-native";
import api from "./api/api";
import { theresConnection } from "@/utils/functions";

async function fetchData(term: string) {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\n Conecte-se a uma rede para carregar os dados!");
  }
  const request = await api.get(`busca-usuario?username=${term}`);
  const response = request.data;

  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

async function fetchFriendships() {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\n Conecte-se a uma rede para carregar os dados!");
  }
  const request = await api.get("friendship");
  const response = request.data;
  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

async function registerFriendship(id: number) {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\n Conecte-se a uma rede para carregar os dados!");
  }
  try {
    const formdata = new FormData();
    formdata.append("friend_id", id.toString());
    const request = await api.post("friendship", formdata, {
      headers: { "Content-Type": "multipart/form-data", contentType: false },
    });
    const response = request.data;
    if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

    return response;
  } catch (error: any) {
    if (error.message) {
      if (error.message === "Request failed with status code 403") {
        Alert.alert(
          "Você já recebeu \n ou enviou um pedido de amizade desse usuário"
        );
      }
    }
  }
}

async function toAcceptFriendiship(id: number) {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\n Conecte-se a uma rede para carregar os dados!");
  }

  const formdata = new FormData();
  formdata.append("friend_id", id.toString());
  const request = await api.put(`friendship/${id}`);
  const response = request.data;
  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

export const friendshipService = {
  fetchData,
  fetchFriendships,
  registerFriendship,
  toAcceptFriendiship,
};
