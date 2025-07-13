import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z
      .string({ message: "DATABASE_URL environment variable is required." })
      .url(
        "The value provided for DATABASE_URL is not a valid URL. Please check the format."
      )
      .optional(),

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
    GOOGLE_GENERATIVE_AI_API_KEY: z
      .string({ message: "GOOGLE_GENERATIVE_AI_API_KEY is required for AI integrations." })
      .min(1, "GOOGLE_GENERATIVE_AI_API_KEY cannot be empty"),
    RESEND_API_KEY: z
      .string({ message: "RESEND_API_KEY is required for email integrations." })
      .min(1, "RESEND_API_KEY cannot be empty"),
    EMAIL_FROM: z
      .string({ message: "EMAIL_FROM is required for email integrations." })
      .min(1, "EMAIL_FROM cannot be empty"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
