import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        {
          name: "title",
          type: "string"
        },
        {
          name: "is_finished",
          type: "boolean"
        },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" }
      ]
    })
  ]
});
