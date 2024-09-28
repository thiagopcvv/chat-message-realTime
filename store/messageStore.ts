import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface iUseMessageStoreProps {
  messages: any[];
  loadingMsg: boolean;
  getMessages: (friendId: number) => void
  fetch: (conversations: any, id: any, userId: number) => void
}

const useMessageStore = create<iUseMessageStoreProps>((set) => ({
  messages: [],
  loadingMsg: false,
  getMessages: async (friendId: number) => {
    const storedMessages = await AsyncStorage.getItem(`messages_${friendId}`);
    const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
    console.log(parsedMessages, "parse")
    set({ messages: parsedMessages });
  },
  fetch: async (conversations: any, id: any) => {
    conversations.forEach((conversation: any) => {
      if (conversation.id == id) {

        if (conversation.messages.length > 0) {

          AsyncStorage.setItem(`messages_${id}`, JSON.stringify(conversation.messages))
            .then(() => {
              console.log('Mensagens salvas no AsyncStorage');
            })
            .catch((error) => {
              console.error('Erro ao salvar mensagens no AsyncStorage', error);
            });

          set({
            messages: conversation.messages
          });
        }
      }
    });
  }



}));

export { useMessageStore };
