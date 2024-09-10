import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, useLocalSearchParams } from "expo-router";

export default function AuthenticatedLayout() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const text = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "background"
  );

  return (
    <Stack
      screenOptions={{
        animationTypeForReplace: "push",
        animation: "flip",
        headerStyle: { backgroundColor },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Conversas" }}
      />
      <Stack.Screen name="(chat)" options={{ headerShown: false }} />
      <Stack.Screen
        name="friendShips"
        options={{ title: "Amigos", headerTitleStyle: { color: text } }}
      />
    </Stack>
  );
}
