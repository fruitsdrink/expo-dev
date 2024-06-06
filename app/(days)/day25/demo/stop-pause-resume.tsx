import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Button } from "react-native";
import Animated, {
  cancelAnimation,
  runOnJS,
  runOnUI,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

export default function StopPauseResumeScreen() {
  const translateY = useSharedValue(0);
  const paused = useSharedValue(false);
  const [stoped, setStoped] = useState(false);

  const stopJs = () => {
    setStoped(true);
  };
  const stop = () => {
    "worklet";
    cancelAnimation(translateY);
    runOnJS(stopJs)();
  };

  const toggle = () => {
    "worklet";

    paused.value = !paused.value;
  };

  const animate = () => {
    "worklet";

    translateY.value = withPause(
      withRepeat(
        withSequence(
          withTiming(-100, { duration: 1000 }),
          withTiming(100, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        ),
        0,
        true
      ),
      paused
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
        <View
          style={{
            position: "absolute",
            left: 20,
            bottom: 50,
            width: "100%",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            title="Stop"
            onPress={() => {
              runOnUI(stop)();
            }}
          />
          <Button
            title="Pause"
            disabled={stoped}
            onPress={() => {
              runOnUI(toggle)();
            }}
          />
        </View>
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
