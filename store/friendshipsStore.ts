import { friendshipService } from "@/services/friendShipService";
import { create } from "zustand";

interface iUseFriendshipsStoreProps {
  friendships: {
    friends: any;
    pending: any;
  };
  fetchFriendships: () => void;
}

const useFriendshipsStore = create<iUseFriendshipsStoreProps>((set) => ({
  friendships: {
    friends: [],
    pending: [],
  },
  fetchFriendships: async () => {
    const result = await friendshipService.fetchFriendships();

    if (!result)
      set({
        friendships: {
          friends: [],
          pending: [],
        },
      });

    set({ friendships: result });
  },
}));

export { useFriendshipsStore };
