import { GeistSans } from "geist/font/sans";
import ConditionalLayout from "../components/ConditionalLayout";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <SpeedInsights/>
        <Analytics/>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
