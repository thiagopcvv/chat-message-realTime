import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen options={{headerShown: false}} name="index" />
    </Stack>
  );
}
