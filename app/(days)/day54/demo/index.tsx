import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  Switch
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";
import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const Colors = {
  dark: {
    background: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8"
  },
  light: {
    background: "#f8f8f8",
    circle: "#fff",
    text: "#1e1e1e"
  }
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0, 0, 0, 0.1)"
};

type Theme = "light" | "dark";

export default function DemoScreen() {
  const [theme, setTheme] = React.useState<Theme>("light");

  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor
    };
  });
  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.View style={[styles.container, rStyle]}>
        <StatusBar hidden />
        <Animated.Text style={[styles.text, rTextStyle]}>theme</Animated.Text>
        <Animated.View style={[styles.circle, rCircleStyle]}>
          <Switch
            value={theme === "dark"}
            onValueChange={(toggled) => {
              setTheme(toggled ? "dark" : "light");
            }}
            trackColor={SWITCH_TRACK_COLOR}
            thumbColor={"violet"}
          />
        </Animated.View>
      </Animated.View>
    </>
  );
}

const SIZE = width * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8
  },
  text: {
    fontSize: 70,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 12,
    marginBottom: 35
  }
});
