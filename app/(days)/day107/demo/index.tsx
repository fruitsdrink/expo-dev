import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Link, Stack } from "expo-router";
import image from "@/assets/images/day106/stories/1.jpg";
import Animated, {
  Easing,
  SharedTransition,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";

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
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Link href={"/day107/demo/modal"} asChild>
          <Pressable>
            <Animated.Image
              sharedTransitionTag="tag1"
              sharedTransitionStyle={transition}
              source={{ uri: IMAGE }}
              style={styles.image}
            />
          </Pressable>
        </Link>
        <Text>Index</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  text: {}
});
