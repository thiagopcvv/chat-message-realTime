import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { randomID } from "@/utils/functions";
import { useConversationStore } from "@/store/conversationStore";
import { ListConversations } from "./components/ListConversations";
import { AnimationEmpty } from "./components/AnimationEmpty";
import { useFriendshipsStore } from "@/store/friendshipsStore";

export default function ConversationsScreen() {
  const { fetchConversations, conversations } = useConversationStore();
  const { fetchFriendships, friendships } = useFriendshipsStore();

  useEffect(() => {
    fetchConversations();
    fetchFriendships();
  }, []);

  console.log(friendships, "conversation");
  return (
    <ThemedView
      style={{ flex: 1 }}
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
    >
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          keyExtractor={() => randomID()}
          renderItem={({ item }) => <ListConversations item={item} />}
          ListEmptyComponent={() => <AnimationEmpty />}
        />
      ) : (
        <AnimationEmpty />
      )}
    </ThemedView>
  );
}
