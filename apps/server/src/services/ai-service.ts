import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { serverEnv } from "@/lib/env/server-env";

// Ensure API key is set at runtime
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = serverEnv.GOOGLE_GENERATIVE_AI_API_KEY ?? "";
}

export interface PhotoAnalysis {
  description: string;
  tags: string[];
  embedding: number[];

}

/**
 * Analyze an image using Google Generative AI (Gemini vision model)
 * @param imageUrl URL of the image to analyze
 */
export async function analyzeImage(imageUrl: string): Promise<PhotoAnalysis> {
  /*
    We ask the model to return a JSON payload so it can be easily parsed.
    In production you may want to add retries & error handling for malformed JSON.
  */
  const prompt = `You are an expert image analyst. Analyse the image provided and return a JSON object with the following shape:\n\n{\n  \"description\": string,\n  \"tags\": string[]\n}\n\nThe description should be a concise sentence (max 40 words). The tags array should contain 5-10 lowercase, single-word tags suitable for search. Return ONLY valid JSON.`;

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash-preview-04-17"),
      images: [imageUrl],
      prompt,
      providerOptions: {
        google: { responseModalities: ["TEXT"] },
      },
    } as any);

    // Attempt to parse the response as JSON
    const parsed = JSON.parse(text) as { description: string; tags: string[] };
    if (!parsed.description || !Array.isArray(parsed.tags)) {
      throw new Error("AI response missing required fields");
    }

    // Generate a 768-dimensional embedding for semantic search
    const embedding = await generateEmbedding(`${parsed.description}. ${parsed.tags.join(" ")}`);

    return { ...parsed, embedding };
  } catch (error) {
    console.error("Failed to analyze image:", error);
    // Fallback to basic metadata when AI fails
    return {
      description: "Image analysis failed",
      tags: [],
      embedding: [],
    };
  }
}

// Helper to call Google Generative AI embeddings endpoint
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const apiKey = serverEnv.GOOGLE_GENERATIVE_AI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;
    const payload = {
      content: {
        parts: [{ text }],
      },
      taskType: "SEMANTIC_SIMILARITY",
      outputDimensionality: 768,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Embedding API error: ${res.status}`);
    const data = (await res.json()) as { embedding?: { values: number[] } };
    return data.embedding?.values ?? [];
  } catch (err) {
    console.error("Embedding generation failed", err);
    return [];
  }
} 