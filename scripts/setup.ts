#!/usr/bin/env tsx

import { execSync } from "child_process";
import { join } from "path";
import { writeFileSync, existsSync } from "fs";
import { config } from "dotenv";

// Load existing env if any
config();

const ROOT_DIR = join(__dirname, "..");

function executeCommand(command: string) {
  try {
    execSync(command, { stdio: "inherit", cwd: ROOT_DIR });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    throw error;
  }
}

function createEnvFile() {
  const envPath = join(ROOT_DIR, ".env");

  if (!existsSync(envPath)) {
    const envContent = `# URLs
BACKEND_URL=http://localhost:1284
FRONTEND_URL=http://localhost:3000

# URLs for Next.js client side
NEXT_PUBLIC_BACKEND_URL=http://localhost:1284
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_CALLBACK_URL=http://localhost:3000/gallery

# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/eight
DATABASE_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=eight

NODE_ENV=development`;

    writeFileSync(envPath, envContent);
    console.log("✅ Created .env file");
  } else {
    console.log("ℹ️ .env file already exists, skipping creation");
  }
}

async function main() {
  console.log("🚀 Setting up Eight development environment...\n");

  // Create .env file if it doesn't exist
  console.log("📝 Checking environment configuration...");
  createEnvFile();

  // Install dependencies
  console.log("\n📦 Installing dependencies...");
  executeCommand("pnpm install");

  // Start database
  console.log("\n🐘 Setting up database...");
  executeCommand("pnpm db:reset");

  // Push schema
  console.log("\n🔄 Pushing database schema...");
  executeCommand("pnpm db:push");

  console.log("\n✨ Setup complete! You can now run:");
  console.log("  pnpm run dev     - Start all services");
  console.log("  pnpm run web     - Start only the frontend");
  console.log("  pnpm run server  - Start only the backend");
}

main().catch((error) => {
  console.error("❌ Setup failed:", error);
  process.exit(1);
});
