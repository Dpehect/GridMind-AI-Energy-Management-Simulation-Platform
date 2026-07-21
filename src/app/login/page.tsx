import { redirect } from "next/navigation";
import { Activity, ShieldCheck, Zap } from "lucide-react";
import { getCurrentUser } from "@/features/auth/session";
import { LoginForm } from "@/features/auth/login-form";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_.95fr]">
      <section className="hidden overflow-hidden border-r border-border bg-slate-950 p-12 text-slate-100 lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-cyan-300">
            GRIDMIND
          </p>
          <h1 className="mt-8 max-w-xl text-5xl font-semibold leading-tight">
            Secure local energy intelligence.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Authentication, role enforcement and auditability without an external identity provider.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Local sessions", ShieldCheck],
            ["Energy operations", Zap],
            ["Audit visibility", Activity]
          ].map(([label, Icon]: any) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Icon className="size-5 text-cyan-300" />
              <p className="mt-3 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid place-items-center p-6 md:p-10">
        <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-7 shadow-xl md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Local identity
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Welcome back</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Use a seeded local account to access GridMind.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
