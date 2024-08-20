import { Stack, useLocalSearchParams } from "expo-router";

export default function AuthenticatedLayout() {
  const { id, nome } = useLocalSearchParams();
  console.log(id, nome);
  return (
    <Stack
      screenOptions={{
        animationTypeForReplace: "push",
        animation: "flip",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/[nome]" options={{ title: "a" }} />
    </Stack>
  );
}
