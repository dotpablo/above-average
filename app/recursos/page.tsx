import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Recursos gratuitos de Above Average: templates, checklists y guias para ser above average.",
};

const resources = [
  {
    title: "Proximamente",
    description:
      "Estoy preparando recursos exclusivos para suscriptores. Templates, checklists y guias practicas basadas en los sistemas que uso.",
    tag: "En desarrollo",
  },
];

export default function RecursosPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-3xl text-white">Recursos</h1>
        <p className="mt-3 text-base text-neutral-400">
          Herramientas y guias gratuitas para suscriptores. Cosas que
          realmente uso — no teoria, sistemas.
        </p>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg text-white">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  {resource.description}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs text-neutral-500">
                {resource.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-1 text-sm font-medium text-white">
          Suscribite para acceder cuando esten listos:
        </p>
        <p className="mb-4 text-xs text-neutral-500">
          Los suscriptores reciben acceso anticipado a todos los recursos.
        </p>
        <div className="max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
