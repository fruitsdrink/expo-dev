import { FlatList, View } from "react-native";
import { EnhancedAccountListItem } from "./AccountListItem";
import { accountCollection } from "./db";
import { Account } from "./model/account.model";
import { withObservables } from "@nozbe/watermelondb/react";

const AccountList = ({ accounts }: { accounts: Account[] }) => {
  return (
    <FlatList
      data={accounts}
      contentContainerStyle={{
        gap: 5
      }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EnhancedAccountListItem account={item} />}
    />
  );
};

// 第一个参数是副作用的依赖
// 第二个参数是收到的默认参数
// 返回的对象会传给包裹的组件
// accounts 的获取不能使用 await accountCollection.query().fetch()
// const enhance = withObservables([""], () => ({
//   accounts: accountCollection.query()
// }));

// const EnhancedAccountList = enhance(AccountList);
// export { EnhancedAccountList };

// 简化写法
export const EnhancedAccountList = withObservables([""], () => ({
  accounts: accountCollection.query() // 等同于 accounts: accountCollection.query().observe()
}))(AccountList);
