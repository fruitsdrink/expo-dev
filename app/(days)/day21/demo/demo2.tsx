import { Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function Demo2Screen() {
  // step 1
  const opacity = useSharedValue(0);

  // step 2
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  // step 3
  const fadeIn = () => {
    opacity.value = withTiming(1, { duration: 2000 });
  };

  useEffect(() => {
    fadeIn();
  }, []);
  return (
    <>
      <Stack.Screen options={{ title: "Demo1" }} />
      <View style={styles.container}>
        <Pressable>
          {/* step 4 */}
          <Animated.View style={[styles.circle, animatedStyle]}></Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center"
  }
});
