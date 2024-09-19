import { pusher } from "@/pusher";
import { useEffect, useState } from "react";

function usePusher() {
  const [channel, setChannel] = useState("");
  const [event, setEvent] = useState("");
  const [onChange, setOnChange] = useState(false);

  function pusherConnectionChannel(event: string, channel: string) {
    setEvent(event);
    setChannel(channel);
  }

  useEffect(() => {
    if (channel) {
      const channelPusher = pusher.subscribe(channel);
      channelPusher.bind(event, (data: any) => {
        setOnChange((prevstate) => !prevstate);
      });
    }
  }, [channel, event]);

  return { pusherConnectionChannel, onChange };
}

export { usePusher };
