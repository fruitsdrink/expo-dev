import { Animated, Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
          Animated.spring(progress, { toValue: 0.5, useNativeDriver: true })
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true })
        ])
      ]),
      { iterations: 3 } // 3 times
    ).start();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={[
            styles.square,
            {
              borderRadius: progress.interpolate({
                inputRange: [0.5, 1],
                outputRange: [SIZE / 4, SIZE / 2]
              }),
              opacity: progress,
              transform: [
                { scale },
                {
                  rotate: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [
                      `${0.5 * 2 * Math.PI}rad`,
                      `${1 * 2 * Math.PI}rad`
                    ]
                  })
                }
              ]
            }
          ]}
        />
      </View>
    </>
  );
}

const SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    width: SIZE,
    aspectRatio: 1,
    backgroundColor: "#333"
  }
});
