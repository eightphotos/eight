import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { join } from "path";

// Load environment variables from workspace root
config({
  path: join(__dirname, "../../.env"),
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
