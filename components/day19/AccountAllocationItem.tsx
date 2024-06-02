import React from "react";
import { AccountAllocation } from "./model/account-allocation.model";
import { Text, View } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { Account } from "./model/account.model";

type Props = {
  accountAllocation: AccountAllocation;
  account: Account;
};
const _AccountAllocationItem: React.FC<Props> = ({
  accountAllocation,
  account
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text>{account.name}</Text>
      <Text>{accountAllocation.amount}</Text>
    </View>
  );
};

export const AccountAllocationItem: React.FC<{
  accountAllocation: AccountAllocation;
}> = withObservables(["accountAllocation"], ({ accountAllocation }) => ({
  accountAllocation,
  account: accountAllocation.account
}))(_AccountAllocationItem);
