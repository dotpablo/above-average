import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Trabajar juntos",
  description:
    "Consultoría SAP, adopción de IA en equipos técnicos y advisory para líderes tech que operan en la intersección entre Legacy y Futuro.",
  alternates: { canonical: `${SITE.url}/trabajar-juntos` },
};

const services = [
  {
    tag: "Sesión única",
    title: "Advisory 1:1 — Tech Lead Session",
    price: "USD 120",
    duration: "60 minutos",
    desc: "Una sesión enfocada en tu situación real: cómo posicionarte ante la IA en tu organización, qué hacer con tu stack SAP, cómo tomar la siguiente decisión técnica sin equivocarte. Sin agenda genérica. Sin PowerPoints. Solo criterio.",
    cta: "Agendá tu sesión",
    ctaHref: "mailto:pablomarichal@gmail.com?subject=Advisory%201:1%20%E2%80%94%20Tech%20Lead%20Session",
    tags: ["Tech Leads", "Arquitectos SAP", "AI Survival", "Posicionamiento"],
    highlight: true,
  },
  {
    tag: "Proyecto",
    title: "SAP Advisory",
    price: "A convenir",
    duration: "Por proyecto",
    desc: "Migraciones S/4HANA, arquitectura técnica, clean core strategy y gestión de proyectos SAP. Para empresas que necesitan criterio técnico real, no horas de consultoría genérica.",
    cta: "Escribime",
    ctaHref: "mailto:pablomarichal@gmail.com?subject=SAP%20Advisory",
    tags: ["S/4HANA", "SAP BTP", "Clean Core", "Migraciones"],
    highlight: false,
  },
  {
    tag: "Equipos",
    title: "AI Adoption para equipos tech",
    price: "A convenir",
    duration: "Por proyecto",
    desc: "Evaluación de madurez de IA, definición de casos de uso reales (no demos), implementación de agentes y herramientas. Para líderes que quieren resultados, no presentaciones sobre el futuro.",
    cta: "Escribime",
    ctaHref: "mailto:pablomarichal@gmail.com?subject=AI%20Adoption",
    tags: ["AI Agents", "Copilot / Joule", "Automatización", "Roadmap IA"],
    highlight: false,
  },
];

export default function WorkTogetherPage() {
  return (
    <div className="space-y-16 max-w-2xl">
      {/* Header */}
      <header className="space-y-4">
        <FadeIn duration={0.5}>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Trabajar juntos
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl text-white leading-tight">
            Expertise técnico sin<br />ruido de fondo.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-neutral-400 leading-relaxed tracking-[-0.01em]">
            20+ años en tecnología. 12+ en el ecosistema SAP enterprise.
            19 maratones como laboratorio de sistemas que aguantan presión real.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-base text-neutral-500 leading-relaxed tracking-[-0.01em]">
            Trabajo con empresas y líderes tech que necesitan criterio en la
            intersección entre SAP legacy y la adopción real de IA — no teoría,
            no hype, solo lo que funciona en producción.
          </p>
        </FadeIn>
      </header>

      {/* Services */}
      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {services.map((s) => (
          <StaggerItem key={s.title}>
            <div className={`rounded-xl border p-6 space-y-4 backdrop-blur-sm transition-colors ${s.highlight ? "border-neutral-600 bg-neutral-800/60 hover:border-neutral-500" : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">{s.tag}</p>
                  <h2 className="font-serif text-xl text-white">{s.title}</h2>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-serif text-xl ${s.highlight ? "text-white" : "text-neutral-400"}`}>{s.price}</p>
                  <p className="text-xs text-neutral-600">{s.duration}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed tracking-[-0.01em]">{s.desc}</p>
              <div className="flex items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-700 px-3 py-0.5 text-xs text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={s.ctaHref}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 ${s.highlight ? "bg-accent text-neutral-900" : "border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"}`}
                >
                  {s.cta} →
                </Link>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Social proof / context */}
      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 space-y-3 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">Por qué funciona</p>
          <p className="text-base text-neutral-400 leading-relaxed tracking-[-0.01em]">
            No soy consultor que salió de una academia. Fui el que migró los sistemas,
            el que convirtió a su equipo al nuevo paradigma, el que fue seleccionado AI Champion
            en una corporación de +8 equipos. Y al mismo tiempo corrí 19 maratones mientras lo hacía.
          </p>
          <p className="text-sm text-neutral-500">
            Respondo personalmente. Sin intermediarios.
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
