import { zValidator } from "@hono/zod-validator";
import { waitlist } from "@eight/db/schema";
import { emailSchema } from "@/validators";
import { count, eq } from "drizzle-orm";
import type { Context } from "hono";
import type { DB } from "@eight/db";
import type { z } from "zod";
import { nanoid } from "nanoid";
import { Hono } from "hono";

type Variables = { Variables: { db: DB } };
const waitlistRouter = new Hono<Variables>();

waitlistRouter.post(
  "/join",
  zValidator("json", emailSchema),
  async (c) => {
    try {
      const body = c.req.valid("json") as z.infer<typeof emailSchema>;
      const email = body.email;

      const db = c.get("db") as DB;

      const existing = await db
        .select()
        .from(waitlist)
        .where(eq(waitlist.email, email.toLowerCase().trim()));

      if (existing.length > 0) {
        return c.json(
          {
            success: false,
            error: "Email already exists",
          },
          400,
        );
      }

      await db.insert(waitlist).values({
        id: nanoid(),
        email,
      });

      return c.json(
        {
          success: true,
        },
        201,
      );
    } catch (error) {
      console.error("Error adding email to waitlist:", error);
      return c.json(
        {
          success: false,
          error: "Internal server error",
        },
        500,
      );
    }
  },
);

waitlistRouter.get("/count", async (c: Context) => {
  try {
    const db = c.get("db") as DB;
    const result = await db.select({ count: count() }).from(waitlist);
    return c.json({ count: result[0]?.count || 0 });
  } catch (error) {
    console.error("Error getting waitlist count:", error);
    return c.json(
      {
        success: false,
        error: "Internal server error",
      },
      500,
    );
  }
});

export default waitlistRouter;
