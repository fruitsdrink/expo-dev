import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import Animated, {
  Easing,
  FadeInDown,
  FadeInLeft,
  SharedTransition,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

import image from "@/assets/images/day106/stories/1.jpg";

const SPRING_CONFIG = {
  mass: 1,
  stiffness: 100,
  damping: 200
};

export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withTiming(values.targetHeight, { duration: 300 }),
    width: withTiming(values.targetWidth, { duration: 300 }),
    originX: withTiming(values.targetOriginX, { duration: 300 }),
    originY: withSequence(
      withTiming(values.currentOriginY + 50, {
        duration: 300,
        easing: Easing.linear
      }),
      withTiming(values.targetOriginY, {
        duration: 500,
        easing: Easing.linear
      })
    )
  };
});

const IMAGE = Image.resolveAssetSource(image).uri;

export default function Modal() {
  const router = useRouter();
  return (
    <BlurView intensity={40} style={styles.container} tint="dark">
      <Pressable onPress={() => router.back()}>
        <Animated.Image
          sharedTransitionTag="tag1"
          sharedTransitionStyle={transition}
          source={{ uri: IMAGE }}
          style={styles.image}
        />
        <Animated.Text
          entering={FadeInLeft.duration(400).delay(500)}
          style={styles.text}
        >
          React Native Shared Element Text
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.duration(400).delay(600)}
          style={styles.card}
        >
          <Text>More coll react native ...</Text>
        </Animated.View>
      </Pressable>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20
  },
  text: {
    fontSize: 28,
    fontWeight: "bold"
  },
  card: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 8
  }
});
