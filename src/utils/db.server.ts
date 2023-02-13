import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this will check if PrismaClient already exists, otherwise it will create a new one
if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;

export { db };
