import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useMessageStore } from "@/store/messageStore";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { View, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Text } from "react-native-paper";
import { ModalLoadingMsg } from "./components/modalLoadingMsg";
import { formatMessages } from "./utils/handleDataFunctionsChat";
import { useConversationStore } from "@/store/conversationStore";
import { messageService } from "@/services/messageService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen() {
  const { user } = useAuth();
  const { id, nome } = useLocalSearchParams();
  const { loadingMsg, messages, getMessages, fetch } = useMessageStore();
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const { conversations } = useConversationStore();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background2, dark: Colors.dark.background2 },
    "background"
  );

  useEffect(() => {
    if (typeof id === "string" || typeof id === "number") {
      getMessages(parseInt(id));
      if (messages.length === 0) {
        fetch(conversations, id, user.id);
      }
    }
  }, []);

  useEffect(() => {
    if (messages && messages.length > 0) {
      console.log(messages)
      const userMessages = formatMessages(messages[0].user, true);
      const friendMessages = formatMessages(messages[0].friend, false);
      setChatMessages([...friendMessages, ...userMessages]);
    }
  }, [messages]);

  const onSend = useCallback(async (newMessages = []) => {
    const messageText = newMessages[0]?.text;

    if (messageText) {
      try {
        await messageService.sendMessage(parseInt(id), messageText);
        
        setChatMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages)
        );

        const updatedMessages = [...chatMessages, ...newMessages];
        await AsyncStorage.setItem(`messages_${id}`, JSON.stringify(updatedMessages));

      } catch (error) {
        Alert.alert("Erro", "Não foi possível enviar a mensagem");
      }
    }
  }, [chatMessages]);

  return (
    <>
      <GiftedChat
        messages={chatMessages}
        messagesContainerStyle={{ backgroundColor: backgroundColor }}
        onSend={(messages2) => onSend(messages2)}
        user={{
          _id: user.id,
        }}
      />
      <ModalLoadingMsg visible={loadingMsg} />
    </>
  );
}
