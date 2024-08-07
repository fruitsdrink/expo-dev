import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("screen");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};
type BottomSheetRefProps = {
  scrollTo?: (destination: number) => void;
  isActive?: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      "worklet";

      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        scrollTo,
        isActive
      }),
      [scrollTo, isActive]
    );

    const pan = Gesture.Pan()
      .onStart(() => {
        context.value.y = translateY.value;
      })
      .onUpdate((ev) => {
        translateY.value = ev.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [24, 4],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ translateY: translateY.value }],
        borderRadius
      };
    });

    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        // display: active.value ? "flex" : "none"
        opacity: withTiming(active.value ? 1 : 0)
      };
    }, []);

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? "auto" : "none"
      } as const;
    }, []);

    const tap = Gesture.Tap()
      .onStart(() => {
        scrollTo(0);
      })
      .simultaneousWithExternalGesture(pan);

    return (
      <GestureDetector gesture={tap}>
        <Animated.View
          animatedProps={rBackdropProps}
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.4)"
            },
            rBackdropStyle
          ]}
        >
          <GestureDetector gesture={pan}>
            <Animated.View style={[bottomSheetStyles.contianer, rStyle]}>
              <View style={bottomSheetStyles.line} />
              {children}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    );
  }
);

const bottomSheetStyles = StyleSheet.create({
  contianer: {
    position: "absolute",
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 16,
    borderRadius: 2
  }
});

export default function DemoScreen() {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref.current.isActive?.();

    if (isActive) {
      ref.current?.scrollTo?.(0);
    } else {
      ref.current?.scrollTo?.(-200);
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <TouchableOpacity style={styles.button} onPress={onPress} />
          <BottomSheet ref={ref}>
            <View style={{ flex: 1, backgroundColor: "blue" }}></View>
          </BottomSheet>
        </View>
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
  },
  button: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: "orange",
    borderRadius: 25,
    opacity: 0.6
  }
});
