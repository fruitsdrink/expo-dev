import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function WatermelondbLayout() {
  return (
    <>
      <Stack.Screen options={{ title: "Allocations" }} />
      <View style={styles.container}>
        <Text>All locations</Text>
        <Link href={"/day19/watermelondb/allocations/new"}>New Allocation</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
