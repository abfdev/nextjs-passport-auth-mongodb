import { PrismaClient } from "@lib/prismaClient";

let db;

if (!global.db) {
  global.db = new PrismaClient();
}
db = global.db;

export default db;
