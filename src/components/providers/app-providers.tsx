"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </ThemeProvider>
  );
}
