"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useCmsEditMode } from "@/hooks/useCmsEditMode";

const CivisCmsEditProvider = dynamic(
  () =>
    import("@/components/cms/CivisCmsEditContext").then((m) => ({
      default: m.CivisCmsEditProvider,
    })),
  { ssr: false, loading: () => null },
);

/** En público no carga el editor CMS (~bundle pesado). */
export function CivisCmsEditGate({ children }: { children: ReactNode }) {
  const mode = useCmsEditMode();
  if (mode !== "1") return <>{children}</>;
  return <CivisCmsEditProvider>{children}</CivisCmsEditProvider>;
}
