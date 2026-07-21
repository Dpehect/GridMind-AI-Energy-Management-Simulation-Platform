import type { ReleaseHealth } from "@/lib/release-health";

export async function getReleaseHealth(): Promise<ReleaseHealth> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_URL ??
    "http://127.0.0.1:3000";

  try {
    const response = await fetch(
      baseUrl.startsWith("http") ? `${baseUrl}/api/release-health` : `https://${baseUrl}/api/release-health`,
      { cache: "no-store" }
    );

    if (!response.ok) throw new Error("Release health unavailable");
    return response.json();
  } catch {
    return {
      version: "unknown",
      checkedAt: new Date().toISOString(),
      status: "attention",
      checks: []
    };
  }
}
