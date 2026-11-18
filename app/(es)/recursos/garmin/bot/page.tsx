import type { Metadata } from "next";
import Link from "next/link";
import { KIT, SITE } from "@/lib/constants";
import { KitForm } from "@/components/kit-form";
import { KofiButton } from "@/components/kofi-button";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

// Landing de la guía del bot de Telegram (/bot redirige acá: es el link de la bio).
// Los textos vienen de ~/ClaudeApps/bottelegramgarmin/manual/handoff_web.md.

export const metadata: Metadata = {
  title: "Tu Garmin, cada mañana en tu Telegram",
  description:
    "Guía gratuita en PDF: un bot de Telegram que cada mañana te dice si hoy podés darle, aflojar o descansar, según tu HRV, tu pulso y tu sueño. Lo arma Claude con 2 prompts.",
  alternates: { canonical: `${SITE.url}/recursos/garmin/bot` },
};

const ASUNTO = "Confirmá y te mando la guía del bot";

const pasos = [
  "Generá tu API key de Garmin, creá un bot de Telegram y una cuenta de Cloudflare (todo gratis, 15 minutos).",
  "Pegá el Prompt 1 en Claude Code: arma el bot y lo deja corriendo en la nube.",
  "Escribile \"hola\" a tu bot. Con el Prompt 2 lo hacés tuyo.",
];

const contenido = [
  {
    titulo: "Cómo decide el bot",
    detalle:
      "Cuatro alertas (HRV de anoche, pulso en reposo, sueño y HRV de la semana) contra tus últimos 28 días, no contra una tabla de internet. Más lo que entrenaste ayer, aunque hayan sido varias sesiones.",
  },
  {
    titulo: "Setup: Garmin, Telegram y Cloudflare",
    detalle:
      "La API personal oficial de Garmin, un bot de Telegram propio y una cuenta gratis de Cloudflare. Sin darle tu contraseña a nadie.",
  },
  {
    titulo: "Prompt 1: armá el bot",
    detalle: "Claude escribe el código, lo publica en la nube, te muestra el mensaje y lo manda cuando lo aprobás.",
  },
  {
    titulo: "Escribile cuando quieras",
    detalle:
      "Si madrugás, le escribís \"hola\" y te contesta en segundos. No depende de tener la compu prendida.",
  },
  {
    titulo: "¿Me acierta?",
    detalle:
      "Le contás cómo te sentís con un toque y el domingo te dice cuántas veces coincidió. Si se equivoca seguido, te sugiere ajustarlo.",
  },
  {
    titulo: "Prompt 2: hacelo tuyo",
    detalle: "Nueve preguntas y el bot te llama por tu nombre, usa tus palabras y tus umbrales.",
  },
  {
    titulo: "Las trampas",
    detalle: "Lo que probé antes y no anduvo: la compu dormida y los horarios que no son puntuales.",
  },
];

export default function BotPage() {
  return (
    <div className="space-y-16">
      <FadeIn>
        <header className="space-y-5">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
            <Link href="/recursos/garmin" className="text-accent transition-colors hover:text-white">
              Garmin
            </Link>
            <span aria-hidden="true">/</span>
            <span>Guía gratuita · PDF · Versión noviembre 2026</span>
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl">
            Tu Garmin, cada mañana en tu Telegram
          </h1>
          <p className="font-serif text-2xl text-accent">¿Hoy le doy, aflojo o descanso?</p>
          <p className="text-base leading-relaxed text-neutral-300 tracking-[-0.01em]">
            Tu reloj mide todas las noches cómo te recuperaste, pero hay que acordarse de abrir la app
            y decidir qué hacer con cinco números. Armé un bot que me manda la respuesta por Telegram
            cada mañana, comparando mi noche con mi propio normal. Esta guía es el paso a paso para que
            armes el tuyo.
          </p>
          <div className="max-w-md pt-2">
            <KitForm formId={KIT.botFormId} cta="Quiero la guía" asunto={ASUNTO} />
          </div>
        </header>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Si tenés 30 segundos</p>
          <ol className="space-y-2 text-base text-neutral-300">
            {pasos.map((paso, i) => (
              <li key={i}>
                <span className="text-accent">{i + 1}.</span> {paso}
              </li>
            ))}
          </ol>
          <p className="text-sm text-neutral-400">El paso a paso, con capturas, está en la guía.</p>
        </section>
      </FadeIn>

      <section className="space-y-6">
        <FadeIn>
          <h2 className="font-serif text-3xl text-white">Qué tiene adentro</h2>
        </FadeIn>
        <StaggerChildren className="border-t border-neutral-800" staggerDelay={0.06}>
          {contenido.map((item, i) => (
            <StaggerItem key={item.titulo}>
              <div className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-neutral-800 py-4">
                <span className="font-serif text-lg text-accent/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-white">{item.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400 tracking-[-0.01em]">{item.detalle}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <FadeIn>
        <section className="space-y-3 text-sm text-neutral-400">
          <p>
            Es solo para Garmin con HRV nocturna: no sirve para Apple Watch, Coros, Polar ni Suunto.
            Necesitás Claude Code (plan pago de Claude), Telegram y una cuenta gratis de Cloudflare. No
            soy médico ni entrenador: esto es una forma de leer tus propios datos.
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
        <section className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/[0.07] to-neutral-900/40 p-6 sm:p-8">
          <p className="mb-4 text-sm font-medium text-white">Dejame tu email y te la mando:</p>
          <div className="max-w-md">
            <KitForm formId={KIT.botFormId} cta="Quiero la guía" asunto={ASUNTO} />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <KofiButton />
      </FadeIn>
    </div>
  );
}
