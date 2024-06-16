import { Dimensions, StyleSheet, View, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const SIZE = 100;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

export default function DemoScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      // console.log("onStart", event);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      // console.log("onActive", event);
    },
    onEnd: (event) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
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
          <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={[styles.square, rStyle]} />
          </PanGestureHandler>
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
