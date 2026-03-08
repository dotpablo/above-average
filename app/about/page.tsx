import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "About",
  description: "La historia de Pablo Marichal: Uruguay, Venezuela, SAP, 19 maratones y Above Average.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <h1 className="font-serif text-3xl font-bold tracking-tight">About</h1>

      <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-tight">
        {/* Placeholder para foto */}
        <div className="mb-8 h-64 w-full rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
          Tu foto va aca
        </div>

        <p>
          Soy Pablo Marichal. Naci en Uruguay, vivi muchos anos en Venezuela, y
          esas experiencias formaron una perspectiva unica sobre lo que significa
          crecer — como persona y como profesional.
        </p>

        <p>
          Pase anos en el mundo de SAP, liderando equipos y proyectos. Pero lo
          que realmente me define no es un titulo o una empresa — es la
          disciplina de buscar siempre algo mas.
        </p>

        <p>
          He corrido 19 maratones. Cada una me enseno algo diferente sobre
          resistencia, dolor, y el poder de no parar cuando tu cuerpo te dice
          que pares.
        </p>

        <h2>Por que Above Average</h2>

        <p>
          Above Average no es sobre ser excepcional. Es sobre la decision
          diaria de no conformarte con lo promedio. Es sobre hacer el trabajo
          que otros no quieren hacer, pensar lo que otros no se animan a
          pensar, y vivir con intencion.
        </p>

        <p>
          Este espacio es donde comparto lo que aprendo en ese camino.
        </p>
      </div>

      <div className="max-w-md">
        <p className="mb-3 text-sm font-medium text-neutral-700">
          Si esto resuena, suscribite:
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
}
