import { config } from "dotenv";
import { z } from "zod";

config({
  path: ".env.local",
});

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  COUNTRY_STATE_CITY_URL: z.string().url(),

  COUNTRY_STATE_CITY_TOKEN: z.string().min(1),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse(process.env);

console.log("[config-env] Loaded envs: ", env);

export type Env = z.infer<typeof envSchema>;
