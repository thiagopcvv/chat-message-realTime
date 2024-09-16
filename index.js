import Pusher from "pusher-js/react-native";

export function testePusher() {
  const pusher = new Pusher("2ce438142eb9ca852f6d", {
    cluster: "sa1",
  });

  const channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data) {
    console.log(`Event received: ${JSON.stringify(data)}`);
  });
}
