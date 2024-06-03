import { Model } from "@nozbe/watermelondb";
import { field, nochange, text } from "@nozbe/watermelondb/decorators";

export class Account extends Model {
  static table = "accounts";

  @text("name") name: string;
  @field("cap") cap: number;
  @field("tap") tap: number;
  @nochange @field("user_id") userId: string;
}
