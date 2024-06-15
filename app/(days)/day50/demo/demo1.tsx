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
import { useRef } from "react";

const { width, height } = Dimensions.get("screen");

export default function DemoScreen() {
  const value = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const onPress = () => {
    Animated.timing(value, {
      toValue: { x: 100, y: 100 },
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: "red",
              borderRadius: 100
            },
            value.getLayout()
          ]}
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
