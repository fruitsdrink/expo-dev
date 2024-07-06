import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function DemoLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen
          name="modal"
          options={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "fade_from_bottom"
          }}
        />
      </Stack>
    </>
  );
}
