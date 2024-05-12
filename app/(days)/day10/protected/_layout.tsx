import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import Entypo from "@expo/vector-icons/Entypo";
import { useBiometries } from "@/components";

export default function Day10Layout() {
  const { isUnlocked, authenticate } = useBiometries();
  console.log("🚀 ~ Day10Layout ~ isUnlocked:", isUnlocked);

  useEffect(() => {
    if (!isUnlocked) {
      authenticate();
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.container}>
        {isUnlocked ? (
          <Slot />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Text>Use FaceId to unlock</Text>
            <Entypo
              onPress={authenticate}
              name="fingerprint"
              size={75}
              color="black"
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
