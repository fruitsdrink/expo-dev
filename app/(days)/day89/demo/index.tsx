import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { useEffect, useRef, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const loadingProgress = useRef(new Animated.Value(0)).current;
  const [animationDone, setAnimationDone] = useState(false);

  const colorLayer = animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "#333" }]} />
  );
  const whiteLayer = animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "#fff" }]} />
  );

  const scale = loadingProgress.interpolate({
    inputRange: [0, 15, 155],
    outputRange: [0.1, 0.06, 16]
  });

  const opacity = loadingProgress.interpolate({
    inputRange: [0, 25, 50],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      setAnimationDone(true);
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        {colorLayer}
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <View style={styles.center}>
              <Animated.Image
                source={require("@/assets/images/day89/logo.png")}
                style={[{ width: 1000 }, { transform: [{ scale }] }]}
                resizeMode={"contain"}
              />
            </View>
          }
        >
          {whiteLayer}
          <Animated.View style={[styles.center, { opacity }]}>
            <Text>Your App goes here!</Text>
          </Animated.View>
        </MaskedView>
        {/* <MaskedView
          style={{ flex: 1, flexDirection: "row", height: "100%" }}
          maskElement={
            <View
              style={{
                // Transparent background because mask is based off alpha channel.
                backgroundColor: "transparent",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 60,
                  // color: "black",
                  fontWeight: "bold"
                }}
              >
                Basic Mask
              </Text>
            </View>
          }
        >
          <View
            style={{ flex: 1, height: "100%", backgroundColor: "#324376" }}
          />
          <View
            style={{ flex: 1, height: "100%", backgroundColor: "#F5DD90" }}
          />
          <View
            style={{ flex: 1, height: "100%", backgroundColor: "#F76C5E" }}
          />
          <View
            style={{ flex: 1, height: "100%", backgroundColor: "#e1e1e1" }}
          />
        </MaskedView> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
