import type { Metadata } from "next";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "About",
  description:
    "La historia de Pablo Marichal: Uruguay, Venezuela, SAP, 19 maratones y el concepto de Humano Full Stack.",
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
            Nací en Uruguay en 1980. A los 10 años me mudé a Venezuela, donde crecí, estudié Ingeniería en Informática y empecé a trabajar. En 2018, con una crisis encima y casi sin equipaje, volví a Uruguay a empezar de cero.
          </p>
          <p className="text-base leading-relaxed text-neutral-400">
            Hoy soy <strong className="text-neutral-200">Senior SAP Tech Lead</strong> en BASF, reconocido Outstanding dos años consecutivos, AI Champion de una familia de más de 8 equipos, y el tipo que da charlas en inglés ante directivos alemanes sobre lo que se viene. Todo eso construido ladrillo por ladrillo, sin herencia, sin contactos, sin red de seguridad.
          </p>
        </div>
      </section>

      {/* The bike story */}
      <section className="space-y-4 border-l-2 border-neutral-800 pl-6">
        <h2 className="font-serif text-2xl text-white">La bicicleta</h2>
        <p className="text-base leading-relaxed text-neutral-400">
          En Venezuela estaba entrenando para triatlón. Tenía una bicicleta de competencia en la que había invertido tiempo y esfuerzo. Vi que SAP era la puerta al siguiente nivel profesional, evalué el costo de la certificación, y tomé la decisión: vendí la bici para pagarla.
        </p>
        <p className="text-base leading-relaxed text-neutral-400">
          No fue un sacrificio dramático — fue una apuesta calculada. Eso es lo que entiendo por sistema: identificar el recurso correcto, moverlo al lugar correcto, en el momento correcto. Esa decisión abrió la puerta que me trajo hasta acá. El triatlón esperó. La ventana no.
        </p>
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
          <h2 className="font-serif text-2xl text-white">Clean Core Biológico</h2>
          <p className="text-base leading-relaxed text-neutral-400">
            Empecé a correr en 2011 porque había ganado peso y me estaba yendo por un mal camino. Ese año corrí una media, una maratón completa, y en septiembre mi primer Major: Berlín. Hoy van 19 maratones — Berlín, Chicago, New York, Tokyo, Buenos Aires — en camino a las 6 World Majors y con el sueño de bajar las 3 horas.
          </p>
          <p className="text-base leading-relaxed text-neutral-400">
            Aplico la misma lógica <strong className="text-neutral-200">Clean Core</strong> de SAP a mi biología: núcleo estándar (sueño, comida, movimiento), sin personalizaciones tóxicas. Para liderar equipos en situaciones críticas necesitás un sistema físico que aguante. Sin eso, sos un ERP zombie esperando caerse.
          </p>
        </div>
      </section>

      {/* Full Stack Human */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-white">El Humano Full Stack</h2>
        <p className="text-base leading-relaxed text-neutral-400">
          El filósofo Éric Sadin habla de la <em>vegetalización de la humanidad</em>: delegar tanta agencia cognitiva a los algoritmos que terminamos siendo nodos pasivos del sistema, no agentes. Lo veo todos los días en el mundo corporativo: gente que copia prompts sin entender lo que ejecuta, managers que creen que Copilot reemplaza el criterio, juniors que no saben debuggear porque nunca aprendieron el error de raíz.
        </p>
        <p className="text-base leading-relaxed text-neutral-400">
          <strong className="text-neutral-200">Above Average</strong> es mi respuesta a eso. No un newsletter de motivación, sino un framework de supervivencia para el profesional tech que no quiere quedar obsoleto. Un sistema con tres capas: el Kernel biológico (cuerpo en forma), las extensiones técnicas (SAP, IA, arquitectura) y la soberanía cognitiva (juicio que la IA no puede reemplazar).
        </p>
        <p className="text-base leading-relaxed text-neutral-400">
          Escribo esto también para Max y Mía, mis hijos de 4 y 2 años. Para que un día, cuando tengan 25 o 30 y el mundo vuelva a cambiar de forma que no imagino, encuentren acá un registro de cómo su viejo navegó la incertidumbre sin paralizarse. No porque fuera especial. Porque tenía sistemas.
        </p>
      </section>

      {/* Newsletter CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-1 text-sm font-medium text-neutral-300">
          Si esto te resuena, sumate:
        </p>
        <p className="mb-4 text-xs text-neutral-600">
          Un newsletter técnico y directo. Sin humo, sin coaches, sin frases vacías.
        </p>
        <div className="max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
