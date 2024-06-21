import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SIZE = 80;

interface AnimatedPosition {
  x: SharedValue<number>;
  y: SharedValue<number>;
}

const useFollowAnimatedPosition = ({ x, y }: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: followX.value
        },
        {
          translateY: followY.value
        }
      ]
    } as ViewStyle;
  });

  return { followX, followY, rStyle };
};

export default function DemoScreen() {
  const translateX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2);
  const translateY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2);

  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart((ev) => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((ev) => {
      translateX.value = ev.translationX + context.value.x;
      translateY.value = ev.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - SIZE;
      } else {
        translateX.value = 0;
      }
    });

  const {
    followX: blueFollowX,
    followY: blueFollowY,
    rStyle: rBlueCircleStyle
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY
  });

  const {
    followX: greenFollowX,
    followY: greenFollowY,
    rStyle: rGreenCircleStyle
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY
  });

  const { rStyle: rRedCircleStyle } = useFollowAnimatedPosition({
    x: greenFollowX,
    y: greenFollowY
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={[styles.circle, { backgroundColor: "red" }, rRedCircleStyle]}
        />
        <Animated.View
          style={[
            styles.circle,
            { backgroundColor: "green" },
            rGreenCircleStyle
          ]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.circle, rBlueCircleStyle]} />
        </GestureDetector>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  circle: {
    position: "absolute",
    width: SIZE,
    aspectRatio: 1,
    borderRadius: SIZE / 2,
    backgroundColor: "blue",
    opacity: 0.8
  }
});
