import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { withObservables } from "@nozbe/watermelondb/react";

import { Account } from "./model/account.model";
import { database } from "./db";

interface Props {
  account: Account;
}
const AccountListItem: React.FC<Props> = ({ account }) => {
  const onDelete = async () => {
    await database.write(async () => {
      await account.markAsDeleted();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.percentage}>{account.cap}%</Text>
      <Text style={styles.percentage}>{account.tap}%</Text>
      <AntDesign name="delete" size={20} color={"gray"} onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16
  },
  percentage: {
    flex: 1
  }
});

export const EnhancedAccountListItem = withObservables(
  ["account"],
  ({ account }: Props) => ({
    account
  })
)(AccountListItem);
