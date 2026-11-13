import Link from "next/link";
import type { ReactNode } from "react";
import { KIT, SITE } from "@/lib/constants";
import { ARTICULOS_GARMIN, articuloUrl, type ArticuloGarmin } from "@/lib/correr";
import { KitForm } from "@/components/kit-form";
import { FadeIn } from "@/components/motion/fade-in";

// Esqueleto común de los artículos de /correr/garmin: cabecera, cuerpo en prosa,
// formulario de la guía y los otros artículos. Las mismas clases de prosa que el blog.

const PROSE = `prose prose-invert max-w-none
  prose-headings:font-serif prose-headings:text-white prose-headings:tracking-tight
  prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl
  prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
  prose-p:text-neutral-300 prose-p:leading-[1.85] prose-p:text-base prose-p:tracking-[-0.01em]
  prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-neutral-600 hover:prose-a:decoration-accent
  prose-strong:text-neutral-100
  prose-blockquote:border-l-2 prose-blockquote:border-neutral-700 prose-blockquote:pl-5 prose-blockquote:text-neutral-400 prose-blockquote:not-italic
  prose-li:text-neutral-300 prose-li:leading-relaxed
  prose-hr:border-neutral-800 prose-hr:my-10`;

export function GarminArticle({ articulo, children }: { articulo: ArticuloGarmin; children: ReactNode }) {
  const otros = ARTICULOS_GARMIN.filter((a) => a.slug !== articulo.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articulo.titulo,
    description: articulo.descripcion,
    datePublished: articulo.fecha,
    inLanguage: "es",
    author: { "@type": "Person", name: SITE.author, url: SITE.url },
    mainEntityOfPage: `${SITE.url}${articuloUrl(articulo)}`,
  };

  return (
    <article className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <FadeIn>
        <header className="space-y-5">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500">
            <Link href="/correr" className="text-accent transition-colors hover:text-white">
              Correr
            </Link>
            <span aria-hidden="true">/</span>
            <span>Garmin</span>
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] text-white sm:text-5xl">{articulo.titulo}</h1>
          <p className="border-l-2 border-accent/60 pl-4 text-lg text-neutral-300 tracking-[-0.01em]">{articulo.descripcion}</p>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className={PROSE}>{children}</div>
      </FadeIn>

      <FadeIn>
        <section className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/[0.07] to-neutral-900/40 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Guía gratuita · PDF</p>
          <h2 className="mt-3 font-serif text-2xl text-white">Cómo tengo configurado mi Garmin</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Todo esto con capturas de cada pantalla, en 17 páginas. Te llega al mail.
          </p>
          <div className="mt-5 max-w-md">
            <KitForm formId={KIT.garminFormId} cta="Quiero la guía" />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-3 text-sm text-neutral-500">
          <p>
            No soy médico ni entrenador: esto es cómo tengo configurado mi Garmin y lo que fui
            aprendiendo desde 2012. Hablo de correr y de Garmin en{" "}
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
        <nav aria-label="Más sobre Garmin" className="space-y-3 border-t border-neutral-900 pt-8">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Más sobre Garmin</p>
          <ul className="space-y-2">
            {otros.map((a) => (
              <li key={a.slug}>
                <Link
                  href={articuloUrl(a)}
                  className="text-base text-neutral-300 underline underline-offset-4 decoration-neutral-700 hover:decoration-accent hover:text-white transition-colors"
                >
                  {a.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </FadeIn>
    </article>
  );
}
