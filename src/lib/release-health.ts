export type ReleaseCheck = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

export type ReleaseHealth = {
  version: string;
  checkedAt: string;
  status: "ready" | "attention" | "blocked";
  checks: ReleaseCheck[];
};

export function summarizeReleaseHealth(checks: ReleaseCheck[]): ReleaseHealth["status"] {
  if (checks.some((check) => check.status === "fail")) return "blocked";
  if (checks.some((check) => check.status === "warn")) return "attention";
  return "ready";
}
