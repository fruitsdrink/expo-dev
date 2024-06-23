import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
