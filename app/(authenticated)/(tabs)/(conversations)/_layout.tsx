import { useAuth } from "@/hooks/useAuth";
import { usePusher } from "@/hooks/usePusher";
import { useConversationStore } from "@/store/conversationStore";
import { usePusherMessageStore } from "@/store/pusherMessageStore";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function ConversationsLayout() {
  const { user } = useAuth();
  const { pusherConnectionChannel, onChange } = usePusher();
  const { fetchConversations } = useConversationStore();
  const { connectPusher, change } = usePusherMessageStore();

  useEffect(() => {
    pusherConnectionChannel(
      "ConversationUpdated",
      `Conversation.User.${user.id}`
    );
    connectPusher(
      `Conversation.Id.${user.id}`,
      `Conversation.Event.${user.id}`,
      change
    );
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [onChange]);

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
    </Stack>
  );
}
