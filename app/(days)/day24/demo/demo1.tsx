import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function Demo1Screen() {
  const currentNumber = useSharedValue(0);
  const nextNumber = useDerivedValue(() => {
    const next = currentNumber.value + 1;
    console.log("🚀 ~ nextNumber ~ currentNumber:", currentNumber.value);
    console.log("🚀 ~ nextNumber ~ next:", next);
    return next;
  });

  const increase = () => {
    "worklet";

    currentNumber.value += 1;
  };

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.container}>
        <Pressable onPress={() => runOnUI(increase)()}>
          <Animated.View style={[styles.circle]}>
            <Text>Click Me</Text>
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  }
});
