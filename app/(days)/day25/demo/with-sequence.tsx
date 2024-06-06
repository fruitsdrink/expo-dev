import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnUI,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming
} from "react-native-reanimated";

export default function WithSequenceScreen() {
  const translateY = useSharedValue(0);

  const animate = () => {
    "worklet";

    translateY.value = withSequence(
      withTiming(-100, { duration: 1000 }),
      withTiming(100, { duration: 1000 }),
      withTiming(0, { duration: 1000 })
    );
  };

  useEffect(() => {
    runOnUI(animate)();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "withSequence" }} />
      <View style={styles.container}>
        <Animated.View
          style={[styles.circle, { transform: [{ translateY }] }]}
        ></Animated.View>
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
    backgroundColor: "red"
  }
});
