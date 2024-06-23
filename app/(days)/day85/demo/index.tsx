import { Dimensions, StyleSheet, View, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { Canvas, Rect, SweepGradient, vec } from "@shopify/react-native-skia";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import { useEffect } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const rotation = useSharedValue(0);
  const centerX = SCREEN_WIDTH / 2;
  const centerY = SCREEN_HEIGHT / 2;
  const centerVec = vec(centerX, centerY);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {
        duration: 4000,
        easing: Easing.linear
      }),
      -1,
      false
    );
  }, []);

  const animatedRotation = useDerivedValue(() => {
    return [{ rotate: Math.PI * rotation.value }];
  }, [rotation]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Canvas style={styles.container}>
          <Rect x={0} y={0} width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
            <SweepGradient
              origin={centerVec}
              c={centerVec}
              colors={["white", "grey", "#222", "black"]}
              start={0}
              end={360}
              transform={animatedRotation}
            />
          </Rect>
        </Canvas>
        <Text style={styles.dayText}>DAY</Text>
        <Text style={styles.nightText}>NIGHT</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  canvas: {
    height: 275,
    width: 275
  },
  dayText: {
    position: "absolute",
    top: 70,
    fontWeight: "100",
    letterSpacing: 8,
    fontSize: 90,
    color: "black",
    alignSelf: "center"
  },
  nightText: {
    position: "absolute",
    bottom: 70,
    fontWeight: "100",
    letterSpacing: 8,
    fontSize: 90,
    color: "white",
    alignSelf: "center"
  }
});
