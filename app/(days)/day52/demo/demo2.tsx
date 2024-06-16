import { Dimensions, StyleSheet, View, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

export default function DemoScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onStart((ev) => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onChange((ev) => {
      translateX.value = ev.translationX + context.value.x;
      translateY.value = ev.translationY + context.value.y;
    })
    .onEnd((ev) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
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
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.circle}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.square, rStyle]} />
          </GestureDetector>
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
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 2,
    borderColor: "rgba(0,0,255,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,255,0.5)",
    borderRadius: 12
  }
});
