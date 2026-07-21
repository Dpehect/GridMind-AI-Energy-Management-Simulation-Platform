import { z } from "zod";

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  GRIDMIND_ENABLE_DEMO_USERS: z.enum(["true", "false"]).default("false"),
  GRIDMIND_BOOTSTRAP_ADMIN_EMAIL: z.string().email().optional(),
  GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD: z.string().min(12).optional(),
  GRIDMIND_SESSION_HOURS: z.coerce.number().int().min(1).max(168).default(8),
  GRIDMIND_LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional()
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(
  env: NodeJS.ProcessEnv = process.env
): ServerEnv {
  const result = serverEnvSchema.safeParse(env);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`)
      .join("\n");

    throw new Error(`GridMind environment validation failed:\n${message}`);
  }

  if (
    result.data.NODE_ENV === "production" &&
    result.data.GRIDMIND_ENABLE_DEMO_USERS === "true"
  ) {
    throw new Error(
      "GRIDMIND_ENABLE_DEMO_USERS must be false in production."
    );
  }

  if (
    Boolean(result.data.GRIDMIND_BOOTSTRAP_ADMIN_EMAIL) !==
    Boolean(result.data.GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD)
  ) {
    throw new Error(
      "GRIDMIND_BOOTSTRAP_ADMIN_EMAIL and GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD must be configured together."
    );
  }

  return result.data;
}
