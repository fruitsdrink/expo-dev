import { Slot, Stack } from "expo-router";

export default function _layou() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </>
  );
}
