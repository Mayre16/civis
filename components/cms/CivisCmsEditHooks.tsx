"use client";

import { createContext, useContext } from "react";
import type {
  CmsCivisCliente,
  CmsCivisEntrenador,
  CmsCivisHomePage,
  CmsCivisHomePrincipios,
  CmsCivisProximaActividad,
  CmsCivisQuienesCivis,
  CmsCivisQuienesNa,
  CmsCivisQuienesPage,
  CmsCivisTaller,
  CmsCivisTallerRealizado,
  CmsCivisTalleresPage,
  CmsDocument,
} from "@/lib/cms/types";
import type { CmsHeroCarouselItem } from "@/lib/cms/hero-carousel-edit";

type HomeHero = NonNullable<CmsDocument["sections"]["homeHero"]>;

export type CivisCmsEditContextValue = {
  ready: boolean;
  homeHero: HomeHero;
  heroCarousel: CmsHeroCarouselItem[];
  homePage: CmsCivisHomePage;
  talleresPage: CmsCivisTalleresPage;
  quienesPage: CmsCivisQuienesPage;
  oferta: CmsCivisTaller[];
  entrenadores: CmsCivisEntrenador[];
  clientes: CmsCivisCliente[];
  talleresRealizados: CmsCivisTallerRealizado[];
  proximas: CmsCivisProximaActividad[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  patchHomeHero: (patch: HomeHero) => void;
  patchHeroSlide: (id: string, patch: Partial<CmsHeroCarouselItem>) => void;
  addHeroSlide: () => void;
  removeHeroSlide: (id: string) => void;
  patchHomePage: (patch: Partial<CmsCivisHomePage>) => void;
  patchHomePrincipios: (patch: Partial<CmsCivisHomePrincipios>) => void;
  patchTalleresPage: (patch: Partial<CmsCivisTalleresPage>) => void;
  patchQuienesPage: (patch: Partial<CmsCivisQuienesPage>) => void;
  patchQuienesCivis: (patch: Partial<CmsCivisQuienesCivis>) => void;
  patchQuienesNa: (patch: Partial<CmsCivisQuienesNa>) => void;
  patchOferta: (id: string, patch: Partial<CmsCivisTaller>) => void;
  patchEntrenador: (id: string, patch: Partial<CmsCivisEntrenador>) => void;
  patchCliente: (id: string, patch: Partial<CmsCivisCliente>) => void;
  patchTallerRealizado: (
    id: string,
    patch: Partial<CmsCivisTallerRealizado>,
  ) => void;
  patchProxima: (id: string, patch: Partial<CmsCivisProximaActividad>) => void;
  addTallerRealizado: () => void;
  addProxima: () => void;
  addCliente: () => void;
  addEntrenador: () => void;
  addOferta: () => void;
  removeTallerRealizado: (id: string) => void;
  removeProxima: (id: string) => void;
  removeCliente: (id: string) => void;
  removeEntrenador: (id: string) => void;
  removeOferta: (id: string) => void;
  saveDraft: () => Promise<void>;
  publish: () => Promise<void>;
  dirty: boolean;
  busy: boolean;
  token: string | null;
};

export const CivisCmsEditContext =
  createContext<CivisCmsEditContextValue | null>(null);

/** Hook ligero: en público siempre null (sin cargar el editor). */
export function useCivisCmsEdit() {
  return useContext(CivisCmsEditContext);
}
