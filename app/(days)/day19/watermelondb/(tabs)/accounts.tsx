import { EnhancedAccountList } from "@/components";
import { accountCollection, database } from "@/components/day19/db";
import { useAuth } from "@/providers/day19/AuthProvider";
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AccountScreen() {
  const [name, setName] = useState("");
  const [cap, setCap] = useState("");
  const [tap, setTap] = useState("");

  const { user } = useAuth();

  const createAccount = async () => {
    if (name) {
      await database.write(async () => {
        await accountCollection.create((account) => {
          account.name = name;
          account.cap = parseFloat(cap) || 0;
          account.tap = parseFloat(tap) || 0;
          account.userId = user.id;
        });
        setName("");
        setCap("");
        setTap("");
      });
    }
  };

  const updateAccount = async () => {
    await database.write(async () => {
      const accounts = await accountCollection.query().fetch();
      const account = accounts[0];
      account.update((updateAccount) => {
        updateAccount.name = new Date().getTime().toString();
      });
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Accounts"
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ flex: 1 }}>Name</Text>
          <Text style={{ flex: 1 }}>CAP</Text>
          <Text style={{ flex: 1 }}>TAP</Text>
          <Text>Actions</Text>
        </View>

        <EnhancedAccountList />

        <View style={styles.inputRow}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            value={cap}
            onChangeText={(val) => setCap(val)}
            placeholder="CAP %"
            style={styles.input}
          />
          <TextInput
            value={tap}
            onChangeText={(val) => setTap(val)}
            placeholder="TAP %"
            style={styles.input}
          />
        </View>
        <Button title="Add account" onPress={createAccount} />
        {/* <Button title="update test" onPress={updateAccount} /> */}
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
