import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  nochange,
  readonly,
  text
} from "@nozbe/watermelondb/decorators";

export class Account extends Model {
  static table = "accounts";

  @readonly @date("created_at") createdAt: number;
  @readonly @date("updated_at") updatedAt;
  @text("name") name: string;
  @field("cap") cap: number;
  @field("tap") tap: number;
  @nochange @field("user_id") userId: string;
}
