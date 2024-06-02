import { FlatList } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { AllocationListItem } from "./AllocationListItem";
import { allocationCollection } from "./db";
import { type Allocation } from "./model/allocation.model";
import { Q } from "@nozbe/watermelondb";

const _AllocationList = ({ allocations }: { allocations: Allocation[] }) => {
  return (
    <FlatList
      data={allocations}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AllocationListItem allocation={item} />}
    />
  );
};

export const AllocationList = withObservables([], () => ({
  allocations: allocationCollection.query(Q.sortBy("created_at", Q.desc))
}))(_AllocationList);
