import { Model } from "@nozbe/watermelondb";
import { field, text, date, readonly } from "@nozbe/watermelondb/decorators";

export class Allocation extends Model {
  static table = "allocations";

  @readonly @date("created_at") createdAt: number;
  @field("income") income: number;
}
