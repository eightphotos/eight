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


const getDb = (connString: string): DB => {
  const { db } = createDb(connString);
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
   * For Cloudflare Workers, prioritize HYPERDRIVE binding if available.
   * Fall back to DATABASE_URL for local Node.js development.
   */
  let connectionString: string | undefined;
  
  // Check if we're in Cloudflare Workers environment and have HYPERDRIVE binding
  if (c.env && c.env.HYPERDRIVE && c.env.HYPERDRIVE.connectionString) {
    connectionString = c.env.HYPERDRIVE.connectionString;
    console.log("Using HYPERDRIVE connection for database");
  } else if (process.env.DATABASE_URL) {
    connectionString = process.env.DATABASE_URL;
    console.log("Using DATABASE_URL for database connection");
  } else {
    // Try serverEnv as fallback
    try {
      connectionString = serverEnv.DATABASE_URL;
      console.log("Using serverEnv DATABASE_URL for database connection");
    } catch (error) {
      console.error("Failed to load serverEnv:", error);
    }
  }

  if (!connectionString) {
    console.error("Database connection string is not defined.");
    return c.text("Internal Server Error", 500);
  }


  try {
    const db = getDb(connectionString);
    c.set("db", db);
    await next();
  } catch (error) {
    console.error("Database connection failed:", error);
    return c.text("Database Connection Error", 500);
  }
});



app.route("/api", routes);

app.get("/", (c) => {
  return c.text("Welcome to Eight!");
});

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
