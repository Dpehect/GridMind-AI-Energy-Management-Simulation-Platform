"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GridMind global error", {
      message: error.message,
      digest: error.digest
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: 24,
            fontFamily: "system-ui, sans-serif",
            background: "#f8fafc",
            color: "#172033"
          }}
        >
          <div style={{ maxWidth: 520, textAlign: "center" }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#2563eb"
              }}
            >
              GridMind recovery
            </p>
            <h1 style={{ marginTop: 16, fontSize: 32 }}>
              The application encountered an unexpected error.
            </h1>
            <p style={{ marginTop: 12, lineHeight: 1.7, color: "#64748b" }}>
              Your data has not been modified. Retry the request or review the
              runtime health endpoint if the problem continues.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 24,
                border: 0,
                borderRadius: 12,
                padding: "12px 18px",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Retry application
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
