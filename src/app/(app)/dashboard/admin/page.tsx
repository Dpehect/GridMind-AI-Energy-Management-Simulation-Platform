import { PageHeader } from "@/components/ui/page-header";
import { UserManagement } from "@/features/platform/user-management";
import { AuditLog } from "@/features/platform/audit-log";
import { FeatureFlags } from "@/features/platform/feature-flags";
import { SystemHealth } from "@/features/platform/system-health";

export default function AdminPage() {
  return <main className="space-y-6 p-5 md:p-8">
    <PageHeader eyebrow="Phase 19" title="Enterprise Platform Core" description="Operate local identities, permissions, auditability, feature flags and platform health from one control plane."/>
    <SystemHealth/>
    <UserManagement/>
    <FeatureFlags/>
    <AuditLog/>
  </main>;
}
