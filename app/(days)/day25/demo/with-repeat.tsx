import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnUI,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

export default function WithRepeatScreen() {
  const opacity = useSharedValue(0);

  const fadeIn = () => {
    "worklet";

    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      0,
      true
    );
  };

  useEffect(() => {
    runOnUI(fadeIn)();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "withRepeat" }} />
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
