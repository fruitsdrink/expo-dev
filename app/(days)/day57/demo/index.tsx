import { Dimensions, StyleSheet, View, Image, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useDebugValue, useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const titles = ["What's", "up", "mobile", "devs?"];
const PAGE_WIDTH = width;
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

type PageProps = {
  index: number;
  title: string;
  translateX: SharedValue<number>;
};
const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value + pageOffset
        }
      ]
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          justifyContent: "center",
          alignItems: "center"
        },
        style
      ]}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: "700"
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

export default function DemoScreen() {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const pan = Gesture.Pan()
    .onStart((ev) => {
      contextX.value = clampedTranslateX.value;
      cancelAnimation(translateX);
    })
    .onUpdate((ev) => {
      translateX.value = ev.translationX + contextX.value;
    })
    .onEnd((ev) => {
      translateX.value = withDecay({ velocity: ev.velocityX });
    });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={pan}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {titles.map((title, index) => (
              <Page
                key={index}
                index={index}
                title={title}
                translateX={clampedTranslateX}
              />
            ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
