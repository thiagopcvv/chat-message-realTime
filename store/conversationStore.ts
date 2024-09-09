import { conversationService } from "@/services/conversationService";
import { create } from "zustand";

interface iUseConversationStoreProps {
  conversations: any;
  fetchConversations: () => void;
}

const useConversationStore = create<iUseConversationStoreProps>((set) => ({
  conversations: [],
  fetchConversations: async () => {
    const result = await conversationService.fetchData();

    if (!result) set({ conversations: [] });

    set({ conversations: result });
  },
}));

export { useConversationStore };
