import { friendshipService } from "@/services/friendShipService";
import { create } from "zustand";

interface iUseInfoUserStoreProps {
  allUsers: any;
  fetchUsers: (term: string) => void;
  setAllUser: (newUsers: any) => void
}

const useInfoUsersStore = create<iUseInfoUserStoreProps>((set) => ({
  allUsers: [],
  setAllUser: (newUsers: any) => set({ allUsers: newUsers }),
  fetchUsers: async (term: string) => {
    const result = await friendshipService.fetchData(term);

    if (!result) set({ allUsers: [] });

    set({ allUsers: result });
  },
}));

export { useInfoUsersStore };
