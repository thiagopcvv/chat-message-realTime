import Pusher from "pusher-js"; // Importação do Pusher
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useMessageStore } from "@/store/messageStore";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { View, Alert } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalLoadingMsg } from "./components/modalLoadingMsg";
import { formatMessages } from "./utils/handleDataFunctionsChat";
import { useConversationStore } from "@/store/conversationStore";
import { messageService } from "@/services/messageService";
import { randomID } from "@/utils/functions";
import { pusher } from "@/pusher";

export default function ChatScreen() {
  const { user } = useAuth();
  const { id, friend } = useLocalSearchParams();
  const { loadingMsg, messages, getMessages, fetch, messagesFormatted } =
    useMessageStore();
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const { conversations } = useConversationStore();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background2, dark: Colors.dark.background2 },
    "background"
  );

  useEffect(() => {
    if (typeof id === "string" || typeof id === "number") {
      getMessages(parseInt(id));
      fetch(conversations, id, user.id);
    }
  }, [conversations]);

  useEffect(() => {
    if (messages && messages.length > 0 && messages.length > messagesFormatted.length) {
      
        const formattedMessages = formatMessages(messages);
        setChatMessages([...formattedMessages]);
        AsyncStorage.setItem(
          `messages_${id}`,
          JSON.stringify(formattedMessages)
        )
          .then(() => {
            console.log("Mensagens salvas no AsyncStorage");
          })
          .catch((error) => {
            console.error("Erro ao salvar mensagens no AsyncStorage", error);
          });
    } else {
      setChatMessages([...messagesFormatted]);
    }
  }, [messages, messagesFormatted]);

  useEffect(() => {
    const channel = pusher.subscribe(`Conversation.Id.${user.id}`);

    channel.bind(`Conversation.Event.${user.id}`, (data: any) => {
      const newMessage = formatMessages([data.message]);
      setChatMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
    });

    return () => {
      channel.unbind(`Conversation.Event.${user.id}`);
      pusher.unsubscribe(`Conversation.Id.${user.id}`);
    };
  }, [user.id]);

  const onSend = useCallback(
    async (newMessages: any = []) => {
      if (newMessages.length > 0 && newMessages[0]?.text) {
        const messageText = newMessages[0].text;

        const pendingMessage = {
          ...newMessages[0],
          _id: randomID(),
          createdAt: new Date(),
          pending: true,
        };

        setChatMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [pendingMessage])
        );

        try {
          if (
            typeof id === "string" ||
            (typeof id === "number" && typeof friend === "string")
          ) {
            const result = await messageService.sendMessage(
              parseInt(id),
              messageText,
              friend
            );

            if (result) {
              setChatMessages((previousMessages) =>
                previousMessages.map((msg) =>
                  msg._id === pendingMessage._id
                    ? {
                        ...msg,
                        pending: false,
                        _id: result.id,
                        createdAt: result.created_at,
                        conversa_id: result.conversa_id,
                      }
                    : msg
                )
              );
            }
          }
        } catch (error) {
          Alert.alert("Erro", "Não foi possível enviar a mensagem: " + error);

          setChatMessages((previousMessages) =>
            previousMessages.map((msg) =>
              msg._id === pendingMessage._id
                ? {
                    ...msg,
                    pending: false,
                    error: true,
                    _id: randomID(),
                  }
                : msg
            )
          );
        }
      }
    },
    [id, friend, messages]
  );

  const renderBubble = useCallback((props: any) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: Colors.primaryColor,
            },
          }}
        />
        {props.currentMessage.pending && (
          <Ionicons name="time-outline" size={16} color={"gray"} />
        )}
        {props.currentMessage.error && (
          <Ionicons name="alert-circle-outline" size={16} color={"red"} />
        )}
      </View>
    );
  }, []);

  const memoizedMessages = useMemo(() => chatMessages, [chatMessages]);

  useEffect(() => {
    const func = async () => {
      await AsyncStorage.setItem(
        `messages_${id}`,
        JSON.stringify(chatMessages)
      );
    };

    func();
  }, [chatMessages]);

  return (
    <>
      <GiftedChat
        messages={memoizedMessages}
        renderBubble={renderBubble}
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
