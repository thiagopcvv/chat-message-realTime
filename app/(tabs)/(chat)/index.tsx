import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "react-native-paper";
import { ListItem } from "@rneui/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import { conversations } from "@/mocks/conversationsMocks";
import { randomID } from "@/utils/functions";

export default function ChatScreen() {
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
    <ThemedView
      style={{ flex: 1 }}
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
    >
      <ScrollView>
        {conversations.map((conversation) => (
          <TouchableOpacity onPress={() => {}}>
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
                  {conversation.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: text, fontSize: 13 }}>
                  {conversation.lastMessage}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}
