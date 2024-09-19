import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
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
export { randomID, getTimeAgo, sortPendingByUpdatedAt };
