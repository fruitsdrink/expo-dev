import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function Demo1Screen() {
  // step 1
  const scale = useSharedValue(1);

  // step 2
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  // step 3
  const handlePress = () => {
    scale.value = withTiming(scale.value + 0.3);
  };
  return (
    <>
      <Stack.Screen options={{ title: "Demo1" }} />
      <View style={styles.container}>
        <Pressable onPress={handlePress}>
          {/* step 4 */}
          <Animated.View style={[styles.circle, animatedStyle]}>
            <Text>Click</Text>
          </Animated.View>
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
