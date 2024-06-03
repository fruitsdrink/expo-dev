import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 4,
  tables: [
    // accounts
    tableSchema({
      name: "accounts",
      columns: [
        { name: "name", type: "string" },
        { name: "cap", type: "number" },
        { name: "tap", type: "number" },
        { name: "user_id", type: "string" }
      ]
    }),
    // allocations
    tableSchema({
      name: "allocations",
      columns: [
        { name: "created_at", type: "number" },
        { name: "income", type: "number" },
        { name: "user_id", type: "string" }
      ]
    }),
    // accounts_allocations
    tableSchema({
      name: "accounts_allocations",
      columns: [
        { name: "created_at", type: "number" },
        { name: "account_id", type: "string" },
        { name: "allocation_id", type: "string" },
        { name: "amount", type: "number" },
        { name: "cap", type: "number" },
        { name: "user_id", type: "string" }
      ]
    })
  ]
});
