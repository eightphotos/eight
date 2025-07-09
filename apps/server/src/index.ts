import "./env"; 
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import routes from "@/routes/index";
import { createDb, type DB } from "@eight/db";
import { cors } from "hono/cors";
import { serverEnv } from "@/lib/env/server-env";

interface Env {
  HYPERDRIVE: {
    connectionString: string;
  };
}
export interface ReqVariables {
  db: DB;
}

const app = new Hono<{ Variables: ReqVariables; Bindings: Env }>();


const dbCache = new Map<string, DB>();
const getDb = (connString: string): DB => {
  const cached = dbCache.get(connString);
  if (cached) return cached;
  const { db } = createDb(connString);
  dbCache.set(connString, db);
  return db;
};

const port = serverEnv.SERVER_PORT ?? 1284;

app.use(
  cors({
    origin: serverEnv.FRONTEND_URL,
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 43200,
  })
);

app.use("*", async (c, next) => {
  /*
   * In development we rely on a local DATABASE_URL (loaded via ./env and validated by serverEnv).
   * In production, Cloudflare provides a Hyperdrive binding whose connectionString we use instead.
   */
  const connectionString =
    process.env.NODE_ENV !== "production"
      ? serverEnv.DATABASE_URL
      : c.env.HYPERDRIVE.connectionString;

  if (!connectionString) {
    console.error("Database connection string is not defined.");
    return c.text("Internal Server Error", 500);
  }

  const db = getDb(connectionString);
  c.set("db", db);
  await next();
});



app.route("/api", routes);

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`🚀 Server starting on http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}

export default {
  port,
  fetch: app.fetch,
};
