import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

/**
 * Pagina deliberadamente fuera de vista: no esta en el nav, ni en el footer,
 * ni en el sitemap, y se sirve con noindex. Existe para pasarle el link a
 * alguien puntual, no como vidriera. Ver el comentario de robots abajo.
 */
export const metadata: Metadata = {
  title: "Conversemos",
  description:
    "Charlas, paneles, podcasts y colaboraciones de escritura con Pablo Marichal.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/trabajar-juntos` },
};

const formatos = [
  {
    tag: "Escenario",
    title: "Charlas y paneles",
    desc: "En español o en inglés, presencial o remoto, para equipos técnicos, comités ejecutivos y eventos de industria. Los temas: qué está pasando de verdad con la IA adentro de las empresas grandes, adopción real contra adopción anunciada, y rendimiento profesional después de los 40.",
    asunto: "Charla%20o%20panel",
  },
  {
    tag: "Micrófono",
    title: "Podcasts y entrevistas",
    desc: "Conversaciones largas, sin guion de marketing. Si tenés un programa donde se puede pensar en voz alta y contradecirse a mitad de camino, escribime.",
    asunto: "Podcast%20o%20entrevista",
  },
  {
    tag: "Texto",
    title: "Colaboraciones de escritura",
    desc: "Columnas, ensayos y piezas de análisis para medios o publicaciones que quieran algo escrito por alguien que está adentro del problema y no leyendo sobre él.",
    asunto: "Colaboraci%C3%B3n%20de%20escritura",
  },
];

export default function ConversemosPage() {
  return (
    <div className="space-y-14 max-w-2xl">
      <header className="space-y-4">
        <FadeIn duration={0.5}>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Contacto
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl text-white leading-tight">
            Conversemos.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-neutral-400 leading-relaxed tracking-[-0.01em]">
            Escribo todas las semanas sobre lo que la IA le está haciendo al trabajo
            adentro de las corporaciones. A veces eso da pie a hablarlo en otro lado:
            un escenario, un micrófono, una página.
          </p>
        </FadeIn>
      </header>

      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {formatos.map((f) => (
          <StaggerItem key={f.title}>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-3 backdrop-blur-sm transition-colors hover:border-neutral-700">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
                {f.tag}
              </p>
              <h2 className="font-serif text-xl text-white">{f.title}</h2>
              <p className="text-sm text-neutral-400 leading-relaxed tracking-[-0.01em]">
                {f.desc}
              </p>
              {/* <a> nativo: un mailto: no es una ruta de la app. */}
              <a
                href={`${SITE.social.email}?subject=${f.asunto}`}
                className="inline-block pt-1 text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                Escribime &rarr;
              </a>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 space-y-3 backdrop-blur-sm">
          <p className="text-base text-neutral-400 leading-relaxed tracking-[-0.01em]">
            Respondo personalmente. Sin intermediarios. Si el link no te abre el mail,
            escribime a{" "}
            <a
              href={SITE.social.email}
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
            >
              pablomarichal@gmail.com
            </a>
            .
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
