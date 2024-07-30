import { Dimensions, StyleSheet, View, Animated } from "react-native";

import { StatusBar } from "expo-status-bar";
import { HomeProps, OVERFLOW_HEIGHT } from "./constants";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const { width, height } = Dimensions.get("window");

type OverflowItemsProps = {
  data: any[];
  scrollXAnimated: any;
};
const OverflowItems: React.FC<OverflowItemsProps> = ({
  data,
  scrollXAnimated
}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
  });

  return (
    <View>
      <Animated.View style={{ transform: [{ translateY }] }}>{}</Animated.View>
    </View>
  );
};

const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}></SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
