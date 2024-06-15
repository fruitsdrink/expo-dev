import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef, useState } from "react";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const leftValue = useState(new Animated.Value(0))[0];

  const onPress = () => {
    Animated.timing(leftValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "red",
            borderRadius: 100,
            transform: [
              {
                translateX: leftValue
              }
            ]
          }}
        />
        <TouchableOpacity onPress={onPress}>
          <Text>Begin Animation</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
