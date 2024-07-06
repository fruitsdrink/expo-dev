import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  return (
    <>
      <StatusBar hidden />
      <Stack.Screen options={{ headerShown: false }} />
      <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_bottom"
        }}
        initialRouteName="index"
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="story"
          options={{
            headerShown: false,
            presentation: "transparentModal"
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
