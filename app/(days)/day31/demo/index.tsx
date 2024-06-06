import { Stack } from "expo-router";
import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { faker } from "@faker-js/faker";
import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const _color = "#6e01ef";
const _size = 100;

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={[styles.dot, styles.center]}>
          {[...Array(10).keys()].map((index) => (
            <MotiView
              key={index}
              from={{
                opacity: 0.7,
                scale: 1
              }}
              animate={{
                opacity: 0,
                scale: 4
              }}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 200,
                repeatReverse: false,
                loop: true
              }}
              style={[styles.dot, StyleSheet.absoluteFillObject]}
            />
          ))}
          <Feather name="phone-outgoing" size={32} color={"#fff"} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});
