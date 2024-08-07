import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { Stack } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const imageUri =
  "https://images.freeimages.com/images/large-previews/bbb/autumn-in-new-york-5-1360120.jpg";

export default function DemoScreen() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate((ev) => {
      scale.value = ev.scale;
      focalX.value = ev.focalX;
      focalY.value = ev.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
      focalX.value = 0;
      focalY.value = 0;
    });

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value
        },
        {
          translateY: focalY.value
        },
        {
          translateX: -width / 2
        },
        {
          translateY: -height / 2
        },
        {
          scale: scale.value
        },
        {
          translateX: -focalX.value
        },
        {
          translateY: -focalY.value
        },
        {
          translateX: width / 2
        },
        {
          translateY: height / 2
        }
      ]
    };
  });
  // @ts-ignore
  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value
        },
        {
          translateY: focalY.value
        }
      ]
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureDetector gesture={pinch}>
        <Animated.Image
          source={{ uri: imageUri }}
          // @ts-ignore
          style={[{ flex: 1, resizeMode: "cover" }, rStyle]}
        />
      </GestureDetector>
      <Animated.View style={[styles.focalPoint, focalPointStyle]} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "blue"
  }
});
