import { AccountList, AccountListItem } from "@/components";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  }
});
