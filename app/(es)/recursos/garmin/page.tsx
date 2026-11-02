import type { Metadata } from "next";
import { KIT, SITE } from "@/lib/constants";
import { KitForm } from "@/components/kit-form";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

// Landing de la guía que se reparte desde Instagram (/garmin redirige acá).
// El texto sale del propio PDF: si cambia la guía, revisar esta página.

export const metadata: Metadata = {
  title: "Cómo tengo configurado mi Garmin",
  description:
    "Guía gratuita en PDF: zonas por umbral de lactato paso a paso, la banda, el informe matutino y qué Garmin comprar según tu presupuesto.",
  alternates: { canonical: `${SITE.url}/recursos/garmin` },
};

const contenido = [
  {
    titulo: "Zonas por umbral de lactato (% LTHR)",
    detalle:
      "Paso a paso con capturas, desde Garmin Connect. Incluye el Reset que casi todos se saltean y la pestaña de Correr, que es la que usa el reloj cuando salís a correr.",
  },
  {
    titulo: "La banda",
    detalle: "Por qué nunca corro sin ella, y las diferencias entre la HRM-Pro Plus, la HRM 200 y la HRM 600.",
  },
  {
    titulo: "El informe matutino y mi protocolo",
    detalle: "Body Battery, HRV y sueño: qué miro al despertar y cuándo ese día no hago series.",
  },
  {
    titulo: "Edad fitness, estrés y la cuenta regresiva",
    detalle: "Qué uso, qué no sigo en el día a día y por qué.",
  },
  {
    titulo: "¿Qué Garmin comprar?",
    detalle:
      "Por presupuesto y por cuánto corrés, comparando el último modelo contra la generación anterior.",
  },
];

export default function GarminPage() {
  return (
    <div className="space-y-16">
      <FadeIn>
        <header className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Guía gratuita · PDF
          </p>
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Cómo tengo configurado mi Garmin</h1>
          <p className="text-lg text-neutral-300 tracking-[-0.01em]">
            Tu Garmin sigue usando las zonas viejas.
          </p>
          <p className="text-base text-neutral-400 tracking-[-0.01em]">
            Las zonas que trae Garmin de fábrica se calculan como porcentaje de tu pulso máximo. Y si
            nunca lo cambiaste, ese máximo sale de una fórmula genérica: 220 menos tu edad. Acá está
            cómo las tengo yo, paso a paso, y algunas cosas más que te pueden servir.
          </p>
          <div className="max-w-md pt-2">
            <KitForm formId={KIT.garminFormId} cta="Quiero la guía" />
          </div>
        </header>
      </FadeIn>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Qué cambió en la práctica
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">De fábrica (% of Max)</p>
              <p className="mt-1 text-base text-neutral-300">
                Un trote cómodo a 140 bpm el reloj me lo marcaba como <span className="text-white">Zona 3</span>.
              </p>
            </div>
            <div>
              <p className="text-sm text-accent">Por umbral (% of LT)</p>
              <p className="mt-1 text-base text-neutral-300">
                Hoy es <span className="text-white">Zona 2 real</span>. Mi Zona 2 va de 131 a 145 bpm.
              </p>
            </div>
          </div>
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
            No soy médico ni entrenador: esto es simplemente cómo tengo configurado mi Garmin. Uso
            Garmin desde 2012 y algo he aprendido sobre la marcha.
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
            <KitForm formId={KIT.garminFormId} cta="Quiero la guía" />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
