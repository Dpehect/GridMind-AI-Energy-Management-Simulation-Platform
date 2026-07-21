import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "./token";
import { SESSION_COOKIE } from "./session";
import { securityPolicy } from "./security-policy";

export async function enforceSessionLimits(userId: string) {
  const active = await prisma.localSession.findMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: new Date() }
    },
    orderBy: { createdAt: "desc" }
  });

  const excess = active.slice(securityPolicy.session.maxActiveSessions);

  if (excess.length) {
    await prisma.localSession.updateMany({
      where: { id: { in: excess.map((item) => item.id) } },
      data: { revokedAt: new Date() }
    });
  }
}

export async function revokeCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return;

  await prisma.localSession.updateMany({
    where: {
      tokenHash: hashSessionToken(token),
      revokedAt: null
    },
    data: { revokedAt: new Date() }
  });

  cookieStore.delete(SESSION_COOKIE);
}

export async function revokeAllUserSessions(userId: string) {
  return prisma.localSession.updateMany({
    where: {
      userId,
      revokedAt: null
    },
    data: {
      revokedAt: new Date()
    }
  });
}

export async function listUserSessions(userId: string) {
  return prisma.localSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}
