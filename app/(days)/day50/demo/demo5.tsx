import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  PanResponder
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef, useState } from "react";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   console.log("Pan responder was granted access");
      //   console.log(pan.x);
      //   pan.setOffset({
      //     x: pan.x._value,
      //     y: pan.y._vlaue
      //   });
      // },
      // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        console.log("🔥", { ...pan.x }, "before");
        pan.extractOffset();
        console.log("🔥", { ...pan.x }, "after");
      }
    })
  ).current;

  console.log(pan.getTranslateTransform());

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: "red",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",

              transform: [
                {
                  translateX: pan.x
                },
                {
                  translateY: pan.y
                }
              ]
            }
            // pan.getLayout()
          ]}
          {...panResponder.panHandlers}
        >
          <Text>Pan me</Text>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
