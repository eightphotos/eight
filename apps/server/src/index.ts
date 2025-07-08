import "./env";

import { serve } from "@hono/node-server";
import routes from "@/routes/index";
import { db } from "@eight/db";
import { serverEnv } from "@/lib/env/server-env";
import express from "express";
import cors from "cors";



export interface ReqVariables {
  db: typeof db | null;
}

const app = express();

app.use(
  cors({
    origin: serverEnv.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 43200,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);



app.use("/api", routes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({ status: "Hello from Eight!" });
});


app.listen(serverEnv.SERVER_PORT, () => {
  console.log(`Server starting on http://localhost:${serverEnv.SERVER_PORT}`);
});






