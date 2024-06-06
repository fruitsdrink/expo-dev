import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function Demo2Screen() {
  const valueJS = useSharedValue(0);
  const valueUI = useSharedValue(0);

  // js线程中useSharedValue是异步的
  const updaeOnJs = () => {
    console.log("[valueJS]", valueJS.value);
    valueJS.value += 1;
    console.log("[valueJS]", valueJS.value);
  };

  // ui线程中useSharedValue是同步的
  const updaeOnUI = () => {
    "worklet";

    console.log("[valueUI]", valueUI.value);
    valueUI.value += 1;
    console.log("[valueUI]", valueUI.value);
  };

  const handlePress = () => {
    console.log("==== start ==== ");
    updaeOnJs();
    console.log("------------");
    runOnUI(updaeOnUI)();
    runOnUI(() => {
      console.log("==== end ==== ");
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.container}>
        <Pressable onPress={handlePress}>
          <View>
            <Text>js线程中useSharedValue是异步的</Text>
            <Text>ui线程中useSharedValue是同步的</Text>
          </View>
          <Animated.View style={[styles.circle]}>
            <Text>Click Me</Text>
          </Animated.View>
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
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  }
});
