import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "./token";
import type { AppPermission, AppRole, AuthenticatedUser } from "./types";
import { hasPermission } from "./permissions";

export const SESSION_COOKIE = "gridmind-session";

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE)?.value;
  if (!rawToken) return null;

  const tokenHash = hashSessionToken(rawToken);
  const session = await prisma.localSession.findUnique({
    where: { tokenHash },
    include: { user: true }
  });

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt <= new Date() ||
    !session.user.active
  ) {
    return null;
  }

  return {
    id: session.user.id,
    workspaceId: session.user.workspaceId,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role as AppRole,
    active: session.user.active
  };
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requirePermission(permission: AppPermission) {
  const user = await requireUser();
  if (!hasPermission(user.role, permission)) {
    redirect("/forbidden");
  }
  return user;
}
