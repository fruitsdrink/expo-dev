import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 2,
  tables: [
    // accounts
    tableSchema({
      name: "accounts",
      columns: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "cap",
          type: "number"
        },
        {
          name: "tap",
          type: "number"
        }
      ]
    }),
    // allocations
    tableSchema({
      name: "allocations",
      columns: [
        { name: "created_at", type: "number" },
        { name: "income", type: "number" }
      ]
    })
  ]
});
