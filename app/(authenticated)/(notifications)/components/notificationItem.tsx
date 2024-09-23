import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { getTimeAgo } from "@/utils/functions";
import { useState } from "react";
import { friendshipService } from "@/services/friendShipService";
import { useConversationStore } from "@/store/conversationStore";
import { useFriendshipsStore } from "@/store/friendshipsStore";
import { usePusherMessageStore } from "@/store/pusherMessageStore";
import { useAuth } from "@/hooks/useAuth";

interface iNoticationItemProps {
  item: any;
}

export default function NotificationItem({ item }: iNoticationItemProps) {
  const { user } = useAuth();
  const { fetchConversations } = useConversationStore();
  const { fetchFriendships } = useFriendshipsStore();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onAcceptFriendship() {
    setLoading(true);
    if (item.user_id) {
      await friendshipService.toAcceptFriendiship(item.user_id);
      fetchConversations();
      fetchFriendships();
    }

    setLoading(false);
    setAccepted(true);
  }

  return (
    <View style={styles.container}>
      {item.picture ? (
        <Avatar.Image source={item.picture} size={45} style={styles.avatar} />
      ) : (
        <Avatar.Icon icon="account" size={45} style={styles.avatarIcon} />
      )}
      <View style={styles.textContainer}>
        <ThemedText style={styles.username}>{item.username}</ThemedText>
        <ThemedText style={styles.time}>
          {getTimeAgo(item.updated_at)}
        </ThemedText>
      </View>
      {!accepted ? (
        <TouchableOpacity
          onPress={onAcceptFriendship}
          style={styles.acceptButton}
        >
          <Button
            mode="contained"
            buttonColor="rgb(36, 117, 255)"
            textColor="#fff"
            style={{ borderRadius: 8 }}
            loading={loading}
          >
            <Text style={{ fontWeight: "bold" }}>Aceitar</Text>
          </Button>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => {}} style={styles.acceptButton}>
          <Button
            mode="contained"
            buttonColor="rgb(42, 45, 49)"
            textColor="#fff"
            style={{ borderRadius: 8 }}
            loading={loading}
          >
            <Text style={{ fontWeight: "bold" }}>Aceito</Text>
          </Button>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,

    width: "100%",
  },
  avatar: {
    backgroundColor: "#e1e1e1",
  },
  avatarIcon: {
    backgroundColor: "#2251ae",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  acceptButton: {
    marginLeft: "auto",
  },
});
