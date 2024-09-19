import { friendshipService } from "@/services/friendShipService";
import { create } from "zustand";

interface iUseInfoUserStoreProps {
  allUsers: any;
  loadingUsers: boolean;
  fetchUsers: (term: string) => void;
  setAllUser: (newUsers: any) => void;
  setLoading: (boolean: boolean) => void;
}

const useInfoUsersStore = create<iUseInfoUserStoreProps>((set) => ({
  allUsers: [],
  loadingUsers: false,
  setLoading: (newBoolean: boolean) => set({ loadingUsers: newBoolean }),
  setAllUser: (newUsers: any) => set({ allUsers: newUsers }),
  fetchUsers: async (term: string) => {
    set({ loadingUsers: true });
    const result = await friendshipService.fetchData(term);

    if (!result) set({ allUsers: [] });

    set({ allUsers: result });
    set({ loadingUsers: false });
  },
}));

export { useInfoUsersStore };
