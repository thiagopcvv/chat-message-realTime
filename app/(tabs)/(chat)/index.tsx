import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function ChatScreen() {
  return (
    <ThemedView
      darkColor={Colors.dark.background}
      lightColor={Colors.light.background}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText darkColor={Colors.dark.text} lightColor={Colors.light.text}>
        ChaT
      </ThemedText>
    </ThemedView>
  );
}
