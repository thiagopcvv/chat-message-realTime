import { Stack } from "expo-router";

export default function ConversationsLayout() {
  return (
    <Stack>
      <Stack.Screen options={{headerShown: false}} name="index" />
    </Stack>
  );
}
