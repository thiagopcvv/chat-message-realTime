import { Stack } from "expo-router";

export default function RootLayoutFriendShips() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
