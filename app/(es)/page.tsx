import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { SITE, NEWSLETTER } from "@/lib/constants";
import { GUIAS_GARMIN } from "@/lib/garmin";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { AnimatedStats } from "@/components/motion/animated-stats";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE.url,
    languages: {
      es: SITE.url,
      en: `${SITE.url}/en`,
      "x-default": `${SITE.url}/en`,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pablo Marichal",
  url: SITE.url,
  sameAs: [
    SITE.social.linkedin,
    SITE.social.x,
    SITE.social.instagram,
    SITE.social.tiktok,
    SITE.social.youtube,
  ],
  jobTitle: "Tech Lead",
  description: SITE.description,
};

const entryPoints = [
  {
    title: NEWSLETTER.name,
    desc: "51 ediciones sobre enterprise e IA, escritas desde adentro de la máquina. El archivo completo, en español y en inglés.",
    cta: "Leer el archivo",
    href: "/blog",
    external: false,
  },
  {
    title: "Videos",
    desc: "Correr después de los cuarenta, volver de una lesión, emigrar y criar hijos. Piezas cortas, en mi voz.",
    cta: "Ver la selección",
    href: "/videos",
    external: false,
  },
  {
    title: "Charlas y podcasts",
    desc: "Conferencias donde hablé y conversaciones donde me invitaron. Y cómo invitarme a la tuya.",
    cta: "Ver y escuchar",
    href: "/charlas",
    external: false,
  },
];

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  const stats = [
    { value: "20+", label: "años en Tech" },
    { value: "12+", label: "años SAP" },
    { value: `${allPosts.length}`, label: "artículos" },
    { value: "19", label: "maratones" },
    { value: "10+", label: "años escribiendo" },
  ];

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
    <div className="space-y-20 lg:relative lg:left-1/2 lg:w-[960px] lg:-translate-x-1/2">

      {/* Apertura: el retrato acompaña; la presentación conserva su ancho. */}
      <section className="space-y-8">
        <div className="grid items-start gap-8 sm:grid-cols-[1fr_200px] lg:grid-cols-[1fr_260px] lg:gap-12">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Trabajo, ideas y vida cotidiana</p>
            <h1 className="text-balance font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Veinte años adentro
              <span className="block text-neutral-200">de la <span className="text-accent">máquina</span>.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
              Lidero adopción de IA en sistemas que no se pueden caer, en
              corporaciones grandes. Escribo lo que pasa ahí adentro: lo que
              funciona, lo que se rompe y lo que nunca entra en el anuncio.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-neutral-400">
              También cuento lo que pasa fuera del trabajo: correr, emigrar,
              ser padre y cocinar. En los videos aparece esa parte de mí.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-sm">
              <Link
                href="/videos"
                className="rounded-full bg-accent px-5 py-2.5 font-medium text-neutral-950 transition-colors hover:bg-white"
              >
                Mirá los videos &rarr;
              </Link>
              <Link
                href="/about"
                className="text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-colors hover:text-white hover:decoration-accent"
              >
                Mi historia &rarr;
              </Link>
            </div>
          </div>
          <div className="relative order-first aspect-[4/5] w-40 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:order-none sm:w-full">
            <Image src="/images/pablo-hero-2026.jpg" alt="Pablo Marichal" fill sizes="(min-width: 1024px) 260px, (min-width: 640px) 200px, 160px" className="object-cover object-top" priority />
          </div>
        </div>
        <AnimatedStats stats={stats} />
      </section>

      {/* Correr: lo que más crece, con foto y las dos guías a un clic. */}
      <FadeIn>
        <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900/60 to-neutral-950">
          <div
            className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid sm:grid-cols-[1fr_240px] lg:grid-cols-[1fr_340px]">
            <div className="space-y-6 p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Correr</p>
              <h2 className="text-balance font-serif text-3xl leading-[1.1] text-white sm:text-4xl">
                19 maratones, Garmin desde 2012 y una rodilla que últimamente opina.
              </h2>
              <ul className="divide-y divide-neutral-800 border-y border-neutral-800">
                {GUIAS_GARMIN.map((guia) => (
                  <li key={guia.slug}>
                    <Link
                      href={`/recursos/garmin/${guia.slug}`}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="block text-xs text-neutral-500">Guía gratuita · PDF</span>
                        <span className="font-serif text-lg text-white">
                          <span className="hover-underline">{guia.titulo}</span>
                        </span>
                      </span>
                      <span
                        className="text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-accent"
                        aria-hidden="true"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/correr"
                className="inline-block text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Todo sobre correr &rarr;
              </Link>
            </div>
            <div className="relative hidden sm:block">
              <Image
                src="/images/pablo-running.png"
                alt="Pablo Marichal corriendo una carrera"
                width={800}
                height={1200}
                sizes="(min-width: 1024px) 460px, 340px"
                className="absolute -top-2 right-[-4%] h-[150%] w-auto max-w-none"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-6">
          <FadeIn>
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-3xl text-white">Últimos posts</h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-accent"
              >
                Ver todos &rarr;
              </Link>
            </div>
          </FadeIn>
          <StaggerChildren className="flex flex-col gap-8" staggerDelay={0.06}>
            {recentPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <div className="border-b border-neutral-800/50 pb-8 last:border-0 last:pb-0">
                  <PostCard post={post} compact />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* Tres accesos */}
      <section className="space-y-6">
        <FadeIn>
          <h2 className="font-serif text-3xl text-white">Por acá se sigue</h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 sm:grid-cols-3" staggerDelay={0.08}>
          {entryPoints.map((entry) => (
            <StaggerItem key={entry.title}>
              <Link
                href={entry.href}
                {...(entry.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-neutral-900"
              >
                <h3 className="font-serif text-2xl text-white">{entry.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400 tracking-[-0.01em]">
                  {entry.desc}
                </p>
                <span className="mt-4 text-sm font-medium text-accent">
                  {entry.cta} &rarr;
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

    </div>
    </>
  );
}
