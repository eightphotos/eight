import { zValidator } from "@hono/zod-validator";
import { waitlist } from "@eight/db/schema";
import { emailSchema } from "@/validators";
import { count, eq } from "drizzle-orm";
import type { Context } from "hono";
import { DB } from "@eight/db";
import { nanoid } from "nanoid";
import { Hono } from "hono";


type AppContext = Context<{ Variables: { db: import("@eight/db").DB } }>;
const waitlistRouter = new Hono<AppContext>();

waitlistRouter.post(
  "/join",
  zValidator("json", emailSchema),
  async (c: Context) => {
    try {
      const { email } = c.req.valid("json");

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
    const result = await DB.select({ count: count() }).from(waitlist);
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
