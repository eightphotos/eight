import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z
      .string({ message: "DATABASE_URL environment variable is required." })
      .url(
        "The value provided for DATABASE_URL is not a valid URL. Please check the format."
      ),

    FRONTEND_URL: z
      .string({ message: "The FRONTEND_URL environment variable is required." })
      .url("FRONTEND_URL must be a valid URL (e.g., https://yourdomain.com).")
      .default("http://localhost:3000"),

    BACKEND_URL: z
      .string({ message: "The BACKEND_URL environment variable is required." })
      .url(
        "BACKEND_URL must be a valid URL (e.g., https://api.yourdomain.com)."
      )
      .default("http://localhost:1284"),

    SERVER_PORT: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1).max(65535))
      .default("1284"),
    ENVIRONMENT: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
