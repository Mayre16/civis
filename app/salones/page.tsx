import type { Metadata } from "next";
import { SalonesPageShell } from "@/components/cms/SalonesPageShell";
import { CivisDondeEstamosSection } from "@/components/CivisDondeEstamosSection";
import { SalonesAlquiler } from "@/components/SalonesAlquiler";

export const metadata: Metadata = {
  title: "Dónde estamos y salones",
  description:
    "Ubicación de Civis Consulting en las sedes de Nueva Acrópolis y alquiler de salones con aforo para talleres, cursos y reuniones.",
};

export default function SalonesPage() {
  return (
    <SalonesPageShell>
      <header className="border-b border-na-civis/10 bg-white px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-na-civisDark">
            Civis Consulting
          </p>
          <h1 className="mt-3 text-balance text-3xl font-black text-na-ink sm:text-4xl lg:text-5xl">
            Dónde estamos y salones
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-na-muted sm:text-base">
            Encuentra nuestra ubicación en el mapa y conoce los salones
            disponibles para alquiler — con aforo por disposición — para tus
            talleres, cursos o reuniones de equipo.
          </p>
        </div>
      </header>
      <CivisDondeEstamosSection />
      <SalonesAlquiler variant="civis" id="salones" gallery />
    </SalonesPageShell>
  );
}
