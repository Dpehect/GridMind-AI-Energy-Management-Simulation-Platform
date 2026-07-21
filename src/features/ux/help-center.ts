import type { HelpArticle } from "./types";

export const helpArticles: HelpArticle[] = [
  {
    id: "workspace-setup",
    title: "Configure a workspace",
    summary: "Set locale, currency, timezone and feature availability.",
    category: "Getting started",
    href: "/docs/workspace-setup"
  },
  {
    id: "data-import",
    title: "Import energy readings",
    summary: "Validate, deduplicate and persist meter data safely.",
    category: "Data",
    href: "/docs/data-import"
  },
  {
    id: "work-orders",
    title: "Manage maintenance work orders",
    summary: "Assign, track, consume parts and close maintenance tasks.",
    category: "Operations",
    href: "/docs/work-orders"
  },
  {
    id: "backup",
    title: "Backup and recovery",
    summary: "Create, verify and restore GridMind database backups.",
    category: "Administration",
    href: "/docs/backup-recovery"
  }
];
