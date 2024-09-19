import Pusher from "pusher-js";

// export function connectPusher() {
//   const channel = pusher.subscribe("my-channel");

//   channel.bind("my-event", function (data: { message: string }) {
//     console.log(data);
//     console.log(`Received: ${data.message}`);
//   });

//   pusher.connection.bind("error", function (err: any) {
//     console.error("Erro de conexão:", err);
//   });

//   pusher.connection.bind("connected", function () {
//     console.log("Conectado ao Pusher via Soketi!");
//   });

//   pusher.connection.bind("state_change", function (states: any) {
//     console.log("Estado da conexão:", states);
//   });
// }

const pusher = new Pusher("app-key", {
  cluster: "mt1",
  forceTLS: false,
  wsHost: "192.168.100.179",
  wsPort: 6001,
  enabledTransports: ["ws"],
  disableStats: true,
});

export { pusher };
