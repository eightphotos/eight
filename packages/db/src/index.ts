import dotenv from "dotenv";
dotenv.config(); 
import { drizzle } from "drizzle-orm/node-postgres";
import schema from "../schema.js";
import { Pool } from "pg";



// This implementation is a copy of the one done in Nibmus Storage. https://github.com/nimbusdotstorage/Nimbus/blob/main/packages/db/src/index.ts

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variables. DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
