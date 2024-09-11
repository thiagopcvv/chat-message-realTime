import { ThemedView } from "@/components/ThemedView";
import { useFriendshipsStore } from "@/store/friendshipsStore";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";

export default function NotificationScreen() {
  const { friendships } = useFriendshipsStore();

  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <FlatList
        data={friendships.pendig}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      />
    </ThemedView>
  );
}
