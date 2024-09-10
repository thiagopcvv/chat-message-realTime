import { friendshipService } from "@/services/friendShipService";
import { create } from "zustand";

interface iUseInfoUserStoreProps {
  allUsers: any;
  fetchUsers: () => void;
}

const useInfoUsersStore = create<iUseInfoUserStoreProps>((set) => ({
  allUsers: [],
  fetchUsers: async () => {
    const result = await friendshipService.fetchData();

    if (!result) set({ allUsers: [] });

    set({ allUsers: result });
  },
}));

export { useInfoUsersStore };
