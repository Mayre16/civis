import dynamic from "next/dynamic";
import { CivisHeroCms } from "@/components/CivisHeroCms";
import { CivisHomePrincipios } from "@/components/CivisHomePrincipios";
import { CivisOfertaResumen } from "@/components/CivisOfertaResumen";
import { CivisPageShell } from "@/components/cms/CivisPageShell";
import { CIVIS_HERO_IMAGES } from "@/lib/hero-images";

/** Bajo el fold: no entran en el JS inicial (menos trabajo del hilo principal). */
const CivisProximasAgendaHome = dynamic(
  () =>
    import("@/components/CivisProximasAgendaHome").then((m) => ({
      default: m.CivisProximasAgendaHome,
    })),
  { loading: () => null },
);
const CivisClientesHomeSection = dynamic(
  () =>
    import("@/components/CivisClientesHomeSection").then((m) => ({
      default: m.CivisClientesHomeSection,
    })),
  { loading: () => null },
);
const CivisEntrenadoresHome = dynamic(
  () =>
    import("@/components/CivisEntrenadoresHome").then((m) => ({
      default: m.CivisEntrenadoresHome,
    })),
  { loading: () => null },
);
const CivisActividadesRecientesFotos = dynamic(
  () =>
    import("@/components/CivisActividadesRecientesFotos").then((m) => ({
      default: m.CivisActividadesRecientesFotos,
    })),
  { loading: () => null },
);
const CivisSalonesHomeSection = dynamic(
  () =>
    import("@/components/CivisSalonesHomeSection").then((m) => ({
      default: m.CivisSalonesHomeSection,
    })),
  { loading: () => null },
);

export default function HomePage() {
  const lcpSrc = CIVIS_HERO_IMAGES[0]?.src;

  return (
    <CivisPageShell pageId="home">
      {lcpSrc ? (
        <link rel="preload" as="image" href={lcpSrc} fetchPriority="high" />
      ) : null}
      <CivisHeroCms
        title="Civis Consulting"
        lede="Talleres y formación para empresas, equipos y líderes: comunicación, convivencia y habilidades para el entorno laboral."
        ctaHref="/talleres"
        ctaLabel="Ver talleres"
      />

      <CivisHomePrincipios />
      <CivisOfertaResumen />
      <CivisProximasAgendaHome />
      <CivisClientesHomeSection />
      <CivisEntrenadoresHome />
      <CivisActividadesRecientesFotos />
      <CivisSalonesHomeSection />
    </CivisPageShell>
  );
}
