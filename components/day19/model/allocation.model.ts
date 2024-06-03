import { Model } from "@nozbe/watermelondb";
import {
  field,
  date,
  readonly,
  children,
  nochange
} from "@nozbe/watermelondb/decorators";
import { type AccountAllocation } from "./account-allocation.model";

export class Allocation extends Model {
  static table = "allocations";
  static associations = {
    accounts_allocations: {
      type: <const>"has_many",
      foreignKey: "allocation_id"
    }
  };

  @readonly @date("created_at") createdAt: number;
  @readonly @date("updated_at") updatedAt;
  @field("income") income: number;
  @nochange @field("user_id") userId: string;

  @children("accounts_allocations") accountAllocations: AccountAllocation[];
}
