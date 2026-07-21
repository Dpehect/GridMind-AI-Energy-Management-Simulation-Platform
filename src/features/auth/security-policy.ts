export const securityPolicy = {
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSymbol: true,
    maxLength: 128
  },
  login: {
    maxFailures: 5,
    failureWindowMinutes: 15,
    lockMinutes: 20
  },
  session: {
    absoluteHours: 8,
    idleMinutes: 30,
    maxActiveSessions: 5
  }
} as const;

export function validatePasswordPolicy(password: string) {
  const failures: string[] = [];
  const policy = securityPolicy.password;

  if (password.length < policy.minLength) failures.push(`At least ${policy.minLength} characters`);
  if (password.length > policy.maxLength) failures.push(`No more than ${policy.maxLength} characters`);
  if (policy.requireUppercase && !/[A-Z]/.test(password)) failures.push("At least one uppercase letter");
  if (policy.requireLowercase && !/[a-z]/.test(password)) failures.push("At least one lowercase letter");
  if (policy.requireNumber && !/\d/.test(password)) failures.push("At least one number");
  if (policy.requireSymbol && !/[^A-Za-z0-9]/.test(password)) failures.push("At least one symbol");

  return {
    valid: failures.length === 0,
    failures
  };
}
