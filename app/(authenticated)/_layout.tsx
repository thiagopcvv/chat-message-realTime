import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { Platform } from "react-native";

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
        name="(friendShips)"
        options={{
          title: "Buscar usuários",
          headerTitleStyle: { color: text },
          headerTintColor: Platform.OS === 'ios' ? undefined : text
        }}
      />
      <Stack.Screen
        name="(notifications)"
        options={{
          title: "Notificações",
          headerTitleStyle: { color: text },
          headerTintColor: Platform.OS === 'ios' ? undefined : text
        }}
      />
    </Stack>
  );
}
