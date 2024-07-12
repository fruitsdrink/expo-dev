import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import * as schema from "@/db/schemas";

const DATABASE_NAME = "db_day111.db";
const expoDb = openDatabaseSync(DATABASE_NAME, { useNewConnection: true });
const db = drizzle(expoDb, { schema });

export { expoDb, db, schema, migrations };
