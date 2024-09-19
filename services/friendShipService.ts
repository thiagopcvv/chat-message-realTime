import { Alert } from "react-native";
import api from "./api/api";

async function fetchData(term: string) {
  const request = await api.get(`busca-usuario?username=${term}`);
  const response = request.data;

  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

async function fetchFriendships() {
  const request = await api.get("friendship");
  const response = request.data;
  if (!response) Alert.alert("Ocorreu um problema, tente mais tarde!");

  return response;
}

async function registerFriendship(id: number) {
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
