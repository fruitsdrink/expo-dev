import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export default function Demo3Screen() {
  return (
    <>
      <Stack.Screen options={{ title: "Demo1" }} />
      <View style={styles.container}>
        <Pressable>
          <Animated.View style={styles.circle}>
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
