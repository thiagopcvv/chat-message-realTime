import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Avatar, IconButton } from "react-native-paper";

export function RenderUser({ item }: any) {
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
      <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={{width: "70%"}}>
        {item.username}
      </ThemedText>
      <IconButton
        icon={"plus-circle-outline"}
        iconColor={Colors.primaryColor}
      />
    </ThemedView>
  );
}
