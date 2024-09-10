import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useFriendshipsStore } from "@/store/friendshipsStore";
import { useInfoUsersStore } from "@/store/infoUserStore";
import { Text, TextInput } from "react-native-paper";
import { FlatList } from "react-native";

export default function FriendShip() {
  const { user } = useAuth();
  const { allUsers, fetchUsers } = useInfoUsersStore();
  const { friendships, fetchFriendships } = useFriendshipsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchFriendships(user.id);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(
        allUsers.filter((user: { username: string; }) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allUsers]);

  const renderFriend = ({ item }: any) => {
    return (
      <ThemedView
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
      >
        <Text style={{ color: "white" }}>{item.username}</Text>
      </ThemedView>
    );
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <TextInput
        placeholder="Buscar usuários"
        value={searchTerm}
        onChangeText={setSearchTerm}
        mode="outlined"
        style={{ marginBottom: 20, width: "100%" }}
      />

      <Text style={{ color: "white", marginBottom: 10 }}>Seus Amigos:</Text>
      <FlatList
        data={friendships.friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: "100%" }}
      />
    </ThemedView>
  );
}
