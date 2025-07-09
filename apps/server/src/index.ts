import "./env"; 
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import routes from "@/routes/index";
import { createDb, type DB } from "@eight/db";
import { cors } from "hono/cors";
import { serverEnv } from "@/lib/env/server-env";
import { env } from 'cloudflare:workers';
interface Env {
  HYPERDRIVE: {
    connectionString: string;
  };
}
export interface ReqVariables {
  db: DB;
}

const app = new Hono<{ Variables: ReqVariables; Bindings: Env }>();
const connString = env.HYPERDRIVE.connectionString;
if(process.env.NODE_ENV !== "production") {
    const connString = process.env.DATABASE_URL;
  console.log(`Using connection string: ${connString}`);
}else{
  const connString = env.HYPERDRIVE.connectionString;
}

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
  const connString = c.env.HYPERDRIVE.connectionString;
  const { db } = createDb(connString);
  c.set("db", db);
  await next();
});



app.route("/api", routes);
const port = 1284;

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
