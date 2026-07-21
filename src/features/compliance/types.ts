export type ComplianceCheck = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

export type ComplianceReport = {
  generatedAt: string;
  version: string;
  status: "ready" | "attention" | "blocked";
  checks: ComplianceCheck[];
};
