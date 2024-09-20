import { messageService } from "@/services/messageService";
import { create } from "zustand";

interface iUseMessageStoreProps {
  messages: any[];
  fetchMessages: (friendId: number, messages: any[]) => void;
  loadingMsg: boolean;
}

const useMessageStore = create<iUseMessageStoreProps>((set) => ({
  messages: [],
  loadingMsg: false,
  fetchMessages: async (friendId: number, messages: any[]) => {
    set({ loadingMsg: true });

    try {
      const result = await messageService.fetchData(friendId);    
      if (parseInt(result.id_conversa) === friendId) {
        if (messages.length === 0) {
          messages[result.id_conversa] = result;
        }
    
        messages.forEach((message) => {
          if (message.id_conversa === result.id_conversa) {
            messages[message.id_conversa] = result;
          }
        });
    
        set({ messages });
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
    
    set({ loadingMsg: false });
    
  },
}));

export { useMessageStore };
