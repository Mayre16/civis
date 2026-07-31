"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  CIVIS_DONDE_CONTACT,
  CIVIS_SEDES,
  type CivisSede,
  civisMapsEmbedUrl,
  civisMapsUrl,
  civisSedeWhatsAppUrl,
  civisTelHref,
} from "@/lib/civis-locations";

function LazyMapEmbed({ sede }: { sede: CivisSede }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    setReady(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sede.id]);

  return (
    <div
      ref={hostRef}
      className="overflow-hidden rounded-2xl border border-na-civis/15 bg-na-civis/[0.04] shadow-na-soft"
    >
      {ready ? (
        <iframe
          title={`Mapa — ${sede.name}`}
          src={civisMapsEmbedUrl(
            sede.mapsEmbedQuery ?? sede.mapsQuery,
            sede.mapsEmbedQuery ??
              [
                "Calle Cub Scouts No. 6",
                sede.zone,
                sede.city,
                "República Dominicana",
              ]
                .filter(Boolean)
                .join(", "),
          )}
          className="aspect-[4/3] min-h-[280px] w-full border-0 lg:min-h-[360px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          className="flex aspect-[4/3] min-h-[280px] w-full items-center justify-center bg-na-civis/[0.06] lg:min-h-[360px]"
          aria-hidden
        />
      )}
    </div>
  );
}

function SedePanel({ sede }: { sede: CivisSede }) {
  const contact = CIVIS_DONDE_CONTACT;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
      <div className="rounded-2xl border border-na-civis/15 bg-white p-5 shadow-na-soft sm:p-6">
        <span className="inline-flex rounded-full bg-na-civis/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-na-civisDark">
          Sede
        </span>
        <h3 className="mt-3 text-xl font-black text-na-ink">{sede.name}</h3>
        <p className="mt-1 text-sm font-semibold text-na-muted">
          {sede.zone} · {sede.city}
        </p>
        {sede.sala ? (
          <p className="mt-3 text-sm font-semibold text-na-civisDark">{sede.sala}</p>
        ) : null}

        <ul className="mt-5 space-y-3 text-sm text-na-muted">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-na-civis" aria-hidden />
            <span>
              <span className="font-semibold text-na-ink">{sede.address}</span>
              {sede.reference ? (
                <span className="mt-0.5 block">{sede.reference}</span>
              ) : null}
            </span>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-na-civis" aria-hidden />
            <span>{sede.hours}</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 shrink-0 text-na-civis" aria-hidden />
            <a
              href={civisTelHref(contact.phone)}
              className="min-h-11 font-semibold text-na-ink hover:text-na-civis"
            >
              {contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 shrink-0 text-na-civis" aria-hidden />
            <a
              href={`mailto:${contact.email}`}
              className="min-h-11 font-semibold text-na-ink hover:text-na-civis"
            >
              {contact.email}
            </a>
          </li>
        </ul>

        <p className="mt-5 text-sm leading-relaxed text-na-muted">{sede.note}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={civisMapsUrl(sede.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-na-civis/25 px-4 py-2 text-xs font-bold text-na-civisDark transition hover:bg-na-civis/10"
          >
            Abrir en Google Maps
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
          <a
            href={civisSedeWhatsAppUrl(sede.name, contact)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-na-civis px-4 py-2 text-xs font-bold text-white transition hover:bg-na-civisDark"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            {contact.whatsappCtaLabel}
          </a>
        </div>
      </div>

      <LazyMapEmbed sede={sede} />
    </div>
  );
}

/** Ubicación de Civis en Naco (mapa + datos), estilo Editorial. */
export function CivisDondeEstamosSection() {
  const sede = CIVIS_SEDES[0];
  if (!sede) return null;

  return (
    <section
      id="donde-estamos"
      className="scroll-mt-28 border-b border-na-civis/10 bg-gradient-to-br from-na-civis/[0.05] via-white to-white py-14 sm:py-16"
      aria-labelledby="civis-donde-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-na-civisDark">
          Dónde estamos
        </p>
        <h1
          id="civis-donde-title"
          className="mt-3 text-balance text-3xl font-black text-na-ink sm:text-4xl lg:text-5xl"
        >
          Visítanos
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-na-muted sm:text-base">
          Civis Consulting está en la Sede Naco de Nueva Acrópolis: formación
          para empresas y alquiler de salones.
        </p>

        <div className="mt-8">
          <SedePanel sede={sede} />
        </div>
      </div>
    </section>
  );
}
