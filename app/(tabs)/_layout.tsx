import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, useColorScheme } from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const [isPlayingChat, setIsPlayingChat] = useState(false);
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
      backgroundColor: backgroundColor,
      borderTopWidth: 0,
      elevation: 0,
      height: 70,
      paddingBottom: 10,
    },
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
        name="(chat)"
        options={{
          title: "Conversas",
          tabBarIcon: () =>
            renderLottieIcon(
              theme === "dark"
                ? require("../../assets/lottie/chat-white.json")
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
                ? require("../../assets/lottie/settings-white.json")
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
    width: 40,
    height: 40,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
