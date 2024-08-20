import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  Platform,
} from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  const [isPlayingChat, setIsPlayingChat] = useState(true);
  const [isPlayingSettings, setIsPlayingSettings] = useState(false);

  const theme = useColorScheme();

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const RouterOptions: any = {
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerTitleStyle: {
      color: textColor,
    },
    headerShadowVisible: false,
    tabBarStyle: {
      borderTopWidth: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: "10%",
      position: "absolute",
      backgroundColor: Platform.OS === "ios" ? "transparent" : backgroundColor,
    },
    tabBarBackground: () => (
      <>
        {Platform.OS === "ios" ? (
          <BlurView
            tint={theme ?? "light"}
            intensity={100}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: "hidden",
            }}
          />
        ) : (
          <></>
        )}
      </>
    ),
    tabBarActiveTintColor: textColor,
  };

  const handlePressChat = (props: any) => {
    setIsPlayingChat(true);
    setIsPlayingSettings(false);
    props.onPress(); // Navega para a aba
  };

  const handlePressSettings = (props: any) => {
    setIsPlayingSettings(true);
    setIsPlayingChat(false);
    props.onPress(); // Navega para a aba
  };

  const renderLottieIcon = (
    source: string | AnimationObject | { uri: string } | undefined,
    isPlaying: boolean
  ) => {
    return (
      <LottieView
        source={source}
        autoPlay={isPlaying}
        loop={isPlaying}
        style={styles.lottie}
      />
    );
  };

  return (
    <Tabs screenOptions={RouterOptions}>
      <Tabs.Screen
        name="(conversations)"
        options={{
          title: "Conversas",
          tabBarIcon: () =>
            renderLottieIcon(
              theme === "dark"
                ? !isPlayingChat
                  ? require("@/assets/lottie/chat.json")
                  : require("@/assets/lottie/chat-white.json")
                : !isPlayingChat
                ? require("@/assets/lottie/chat-gray.json")
                : require("@/assets/lottie/chat.json"),
              isPlayingChat
            ),
          tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={() => handlePressChat(props)}>
              <View style={styles.tabBarButton}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Configurações",
          tabBarIcon: () =>
            renderLottieIcon(
              theme === "dark"
                ? !isPlayingSettings
                  ? require("../../assets/lottie/settings.json")
                  : require("@/assets/lottie/settings-white.json")
                : !isPlayingSettings
                ? require("@/assets/lottie/settings-gray.json")
                : require("@/assets/lottie/settings.json"),
              isPlayingSettings
            ),
          tabBarButton: (props) => (
            <TouchableWithoutFeedback
              onPress={() => handlePressSettings(props)}
            >
              <View style={styles.tabBarButton}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 30,
    height: 30,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
