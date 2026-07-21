import type { AuditEvent, LocalUser, Notification } from "./types";

export const localUsers: LocalUser[] = [
  { id: "usr-1", name: "Yunus Emre Gürlek", email: "admin@gridmind.local", role: "admin", active: true, lastSeenAt: "2026-07-22T22:15:00+03:00" },
  { id: "usr-2", name: "Selin Acar", email: "selin@gridmind.local", role: "energy_manager", active: true, lastSeenAt: "2026-07-22T18:40:00+03:00" },
  { id: "usr-3", name: "Mert Kaya", email: "mert@gridmind.local", role: "facility_manager", active: true, lastSeenAt: "2026-07-22T17:10:00+03:00" },
  { id: "usr-4", name: "Ece Demir", email: "ece@gridmind.local", role: "analyst", active: true, lastSeenAt: "2026-07-21T16:35:00+03:00" },
  { id: "usr-5", name: "Viewer Account", email: "viewer@gridmind.local", role: "viewer", active: false, lastSeenAt: "2026-07-18T10:00:00+03:00" }
];

export const notifications: Notification[] = [
  { id: "n1", title: "Critical pump health", message: "PUMP-04 health score dropped below 45.", type: "critical", read: false, createdAt: "2026-07-22T20:04:00+03:00" },
  { id: "n2", title: "Report ready", message: "June Executive Energy Review is ready.", type: "success", read: false, createdAt: "2026-07-22T17:20:00+03:00" },
  { id: "n3", title: "Peak demand warning", message: "Projected demand may exceed 920 kW tomorrow.", type: "warning", read: true, createdAt: "2026-07-21T13:10:00+03:00" }
];

export const auditEvents: AuditEvent[] = [
  { id: "a1", actor: "Yunus Emre Gürlek", action: "report.exported", entityType: "Report", entityId: "rpt-2026-06", createdAt: "2026-07-22T20:12:00+03:00" },
  { id: "a2", actor: "Selin Acar", action: "recommendation.accepted", entityType: "Recommendation", entityId: "rec-hvac-01", createdAt: "2026-07-22T18:02:00+03:00" },
  { id: "a3", actor: "Mert Kaya", action: "work_order.updated", entityType: "MaintenanceRecord", entityId: "wo-1002", createdAt: "2026-07-22T15:34:00+03:00" }
];
