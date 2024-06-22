import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  vec
} from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import { useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const WIDTH = SCREEN_WIDTH * 0.9;
const HEIGHT = 256;
const CARD_WIDTH = WIDTH - 5;
const CARD_HEIGHT = HEIGHT - 5;

// 渐变背景组件
type BackgroundGradientProps = {
  width: number;
  height: number;
};
const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  width,
  height
}) => {
  const canvasPadding = 40;
  const rValue = useSharedValue(0);

  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, { duration: 2000 }), -1, true);
  }, []);

  return (
    <Canvas
      style={{ width: width + canvasPadding, height: height + canvasPadding }}
    >
      <RoundedRect
        x={canvasPadding / 2}
        y={canvasPadding / 2}
        width={width}
        height={height}
        color={"#fff"}
        r={20}
      >
        <SweepGradient
          c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
          colors={["cyan", "magenta", "yellow", "cyan"]}
        />
        <BlurMask blur={rValue} style={"solid"} />
      </RoundedRect>
    </Canvas>
  );
};

export default function DemoScreen() {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin((ev) => {
      rotateX.value = withTiming(
        interpolate(ev.y, [0, CARD_HEIGHT], [10, -10], Extrapolation.CLAMP),
        { duration: 200 }
      );
      rotateY.value = withTiming(
        interpolate(ev.x, [0, CARD_WIDTH], [-10, 10], Extrapolation.CLAMP),
        { duration: 200 }
      );
    })
    .onUpdate((ev) => {
      // topleft (10deg, -10deg)
      // topright (10deg, 10deg)
      // bottomleft (-10deg, -10deg)
      // bottomright (-10deg, 10deg)
      rotateX.value = interpolate(
        ev.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolation.CLAMP
      );
      rotateY.value = interpolate(
        ev.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolation.CLAMP
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 300
        },
        {
          rotateX: `${rotateX.value}deg`
        },
        {
          rotateY: `${rotateY.value}deg`
        }
      ]
    } as const;
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar hidden />
          <BackgroundGradient width={WIDTH} height={HEIGHT} />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  backgroundColor: "#333",
                  borderRadius: 20,
                  zIndex: 300
                },
                rStyle
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  left: "10%",
                  bottom: "10%",
                  flexDirection: "row",
                  gap: 10
                }}
              >
                <View
                  style={{
                    height: 50,
                    aspectRatio: 1,
                    borderRadius: 25,
                    backgroundColor: "#272f46"
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around"
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 80,
                      borderRadius: 20,
                      backgroundColor: "#272f46"
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: 80,
                      borderRadius: 20,
                      backgroundColor: "#272f46"
                    }}
                  />
                </View>
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  }
});
