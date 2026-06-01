"use client";

import { LibraryProvider } from "@/lib/library-context";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <LibraryProvider>{children}</LibraryProvider>;
}
