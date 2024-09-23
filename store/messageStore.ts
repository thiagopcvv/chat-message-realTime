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

    set({ messages: parsedMessages });
  },
  fetch: async (conversations: any, id: any, userId: number) => {
    conversations.forEach((conversation: any) => {
      if (conversation.id == id) {
        const userMessages: any[] = [];
        const friendMessages: any[] = [];

        if (conversation.messages.length > 0) {
          conversation.messages.forEach((message: any) => {
            if (message.user_id === userId) {
              userMessages.push(message);
            } else {
              friendMessages.push(message);
            }
          });

          console.log('Mensagens do usuário:', userMessages);
          console.log('Mensagens do amigo:', friendMessages);

          const messagesToStore = {
            user: userMessages,
            friend: friendMessages
          };

          AsyncStorage.setItem(`messages_${id}`, JSON.stringify(messagesToStore))
            .then(() => {
              console.log('Mensagens salvas no AsyncStorage');
            })
            .catch((error) => {
              console.error('Erro ao salvar mensagens no AsyncStorage', error);
            });

           set({
            messages: [messagesToStore]
          });
        }
      }
    });
  }



}));

export { useMessageStore };
