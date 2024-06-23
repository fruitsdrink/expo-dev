import { Stack } from "expo-router";

export default function DemoLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="payment"
          options={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "slide_from_bottom"
          }}
        />
      </Stack>
    </>
  );
}
