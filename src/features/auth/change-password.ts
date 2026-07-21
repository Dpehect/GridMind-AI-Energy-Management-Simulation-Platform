"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "./session";
import { hashPassword, verifyPassword } from "./password";
import { validatePasswordPolicy } from "./security-policy";
import { revokeAllUserSessions } from "./session-manager";
import { writeSecurityEvent } from "./security-events";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1)
}).refine((value) => value.newPassword === value.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match"
});

export async function changePasswordAction(formData: FormData) {
  const user = await requireUser();

  const parsed = schema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid password input"
    };
  }

  const policy = validatePasswordPolicy(parsed.data.newPassword);
  if (!policy.valid) {
    return {
      success: false,
      message: policy.failures.join(", ")
    };
  }

  const databaseUser = await prisma.localUser.findUnique({
    where: { id: user.id }
  });

  if (
    !databaseUser ||
    !verifyPassword(parsed.data.currentPassword, databaseUser.passwordHash)
  ) {
    return {
      success: false,
      message: "Current password is incorrect"
    };
  }

  await prisma.$transaction([
    prisma.localUser.update({
      where: { id: user.id },
      data: {
        passwordHash: hashPassword(parsed.data.newPassword)
      }
    }),
    prisma.localSession.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() }
    })
  ]);

  await writeSecurityEvent({
    workspaceId: user.workspaceId,
    userId: user.id,
    type: "password.changed",
    severity: "info"
  });

  return {
    success: true,
    message: "Password changed. Sign in again."
  };
}
