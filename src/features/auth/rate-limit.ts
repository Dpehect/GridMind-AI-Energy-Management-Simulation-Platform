import { prisma } from "@/lib/prisma";
import { securityPolicy } from "./security-policy";

export async function getLoginLockState(input: {
  email: string;
  ipAddress?: string;
}) {
  const since = new Date(
    Date.now() - securityPolicy.login.failureWindowMinutes * 60_000
  );

  const failures = await prisma.loginAttempt.count({
    where: {
      email: input.email.toLowerCase(),
      successful: false,
      createdAt: { gte: since }
    }
  });

  const locked = failures >= securityPolicy.login.maxFailures;

  return {
    locked,
    failures,
    remainingAttempts: Math.max(
      0,
      securityPolicy.login.maxFailures - failures
    ),
    retryAfterSeconds: locked
      ? securityPolicy.login.lockMinutes * 60
      : 0
  };
}

export async function recordLoginAttempt(input: {
  email: string;
  successful: boolean;
  ipAddress?: string;
  userAgent?: string;
}) {
  return prisma.loginAttempt.create({
    data: {
      email: input.email.toLowerCase(),
      successful: input.successful,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent
    }
  });
}
