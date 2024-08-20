import { useLocalSearchParams } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Text } from "react-native-paper";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer " + id,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: never[] | undefined) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages}
        //@ts-expect-error
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
}
