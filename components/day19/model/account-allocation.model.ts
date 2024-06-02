import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  immutableRelation,
  readonly
} from "@nozbe/watermelondb/decorators";
import { type Account } from "./account.model";
import { type Allocation } from "./allocation.model";

export class AccountAllocation extends Model {
  static table = "accounts_allocations";
  static associations = {
    allocations: { type: <const>"belongs_to", key: "allocation_id" },
    accounts: { type: <const>"belongs_to", key: "account_id" }
  };

  @readonly @date("created_at") createdAt: number;
  @field("amount") amount: number;
  @field("cap") cap: number;

  @immutableRelation("accounts", "account_id") account: Relation<Account>;
  @immutableRelation("allocations", "allocation_id")
  allocation: Relation<Allocation>;
}
