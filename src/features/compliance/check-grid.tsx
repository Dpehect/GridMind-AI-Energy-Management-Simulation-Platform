import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { ComplianceCheck } from "./types";
import { SectionCard } from "@/components/ui/section-card";

const icons = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle
};

export function ComplianceCheckGrid({ checks }: { checks: ComplianceCheck[] }) {
  return (
    <SectionCard
      title="Compliance checks"
      description="Automated verification of security, testing and reliability controls."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {checks.map((check) => {
          const Icon = icons[check.status];

          return (
            <article
              key={check.id}
              className="flex items-start gap-3 rounded-2xl border border-border p-4"
            >
              <Icon
                className={
                  check.status === "pass"
                    ? "mt-0.5 size-5 text-emerald-600"
                    : check.status === "warn"
                      ? "mt-0.5 size-5 text-amber-600"
                      : "mt-0.5 size-5 text-destructive"
                }
              />
              <div>
                <p className="text-sm font-medium">{check.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {check.detail}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
