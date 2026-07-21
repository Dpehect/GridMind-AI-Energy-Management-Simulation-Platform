export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureStartupReady } = await import("@/lib/runtime/startup");
    const { bootstrapAdministrator } = await import(
      "@/lib/runtime/bootstrap-admin"
    );

    await ensureStartupReady();
    await bootstrapAdministrator();
  }
}
