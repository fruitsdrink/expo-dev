import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function Demo2Screen() {
  const backgroundColor = useSharedValue("red");

  const updateColor = () => {
    backgroundColor.value = "red";
    backgroundColor.value = withTiming("blue", { duration: 1000 });
  };

  return (
    <>
      <Stack.Screen options={{ title: "内链样式" }} />
      <View style={styles.container}>
        <Pressable onPress={updateColor}>
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor
              }
            ]}
          ></Animated.View>
        </Pressable>
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
    backgroundColor: "red",
    borderRadius: 50
  }
});
