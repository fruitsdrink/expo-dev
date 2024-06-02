import {
  accountCollection,
  allocationCollection,
  database
} from "@/components/day19/db";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { type Account } from "@/components/day19/model/account.model";

function NewAllocationScreen({ accounts }: { accounts: Account[] }) {
  const [income, setIncome] = useState("0");

  const onSave = async () => {
    await database.write(async () => {
      allocationCollection.create((allocation) => {
        allocation.income = Number.parseFloat(income) || 0;
      });
    });
    setIncome("0");
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

        {accounts.map((account) => (
          <View key={account.id} style={styles.inputRow}>
            <Text style={{ flex: 1 }}>
              {account.name}: {account.cap}
            </Text>
            <Text>${(Number.parseFloat(income) * account.cap) / 100}</Text>
          </View>
        ))}

        <Button title="Save" onPress={onSave} />
      </View>
    </>
  );
}

const enhance = withObservables([], () => ({
  accounts: accountCollection.query()
}))(NewAllocationScreen);

export default enhance;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "white",
    padding: 10,
    gap: 10
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  label: {
    fontWeight: "bold",
    width: 100
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5
  }
});
