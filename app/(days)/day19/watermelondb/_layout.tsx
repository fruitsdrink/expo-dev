import AuthProvider from "@/providers/day19/AuthProvider";
import { Slot, Stack } from "expo-router";

export default function Day19RootLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </>
  );
}
