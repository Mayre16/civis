import { COTIZACION_EMAIL, WHATSAPP_NUMBER } from "@/lib/site-config";
import { PRINCIPAL_SEDES } from "@/lib/civis-sedes.generated";

export type CivisSede = {
  id: string;
  name: string;
  zone: string;
  city: string;
  address: string;
  reference?: string;
  mapsQuery: string;
  hours: string;
  note: string;
  sala?: string;
};

export type CivisDondeContact = {
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappCtaLabel: string;
  whatsappMessage: string;
};

/** Horario orientativo de atención / formación en sede. */
export const CIVIS_SEDE_HOURS = "Lunes a Jueves · 6:45 p.m. – 8:45 p.m.";

const SEDE_OVERRIDES: Record<
  string,
  { sala?: string; note?: string; hours?: string }
> = {
  "sede-los-prados": {
    sala: "Civis Consulting · salones Sócrates y Platón",
    note: "Aquí recibimos a empresas y equipos: formación Civis y alquiler de salones para talleres, cursos y reuniones.",
  },
  "sede-naco": {
    sala: "Espacio Nueva Acrópolis",
    note: "Sede institucional. Consulta disponibilidad de espacios y actividades.",
  },
  "sede-santiago": {
    note: "Punto de Nueva Acrópolis en Santiago. Consulta disponibilidad.",
  },
};

const DEFAULT_NOTE =
  "Sede de Nueva Acrópolis. Civis Consulting ofrece formación y alquiler de salones en Los Prados.";

/** Sedes del sitio principal (build-time sync). Los Prados primero (sede Civis). */
export const CIVIS_SEDES: CivisSede[] = [...PRINCIPAL_SEDES]
  .sort((a, b) => {
    if (a.id === "sede-los-prados") return -1;
    if (b.id === "sede-los-prados") return 1;
    return 0;
  })
  .map((s) => {
    const o = SEDE_OVERRIDES[s.id] ?? {};
    return {
      id: s.id,
      name: s.name,
      zone: s.zone,
      city: s.city,
      address: s.address,
      reference: s.reference,
      mapsQuery: s.mapsQuery,
      hours: o.hours ?? CIVIS_SEDE_HOURS,
      sala: o.sala,
      note: o.note ?? DEFAULT_NOTE,
    };
  });

export const CIVIS_DONDE_CONTACT: CivisDondeContact = {
  phone: "(849) 517-4144",
  email: COTIZACION_EMAIL,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappCtaLabel: "Escribir por WhatsApp",
  whatsappMessage:
    "Hola, me interesa visitar Civis Consulting / Nueva Acrópolis en {sede}.",
};

function isGoogleMapsUrl(input: string): boolean {
  const s = input.trim();
  if (!/^https?:\/\//i.test(s)) return false;
  return (
    /(?:^|\.)google\.[^/]+\/maps/i.test(s) ||
    /maps\.google\./i.test(s) ||
    /maps\.app\.goo\.gl/i.test(s) ||
    /goo\.gl\/maps/i.test(s)
  );
}

function parseLatLon(input: string): { lat: number; lon: number } | null {
  const s = input.trim();
  let m = s.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: Number(m[1]), lon: Number(m[2]) };
  m = s.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: Number(m[1]), lon: Number(m[2]) };
  m = s.match(/[?&](?:q|query|ll|center)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (m) return { lat: Number(m[1]), lon: Number(m[2]) };
  return null;
}

export function civisMapsUrl(query: string): string {
  const t = query.trim();
  if (!t) return "https://www.google.com/maps";
  if (isGoogleMapsUrl(t) || /^https?:\/\//i.test(t)) return t;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t)}`;
}

export function civisMapsEmbedUrl(query: string): string {
  const t = query.trim();
  const gps = parseLatLon(t);
  if (gps) {
    return `https://maps.google.com/maps?q=${gps.lat},${gps.lon}&hl=es&z=16&output=embed`;
  }
  const place = t.match(/\/maps\/place\/([^/@]+)/);
  if (place) {
    const name = decodeURIComponent(place[1].replace(/\+/g, " "));
    return `https://maps.google.com/maps?q=${encodeURIComponent(name)}&hl=es&z=16&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(t)}&hl=es&z=16&output=embed`;
}

export function civisTelHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function civisSedeWhatsAppUrl(
  sedeName: string,
  contact: CivisDondeContact = CIVIS_DONDE_CONTACT,
): string {
  const digits = contact.whatsappNumber.replace(/\D/g, "");
  const text = contact.whatsappMessage.replace(/\{sede\}/g, sedeName);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Une nombre de sede del catálogo de salones con id de venues. */
export function sedeNameToVenueId(sede: string): string | null {
  const key = sede.trim().toLowerCase();
  if (key.includes("prados")) return "sede-los-prados";
  if (key.includes("naco")) return "sede-naco";
  if (key.includes("santiago")) return "sede-santiago";
  return null;
}
