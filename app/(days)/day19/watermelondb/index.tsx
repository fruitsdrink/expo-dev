import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function WatermelondbLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: "WatermelonDB"
        }}
      />
      <View style={styles.container}></View>
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
