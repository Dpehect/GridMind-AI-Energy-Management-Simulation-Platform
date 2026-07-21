"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit";
import { verifyPassword } from "./password";
import { createSessionToken, hashSessionToken } from "./token";
import { SESSION_COOKIE } from "./session";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128)
});

export type LoginState = {
  success: boolean;
  message: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { success: false, message: "Enter a valid email and password." };
  }

  const user = await prisma.localUser.findFirst({
    where: {
      email: parsed.data.email.toLowerCase(),
      active: true
    }
  });

  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return { success: false, message: "Email or password is incorrect." };
  }

  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.localSession.deleteMany({
      where: {
        userId: user.id,
        OR: [{ expiresAt: { lte: new Date() } }, { revokedAt: { not: null } }]
      }
    }),
    prisma.localSession.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt
      }
    }),
    prisma.localUser.update({
      where: { id: user.id },
      data: { lastSeenAt: new Date() }
    })
  ]);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/"
  });

  await writeAuditEvent({
    actor: user.email,
    action: "auth.login",
    entityType: "LocalUser",
    entityId: user.id
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.localSession.updateMany({
      where: { tokenHash: hashSessionToken(token), revokedAt: null },
      data: { revokedAt: new Date() }
    });
  }

  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}
