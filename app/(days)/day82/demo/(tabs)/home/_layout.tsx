import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack initialRouteName="page1">
        <Stack.Screen name="page1" options={{ headerShown: false }} />
        <Stack.Screen name="page2" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
