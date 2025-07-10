// Environment variable loading for both Node.js and Cloudflare Workers

// Check if we're running in Cloudflare Workers by checking for Workers-specific globals
const isCloudflareWorkers = typeof caches !== 'undefined' || typeof addEventListener !== 'undefined';

if (!isCloudflareWorkers) {
  // Running in Node.js - load environment variables from .env file
  try {
    const { config } = require("dotenv");
    const { join } = require("path");
    const { existsSync } = require("fs");

    // Load environment variables from workspace root
    const envPath = join(process.cwd(), "../../.env");


    const result = config({
      path: envPath,
    });

    if (result.error) {
      console.error("Error loading .env file:", result.error);
    } else {
      console.log("Environment variables loaded successfully");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.warn("Could not load dotenv (might be running in Workers):", errorMessage);
  }
} else {
  // Running in Cloudflare Workers - environment variables come from wrangler.jsonc or .dev.vars
  console.log("Running in Cloudflare Workers environment");

}
