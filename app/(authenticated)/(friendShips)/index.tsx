import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useFriendshipsStore } from "@/store/friendshipsStore";
import { Avatar, IconButton, Text, TextInput } from "react-native-paper";
import SerachBarThemed from "@/components/SearchBarThemed";
import { FlatList } from "react-native";
import { useInfoUsersStore } from "@/store/infoUserStore";
import LottieView from "lottie-react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { RenderUser } from "./components/renderUser";

export default function FriendShip() {
  const { user } = useAuth();
  const { friendships, fetchFriendships } = useFriendshipsStore();
  const { allUsers, fetchUsers } = useInfoUsersStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFriendships(user.id);
  }, []);

  function handleFindUser() {
    setLoading(true);
    if (searchTerm !== "") {
      fetchUsers(searchTerm);
    }
    setLoading(false);
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <SerachBarThemed
        placeholder="Busque pelo username"
        value={searchTerm}
        onChangeText={setSearchTerm}
        mode="bar"
        onSubmitEditing={handleFindUser}
      />

      {loading ? (
        <Text style={{ color: "white" }}>Buscando...</Text>
      ) : (
        <>
          {allUsers.length > 0 ? (
            <>
              <FlatList
                data={allUsers}
                renderItem={({ item }) => <RenderUser item={item} />}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: "100%" }}
                ListEmptyComponent={() => (
                  <>
                    <ThemedText type="subtitle" style={{ color: "red" }}>
                      Usuário não encontrado!
                    </ThemedText>
                    <LottieView
                      source={require("@/assets/lottie/Animation-search.json")}
                      autoPlay
                      loop
                      style={{ width: 4100, height: 400 }}
                    />
                  </>
                )}
              />
            </>
          ) : (
            <LottieView
              source={require("@/assets/lottie/Animation-search.json")}
              autoPlay
              loop
              style={{ width: 400, height: 400 }}
            />
          )}
        </>
      )}
    </ThemedView>
  );
}
