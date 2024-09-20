import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as Network from "expo-network";

function randomID() {
  return Math.random().toString(36).substring(2, 9);
}

function getTimeAgo(updatedAt: string) {
  const date = new Date(updatedAt);
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}

function sortPendingByUpdatedAt(pending: any[]) {
  return pending.sort(
    //@ts-expect-error
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );
}

async function theresConnection() {
  const connection = (await Network.getNetworkStateAsync()).isConnected;

  return connection;
}

export { randomID, getTimeAgo, sortPendingByUpdatedAt, theresConnection };
