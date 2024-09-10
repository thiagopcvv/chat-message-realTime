import React, { useEffect } from "react";
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
import LottieView from "lottie-react-native";
import { Link, router } from "expo-router";
import { useConversationStore } from "@/store/conversationStore";
import { ListConversations } from "./components/ListConversations";
import { AnimationEmpty } from "./components/AnimationEmpty";

export default function ConversationsScreen() {
  const { fetchConversations, conversations } = useConversationStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  console.log(conversations, "conversation");
  return (
    <ThemedView
      style={{ flex: 1 }}
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
    >
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          keyExtractor={() => randomID()}
          renderItem={({ item }) => <ListConversations item={item} />}
          ListEmptyComponent={() => <AnimationEmpty />}
        />
      ) : (
        <AnimationEmpty />
      )}
    </ThemedView>
  );
}
