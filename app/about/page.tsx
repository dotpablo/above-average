import type { Metadata } from "next";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "About",
  description:
    "La historia de Pablo Marichal: Uruguay, Venezuela, SAP, 19 maratones y Above Average.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Intro with photo */}
      <section className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-12">
        <div className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
          <Image
            src="/images/pablo-about.png"
            alt="Pablo Marichal"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="font-serif text-3xl text-white">Pablo Marichal</h1>
          <p className="text-base leading-relaxed text-neutral-400">
            Naci en Uruguay, vivi muchos anos en Venezuela. Esas experiencias
            formaron una perspectiva unica sobre lo que significa crecer — como
            persona y como profesional.
          </p>
          <p className="text-base leading-relaxed text-neutral-400">
            Pase anos en el mundo de SAP, liderando equipos y proyectos
            tecnologicos. Pero lo que realmente me define no es un titulo — es
            la disciplina de buscar siempre algo mas.
          </p>
        </div>
      </section>

      {/* Marathon section */}
      <section className="flex flex-col items-center gap-10 sm:flex-row-reverse sm:items-start sm:gap-12">
        <div className="relative h-72 w-48 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
          <Image
            src="/images/pablo-running.png"
            alt="Pablo corriendo un maraton"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-white">19 maratones</h2>
          <p className="text-base leading-relaxed text-neutral-400">
            Cada maraton me enseno algo diferente sobre resistencia, dolor, y
            el poder de no parar cuando tu cuerpo te dice que pares. Correr no
            es un hobby — es un sistema operativo.
          </p>
          <p className="text-base leading-relaxed text-neutral-400">
            No se trata de ser el mas rapido. Se trata de presentarte todos los
            dias, incluso cuando no tenes ganas. De entender que el promedio no
            es un lugar — es una decision.
          </p>
        </div>
      </section>

      {/* Above Average */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-white">
          Por que Above Average
        </h2>
        <p className="text-base leading-relaxed text-neutral-400">
          Above Average no es sobre ser excepcional. Es sobre la decision
          diaria de no conformarte con lo promedio. Es sobre hacer el trabajo
          que otros no quieren hacer, pensar lo que otros no se animan a
          pensar, y vivir con intencion.
        </p>
        <p className="text-base leading-relaxed text-neutral-400">
          Este espacio es donde comparto lo que aprendo en ese camino.
        </p>
      </section>

      {/* Newsletter CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-4 text-sm font-medium text-neutral-300">
          Si esto resuena, suscribite al newsletter:
        </p>
        <div className="max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
