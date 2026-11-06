import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { GUIAS_GARMIN } from "@/lib/garmin";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

// Hub de las guías de Garmin (/garmin redirige acá). Las tarjetas salen de lib/garmin.ts.

export const metadata: Metadata = {
  title: "Garmin",
  description:
    "Guías gratuitas para sacarle jugo a tu Garmin: zonas de frecuencia cardíaca y tus maratones explicadas por tus datos.",
  alternates: { canonical: `${SITE.url}/recursos/garmin` },
};

export default function GarminHubPage() {
  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Garmin</h1>
          <p className="mt-4 text-base text-neutral-400 tracking-[-0.01em]">
            Uso Garmin desde hace más de 15 años y corrí 19 maratones con (y sin) él. Estas son las
            guías que armé para sacarle jugo a tus datos. Gratis, en PDF, te llegan al mail.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {GUIAS_GARMIN.map((guia) => (
          <StaggerItem key={guia.slug}>
            <Link
              href={`/recursos/garmin/${guia.slug}`}
              className="group block rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-serif text-xl text-white">{guia.titulo}</h2>
                  <p className="mt-2 text-sm text-neutral-500 tracking-[-0.01em]">{guia.resumen}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 group-hover:decoration-accent transition-colors">
                    Quiero la guía &rarr;
                  </span>
                </div>
                <span className="shrink-0 rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
                  {guia.tag}
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn>
        <p className="text-sm text-neutral-500">
          Hablo de correr, Garmin y otras cosas más en{" "}
          <a
            href={SITE.social.instagram}
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            @pablomarichal_
          </a>
          .
        </p>
      </FadeIn>
    </div>
  );
}
