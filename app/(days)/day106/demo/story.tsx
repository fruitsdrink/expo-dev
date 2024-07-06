import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ResizeMode, Video } from "expo-av";

import { SnapchatRoutes, Story } from "./index";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";
import { transition } from "./lib";

const { height } = Dimensions.get("window");
const AnimatedVideo = Animated.createAnimatedComponent(Video);

export default function StoryPage() {
  const { story } = useLocalSearchParams();
  const item = JSON.parse(story as string) as Story;
  const router = useRouter();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isPanActive = useSharedValue(false);

  const back = () => {
    router.back();
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      isPanActive.value = true;
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const goBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;
      // console.log("🚀 ~ .onEnd ~ goBack:", goBack);
      // console.log({ velocityX, velocityY, translateY: translateY.value });

      if (goBack) {
        runOnJS(back)();
      } else {
        translateX.value = withSpring(0, { velocity: velocityX });
        translateY.value = withSpring(0, { velocity: velocityY });
      }
      isPanActive.value = false;
    });

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { scale },
        { translateX: translateX.value * scale },
        { translateY: translateY.value * scale }
      ]
    } as const;
  });

  const rBorderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isPanActive.value ? 16 : 0)
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[{ flex: 1 }, rStyle]}
        sharedTransitionTag={`shared-${item.id}`}
        sharedTransitionStyle={transition}
      >
        {!item.video && (
          <Animated.Image
            source={item.source}
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined
              },
              rBorderStyle
            ]}
          />
        )}

        {item.video && (
          <AnimatedVideo
            source={item.video}
            rate={1.0}
            isMuted={false}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            style={[StyleSheet.absoluteFill, rBorderStyle]}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
}
