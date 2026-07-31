import type { Metadata } from "next";
import { SalonesPageShell } from "@/components/cms/SalonesPageShell";
import { CivisDondeEstamosSection } from "@/components/CivisDondeEstamosSection";
import { SalonesAlquiler } from "@/components/SalonesAlquiler";

export const metadata: Metadata = {
  title: "Dónde estamos",
  description:
    "Ubicación de Civis Consulting en la Sede Naco y alquiler de salones con aforo para talleres, cursos y reuniones.",
};

export default function SalonesPage() {
  return (
    <SalonesPageShell>
      <CivisDondeEstamosSection />
      <SalonesAlquiler variant="civis" id="salones" gallery />
    </SalonesPageShell>
  );
}
