import { AlertTriangle } from "lucide-react";

export function ConfigurationError({
  title = "GridMind configuration is incomplete",
  detail
}: {
  title?: string;
  detail: string;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <div className="max-w-xl rounded-[28px] border border-amber-300 bg-amber-50 p-8 text-amber-950 shadow-xl">
        <AlertTriangle className="size-8" />
        <h1 className="mt-5 text-2xl font-semibold">{title}</h1>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 opacity-80">
          {detail}
        </p>
        <p className="mt-5 text-xs opacity-70">
          Review `.env.example`, database availability and startup logs.
        </p>
      </div>
    </main>
  );
}
