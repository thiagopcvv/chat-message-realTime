import { pusher } from "@/pusher";
import { create } from "zustand";

interface iUsePusherMessageStoreProps {
    change: boolean;
    setChange: (change: boolean) => void;
    connectPusher: (channel: string, event: string) => void;
}

const usePusherMessageStore = create<iUsePusherMessageStoreProps>((set) => ({
    change: false,
    setChange: (change: boolean) => set({ change }),
    connectPusher: async (channel: string, event: string) => {
        if (channel) {
            const channelPusher = pusher.subscribe(channel);
            channelPusher.bind(event, (data: any) => {
                console.log(data);
                // set((state) => ({change: !state.change}))
            });
        }
    }
}));

export { usePusherMessageStore };
