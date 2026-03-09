import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

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
      <div>
        <h1 className="font-serif text-3xl text-white">Recursos</h1>
        <p className="mt-3 text-base text-neutral-400">
          Herramientas y sistemas que uso. No teoría — frameworks con instrucciones para ejecutar hoy.
        </p>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-serif text-lg text-white">{resource.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{resource.description}</p>
                {resource.href && (
                  <Link
                    href={resource.href}
                    className="mt-4 inline-block text-sm font-medium text-white underline underline-offset-4 decoration-neutral-700 hover:decoration-white transition-colors"
                  >
                    Ver recurso &rarr;
                  </Link>
                )}
              </div>
              <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${
                resource.tag === "Gratuito"
                  ? "border-neutral-600 text-neutral-400"
                  : "border-neutral-800 text-neutral-600"
              }`}>
                {resource.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
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
    </div>
  );
}
