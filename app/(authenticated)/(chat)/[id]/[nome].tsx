import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useMessageStore } from "@/store/messageStore";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Text } from "react-native-paper";
import { ModalLoadingMsg } from "./components/modalLoadingMsg";

export default function ChatScreen() {
  const { id, nome } = useLocalSearchParams();
  const { fetchMessages, loadingMsg, messages, getMessages } =
    useMessageStore();
  const [messages2, setMessages] = useState<any>([]);

  const backgroundColor = useThemeColor(
    { light: Colors.light.background2, dark: Colors.dark.background2 },
    "background"
  );

  useEffect(() => {
    if (typeof id === "string" || typeof id === "number") {
      getMessages(parseInt(id));
      if (messages.length === 0) {
        fetchMessages(parseInt(id), messages);
      }
    }
  }, []);

  console.log(messages)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer " + id,
        createdAt: "2024-08-21T13:14:04.840Z",
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages2 = []) => {
    setMessages((previousMessages: never[] | undefined) =>
      GiftedChat.append(previousMessages, messages2)
    );
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages2}
        messagesContainerStyle={{ backgroundColor: backgroundColor }}
        //@ts-expect-error
        onSend={(messages2) => onSend(messages2)}
        user={{
          _id: 1,
        }}
      />
      <ModalLoadingMsg visible={loadingMsg} />
    </>
  );
}
