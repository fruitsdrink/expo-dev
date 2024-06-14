import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  ScaledSize,
  useWindowDimensions
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";

export default function DemoScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <>
      <StatusBar hidden />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}></View>
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
