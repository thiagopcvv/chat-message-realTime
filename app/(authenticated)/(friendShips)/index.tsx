import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Text } from "react-native-paper";
import SerachBarThemed from "@/components/SearchBarThemed";
import { ActivityIndicator, FlatList } from "react-native";
import { useInfoUsersStore } from "@/store/infoUserStore";
import LottieView from "lottie-react-native";
import { ThemedText } from "@/components/ThemedText";
import { RenderUser } from "./components/renderUser";
import { Colors } from "@/constants/Colors";

export default function FriendShip() {
  const { user } = useAuth();
  const { allUsers, fetchUsers, setAllUser, loadingUsers } =
    useInfoUsersStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAllUser([]);
  }, []);

  function handleFindUser() {
    if (searchTerm !== "") {
      fetchUsers(searchTerm);
    }
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

      {loadingUsers ? (
        <ActivityIndicator color={Colors.primaryColor} size={30} />
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
