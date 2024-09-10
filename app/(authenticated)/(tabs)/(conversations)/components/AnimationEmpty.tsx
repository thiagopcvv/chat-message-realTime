import { ThemedView } from "@/components/ThemedView";
import LottieView from "lottie-react-native";

export function AnimationEmpty() {
  return (
    <ThemedView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <LottieView
        source={require("@/assets/lottie/messages-animation.json")}
        autoPlay
        loop
        style={{ width: "50%", height: "50%" }}
      ></LottieView>
    </ThemedView>
  );
}
