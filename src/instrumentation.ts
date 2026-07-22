export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const [
    { ensureStartupReady },
    { bootstrapAdministrator },
    { registerGracefulShutdown }
  ] = await Promise.all([
    import("@/lib/runtime/startup"),
    import("@/lib/runtime/bootstrap-admin"),
    import("@/lib/deployment/shutdown")
  ]);

  registerGracefulShutdown();
  await ensureStartupReady();
  await bootstrapAdministrator();
}
