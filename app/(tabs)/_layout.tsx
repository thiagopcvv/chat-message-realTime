import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "background"
  );

  const RouterOptions: any = {
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerTitleStyle: {
      color: textColor,
    },
    headerShadowVisible: false,
  };

  return (
    <Tabs screenOptions={RouterOptions}>
      <Tabs.Screen options={{ title: "Conversas" }} name="(chat)" />
      <Tabs.Screen options={{ title: "Configurações" }} name="(settings)" />
    </Tabs>
  );
}
