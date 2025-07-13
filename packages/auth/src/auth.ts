import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DB } from "@eight/db";
import * as schema from "@eight/db/schema";
import { extractTokenFromUrl } from "./utils/extract-token";
import { sendMail } from "./utils/send-mail";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const createAuth = (db: DB) =>
  betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
    // keep singular table names
    usePlural: false,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  account: {
    accountLinking: {
        enabled: true,
    },
},
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
    resetPasswordTokenExpiresIn: 600, // 10 minutes
    sendResetPassword: async ({ user, url }) => {
        const token = extractTokenFromUrl(url);
        const frontendResetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await sendMail({
            to: user.email,
            subject: "Reset your password",
            text: `Click the link to reset your password: ${frontendResetUrl}`,
        });
    },
},
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/photospicker.mediaitems.readonly",
      ],
    },
  },
  appName: "Eight",
  trustedOrigins: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
});

export type Auth = ReturnType<typeof createAuth>;