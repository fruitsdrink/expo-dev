import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { AllocationList } from "@/components";
import { Feather } from "@expo/vector-icons";
import { supabaseSync } from "@/components/day19/db/sync";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Allocations",
          headerRight: () => (
            <Feather
              name="refresh-cw"
              size={20}
              color={"black"}
              onPress={async () => {
                await supabaseSync();
              }}
            />
          )
        }}
      />
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
