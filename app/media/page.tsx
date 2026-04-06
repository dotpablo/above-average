import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Apariciones de Pablo Marichal en podcasts y medios — conversaciones sobre SAP, IA y el profesional tech en 2026.",
};

const appearances = [
  {
    show: "Hablamos de SAP",
    episode: "Ep. 076 — SAP y la Inteligencia Artificial",
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

export default function MediaPage() {
  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="font-serif text-3xl text-white">Media</h1>
          <p className="mt-3 text-base text-neutral-400 tracking-[-0.01em]">
            Podcasts y conversaciones donde aparezco como invitado.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {appearances.map((item) => (
          <StaggerItem key={item.episode}>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-1">
                {item.show}
              </p>
              <h3 className="font-serif text-lg text-white">{item.episode}</h3>
              <p className="mt-2 text-sm text-neutral-500 tracking-[-0.01em] leading-relaxed">
                {item.description}
              </p>
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
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
