import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const N = 12;
const SQUARE_SIZE = 12;

type SquareProps = {
  index: number;
  progress: SharedValue<number>;
};
const Square: React.FC<SquareProps> = ({ index, progress }) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }

    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }
    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }
    return withTiming(-index * SQUARE_SIZE);
  }, []);

  //@ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}rad`
        },
        {
          translateY: translateY.value
        }
      ]
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: SQUARE_SIZE,
          aspectRatio: 1,
          backgroundColor: "#fff",
          // opacity: (index + 1) / N,
          position: "absolute"
        },
        rStyle
      ]}
    />
  );
};

export default function DemoScreen() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear
      }),
      -1
    );
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="inverted" />
        {new Array(12).fill(0).map((_, index) => {
          return <Square key={index} progress={progress} index={index} />;
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center"
  }
});
