import { config } from "dotenv";
import { join } from "path";

// Load environment variables from workspace root
config({
  path: join(process.cwd(), "../../.env"),
});
