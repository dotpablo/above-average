import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Recursos gratuitos de Above Average: prompts de IA, sistemas y frameworks para el profesional tech que no quiere quedar deprecated.",
};

const resources = [
  {
    title: "Above Average OS v1.0",
    description:
      "La arquitectura del Full Stack Human. Tres módulos de prompts de IA para rendimiento, entrenamiento y productividad — diseñados para el profesional tech con agenda explotada.",
    tag: "Gratuito",
    href: "/recursos/above-average-os",
  },
  {
    title: "Obsidian + Claude: Tu segundo cerebro",
    description:
      "Cómo convertir Obsidian en un sistema que piensa con vos. Estructura, plugins, workflows y prompts exactos para cerrar el loop entre lo que consumís y lo que producís.",
    tag: "Gratuito",
    href: "/recursos/obsidian-claude",
  },
  {
    title: "Prompts de entrenamiento con IA",
    description:
      "Los prompts exactos que usé para preparar el Maratón de Buenos Aires 2025 (3h14') con IA como entrenador. Adaptables a cualquier distancia.",
    tag: "Próximamente",
    href: null,
  },
];

export default function RecursosPage() {
  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="font-serif text-3xl text-white">Recursos</h1>
          <p className="mt-3 text-base text-neutral-400 tracking-[-0.01em]">
            Herramientas y sistemas que uso. No teoría — frameworks con instrucciones para ejecutar hoy.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {resources.map((resource) => (
          <StaggerItem key={resource.title}>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-white">{resource.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500 tracking-[-0.01em]">{resource.description}</p>
                  {resource.href && (
                    <Link
                      href={resource.href}
                      className="mt-4 inline-block text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                    >
                      Ver recurso &rarr;
                    </Link>
                  )}
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${
                  resource.tag === "Gratuito"
                    ? "border-accent/40 text-accent"
                    : "border-neutral-800 text-neutral-600"
                }`}>
                  {resource.tag}
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <p className="mb-1 text-sm font-medium text-white">
            Los suscriptores reciben los recursos primero:
          </p>
          <p className="mb-4 text-xs text-neutral-500">
            Cada recurso nuevo sale primero en el newsletter, antes de publicarse acá.
          </p>
          <div className="max-w-md">
            <NewsletterForm />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
