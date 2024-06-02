import { StyleSheet, Text, View } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { type Allocation } from "./model/allocation.model";
import React from "react";
import { AccountAllocation } from "./model/account-allocation.model";
import { AccountAllocationItem } from "./AccountAllocationItem";

type Props = {
  allocation: Allocation;
  accountAllocations: AccountAllocation[];
};
const _AllocationListItem = ({ allocation, accountAllocations }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{allocation.createdAt.toLocaleString()}</Text>
        <Text style={styles.income}>${allocation.income}</Text>
      </View>
      <View style={{ gap: 5, paddingVertical: 5 }}>
        {accountAllocations.map((item) => (
          <AccountAllocationItem accountAllocation={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

export const AllocationListItem: React.FC<{ allocation: Allocation }> =
  withObservables(
    ["allocation"],
    ({ allocation }: { allocation: Allocation }) => ({
      allocation,
      accountAllocations: allocation.accountAllocations
    })
  )(_AllocationListItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gainsboro",
    padding: 10
  },
  date: {},
  income: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green"
  }
});
