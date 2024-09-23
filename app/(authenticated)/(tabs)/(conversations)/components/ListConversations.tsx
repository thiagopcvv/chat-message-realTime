import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { randomID } from "@/utils/functions";
import { ListItem } from "@rneui/themed";
import { router } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Avatar } from "react-native-paper";

export function ListConversations({ item }: any) {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor(
    { dark: Colors.dark.background, light: Colors.light.background },
    "background"
  );

  const text = useThemeColor(
    { dark: Colors.dark.text, light: Colors.light.text },
    "background"
  );
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: `/(authenticated)/[id]/[nome]`,
          params: { id: item.id, nome: item.name },
        });
      }}
    >
      <ListItem
        containerStyle={{
          backgroundColor: backgroundColor,
          borderBottomColor: theme === "dark" ? "#292929" : "#d6d6d6",
        }}
        key={randomID()}
        bottomDivider
      >
        <Avatar.Icon
          icon="account"
          size={45}
          style={{ backgroundColor: "#2251ae" }}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{ color: text, fontWeight: "bold", fontSize: 16 }}
          >
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: text, fontSize: 13 }}>
            {item.lastMessage}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
}
