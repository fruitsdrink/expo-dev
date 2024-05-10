import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { fonts } from "@/constants";

export default function Day1Screen() {
  return (
    <>
      <Stack.Screen options={{ title: "Day 1" }} />
      <View>
        <Text
          style={{
            fontSize: 50,
            fontFamily: fonts.AmaticBold,
          }}
        >
          Day1Screen
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
