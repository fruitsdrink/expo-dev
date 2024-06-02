import { AccountList, AccountListItem } from "@/components";
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AccountScreen() {
  const [name, setName] = useState("");
  const [cap, setCap] = useState(0);
  const [tap, setTap] = useState(0);

  const createAccount = () => {};

  return (
    <>
      <Stack.Screen
        options={{
          title: "Accounts"
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Name</Text>
          <Text>CAP</Text>
          <Text>TAP</Text>
        </View>

        <AccountList />

        <View style={styles.inputRow}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            value={cap.toString()}
            onChangeText={(val) => setCap(Number(val))}
            placeholder="CAP %"
            style={styles.input}
          />
          <TextInput
            value={tap.toString()}
            onChangeText={(val) => setTap(Number(val))}
            placeholder="TAP %"
            style={styles.input}
          />
        </View>
        <Button title="Add account" onPress={createAccount} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    padding: 5
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white"
  },
  input: {
    flex: 1
  }
});
