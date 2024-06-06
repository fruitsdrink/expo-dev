import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function Demo1Screen() {
  const [shouldMount, setShouldMount] = useState(true);

  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  const unmountCircle = () => {
    setShouldMount(false);
  };

  useEffect(() => {
    const fadeIn = () => {
      "worklet";

      opacity.value = 0;
      opacity.value = withTiming(1, { duration: 1000 }, (finished) => {
        // 动画完成后，卸载组件
        if (finished) {
          runOnJS(unmountCircle)();
          // setShouldMount(false); // UI线程直接调用js代码，会报错
        }
      });
    };
    // 将UI相关代码移到UI线程
    runOnUI(fadeIn)();
    // fadeIn();
  }, [opacity]);

  return (
    <>
      <Stack.Screen options={{ title: "runOnJS" }} />
      <View style={styles.container}>
        {shouldMount && (
          <Animated.View style={[styles.circle, animatedStyle]}></Animated.View>
        )}
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
