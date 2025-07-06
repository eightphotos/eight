import "./env";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import routes from "@/routes/index";
import { db } from "@eight/db";
import { cors } from "hono/cors";
import { serverEnv } from "@/lib/env/server-env";
import type { Context } from "hono";
import type { Next } from "hono/types";

export interface ReqVariables {
  db: typeof db | null;
}

const app = new Hono<{ Variables: ReqVariables }>();

app.use(
  cors({
    origin: serverEnv.FRONTEND_URL,
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 43200,
  }),
);

app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/api", routes);

const port = 1284;

// Only start the server if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`🚀 Server starting on http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}

// Export for other uses (e.g., testing, serverless)
export default {
  port,
  fetch: app.fetch,
  onRequest: (c: Context, next: Next) => {
    c.set("db", db as typeof db);
    return next();
  },
};
