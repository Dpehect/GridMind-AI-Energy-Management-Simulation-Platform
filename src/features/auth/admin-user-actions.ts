"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "./session";
import { validatePasswordPolicy } from "./security-policy";
import { hashPassword } from "./password";
import { revokeAllUserSessions } from "./session-manager";
import { writeSecurityEvent } from "./security-events";

const createUserSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  role: z.enum([
    "admin",
    "energy_manager",
    "facility_manager",
    "analyst",
    "viewer"
  ]),
  password: z.string().min(1)
});

export async function createLocalUserAction(formData: FormData) {
  const actor = await requirePermission("users.manage");

  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid user data" };
  }

  const policy = validatePasswordPolicy(parsed.data.password);
  if (!policy.valid) {
    return { success: false, message: policy.failures.join(", ") };
  }

  const created = await prisma.localUser.create({
    data: {
      workspaceId: actor.workspaceId,
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role,
      passwordHash: hashPassword(parsed.data.password),
      active: true
    }
  });

  await writeSecurityEvent({
    workspaceId: actor.workspaceId,
    userId: actor.id,
    type: "user.created",
    severity: "info",
    metadata: {
      createdUserId: created.id,
      createdRole: created.role
    }
  });

  return { success: true, userId: created.id };
}

export async function disableLocalUserAction(userId: string) {
  const actor = await requirePermission("users.manage");

  if (userId === actor.id) {
    return {
      success: false,
      message: "You cannot disable your own account."
    };
  }

  await prisma.$transaction([
    prisma.localUser.update({
      where: {
        id: userId,
        workspaceId: actor.workspaceId
      },
      data: {
        active: false
      }
    }),
    prisma.localSession.updateMany({
      where: {
        userId,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    })
  ]);

  await writeSecurityEvent({
    workspaceId: actor.workspaceId,
    userId: actor.id,
    type: "user.disabled",
    severity: "warning",
    metadata: { disabledUserId: userId }
  });

  return { success: true };
}
