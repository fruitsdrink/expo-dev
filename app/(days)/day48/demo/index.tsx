import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
  ColorValue
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import randomColor from "randomcolor";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

function reandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max * 10 - min * 10 + 1) + min * 10) / 10;
}

type CircleType = {
  key: string;
  index: number;
  color: string;
  radius: number;
  x: number;
  y: number;
  duration?: number;
  rotateOffset?: string;
};
type CircleProps = {
  circle: CircleType;
};

const Circle: React.FC<CircleProps> = ({ circle }) => {
  const randRotation = Math.random() * 360;
  const { duration } = circle;
  // console.log("🚀 ~ duration:", duration);

  const rotation = useDerivedValue(() => {
    return withRepeat(
      withSequence(
        withTiming(randRotation, { duration: 0 }),
        withTiming(randRotation + 360, {
          duration: duration ?? 10000,
          easing: Easing.linear
        })
      ),
      -1, // -1 means infinite loop
      false // no repeat reverse
    );
  }, [duration]);
  // console.log("🚀 ~ rotation ~ rotation:", rotation);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`
        }
      ]
    };
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        stylez,
        {
          transformOrigin: [circle.rotateOffset ?? "50%", circle.y, 0]
        }
      ]}
    >
      <View
        style={[
          {
            backgroundColor: circle.color,
            position: "absolute",
            left: circle.x - circle.radius,
            top: circle.y - circle.radius,
            width: circle.radius * 2,
            height: circle.radius * 2,
            borderRadius: circle.radius
          }
        ]}
      ></View>
    </Animated.View>
  );
};

type ColorType = {};

type LavaLampProps = {
  count?: number;
  hue?: ColorValue;
  alpha?: number;
  duration?: number;
  rotateOffset?: string;
  blur?: number;
  luminosity?: "bright" | "light" | "dark" | "random";
  colors?: ColorValue[];
};

const LavaLamp: React.FC<LavaLampProps> = ({
  count = 4,
  hue = "#0099cc",
  alpha = 0.5,
  duration = 10000,
  rotateOffset = "50%",
  blur = 100,
  luminosity = "bright",
  colors
}) => {
  const { width, height } = useWindowDimensions();

  const circles = React.useMemo<CircleType[]>(() => {
    const _colors = colors
      ? colors.map((c) => c.toString())
      : randomColor({
          count,
          hue: hue.toString(),
          format: "rgba",
          luminosity,
          alpha
        });

    return _colors.map((color, index) => {
      const rand = reandomNumber(0.5, 1.2);
      const radius = (width * rand) / 2;
      const x = Math.floor(Math.random() * (width - radius * 2));
      const y = Math.floor(Math.random() * (height - radius * 2));
      // console.log("🚀 ~ returncolors.map ~ x,y:", { x, y, radius });

      return {
        key: `circle=${index}`,
        index,
        color,
        radius,
        x,
        y,
        duration,
        rotateOffset
      };
    });
  }, [count, hue, width, height]);

  const bgColor = React.useMemo(() => {
    return randomColor({
      hue: hue.toString(),
      luminosity: "dark"
    });
  }, []);

  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: bgColor }]}>
      {circles.map((circle) => {
        return <Circle key={circle.key} circle={circle} />;
      })}
      {blur > 0 && (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={blur > 100 ? 100 : blur}
        />
      )}
    </View>
  );
};

export default function Day48DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <LavaLamp />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
