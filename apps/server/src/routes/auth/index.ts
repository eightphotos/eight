import { zValidator } from "@hono/zod-validator";
import { emailSchema } from "@/validators";
import { user } from "@eight/db/schema";
import { createAuth } from "@eight/auth";
import type { Context } from "hono";
import { eq } from "drizzle-orm";
import type { DB } from "@eight/db";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.post("/check-email", zValidator("json", emailSchema), async (c: Context) => {
	try {
		const { email } = await c.req.json();
		const db = c.get("db") as DB;

		const existingUser = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.email, email.toLowerCase().trim()))
			.limit(1);

		return c.json({ exists: existingUser.length > 0 });
	} catch (error) {
		console.error("Error checking email:", error);
		return c.json({ error: "Internal server error" }, 500);
	}
});

// Better Auth handler for all other auth routes
authRouter.on(["POST", "GET"], "/*", async (c: Context) => {
	try {
		const db = c.get("db") as DB;
		const auth = createAuth(db);
		return await auth.handler(c.req.raw);
	} catch (error) {
		console.error("Auth handler error:", error);
		return c.json({ error: "Authentication failed" }, 500);
	}
});

export default authRouter;