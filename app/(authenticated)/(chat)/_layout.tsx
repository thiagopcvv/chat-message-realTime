import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, useLocalSearchParams } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";

export default function AuthenticatedLayout() {
  const { id, nome } = useLocalSearchParams();
  const theme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const RouterOptions = {
    headerStyle: {
      justifyContent: "center",
      backgroundColor: Platform.OS === "ios" ? "transparent" : backgroundColor,
      shadowColor: Platform.OS === "ios" ? "transparent" : backgroundColor,
    },
    headerTitleStyle: {
      color: textColor,
    },
    headerTintColor: textColor,
    headerBackTitleVisible: true,
    headerBlurEffect: "regular",
    headerTransparent: true,
  };

  return (
    //@ts-expect-error
    <Stack screenOptions={RouterOptions}>
      <Stack.Screen
        name="[id]/[nome]"
        options={{ title: nome.toString() ?? "." }}
      />
    </Stack>
  );
}
