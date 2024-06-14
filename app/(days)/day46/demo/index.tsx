import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  ScaledSize,
  useWindowDimensions
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";

export default function DemoScreen() {
  // const [dimensions, setDimensions] = React.useState({
  //   width: Dimensions.get("window").width,
  //   height: Dimensions.get("window").height
  // });

  // React.useEffect(() => {
  //   const subscription = Dimensions.addEventListener("change", ({ window }) => {
  //     setDimensions(window);
  //   });

  //   return () => subscription?.remove();
  // }, []);

  // const { width, height } = dimensions;
  const { width, height } = useWindowDimensions();

  return (
    <>
      <StatusBar hidden />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View
          style={[
            styles.box,
            {
              width: width > 500 ? "70%" : "90%",
              height: height > 600 ? "60%" : "90%"
            }
          ]}
        >
          <Text
            style={{
              fontSize: width > 500 ? 50 : 24
            }}
          >
            Welcome
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "plum",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center"
  }
});
