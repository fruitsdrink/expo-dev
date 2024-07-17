import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { Value } from "@/components/day118/value";
import { RingProgress } from "@/components/day118/ring-progress";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthInputOptions
} from "react-native-health";
import { useEffect, useState } from "react";
import { useHealthData } from "@/hooks/day118/useHealthData";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const STEPS_GOAL = 10_000;

export default function DemoScreen() {
  const { hasPermissions, steps, distance, filghts } = useHealthData({
    date: new Date()
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />

        <RingProgress progress={steps / STEPS_GOAL} />
        <View style={styles.values}>
          <Value lable="Steps" value={steps.toString()} />
          <Value
            lable="Distance"
            value={`${(distance / 1000).toFixed(2)} km`}
          />
          <Value lable="Flights Climbed" value={`${filghts}`} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    padding: 12
  },
  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
    marginTop: 100
  }
});
