import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const SIZE = width;

export default function DemoScreen() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const onDoubleTap = React.useCallback(() => {
    "worklet";

    scale.value = withSpring(1, undefined, (finished) => {
      if (finished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = React.useCallback(() => {
    "worklet";

    opacity.value = withTiming(0, undefined, (finished) => {
      if (finished) {
        opacity.value = withDelay(500, withSpring(1));
      }
    });
  }, []);

  const singleTap = Gesture.Tap().onEnd(() => {
    console.log("singleTap", new Date().getTime());
    onSingleTap();
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onEnd(() => {
      console.log("doubleTap", new Date().getTime());
      onDoubleTap();
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // max的作用是防止scale.value为负数，导致图片消失时的反转
          scale: Math.max(scale.value, 0)
        }
      ]
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: Math.max(opacity.value, 0)
    };
  });

  return (
    <GestureHandlerRootView>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <Animated.View style={styles.container}>
          <ImageBackground
            source={require("@/assets/day56/image.jpeg")}
            style={styles.image}
          >
            <Animated.Image
              source={require("@/assets/day56/heart.png")}
              style={[
                styles.image,
                {
                  shadowOffset: {
                    width: 0,
                    height: 20
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 35
                },
                rStyle
              ]}
              resizeMode="center"
            />
          </ImageBackground>
          <Animated.Text style={[styles.text, textStyle]}>
            🐢🐢🐢🐢
          </Animated.Text>
        </Animated.View>
      </GestureDetector>
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
  image: {
    width: SIZE,
    height: SIZE
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 32
  }
});
