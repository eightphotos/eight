import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { nanoid } from "nanoid";
import { analyzeImage, generateEmbedding } from "@/services/ai-service";
import { photos } from "@eight/db/schema";
import { sql } from "drizzle-orm";
import type { DB } from "@eight/db";
import type { Context } from "hono";

// Variables typed to include db from middleware
type Variables = { Variables: { db: DB } };
const photosRouter = new Hono<Variables>();

// Simple input schema - expect JSON with imageUrl
const uploadSchema = z.object({
  imageUrl: z.string().url(),
});

photosRouter.post(
  "/upload",
  zValidator("json", uploadSchema, (result, c) => {
    if (!result.success) {
      return c.json({ success: false, error: result.error.errors[0]?.message }, 400);
    }
  }),
  async (c: Context) => {
    const { imageUrl } = await c.req.json();
    const db = c.get("db") as DB;
    const userId = c.req.header("x-user-id");
    if (!userId) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    try {
      // Analyse image via AI
      const analysis = await analyzeImage(imageUrl);

      // Store photo & metadata
      const id = nanoid();
      await db.insert(photos).values({
        id,
        userId,
        url: imageUrl,
        description: analysis.description,
        metadata: analysis as unknown as Record<string, unknown>,
        embedding: analysis.embedding,
        createdAt: new Date(),
      });

      // TODO: handle tags insertion in future iterations

      return c.json({ success: true, photoId: id, analysis });
    } catch (error) {
      console.error("Photo upload failed:", error);
      return c.json({ success: false, error: "Internal server error" }, 500);
    }
  }
);

// ------------------------------------
// GET /photos/search?q=your+text
photosRouter.get("/search", async (c: Context) => {
  const query = c.req.query("q") ?? "";
  const db = c.get("db") as DB;
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ success: false, error: "Unauthorized" }, 401);

  if (!query) return c.json({ success: false, error: "Missing q param" }, 400);

  try {
    const embedding = await generateEmbedding(query);
    if (!embedding.length) return c.json({ success: false, error: "Embedding failed" }, 500);

    const literal = `[${embedding.join(",")}]`;

    // Similarity search ordered by cosine distance (<->)
    const rawQuery = sql`SELECT id, url, description, metadata, created_at, embedding <-> ${literal} as distance
           FROM ${photos}
           WHERE user_id = ${userId}
           ORDER BY embedding <-> ${literal}
           LIMIT 20` as any;

    const results = (await (db as any).execute(rawQuery)) as any;

    return c.json({ success: true, results });
  } catch (err) {
    console.error("Search failed", err);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
});

// (helper removed)

export default photosRouter; 