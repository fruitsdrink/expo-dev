import { Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import { useCallback, useState } from "react";

const { width, height } = Dimensions.get("screen");
const ICON_SIZE = 20;
const CIRCLE_SIZE = 50;
const BUTTON_WIDTH = 170;
const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

const clamp = (value: number, min: number, max: number) => {
  "worklet";

  return Math.min(Math.max(value, min), max);
};

const SlidingCount = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [count, setCount] = useState(0);

  // setCount必须使用函数包装
  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const pan = Gesture.Pan()
    .onChange((ev) => {
      translateX.value = clamp(
        ev.translationX,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET
      );

      translateY.value = clamp(ev.translationY, 0, MAX_SLIDE_OFFSET);
    })
    .onFinalize(() => {
      if (translateX.value === MAX_SLIDE_OFFSET) {
        // increment
        runOnJS(incrementCount)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        // decrement
        runOnJS(decrementCount)();
      } else if (translateY.value === MAX_SLIDE_OFFSET) {
        // reset
        runOnJS(resetCount)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4]
    );

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0]
    );

    return {
      opacity: opacityX * opacityY
    };
  }, []);

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8]
    );
    return {
      opacity
    };
  }, []);

  // @ts-ignore
  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 0.1
        },
        {
          translateY: translateY.value * 0.1
        }
      ]
    };
  }, []);

  return (
    <Animated.View style={[slidingCountStyle.button, rButtonStyle]}>
      <Animated.View style={rPlusMinusIconStyle}>
        <AntDesign name="minus" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <Animated.View style={rCloseIconStyle}>
        <AntDesign name="close" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <Animated.View style={rPlusMinusIconStyle}>
        <AntDesign name="plus" color={"white"} size={ICON_SIZE} />
      </Animated.View>
      <GestureHandlerRootView
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <GestureDetector gesture={pan}>
          <Animated.View style={[slidingCountStyle.circle, rStyle]}>
            <Text style={slidingCountStyle.countText}>{count}</Text>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

const slidingCountStyle = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    height: 70,
    borderRadius: 70,
    backgroundColor: "#111",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#232323",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  countText: {
    fontSize: 24,
    color: "white"
  }
});

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <SlidingCount />
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
