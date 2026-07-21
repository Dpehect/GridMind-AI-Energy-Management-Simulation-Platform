import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${APP_NAME} — Energy Intelligence`, template: `%s · ${APP_NAME}` },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  metadataBase: new URL("http://localhost:3000"),
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7fbf9" }, { media: "(prefers-color-scheme: dark)", color: "#142024" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${mono.variable} min-h-screen antialiased`}><AppProviders>{children}</AppProviders></body></html>;
}
