import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Charlas y podcasts",
  description:
    "Charlas, conferencias y podcasts de Pablo Marichal sobre IA en entornos corporativos, adopción real vs. anuncio y rendimiento profesional después de los 40.",
  alternates: { canonical: `${SITE.url}/charlas` },
};

interface Appearance {
  /** Nombre del evento, conferencia o programa. */
  venue: string;
  /** Titulo de la charla o del episodio. */
  title: string;
  /** Ano o fecha, para ordenar y mostrar. */
  date?: string;
  description: string;
  links: { label: string; href: string }[];
}

/**
 * TODO Pablo: agregar acá las conferencias y charlas ya dadas.
 * La seccion no se renderiza mientras el array este vacio.
 */
const talks: Appearance[] = [];

const podcasts: Appearance[] = [
  {
    venue: "Hablamos de SAP",
    title: "Ep. 076 — SAP y la Inteligencia Artificial",
    description:
      "Conversación sobre el concepto Full Stack Human, la migración RISE de SAP, los límites reales de Joule frente a los modelos frontier, y por qué el maratón y la disciplina física son parte de la estrategia profesional.",
    links: [
      {
        label: "Escuchar episodio",
        href: "https://hablamosdesap.com/episodios/076-sap-y-la-inteligencia-artificial",
      },
      {
        label: "Ver en YouTube",
        href: "https://www.youtube.com/watch?v=L6peRmF8ulo",
      },
    ],
  },
];

const topics = [
  "IA en entornos corporativos",
  "Adopción real vs. anuncio",
  "Rendimiento profesional después de los 40",
];

function AppearanceCard({ item }: { item: Appearance }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700">
      <p className="mb-1 flex flex-wrap items-baseline gap-x-2 text-xs font-medium uppercase tracking-widest text-neutral-600">
        <span>{item.venue}</span>
        {item.date && <span className="text-neutral-700">· {item.date}</span>}
      </p>
      <h3 className="font-serif text-lg text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500 tracking-[-0.01em]">
        {item.description}
      </p>
      {item.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
            >
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CharlasPage() {
  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="font-serif text-3xl text-white">Charlas y podcasts</h1>
          <p className="mt-3 text-base text-neutral-400 tracking-[-0.01em]">
            Conferencias donde hablé y conversaciones donde me invitaron. Todo sale
            del trabajo real adentro de corporaciones, no de leer noticias.
          </p>
        </div>
      </FadeIn>

      {talks.length > 0 && (
        <section className="space-y-4">
          <FadeIn>
            <h2 className="font-serif text-2xl text-white">Conferencias y charlas</h2>
          </FadeIn>
          <StaggerChildren className="space-y-4" staggerDelay={0.1}>
            {talks.map((item) => (
              <StaggerItem key={item.title}>
                <AppearanceCard item={item} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      <section className="space-y-4">
        <FadeIn>
          <h2 className="font-serif text-2xl text-white">Podcasts</h2>
        </FadeIn>
        <StaggerChildren className="space-y-4" staggerDelay={0.1}>
          {podcasts.map((item) => (
            <StaggerItem key={item.title}>
              <AppearanceCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* Para invitarme a hablar */}
      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <h2 className="font-serif text-2xl text-white">Para invitarme a hablar</h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Doy charlas en español y en inglés, presenciales o remotas, para equipos
            técnicos, comités ejecutivos y eventos de industria. Los temas:
          </p>
          <ul className="mt-4 space-y-2">
            {topics.map((topic) => (
              <li
                key={topic}
                className="flex gap-2.5 text-base text-neutral-400 tracking-[-0.01em]"
              >
                <span className="text-accent" aria-hidden="true">
                  &mdash;
                </span>
                {topic}
              </li>
            ))}
          </ul>
          <a
            href={`${SITE.social.email}?subject=Invitaci%C3%B3n%20a%20hablar`}
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-2.5 text-base font-medium text-neutral-900 transition-opacity hover:opacity-90"
          >
            pablomarichal@gmail.com
          </a>
        </section>
      </FadeIn>
    </div>
  );
}
