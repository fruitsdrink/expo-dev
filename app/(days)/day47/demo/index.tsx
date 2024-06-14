import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  ScaledSize,
  useWindowDimensions,
  ActivityIndicator,
  SafeAreaView
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import { initializeDb } from "@/lib/day47/seed";
import { Users } from "@/components/day47/Users";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/day47/query-client";

export default function DemoScreen() {
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await initializeDb();
      setIsInitialized(true);
    })();
  }, []);

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        {isInitialized && <ActivityIndicator size={"large"} color={"#000"} />}
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Users />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
