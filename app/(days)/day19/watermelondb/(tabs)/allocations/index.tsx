import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { AllocationList } from "@/components";

export default function WatermelondbLayout() {
  return (
    <>
      <Stack.Screen options={{ title: "Allocations" }} />
      <View style={styles.container}>
        <Link href={"/day19/watermelondb/allocations/new"} asChild>
          <Text style={styles.button}>New Allocation</Text>
        </Link>
        <AllocationList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "green",
    color: "white",
    margin: 10,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5,
    overflow: "hidden"
  }
});
