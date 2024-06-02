import { FlatList, View } from "react-native";
import { AccountListItem } from "./AccountListItem";

export const AccountList = () => {
  return (
    <FlatList
      data={[1, 2, 3]}
      contentContainerStyle={{
        gap: 5
      }}
      renderItem={() => <AccountListItem />}
    />
  );
};
