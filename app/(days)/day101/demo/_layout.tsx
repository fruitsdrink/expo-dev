import { Stack } from "expo-router";

export default function DemoLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}
