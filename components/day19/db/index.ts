import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import { Account } from "../model/account.model";
import { Platform } from "react-native";
import { Allocation } from "../model/allocation.model";
import { AccountAllocation } from "../model/account-allocation.model";
import * as Crypto from "expo-crypto";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
setGenerator(() => Crypto.randomUUID()); // 此步骤可省略，但是为了保证id的唯一性，建议设置

const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  // migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  // jsi: true /* Platform.OS === 'ios' */,
  jsi: Platform.OS === "ios",
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    console.log("🚀 ~ error:", error);
    // Database failed to load -- offer the user to reload the app or log out
  }
});

const database = new Database({
  adapter,
  modelClasses: [Account, Allocation, AccountAllocation]
});

const accountCollection = database.get<Account>("accounts");
const allocationCollection = database.get<Allocation>("allocations");
const accountAllocationCollection = database.get<AccountAllocation>(
  "accounts_allocations"
);

export {
  database,
  accountCollection,
  allocationCollection,
  accountAllocationCollection
};
