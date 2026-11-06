import type { Metadata } from "next";
import Link from "next/link";
import { KIT, SITE } from "@/lib/constants";
import { KitForm } from "@/components/kit-form";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

// Landing de la guía de maratones (/maratones redirige acá: es el link de la bio).
// El texto sale del propio PDF: si cambia la guía, revisar esta página.

export const metadata: Metadata = {
  title: "Tus maratones, explicadas por tus datos",
  description:
    "Guía gratuita en PDF: conectá tu Garmin con Claude y entendé por qué cada maratón te salió como te salió. Con los 3 prompts y mis 19 maratones como ejemplo.",
  alternates: { canonical: `${SITE.url}/recursos/garmin/maratones` },
};

const contenido = [
  {
    titulo: "Setup: conectá tu Garmin",
    detalle:
      "La opción Personal del programa de desarrolladores de Garmin: oficial, gratis y sin darle tu contraseña a nadie.",
  },
  {
    titulo: "Prompt 1: encontrá todas tus maratones",
    detalle:
      "Incluidas las que no grabaste con Garmin. Un dataset con cada km, la preparación y la noche anterior.",
  },
  {
    titulo: "Prompt 2: entendé qué pasó",
    detalle: "Mitades, el muro, la salida, el desacople, la preparación y el día de carrera.",
  },
  {
    titulo: "Mi caso: 19 maratones",
    detalle: "Los gráficos, lo que encontré y lo que no dicen los números.",
  },
  {
    titulo: "Las trampas",
    detalle:
      "Lo que nadie te cuenta: maratones que tu reloj no tiene, relojes que se cortan, el GPS que miente.",
  },
];

export default function MaratonesPage() {
  return (
    <div className="space-y-16">
      <FadeIn>
        <header className="space-y-5">
          <Link href="/recursos/garmin" className="text-sm text-neutral-500 hover:text-accent transition-colors">
            &larr; Garmin
          </Link>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Guía gratuita · PDF · Versión noviembre 2026
          </p>
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Tus maratones, explicadas por tus datos</h1>
          <p className="text-lg text-neutral-300 tracking-[-0.01em]">
            Durante 10 años no me faltó entrenar. Me sobró salida.
          </p>
          <p className="text-base text-neutral-400 tracking-[-0.01em]">
            Corrí 19 maratones desde 2011 y casi siempre me fundía en la segunda mitad. Conecté mi
            Garmin con Claude y le hice una sola pregunta a mis datos: por qué cada maratón me salió
            como me salió. Esta guía es el paso a paso para que lo hagas con las tuyas.
          </p>
          <div className="max-w-md pt-2">
            <KitForm formId={KIT.maratonesFormId} cta="Quiero la guía" asunto="Confirmá y te mando la guía de tus maratones" />
          </div>
        </header>
      </FadeIn>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Lo que creía vs. lo que mostraron los datos
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">Lo que creía</p>
              <p className="mt-1 text-base text-neutral-300">
                Que me faltaba entrenar más: más km, más fondos.
              </p>
            </div>
            <div>
              <p className="text-sm text-accent">Lo que mostraron mis datos</p>
              <p className="mt-1 text-base text-neutral-300">
                Nueva York 2022 y Buenos Aires 2025: la misma preparación,{" "}
                <span className="text-white">30 minutos de diferencia</span>. Lo que cambió fue la salida.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Si tenés 30 segundos
          </p>
          <ol className="space-y-2 text-base text-neutral-300">
            <li><span className="text-accent">1.</span> Generá tu API key personal de Garmin (gratis, 5 minutos).</li>
            <li><span className="text-accent">2.</span> Pegá 3 prompts en Claude Code, en orden.</li>
            <li><span className="text-accent">3.</span> Leé tus 3 hallazgos.</li>
          </ol>
          <p className="text-sm text-neutral-500">El paso a paso, con capturas, está en la guía.</p>
        </section>
      </FadeIn>

      <section className="space-y-6">
        <FadeIn>
          <h2 className="font-serif text-2xl text-white">Qué tiene adentro</h2>
        </FadeIn>
        <StaggerChildren className="space-y-3" staggerDelay={0.08}>
          {contenido.map((item, i) => (
            <StaggerItem key={item.titulo}>
              <div className="flex gap-4 border-b border-neutral-900 pb-4">
                <span className="font-serif text-lg text-accent">{i + 1}</span>
                <div>
                  <h3 className="text-base font-medium text-white">{item.titulo}</h3>
                  <p className="mt-1 text-sm text-neutral-500 tracking-[-0.01em]">{item.detalle}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <FadeIn>
        <section className="space-y-3 text-sm text-neutral-500">
          <p>
            Es solo para maratonistas con Garmin: no sirve para Strava ni Apple Watch. Necesitás Claude
            Code (plan pago de Claude). No soy médico ni entrenador: esto es una forma de entender tus
            propios datos.
          </p>
          <p>
            Hablo de correr, Garmin y otras cosas más en{" "}
            <a
              href={SITE.social.instagram}
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
            >
              @pablomarichal_
            </a>
            .
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <p className="mb-4 text-sm font-medium text-white">Dejame tu email y te la mando:</p>
          <div className="max-w-md">
            <KitForm formId={KIT.maratonesFormId} cta="Quiero la guía" asunto="Confirmá y te mando la guía de tus maratones" />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
