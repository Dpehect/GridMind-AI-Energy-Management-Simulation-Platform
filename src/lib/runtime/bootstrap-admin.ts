import { prisma } from "@/lib/prisma";
import { getServerEnv } from "@/env/server";
import { getDefaultWorkspace } from "@/lib/workspace";
import { hashPassword } from "@/features/auth/password";
import { log } from "@/lib/logger";

export async function bootstrapAdministrator() {
  const env = getServerEnv();

  if (
    !env.GRIDMIND_BOOTSTRAP_ADMIN_EMAIL ||
    !env.GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD
  ) {
    return { created: false, reason: "not-configured" as const };
  }

  const workspace = await getDefaultWorkspace();
  const existingCount = await prisma.localUser.count({
    where: { workspaceId: workspace.id, role: "admin", active: true }
  });

  if (existingCount > 0) {
    return { created: false, reason: "administrator-exists" as const };
  }

  const user = await prisma.localUser.create({
    data: {
      workspaceId: workspace.id,
      name: "GridMind Administrator",
      email: env.GRIDMIND_BOOTSTRAP_ADMIN_EMAIL.toLowerCase(),
      passwordHash: hashPassword(env.GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD),
      role: "admin",
      active: true
    }
  });

  log("warn", "Bootstrap administrator created", {
    userId: user.id,
    email: user.email
  });

  return { created: true, userId: user.id };
}
