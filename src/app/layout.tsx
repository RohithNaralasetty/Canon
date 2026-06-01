import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteNav } from "@/components/layout/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookRank",
  description:
    "Build your personal book ranking through head-to-head comparisons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <SiteNav />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
