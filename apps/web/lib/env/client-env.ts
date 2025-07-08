import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
});

const clientEnv = {
  NEXT_PUBLIC_BACKEND_URL:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1284",
};

const _clientEnv = clientEnvSchema.safeParse(clientEnv);

if (!_clientEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    Object.entries(_clientEnv.error.format())
      .map(([name, value]) => {
        if (value && "_errors" in value)
          return `${name}: ${value._errors.join(", ")}\n`;
      })
      .filter(Boolean),
  );
  throw new Error("Invalid environment variables");
}

export { clientEnv };
