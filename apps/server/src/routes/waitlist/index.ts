import { zValidator } from "@hono/zod-validator";
import { createRateLimiterMiddleware } from "@/utils/rate-limiter-utils";
import { waitlist } from "@eight/db/schema";
import { emailSchema } from "@/validators";
import { count, eq } from "drizzle-orm";
import type { Context } from "hono";
import type { DB } from "@eight/db";
import { nanoid } from "nanoid";
import { Hono } from "hono";

type Variables = { Variables: { db: DB } };
const waitlistRouter = new Hono<Variables>();

// Note: waitlistRateLimiter needs to be imported from your rate limiter configuration
// const waitlistRateLimiterMiddleware = createRateLimiterMiddleware({ limiter: waitlistRateLimiter });

waitlistRouter.post(
	"/join",
	// waitlistRateLimiterMiddleware,
	zValidator("json", emailSchema, (result, c) => {
		if (!result.success) {
			return c.json(
				{
					success: false,
					error: result.error.errors[0]?.message,
				},
				400
			);
		}
	}),
	async (c: Context) => {
		try {
			const { email } = await c.req.json();
			const db = c.get("db") as DB;

			const existingEmail = await db
				.select({ id: waitlist.id })
				.from(waitlist)
				.where(eq(waitlist.email, email.toLowerCase().trim()))
				.limit(1);

			if (existingEmail.length > 0) {
				return c.json(
					{
						success: false,
						error: "You are already on the waitlist",
					},
					409
				);
			}

			// Use the same database connection for the insert
			await db.insert(waitlist).values({
				id: nanoid(),
				email: email.toLowerCase().trim(),
				createdAt: new Date(),
			});

			return c.json({ success: true }, 201);
		} catch (error) {
			console.error("Error adding email to waitlist:", error);
			return c.json({ success: false, error: "Internal server error" }, 500);
		}
	}
);

waitlistRouter.get("/count", async c => {
	try {
		const db = c.get("db") as DB;
		const result = await db.select({ count: count() }).from(waitlist);
		return c.json({ count: result[0]?.count || 0 });
	} catch (error) {
		console.error("Error getting waitlist count:", error);
		return c.json({ success: false, error: "Internal server error" }, 500);
	}
});

export default waitlistRouter;
