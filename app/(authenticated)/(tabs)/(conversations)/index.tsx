import React, { useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { randomID } from "@/utils/functions";
import { useConversationStore } from "@/store/conversationStore";
import { ListConversations } from "./components/ListConversations";
import { AnimationEmpty } from "./components/AnimationEmpty";
import { useFriendshipsStore } from "@/store/friendshipsStore";

export default function ConversationsScreen() {
  const { fetchConversations, conversations, loadingConversation } =
    useConversationStore();
  const { fetchFriendships } = useFriendshipsStore();
  
  useEffect(() => {
    fetchConversations();
    fetchFriendships();
  }, []);

  return (
    <ThemedView
      style={{ flex: 1 }}
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
    >
      {loadingConversation ? (
        <ActivityIndicator color={Colors.primaryColor} size={30} />
      ) : (
        <>
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
        </>
      )}
    </ThemedView>
  );
}
