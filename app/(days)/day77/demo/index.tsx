import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";
import {
  Canvas,
  Extrapolate,
  Group,
  RoundedRect,
  SweepGradient,
  interpolate,
  useTouchHandler,
  vec
} from "@shopify/react-native-skia";
import React from "react";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_NHIGHT } = Dimensions.get("window");

const SQUARES_AMOUNT_HORIZONTAL = 8;
const SQUARE_CONSTAINER_SIZE = SCREEN_WIDTH / SQUARES_AMOUNT_HORIZONTAL;
const PADDING = 20;
const SQUARE_SIZE = SQUARE_CONSTAINER_SIZE - PADDING;

const SQUARES_AMOUNT_VERTICAL =
  Math.floor(SCREEN_NHIGHT / SQUARE_CONSTAINER_SIZE) - 3;

const CANVAS_WIDTH = SCREEN_WIDTH;
const CANVAS_HEIGHT = SQUARES_AMOUNT_VERTICAL * SQUARE_CONSTAINER_SIZE;

const MAX_DISTANCE = Math.sqrt(CANVAS_WIDTH ** 2 + CANVAS_HEIGHT ** 2);

type RoundedItemProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  ponit: SharedValue<{ x: number; y: number } | null>;
  progress: SharedValue<number>;
};
const RoundedItem: React.FC<RoundedItemProps> = React.memo(
  ({ ponit, progress, ...squareProps }) => {
    const { x, y, width, height } = squareProps;
    const previousDistance = useSharedValue(0);
    const previousTouchPoint = useSharedValue({
      x: SCREEN_WIDTH / 2,
      y: SCREEN_NHIGHT / 2
    });

    const distance = useDerivedValue(() => {
      if (ponit.value === null) {
        return previousDistance.value;
      }

      previousDistance.value = Math.sqrt(
        (ponit.value.x - x) ** 2 + (ponit.value.y - y) ** 2
      );
      return previousDistance.value;
    });

    const scale = useDerivedValue(() => {
      return interpolate(
        distance.value * progress.value,
        [0, MAX_DISTANCE / 2],
        [1, 0],
        {
          extrapolateLeft: Extrapolate.CLAMP,
          extrapolateRight: Extrapolate.CLAMP
        }
      );
    });

    // const scaleWidth = useDerivedValue(() => {
    //   return width * scale.value;
    // });
    // const scaleHeight = useDerivedValue(() => {
    //   return height * scale.value;
    // });

    const origin = useDerivedValue(() => {
      if (ponit.value === null) {
        return previousTouchPoint.value;
      }

      previousTouchPoint.value = ponit.value;
      return previousTouchPoint.value;
    });

    const transform = useDerivedValue(() => {
      return [{ scale: scale.value }];
    });

    return (
      <Group
        origin={origin}
        // origin={{ x: x + width / 2, y: y + height / 2 }}
        transform={transform}
      >
        <RoundedRect
          {...squareProps}
          r={4}
          // width={scaleWidth}
          // height={scaleHeight}
        />
      </Group>
    );
  }
);

export default function DemoScreen() {
  const touchPoint = useSharedValue<{ x: number; y: number } | null>(null);
  const progress = useSharedValue(0);

  const touchHandler = useTouchHandler({
    onStart: (ev) => {
      progress.value = withTiming(1, { duration: 300 });
      touchPoint.value = {
        x: ev.x,
        y: ev.y
      };
    },
    onActive: (ev) => {
      touchPoint.value = {
        x: ev.x,
        y: ev.y
      };
    },
    onEnd: (ev) => {
      progress.value = withTiming(0, { duration: 300 });
      touchPoint.value = null;
    }
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <View style={styles.container}>
        <Canvas
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
          }}
          onTouch={touchHandler}
        >
          <Group>
            {new Array(SQUARES_AMOUNT_HORIZONTAL).fill(0).map((_, i) => {
              return new Array(SQUARES_AMOUNT_VERTICAL).fill(0).map((_, j) => {
                return (
                  <RoundedItem
                    key={`i${i}-j${j}`}
                    x={i * SQUARE_CONSTAINER_SIZE + PADDING / 2}
                    y={j * SQUARE_CONSTAINER_SIZE + PADDING / 2}
                    width={SQUARE_SIZE}
                    height={SQUARE_SIZE}
                    ponit={touchPoint}
                    progress={progress}
                  />
                );
              });
            })}
            <SweepGradient
              c={vec(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}
              colors={["cyan", "magenta", "yellow", "cyan"]}
            />
          </Group>
        </Canvas>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center"
  }
});
