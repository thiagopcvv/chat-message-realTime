import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("@/assets/lottie/settings.json")}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        loop
      />
      <Text>settings</Text>
    </View>
  );
}
