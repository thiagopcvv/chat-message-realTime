import { messageService } from "@/services/messageService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface iUseMessageStoreProps {
  messages: any[];
  fetchMessages: (friendId: number, messages: any[]) => void;
  loadingMsg: boolean;
  getMessages: (friendId: number) => void
}

const useMessageStore = create<iUseMessageStoreProps>((set) => ({
  messages: [],
  loadingMsg: false,
  getMessages: async (friendId: number) => {
    const storedMessages = await AsyncStorage.getItem(`messages_${friendId}`);
    const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];

    set({ messages: parsedMessages });
  },
  fetchMessages: async (friendId: number, messages: any[]) => {
    set({ loadingMsg: true });

    try {
      const storedMessages = await AsyncStorage.getItem(`messages_${friendId}`);
      const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];

      const result = await messageService.fetchData(friendId);

      if (parseInt(result.id_conversa) === friendId) {
        if (parsedMessages.length === 0) {
          parsedMessages.push(result);
        }

        parsedMessages.forEach((message: any) => {
          if (message.id_conversa === result.id_conversa) {
            message = result;
          }
        });

        set({ messages: parsedMessages });

        await AsyncStorage.setItem(`messages_${friendId}`, JSON.stringify(parsedMessages));
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }

    set({ loadingMsg: false });
  },

}));

export { useMessageStore };
