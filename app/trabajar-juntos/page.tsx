import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Trabajar juntos",
  description:
    "Consultoría SAP, adopción de IA en equipos técnicos y advisory para líderes tech que operan en la intersección entre Legacy y Futuro.",
  alternates: { canonical: `${SITE.url}/trabajar-juntos` },
};

const services = [
  {
    title: "SAP Advisory",
    desc: "Migraciones S/4HANA, arquitectura técnica, clean core strategy y gestión de proyectos SAP. Para empresas que necesitan criterio técnico real, no solo horas de consultoría genérica.",
    tags: ["S/4HANA", "SAP BTP", "Clean Core", "Migraciones"],
  },
  {
    title: "AI Adoption para equipos tech",
    desc: "Evaluación de madurez de IA, definición de casos de uso reales (no demos), implementación de agentes y herramientas. Para líderes que quieren resultados, no presentaciones sobre el futuro.",
    tags: ["AI Agents", "Copilot / Joule", "Automatización", "Roadmap IA"],
  },
  {
    title: "Advisory para Tech Leads",
    desc: "Para líderes técnicos que quieren operar con más claridad en la era IA — tomar mejores decisiones de arquitectura, posicionar a sus equipos y no perder el criterio que los trajo hasta acá.",
    tags: ["1:1", "Estrategia técnica", "Posicionamiento"],
  },
];

export default function WorkTogetherPage() {
  return (
    <div className="space-y-16 max-w-2xl">
      {/* Header */}
      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
          Trabajar juntos
        </p>
        <h1 className="font-serif text-4xl text-white leading-tight">
          Expertise técnico sin<br />ruido de fondo.
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          20+ años en tecnología. 12+ en el ecosistema SAP enterprise.
          19 maratones como laboratorio de sistemas que aguantan presión real.
        </p>
        <p className="text-base text-neutral-500 leading-relaxed">
          Trabajo con empresas y líderes tech que necesitan criterio en la
          intersección entre SAP legacy y la adopción real de IA — no teoría,
          no hype, solo lo que funciona en producción.
        </p>
      </header>

      {/* Services */}
      <section className="space-y-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-3"
          >
            <h2 className="font-serif text-xl text-white">{s.title}</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-700 px-3 py-0.5 text-xs text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-8 space-y-4">
        <h2 className="font-serif text-2xl text-white">¿Tiene sentido hablar?</h2>
        <p className="text-base text-neutral-400 leading-relaxed">
          Si estás evaluando una migración SAP, querés definir una estrategia de IA
          para tu equipo, o simplemente querés una segunda opinión técnica sin
          agenda comercial — escribime.
        </p>
        <p className="text-sm text-neutral-500">
          Respondo personalmente. Sin formularios que van a ningún lado.
        </p>
        <div className="flex gap-3">
          <Link
            href={SITE.social.email}
            className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-90"
          >
            Escribime →
          </Link>
          <Link
            href={SITE.social.linkedin}
            className="inline-block rounded-lg border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            LinkedIn
          </Link>
        </div>
      </section>
    </div>
  );
}
