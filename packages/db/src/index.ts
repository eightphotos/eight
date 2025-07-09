import { drizzle } from 'drizzle-orm/postgres-js'
import postgres, { type Sql } from 'postgres';
import schema from "../schema.js";


// This implementation is a copy of the one done in Nibmus Storage. https://github.com/nimbusdotstorage/Nimbus/blob/main/packages/db/src/index.ts

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variables. DATABASE_URL is not defined");
}

const createDrizzle = (conn: Sql) => drizzle(conn, { schema });

export const createDb = (url: string) => {
  const conn = postgres(url);
  const db = createDrizzle(conn);
  return { db, conn };
};

export type DB = ReturnType<typeof createDrizzle>;



