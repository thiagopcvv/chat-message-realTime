import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Button, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function SignInScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
    >
      <Button title="Login" onPress={() => {}} />
      <Button
        title="cadastrar"
        onPress={() => {
          router.replace("/signUp");
        }}
      />
    </ThemedView>
  );
}
