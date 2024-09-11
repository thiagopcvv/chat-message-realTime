import { friendshipService } from "@/services/friendShipService";
import { create } from "zustand";

interface iUseFriendshipsStoreProps {
  friendships: {
    friends: any;
    pendig: any;
  };
  fetchFriendships: () => void;
}

const useFriendshipsStore = create<iUseFriendshipsStoreProps>((set) => ({
  friendships: {
    friends: [],
    pendig: [],
  },
  fetchFriendships: async () => {
    const result = await friendshipService.fetchFriendships();

    if (!result)
      set({
        friendships: {
          friends: [],
          pendig: [],
        },
      });

    set({ friendships: result });
  },
}));

export { useFriendshipsStore };
