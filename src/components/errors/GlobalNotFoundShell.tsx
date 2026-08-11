"use client";

import { useSyncExternalStore } from "react";
import { MoodBackdrop } from "@/components/cinematic/algarve/MoodBackdrop";
import { BackToTop } from "@/components/layout/BackToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { NotFoundContent } from "@/components/errors/NotFoundContent";

const subscribeToHydration = () => () => undefined;

export function GlobalNotFoundShell() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  return (
    <>
      <MoodBackdrop />
      {hydrated && <SiteHeader />}
      <main className="flex-1 overflow-x-clip">
        <NotFoundContent />
      </main>
      {hydrated && <SiteFooter />}
      {hydrated && <BackToTop />}
    </>
  );
}
