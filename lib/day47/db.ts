import { PrismaClient } from "@prisma/client/react-native";
import {
  reactiveHooksExtension,
  reactiveQueriesExtension
} from "@prisma/react-native";

const isLogger = false;
const baseClient = new PrismaClient({
  log: isLogger ? ["query", "info", "warn"] : undefined
});

export const prismaClient = baseClient.$extends(reactiveHooksExtension());
export const reactivePrismaClient = baseClient.$extends(
  reactiveQueriesExtension()
);
