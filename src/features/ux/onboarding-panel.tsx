import Link from "next/link";
import { CheckCircle2, Circle, ArrowUpRight } from "lucide-react";
import type { OnboardingStep } from "./types";
import { SectionCard } from "@/components/ui/section-card";

export function OnboardingPanel({ steps }: { steps: OnboardingStep[] }) {
  const completed = steps.filter((step) => step.completed).length;
  const progress = Math.round((completed / Math.max(1, steps.length)) * 100);

  return (
    <SectionCard
      title="Workspace onboarding"
      description={`${completed}/${steps.length} steps completed`}
    >
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <article
            key={step.id}
            className="flex items-start gap-3 rounded-2xl border border-border p-4"
          >
            {step.completed ? (
              <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
            ) : (
              <Circle className="mt-0.5 size-5 text-muted-foreground" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {step.description}
              </p>
            </div>
            {step.href ? (
              <Link href={step.href} className="rounded-xl p-2 hover:bg-accent">
                <ArrowUpRight className="size-4" />
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
