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
import { formatMessages } from "./utils/handleDataFunctionsChat";

export default function ChatScreen() {
  const { user } = useAuth();
  const { id, nome } = useLocalSearchParams();
  const { fetchMessages, loadingMsg, messages, getMessages } =
    useMessageStore();
  const [cahtMessages, setChatMessages] = useState<any>([]);

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


  useEffect(() => {
    if (messages && messages.length > 0) {
      const userMessages = formatMessages(messages[0].user, true);
      const friendMessages = formatMessages(messages[0].friend, false);
      setChatMessages([...friendMessages, ...userMessages]);
    }
  }, [messages]);

  const onSend = useCallback((newMessages = []) => {
    console.log(newMessages, "new")
    setChatMessages((previousMessages: never[] | undefined) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <>
      <GiftedChat
        messages={cahtMessages}
        messagesContainerStyle={{ backgroundColor: backgroundColor }}
        //@ts-expect-error
        onSend={(messages2) => onSend(messages2)}
        user={{
          _id: user.id,
        }}
      />
      <ModalLoadingMsg visible={loadingMsg} />
    </>
  );
}
