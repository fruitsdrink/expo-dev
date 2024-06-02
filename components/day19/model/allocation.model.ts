import { Model } from "@nozbe/watermelondb";
import {
  field,
  text,
  date,
  readonly,
  writer,
  children
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
  @field("income") income: number;

  @children("accounts_allocations") accountAllocations: AccountAllocation[];
}
