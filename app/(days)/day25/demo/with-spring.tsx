import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  runOnUI,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

export default function WithSpringScreen() {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);

  const animate = () => {
    "worklet";

    scale1.value = withTiming(1.5, { duration: 1000 });
    scale2.value = withSpring(1.5, { duration: 1000 });
  };

  useEffect(() => {
    runOnUI(animate)();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "withSpring" }} />
      <View style={styles.container}>
        <Animated.View
          style={[styles.circle, { transform: [{ scale: scale1 }] }]}
        >
          <Text style={styles.text}>WithTiming</Text>
        </Animated.View>
        <Animated.View
          style={[styles.circle, { transform: [{ scale: scale2 }] }]}
        >
          <Text style={styles.text}>WithSpring</Text>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 150
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    color: "white"
  }
});
