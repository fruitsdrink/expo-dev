import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
export default function AllocationLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
