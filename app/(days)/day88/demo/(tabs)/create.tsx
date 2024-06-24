import { Dimensions, StyleSheet, View, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { ColorList } from "@/components/day88/color-list";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <ColorList color={"#78716c"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
