import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const leftColor = useSharedValue("red");
  const rightColor = useSharedValue("blue");

  const colors = useDerivedValue(() => {
    return [leftColor.value, rightColor.value];
  }, [leftColor, rightColor]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="inverted" />
        <Canvas style={{ flex: 1 }}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={colors}
            />
          </Rect>
        </Canvas>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            leftColor.value = withTiming(
              `hsl(${Math.random() * 360}, 100%, 50%)`
            );
            rightColor.value = withTiming(
              `hsl(${Math.random() * 360}, 100%, 50%)`
            );
          }}
        >
          <FontAwesome name="random" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 52,
    right: 32,
    height: 64,
    aspectRatio: 1,
    borderRadius: 32,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8
  }
});
