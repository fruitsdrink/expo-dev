import { ColorValue, Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useCallback } from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");
const CIRCLE_SIZE = width * 0.7;
const PICKER_WIDTH = width * 0.9;
const PICKER_HEIGHT = 40;
const CIRCLE_PICKER_SIZE = PICKER_HEIGHT + 5;
const INTERNAL_CIRCLE_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;
const PICKER_MAX_WIDTH = PICKER_WIDTH - CIRCLE_PICKER_SIZE;

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white"
];

export default function DemoScreen() {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const onColorChagne = useCallback((color: string | number) => {
    "worklet";

    pickedColor.value = color;
  }, []);

  //@ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <View style={styles.topContainer}>
        <Animated.View
          style={[
            {
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              backgroundColor: "red"
            },
            rStyle
          ]}
        ></Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: PICKER_HEIGHT,
            width: PICKER_WIDTH,
            borderRadius: 20
          }}
          onColorChange={onColorChagne}
        />
      </View>
    </>
  );
}

interface ColorPickerProps
  extends Pick<LinearGradientProps, "start" | "end" | "style"> {
  colors: ColorValue[];
  onColorChange: (color: string | number) => void;
}
const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onColorChange,
  ...rest
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const context = useSharedValue({ x: 0 });

  const clampedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), PICKER_MAX_WIDTH);
  });

  const onEnd = useCallback(() => {
    "worklet";

    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value.x = clampedTranslateX.value;
      // translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      // scale.value = withSpring(1.2);
    })
    .onUpdate((ev) => {
      // console.log(ev.translationX);
      translateX.value = ev.translationX + context.value.x;
    })
    .onEnd(onEnd);

  const tap = Gesture.Tap()
    .onBegin((ev) => {
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(ev.absoluteX - CIRCLE_PICKER_SIZE);

      // context.value.x = ev.absoluteX - CIRCLE_PICKER_SIZE / 2;
    })
    .onEnd(onEnd);

  //@ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: clampedTranslateX.value
        },
        {
          scale: scale.value
        },
        {
          translateY: translateY.value
        }
      ]
    };
  });

  const colorStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, i) => (i / colors.length) * PICKER_WIDTH);
    const backgroundColor = interpolateColor(
      clampedTranslateX.value,
      inputRange,
      colors.map((c) => c.toString())
    );

    onColorChange?.(backgroundColor);

    return {
      backgroundColor
    };
  });

  return (
    <View style={{ justifyContent: "center" }}>
      <GestureDetector gesture={Gesture.Race(pan, tap)}>
        <Animated.View>
          <LinearGradient colors={colors.map((c) => c.toString())} {...rest} />
          <Animated.View
            style={[
              {
                position: "absolute",
                width: CIRCLE_PICKER_SIZE,
                height: CIRCLE_PICKER_SIZE,
                borderRadius: CIRCLE_PICKER_SIZE / 2,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
              },
              rStyle
            ]}
          >
            <Animated.View
              style={[
                {
                  width: INTERNAL_CIRCLE_PICKER_SIZE,
                  height: INTERNAL_CIRCLE_PICKER_SIZE,
                  borderRadius: INTERNAL_CIRCLE_PICKER_SIZE / 2,
                  borderColor: "rgba(0,0,0,0.1)",
                  borderWidth: 1
                },
                colorStyle
              ]}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center"
  }
});
