import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";
import { children } from "@nozbe/watermelondb/decorators";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

type CustomTouchableProps = {
  onPress?: () => void;
  children?: React.ReactNode;
};
const CustomTouchable: React.FC<CustomTouchableProps> = ({
  onPress,
  children
}) => {
  const isActive = useSharedValue(false);
  const time = useSharedValue(0);

  const tap = Gesture.Tap()
    .maxDuration(10000)
    .onTouchesDown(() => {
      time.value = new Date().getTime();
      console.log(`🔥 ${time.value} onTouchesDown`);
      isActive.value = true;
    })
    .onTouchesUp(() => {
      console.log(`🔥 ${time.value} onTouchesUp`);
      // fire onPress
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onTouchesCancelled(() => {
      console.log(`🔥 ${time.value} onTouchesCancelled`);
    })
    .onFinalize(() => {
      console.log(`🔥 ${time.value} onFinalize`);
      isActive.value = false;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isActive.value ? 0.5 : 1, { duration: 100 }),
      transform: [
        { rotate: withSpring(isActive.value ? `${Math.PI / 12}rad` : "0rad") },
        { scale: withSpring(isActive.value ? 0.95 : 1) }
      ]
    } as const;
  }, []);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={rStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView style={styles.container}>
        <StatusBar hidden />
        <CustomTouchable
          onPress={() => {
            console.log("onPress...");
          }}
        >
          <View
            style={{
              width: 150,
              aspectRatio: 1,
              borderRadius: 24,
              backgroundColor: "rgba(0,0,255,0.7)"
            }}
          />
        </CustomTouchable>
      </GestureHandlerRootView>
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
