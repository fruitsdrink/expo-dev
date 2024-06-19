import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const THRESHOLD = SCREEN_WIDTH / 3;

export default function DemoScreen() {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      contextX.value = translateX.value;
    })
    .onChange((ev) => {
      translateX.value = ev.translationX + contextX.value;
    })
    .onFinalize(() => {
      if (translateX.value < THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    });

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [
        {
          perspective: 100
        },
        {
          translateX: translateX.value
        },
        {
          rotateY: `-${rotate}deg`
        }
      ]
    };
  }, []);

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = 0;
    } else {
      translateX.value = SCREEN_WIDTH / 2;
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar style="inverted" />
        <GestureHandlerRootView>
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                {
                  flex: 1,
                  backgroundColor: "#fff",
                  transformOrigin: "right"
                },
                rStyle
              ]}
            >
              <Feather
                name="menu"
                size={32}
                color={BACKGROUND_COLOR}
                style={{ margin: 15 }}
                onPress={onPress}
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
}

const BACKGROUND_COLOR = "#1e1e23";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  }
});
