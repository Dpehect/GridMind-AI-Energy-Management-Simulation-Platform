"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/features/auth/session";

const WORKSPACE_COOKIE = "gridmind-workspace";

export async function switchWorkspaceAction(
  workspaceId: string
) {
  const user = await requireUser();

  const membership =
    await prisma.workspaceMembership.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: user.id
        }
      }
    });

  if (!membership?.active) {
    throw new Error("Workspace access denied");
  }

  const cookieStore = await cookies();

  cookieStore.set(WORKSPACE_COOKIE, workspaceId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  redirect("/dashboard");
}
