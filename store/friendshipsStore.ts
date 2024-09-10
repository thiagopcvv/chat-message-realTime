import { friendshipService } from "@/services/friendShipService";
import { create } from "zustand";

interface iUseFriendshipsStoreProps {
  friendships: any;
  fetchFriendships: (id: number) => void;
}

const useFriendshipsStore = create<iUseFriendshipsStoreProps>((set) => ({
  friendships: [],
  fetchFriendships: async (id: number) => {
    const result = await friendshipService.fetchFriendships(id);

    if (!result) set({ friendships: [] });

    set({ friendships: result });
  },
}));

export { useFriendshipsStore };
