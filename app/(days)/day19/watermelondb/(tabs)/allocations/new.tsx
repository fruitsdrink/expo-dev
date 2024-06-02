import { allocationCollection, database } from "@/components/day19/db";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function NewAllocationScreen() {
  const [income, setIncome] = useState("");

  const onSave = async () => {
    await database.write(async () => {
      allocationCollection.create((allocation) => {
        allocation.income = Number.parseFloat(income) || 0;
      });
    });
    setIncome("");
    // 返回上一页面
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "New Allocation"
        }}
      />
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Income</Text>
          <TextInput
            placeholder="$123"
            style={styles.input}
            value={income}
            onChangeText={setIncome}
          />
        </View>
        <Button title="Save" onPress={onSave} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "white",
    padding: 10
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  label: {
    fontWeight: "bold"
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5
  }
});
