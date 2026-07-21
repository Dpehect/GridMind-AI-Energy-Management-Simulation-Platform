import { MonitorSmartphone, ShieldOff } from "lucide-react";
import type { LocalSession } from "@prisma/client";

export function SessionList({
  sessions
}: {
  sessions: LocalSession[];
}) {
  return (
    <div className="space-y-3">
      {sessions.map((session) => {
        const active =
          !session.revokedAt &&
          session.expiresAt > new Date();

        return (
          <article
            key={session.id}
            className="flex items-center justify-between rounded-2xl border border-border p-4"
          >
            <div className="flex items-center gap-3">
              <MonitorSmartphone className="size-5 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  Session created {session.createdAt.toLocaleString("tr-TR")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Expires {session.expiresAt.toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
            <span
              className={
                active
                  ? "rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800"
                  : "rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              }
            >
              {active ? "Active" : "Revoked"}
            </span>
          </article>
        );
      })}
    </div>
  );
}
