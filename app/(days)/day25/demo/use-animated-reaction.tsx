import { Stack } from "expo-router";
import { View, StyleSheet, Button } from "react-native";
import Animated, {
  Easing,
  runOnUI,
  useAnimatedReaction,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function UseAnimatedReactionScreen() {
  const toggle = useSharedValue(0);
  const opacity = useSharedValue(0);
  const duration = 2000;

  const fadeIn = () => {
    "worklet";

    opacity.value = withTiming(1, { duration, easing: Easing.linear });
  };

  const fadeOut = () => {
    "worklet";

    opacity.value = withTiming(0, { duration, easing: Easing.linear });
  };

  useAnimatedReaction(
    () => {
      return toggle.value;
    },
    (currValue, prevValue) => {
      if (currValue) {
        fadeIn();
      } else {
        fadeOut();
      }
    }
  );

  return (
    <>
      <Stack.Screen options={{ title: "useAnimatedReaction" }} />
      <View style={styles.container}>
        <Animated.View style={[styles.circle, { opacity }]}></Animated.View>
        <Button
          title="click me"
          onPress={() => {
            if (toggle.value === 0) {
              toggle.value = 1;
            } else {
              toggle.value = 0;
            }
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red"
  }
});
