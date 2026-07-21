import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { requireUser } from "@/features/auth/session";
import { listUserSessions } from "@/features/auth/session-manager";
import { SessionList } from "@/features/auth/session-list";

export default async function SecuritySettingsPage() {
  const user = await requireUser();
  const sessions = await listUserSessions(user.id);

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Security"
        title="Account & Sessions"
        description="Review active sessions and enterprise identity controls."
      />
      <SectionCard
        title="Session history"
        description="Expired and revoked sessions remain visible for auditability."
      >
        <SessionList sessions={sessions} />
      </SectionCard>
    </main>
  );
}
