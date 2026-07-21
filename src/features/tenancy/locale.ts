import { getActiveWorkspace } from "./workspace-service";

export async function getWorkspaceLocale() {
  const workspace = await getActiveWorkspace();

  return {
    locale: workspace.locale?.locale ?? "tr-TR",
    timezone:
      workspace.locale?.timezone ??
      workspace.timezone ??
      "Europe/Istanbul",
    currency:
      workspace.locale?.currency ??
      workspace.currency ??
      "TRY",
    unitSystem:
      workspace.locale?.unitSystem ??
      "metric"
  };
}
