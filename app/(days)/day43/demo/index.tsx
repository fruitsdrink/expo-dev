import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";

// const { width, height } = Dimensions.get("screen");
const { width: sw } = Dimensions.get("screen");

const Progress = ({
  step,
  steps,
  height
}: {
  step: number;
  steps: number;
  height: number;
}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-sw)).current;
  const reactive = useRef(new Animated.Value(-sw)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (step * width) / steps);
  }, [step, width]);

  return (
    <>
      <Text
        style={{
          fontFamily: "menlo",
          fontSize: 12,
          fontWeight: "900",
          marginBottom: 8
        }}
      >
        {step}/{steps}
      </Text>
      <View
        onLayout={(ev) => {
          const newWidth = ev.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          borderRadius: height,
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.1)"
        }}
      >
        <Animated.View
          style={{
            height,
            width: "100%",
            borderRadius: height,
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue
              }
            ]
          }}
        />
      </View>
    </>
  );
};

export default function Day43DemoScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // setIndex((prev) => (prev + 1) % 10);
      setIndex((index + 1) % (10 + 1));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Progress step={index} steps={10} height={20} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20
  }
});
