import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Circle, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
// import { ReText } from "react-native-redash";
import AnimateableText from "react-native-animateable-text";

const { width, height } = Dimensions.get("screen");
const BACKGROUND_COLOR = "#444b6f";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#a6e1fa";

const CIRCLE_LENGTH = 1000; //2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
// const R = width / 3;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function DemoScreen() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });
  const animmateTextProps = useAnimatedProps(() => ({
    text: progressText.value
  }));

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        {/* <ReText style={styles.progressText} text={progressText} /> */}
        <AnimateableText
          animatedProps={animmateTextProps}
          style={styles.progressText}
        />
        <Svg style={{ position: "absolute" }}>
          <Circle
            cx={width / 2}
            cy={height / 2}
            r={R}
            stroke={BACKGROUND_STROKE_COLOR}
            strokeWidth={30}
            fill="none"
          />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            r={R}
            stroke={STROKE_COLOR}
            strokeWidth={15}
            fill="none"
            strokeDasharray={CIRCLE_LENGTH}
            strokeDashoffset={CIRCLE_LENGTH * 0.7}
            animatedProps={animatedProps}
            strokeLinecap={"round"}
          />
        </Svg>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Run</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center"
  },
  progressText: {
    fontSize: 80,
    color: "rgba(255,255,255,0.7))",
    width: 200,
    textAlign: "center"
  },
  button: {
    position: "absolute",
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    letterSpacing: 2
  }
});
