import { waitlist } from "@eight/db/schema";
import { emailSchema } from "@/validators";
import { count, eq } from "drizzle-orm";
import { db } from "@eight/db";
import { nanoid } from "nanoid";
import { z } from "zod";

import express, { Request, Response } from "express";

const waitlistRouter = express.Router();

waitlistRouter.use(express.json());

waitlistRouter.post(
  "/join",
  async (req: Request, res: Response) => {
    try {
      if (!req.body || typeof req.body.email !== 'string') {
        return res.status(400).json({
          success: false,
          error: "Email is required",
        });
      }

      const { email } = req.body as { email: string };
      
      const existing = await db
        .select()
        .from(waitlist)
        .where(eq(waitlist.email, email.toLowerCase().trim()));

      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          error: "Email already exists",
        });
      }

      await db.insert(waitlist).values({
        id: nanoid(),
        email: email.toLowerCase().trim(),
      });

      res.status(201).json({
        success: true,
      });
    } catch (error) {
      console.error("Error adding email to waitlist:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
);

waitlistRouter.get("/count", async (req: Request, res: Response) => {
  try {
    const result = await db.select({ count: count() }).from(waitlist);
    res.json({ count: result[0]?.count || 0 });
  } catch (error) {
    console.error("Error getting waitlist count:", error);
    res.status(500).json({
      success: false, 
      error: "Internal server error",
    });
  }
});

export default waitlistRouter;
