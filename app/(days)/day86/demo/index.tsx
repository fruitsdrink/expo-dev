import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import { Canvas, Circle } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const COLS = 12;

type DotProps = {
  index: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
};
const Dot: React.FC<DotProps> = ({ index, x, y }) => {
  const cx = Math.floor(index % COLS) * 30 + 30; //col
  const cy = Math.floor(index / COLS) * 30 + 30; //row

  const radius = useDerivedValue(() => {
    const hypoteneuse = Math.hypot(x.value - cx, y.value - cy);

    if (hypoteneuse < 55 && x.value !== -1) {
      return withSpring(11, {
        overshootClamping: true
      });
    } else {
      return withSpring(3, {
        overshootClamping: true
      });
    }
  }, [x, y]);

  return <Circle cx={cx} cy={cy} r={radius} color={"blue"} />;
};

export default function DemoScreen() {
  const [nums, setNums] = useState<number[]>([]);
  const posX = useSharedValue(-1);
  const posY = useSharedValue(-1);

  useEffect(() => {
    const dotsForHeight = Math.round(SCREEN_HEIGHT / 35);
    const numsArray = Array.from(Array(COLS * dotsForHeight).keys());
    // console.log("🚀 ~ useEffect ~ numsArray:", numsArray);
    setNums(numsArray);
  }, []);

  const pan = Gesture.Pan()
    .onBegin(({ x, y }) => {
      posX.value = x;
      posY.value = y;
    })
    .onChange(({ x, y }) => {
      posX.value = x;
      posY.value = y;
    })
    .onEnd(() => {
      posX.value = -1;
      posY.value = -1;
    })
    .onFinalize(() => {
      posX.value = -1;
      posY.value = -1;
    });

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "demo" }} />
      <GestureHandlerRootView style={styles.container}>
        <StatusBar hidden />
        <GestureDetector gesture={pan}>
          <Canvas style={{ width: "100%", height: "100%" }}>
            {nums.map((idx) => {
              return <Dot key={idx} index={idx} x={posX} y={posY} />;
            })}
          </Canvas>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center",
    // justifyContent: "center",
    // width: SCREEN_WIDTH
  }
});
