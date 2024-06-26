import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import React from "react";
import { MotiView } from "moti";

const LoadingIndicator = ({ size }: { size: number }) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
        shadowOpacity: 0.5
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 1
      }}
      transition={{
        type: "timing",
        duration: 1000,
        // repeat: 3
        // repeat: Infinity
        loop: true
        // repeatReverse: false
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "#fff",
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10
      }}
    />
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#010100"
        }}
      >
        <LoadingIndicator size={100} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
