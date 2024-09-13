import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFriendshipsStore } from "@/store/friendshipsStore";
import LottieView from "lottie-react-native";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import NotificationItem from "./components/notificationItem";

export default function NotificationScreen() {
  const { friendships } = useFriendshipsStore();
  return (
    <ThemedView style={{ flex: 1, padding: 10 }}>
      {friendships.pending.length > 0 ? (
        <FlatList
          data={friendships.pending}
          renderItem={({ item }) => <NotificationItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText
            style={{ fontSize: 16, fontWeight: "500", color: "#888" }}
          >
            Você não possui notificações
          </ThemedText>
          <LottieView
            source={require("@/assets/lottie/catNotification.json")}
            style={{ width: 200, height: 200 }}
            autoPlay
            loop
          />
        </View>
      )}
    </ThemedView>
  );
}
