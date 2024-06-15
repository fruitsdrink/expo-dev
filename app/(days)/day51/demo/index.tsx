import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import React from "react";
import { useAnimatedShake } from "@/animate-hooks";
import { Entypo } from "@expo/vector-icons";

export default function DemoScreen() {
  const [count, setCount] = React.useState(0);
  const { shake, shakeStyle, isShaking } = useAnimatedShake();

  const onIncrement = React.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const onDecrement = React.useCallback(() => {
    setCount((prev) => {
      if (prev === 0) {
        shake();
        return prev;
      }

      return prev - 1;
    });
  }, []);

  const errorStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isShaking.value ? "red" : "#333", {
        duration: 50
      })
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <View style={styles.container}>
        <Animated.Text style={[styles.number, shakeStyle, errorStyle]}>
          {count}
        </Animated.Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onDecrement}>
            <Entypo name="minus" size={32} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onIncrement}>
            <Entypo name="plus" size={32} color={"white"} />
          </TouchableOpacity>
        </View>
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
  },
  number: {
    fontSize: 90,
    color: "#333",
    fontWeight: "bold"
  },
  buttonContainer: {
    position: "absolute",
    right: 48,
    bottom: 48,
    flexDirection: "row",
    gap: 8
  },
  button: {
    height: 64,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center"
  }
});
