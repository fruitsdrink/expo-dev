import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnUI,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";

export default function WithDelayScreen() {
  const opacity = useSharedValue(0);

  const fadeIn = () => {
    "worklet";

    opacity.value = withDelay(
      2000,
      withTiming(1, { duration: 3000, easing: Easing.linear })
    );
  };

  useEffect(() => {
    runOnUI(fadeIn)();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "withDelay" }} />
      <View style={styles.container}>
        <Animated.View style={[styles.circle, { opacity }]}></Animated.View>
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
