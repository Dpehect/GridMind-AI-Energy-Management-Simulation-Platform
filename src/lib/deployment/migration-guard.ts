import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/errors/app-error";

export async function verifySchemaCompatibility() {
  try {
    await prisma.workspace.count();
    await prisma.localUser.count();
    await prisma.backgroundJob.count();
    await prisma.runtimeLog.count();

    return {
      compatible: true,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    throw new AppError({
      message: "Database schema is not compatible with this GridMind release.",
      code: "CONFIGURATION_ERROR",
      status: 503,
      expose: true,
      cause: error
    });
  }
}
