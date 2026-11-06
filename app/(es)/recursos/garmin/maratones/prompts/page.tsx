import type { Metadata } from "next";
import Link from "next/link";
import prompts from "@/content/recursos/maratones-prompts.json";
import { CopyButton } from "@/components/copy-button";
import { FadeIn } from "@/components/motion/fade-in";

// Los prompts de la guía de maratones. Solo se llega desde el PDF: noindex, fuera
// del sitemap y sin links desde el sitio. La URL está impresa en el PDF, no moverla.
// Los textos salen de ~/ClaudeApps/Garmin/manual/prompts.json.

export const metadata: Metadata = {
  title: "Los prompts, listos para copiar",
  robots: { index: false, follow: false },
};

export default function PromptsMaratonesPage() {
  return (
    <div className="space-y-10">
      <FadeIn>
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
            Guía · Tus maratones, explicadas por tus datos
          </p>
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Los prompts, listos para copiar</h1>
          <p className="text-lg text-neutral-300 tracking-[-0.01em]">
            Copiá cada prompt y pegalo en Claude Code, en orden. Corren sobre tu propia cuenta de
            Garmin, en tu computadora y en modo de solo lectura.
          </p>
          <ol className="space-y-1 text-base text-neutral-300">
            {prompts.map((p) => (
              <li key={p.n}>
                <a href={`#prompt-${p.n}`} className="hover:text-white transition-colors">
                  <span className="text-accent">{p.n}</span> · {p.titulo}
                </a>
              </li>
            ))}
          </ol>
          <p className="border-l-2 border-accent pl-4 text-sm text-neutral-500">
            Solo para Garmin y para maratones: no sirve para Strava ni Apple Watch. No soy médico ni
            entrenador: esto es una forma de entender tus propios datos.
          </p>
        </header>
      </FadeIn>

      {prompts.map((p) => (
        <section
          key={p.n}
          id={`prompt-${p.n}`}
          className="min-w-0 scroll-mt-24 space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Prompt {p.n}</p>
              <h2 className="mt-1 font-serif text-2xl text-white">{p.titulo}</h2>
            </div>
            <CopyButton targetId={`txt-${p.n}`} label={`Copiar el prompt ${p.n}`} />
          </div>
          <p className="text-sm text-neutral-500">{p.descripcion}</p>
          <pre
            id={`txt-${p.n}`}
            tabIndex={0}
            className="max-h-[26rem] overflow-auto rounded-lg border border-neutral-800 bg-neutral-950 p-4 font-mono text-[13px] leading-relaxed text-neutral-300"
          >
            {p.texto}
          </pre>
        </section>
      ))}

      <p className="border-t border-neutral-900 pt-6 text-sm text-neutral-500">
        ¿Todavía no tenés la guía?{" "}
        <Link
          href="/recursos/garmin/maratones"
          className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
        >
          Pedila acá
        </Link>
        .
      </p>
    </div>
  );
}
