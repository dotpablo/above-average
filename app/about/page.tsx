import type { Metadata } from "next";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { FadeIn } from "@/components/motion/fade-in";

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
        <FadeIn delay={0.1}>
          <div className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
            <Image
              src="/images/pablo-about.png"
              alt="Pablo Marichal"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <h1 className="font-serif text-3xl text-white">Pablo Marichal</h1>
            <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
              Nací en Uruguay en 1980. A los 10 años me mudé a Venezuela, donde crecí, estudié Ingeniería en Informática y Gerencia de Proyectos. En 2018 dejé Venezuela y volví a Uruguay a empezar de cero.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* El Ticket de Entrada */}
      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">El Ticket de Entrada</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            En 2014, estaba en Venezuela entrenando para triatlón y trabajando como Full Stack Developer. No me fue muy bien en mis aventuras en ese mundo. Tenía una bicicleta de competencia en la que había invertido tiempo y esfuerzo. Al mismo tiempo estaba buscando salir de una zona de confort y mediocridad donde me encontraba, y vi que SAP era la puerta a mi siguiente nivel profesional. Evalué el costo de la certificación y tomé la decisión: vendí la bici.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            No fue un sacrificio dramático. Fue una apuesta calculada — y definitivamente el triatlón no era lo mío, al menos en ese momento. Eso es lo que entiendo por sistema: identificar el recurso correcto, moverlo al lugar correcto, en el momento correcto. Esa decisión abrió la puerta que me trajo hasta acá.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Hoy trabajo como <strong className="text-neutral-200">Senior SAP Tech Lead</strong> en una gran corporación multinacional. Reconocido Outstanding 3 años consecutivos por el impacto y calidad de mi trabajo. AI Champion de una familia de más de 8 equipos. El tipo que da charlas en inglés ante directivos alemanes sobre lo que se viene.
          </p>
        </section>
      </FadeIn>

      {/* Clean Core Biológico */}
      <section className="flex flex-col items-center gap-10 sm:flex-row-reverse sm:items-start sm:gap-12">
        <FadeIn delay={0.1} direction="left">
          <div className="relative h-72 w-48 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
            <Image
              src="/images/pablo-running.png"
              alt="Pablo corriendo un maraton"
              fill
              className="object-cover object-center"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white">Clean Core Biológico</h2>
            <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
              Empecé a correr en 2010 porque había ganado peso y quería un cambio real. Me lo tomé en serio: ese año corrí una media maratón, una maratón completa, y en septiembre mi primer Major: Berlín.
            </p>
            <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
              Hoy van 19 maratones — Berlín (2), Chicago (2), New York, Tokyo, Buenos Aires (5), Caracas (5), Punta del Este, Montevideo (2) — en camino a las 6 World Majors y trabajando para bajar de las 3 horas.
            </p>
            <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
              Aplico la misma lógica <strong className="text-neutral-200">Clean Core</strong> de SAP a mi biología: núcleo estándar (sueño, nutrición, movimiento), sin personalizaciones tóxicas. Para liderar equipos en situaciones críticas necesitás un sistema operativo físico que aguante. Sin eso, sos un sistema zombie esperando caerse.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* El Humano Full Stack */}
      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white">El Humano Full Stack</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            El filósofo Éric Sadin habla de la <em>vegetalización de la humanidad</em>: delegar tanta agencia cognitiva a los algoritmos que terminamos siendo nodos pasivos del sistema, no agentes. Lo veo todos los días en el mundo corporativo: gente que copia prompts sin entender lo que ejecuta, managers que creen que Copilot reemplaza el criterio, juniors que no saben debuggear porque nunca aprendieron el error de raíz.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            <strong className="text-neutral-200">Above Average</strong> es mi respuesta a eso. No un newsletter de motivación, sino un framework de supervivencia para el profesional tech que no quiere quedar obsoleto. Un sistema con tres capas: el Kernel biológico (cuerpo en forma), las extensiones técnicas (IA, SAP, arquitectura) y la soberanía cognitiva (juicio propio que ninguna IA puede reemplazar).
          </p>
        </section>
      </FadeIn>

      {/* Para Max y Mía */}
      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">Para Max y Mía</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Escribo esto también para mis hijos de 4 y 2 años. Para que un día, cuando sean adultos y el mundo vuelva a cambiar de formas que no imagino, encuentren acá un registro de cómo su viejo navegó la incertidumbre sin paralizarse.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            No porque fuera especial. Porque tenía sistemas y eligió no ser un mediocre.
          </p>
        </section>
      </FadeIn>

      {/* Newsletter CTA */}
      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
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
      </FadeIn>
    </div>
  );
}
