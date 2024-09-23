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

async function sendMessage(conversaId: number, mensagem: string) {
  const connection = await theresConnection();

  if (!connection) {
    Alert.alert("Sem conexão!\nConecte-se a uma rede para enviar a mensagem.");
    return;
  }

  try {
    const response = await api.post("messages", {
      conversaId: conversaId,
      mensagem: mensagem,
    });

    if (response.data === true) {
      console.log("Mensagem enviada com sucesso!");
      return response.data;
    } else {
      throw new Error("Erro inesperado no envio da mensagem");
    }
  } catch (error) {
    console.warn("Erro ao enviar mensagem: " + error);
    Alert.alert(
      "Não foi possível enviar a mensagem\nTente novamente mais tarde."
    );
  }
}

export const messageService = { fetchData, sendMessage };
