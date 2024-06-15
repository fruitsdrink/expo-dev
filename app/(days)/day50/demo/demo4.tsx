import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.delay(500),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.delay(500)
      ])
    ).start();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "red",
            borderRadius: 100,
            opacity
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
