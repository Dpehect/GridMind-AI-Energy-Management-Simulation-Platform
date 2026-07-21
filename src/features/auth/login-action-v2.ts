"use server";

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "./password";
import { createSessionToken, hashSessionToken } from "./token";
import { SESSION_COOKIE } from "./session";
import { getLoginLockState, recordLoginAttempt } from "./rate-limit";
import { enforceSessionLimits } from "./session-manager";
import { writeSecurityEvent } from "./security-events";
import { securityPolicy } from "./security-policy";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(128)
});

export type LoginStateV2 = {
  success: boolean;
  message: string;
  retryAfterSeconds?: number;
};

export async function loginActionV2(
  _previousState: LoginStateV2,
  formData: FormData
): Promise<LoginStateV2> {
  const requestHeaders = await headers();
  const ipAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    undefined;
  const userAgent = requestHeaders.get("user-agent") ?? undefined;

  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email and password."
    };
  }

  const email = parsed.data.email.toLowerCase();
  const lock = await getLoginLockState({ email, ipAddress });

  if (lock.locked) {
    await writeSecurityEvent({
      type: "auth.locked",
      severity: "warning",
      ipAddress,
      userAgent,
      metadata: { email }
    });

    return {
      success: false,
      message: "Too many failed attempts. Try again later.",
      retryAfterSeconds: lock.retryAfterSeconds
    };
  }

  const user = await prisma.localUser.findFirst({
    where: {
      email,
      active: true
    }
  });

  const valid =
    Boolean(user) &&
    verifyPassword(parsed.data.password, user!.passwordHash);

  await recordLoginAttempt({
    email,
    successful: valid,
    ipAddress,
    userAgent
  });

  if (!valid || !user) {
    return {
      success: false,
      message: "Email or password is incorrect."
    };
  }

  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(
    Date.now() + securityPolicy.session.absoluteHours * 60 * 60 * 1000
  );

  await prisma.localSession.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  });

  await enforceSessionLimits(user.id);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/"
  });

  await writeSecurityEvent({
    workspaceId: user.workspaceId,
    userId: user.id,
    type: "auth.login",
    severity: "info",
    ipAddress,
    userAgent
  });

  redirect("/dashboard");
}
