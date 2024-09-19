import { friendshipService } from "@/services/friendShipService";
import { sortPendingByUpdatedAt } from "@/utils/functions";
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
    console.log("result", result);
    if (!result)
      set({
        friendships: {
          friends: [],
          pending: [],
        },
      });
    const sortedPending = sortPendingByUpdatedAt(result.pending);

    set({ friendships: { ...result, pending: sortedPending } });
  },
}));

export { useFriendshipsStore };
