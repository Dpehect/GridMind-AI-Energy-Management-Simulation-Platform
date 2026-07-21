import { parseServerEnv } from "../src/env/schema";

try {
  const env = parseServerEnv();

  console.log(
    JSON.stringify(
      {
        status: "valid",
        nodeEnv: env.NODE_ENV,
        databaseConfigured: Boolean(env.DATABASE_URL),
        demoUsersEnabled: env.GRIDMIND_ENABLE_DEMO_USERS === "true",
        bootstrapAdminConfigured: Boolean(
          env.GRIDMIND_BOOTSTRAP_ADMIN_EMAIL &&
            env.GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD
        )
      },
      null,
      2
    )
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
