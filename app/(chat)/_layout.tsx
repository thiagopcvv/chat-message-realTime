import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Platform, useColorScheme, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function ChatLayout() {
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
      backgroundColor: backgroundColor,
      shadowColor: backgroundColor,
    },
    headerTitleStyle: {
      color: textColor,
    },
    headerBackground: () => (
      <>
        {Platform.OS === "ios" ? (
          <BlurView
            tint={theme ?? "light"}
            intensity={85}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
            }}
          />
        ) : (
          <></>
        )}
      </>
    ),
    animationEnabled: true,
    animationTypeForReplace: "push",
    animation: "fade",
  };

  return (
    //@ts-expect-error
    <Stack screenOptions={RouterOptions}>
      <Stack.Screen
        options={{
          title: nome.toString(),
          headerLeft: () => (
            <IconButton
              icon={"chevron-left"}
              onPress={() => router.replace("/(conversations)")}
              size={30}
              iconColor={theme == "dark" ? "white" : "black"}
              accessibilityLabel="Back"
            />
          ),
        }}
        name="[id]/[nome]"
      />
      <Stack.Screen name="visualizeprofile"/>
    </Stack>
  );
}
