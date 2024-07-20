import AuthProvider from "@/providers/day119/AuthProvider";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </>
  );
}
