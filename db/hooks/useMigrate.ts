import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db, schema, migrations } from "@/db/client";

export const useMigrate = () => {
  return useMigrations(db, migrations);
};
