import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface iUseMessageStoreProps {
  messages: any[];
  messagesFormatted: any[],
  loadingMsg: boolean;
  getMessages: (friendId: number) => void
  fetch: (conversations: any, id: any, userId: number) => void
}

const useMessageStore = create<iUseMessageStoreProps>((set) => ({
  messages: [],
  messagesFormatted: [],
  loadingMsg: false,
  getMessages: async (friendId: number) => {
    const storedMessages = await AsyncStorage.getItem(`messages_${friendId}`);
    const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];

    set({ messagesFormatted: parsedMessages });
  },
  fetch: async (conversations: any, id: any) => {
    conversations.forEach((conversation: any) => {
      if (conversation.id == id) {

        if (conversation.messages.length > 0) {

          set({
            messages: conversation.messages
          });
        }
      }
    });
  }



}));

export { useMessageStore };
