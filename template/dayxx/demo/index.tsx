import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
      </View>
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
