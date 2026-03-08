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
            Nací en Uruguay, me forjé en Venezuela y hoy construyo desde la nube. Soy <strong>Senior SAP Tech Lead</strong>, 19x Marathoner, y por encima de todo, padre de Max y Mía.
          </p>
          <p className="text-base leading-relaxed text-neutral-400">
            Opero en la línea de fuego entre la pesada infraestructura corporativa y la velocidad esquizofrénica de la Inteligencia Artificial. Por más de una década, me he dedicado a liderar migraciones complejas y asegurar que los "ERP Zombies" no hagan colapsar operaciones globales. Mi propuesta de valor es simple: uso IA de frontera para acelerar, pero aplico años de cicatrices en producción para garantizar que el sistema no explote.
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
          <h2 className="font-serif text-2xl text-white">Biological Clean Core</h2>
          <p className="text-base leading-relaxed text-neutral-400">
            He cruzado la meta de 19 maratones alrededor del mundo (incluyendo Berlín, Chicago y Nueva York, en camino a las 6 Majors). Para mí, el asfalto no es un pasatiempo; es la aplicación estricta del concepto <strong>Clean Core (Núcleo Limpio)</strong> de SAP a mi propio sistema biológico.
          </p>
          <p className="text-base leading-relaxed text-neutral-400">
            Para liderar equipos en situaciones críticas, necesitás una fisiología que soporte la presión. Entender los límites de la máquina humana a través del dolor infalsificable es el primer paso para construir software resiliente.
          </p>
        </div>
      </section>

      {/* Above Average */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-white">
          El "Full Stack Human"
        </h2>
        <p className="text-base leading-relaxed text-neutral-400">
          En la era de la IA, el código es un commodity. La sintaxis es gratis. Lo que vale oro es el <strong>Criterio, la Arquitectura y el Juicio Clínico</strong> para saber qué líneas de código te van a destruir el negocio en seis meses.
        </p>
        <p className="text-base leading-relaxed text-neutral-400">
          Inicié <strong>Above Average</strong> como un acto de rebelión contra la mediocridad automatizada y la "vegetalización" de la fuerza laboral. Este espacio es mi laboratorio para auditar agentes de IA en el mundo real y, sobre todo, es un manual de vida digital escrito para que el día de mañana, mis hijos sepan cómo se ve la disciplina.
        </p>
      </section>

      {/* Newsletter CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-4 text-sm font-medium text-neutral-300">
          Si esta filosofía te resuena, sumate a la trinchera:
        </p>
        <div className="max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
