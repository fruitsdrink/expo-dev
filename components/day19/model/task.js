import { Model } from "@nozbe/watermelondb";
import { field, text, date, readonly } from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "tasks";
  @text("title") title;
  @field("is_finished") isFinished;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;

  // @writer async create(newTask) {
  //   await this.update(comment => {
  //     comment.isSpam = true
  //   })
  // }
}
