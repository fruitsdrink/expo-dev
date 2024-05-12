import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

export default function SecondScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>More protected info</Text>
      <Entypo name="lock" size={75} color="gray" />
      <Link href={"/day10/protected"}>Go back</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
