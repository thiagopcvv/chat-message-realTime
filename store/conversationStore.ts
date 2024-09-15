import { conversationService } from "@/services/conversationService";
import { create } from "zustand";

interface iUseConversationStoreProps {
  conversations: any;
  loadingConversation: boolean
  fetchConversations: () => void;
}

const useConversationStore = create<iUseConversationStoreProps>((set) => ({
  conversations: [],
  loadingConversation: false,
  fetchConversations: async () => {
    set({ loadingConversation: true })
    const result = await conversationService.fetchData();

    if (!result) set({ conversations: [] });

    set({ conversations: result });
    set({ loadingConversation: false })
  },
}));

export { useConversationStore };
