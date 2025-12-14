import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Schema validation ensures no missing environment variables.
 * This prevents silent runtime failures.
 */
const envSchema = z.object({
  MONGO_URL: z.url(),
  FRONTEND_URL: z.url(),
  PORT: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const ENV = parsed.data;
