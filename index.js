import Pusher from "pusher-js";

export function testePusher() {
  const pusher = new Pusher("app-key", {
    cluster: "mt1",
    encrypted: false,
    forceTLS: false,
    wsHost: "192.168.100.124", //ip da maquina que esta rodando
    wsPort: 6001,
    enabledTransports: ["ws"],
    disableStats: true,
  });

  const channel = pusher.subscribe("my-channel");

  channel.bind("my-event", function (data) {
    console.log(data)
    console.log(`Received: ${data.message}`);
  });

  pusher.connection.bind("error", function (err) {
    console.error("Erro de conexão:", err);
  });

  pusher.connection.bind("connected", function () {
    console.log("Conectado ao Pusher via Soketi!");
  });

  pusher.connection.bind("state_change", function (states) {
    console.log("Estado da conexão:", states);
  });
}
