import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Avatar, IconButton } from "react-native-paper";
import { InviteUserModal } from "./inviteUserModal";

interface iRenderUserProps {
  item: any;
}

export function RenderUser({ item }: iRenderUserProps) {
  const [modalUser, setModalUser] = useState(false);

  return (
    <ThemedView
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {item.picture !== null ? (
        <Avatar.Image source={item.picture} />
      ) : (
        <Avatar.Icon
          icon="account"
          style={{ backgroundColor: "#2251ae" }}
          size={35}
        />
      )}
      <ThemedText
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}
        style={{ width: "70%" }}
      >
        {item.username}
      </ThemedText>
      <IconButton
        icon={"plus-circle-outline"}
        iconColor={Colors.primaryColor}
        onPress={() => setModalUser(true)}
      />
      <InviteUserModal item={item} visible={modalUser} setModalUser={setModalUser} />
    </ThemedView>
  );
}
