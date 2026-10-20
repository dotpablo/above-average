import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { SITE, NEWSLETTER } from "@/lib/constants";
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
    desc: "El newsletter semanal sobre enterprise e IA. Sale los martes, desde adentro de la máquina.",
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
    <div className="space-y-16 lg:relative lg:left-1/2 lg:w-[960px] lg:-translate-x-1/2">

      {/* Apertura: el retrato acompaña; la presentación conserva su ancho. */}
      <section className="space-y-8">
        <div className="grid items-start gap-8 sm:grid-cols-[1fr_200px] lg:grid-cols-[1fr_260px] lg:gap-12">
          <div className="space-y-6">
            <p className="text-sm text-neutral-400">Pablo Marichal · Trabajo, ideas y vida cotidiana</p>
            <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              La ejecución sobra en la era de la IA.
              <span className="mt-3 block text-neutral-200">El <span className="text-accent">criterio</span> y el contexto no.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-neutral-300">
              Lidero técnicamente equipos de SAP y adopción de IA adentro de
              corporaciones grandes. Escribo sobre lo que eso le está haciendo
              al trabajo y a la gente, desde adentro y no desde las noticias.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-neutral-400">
              También cuento lo que pasa fuera del trabajo: correr, emigrar,
              ser padre y cocinar. En los videos aparece esa parte de mí.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/videos" className="text-accent underline underline-offset-4">Mirá los videos &rarr;</Link>
              <Link href="/about" className="text-neutral-300 underline underline-offset-4">Mi historia &rarr;</Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:w-full">
            <Image src="/images/pablo-hero-2026.jpg" alt="Pablo Marichal" fill sizes="(min-width: 1024px) 260px, (min-width: 640px) 200px, 160px" className="object-cover object-top" priority />
          </div>
        </div>
        <AnimatedStats stats={stats} />
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-6">
          <FadeIn>
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-white">Últimos posts</h2>
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

      <section className="grid gap-6 rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 sm:grid-cols-2 sm:p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-neutral-400">El newsletter</p>
          <h2 className="font-serif text-3xl text-white">{NEWSLETTER.name}</h2>
          <p className="text-sm leading-relaxed text-neutral-300">{NEWSLETTER.tagline}</p>
        </div>
        <div className="self-center"><NewsletterForm /></div>
      </section>

      {/* Tres accesos */}
      <section className="space-y-6">
        <FadeIn>
          <h2 className="font-serif text-2xl text-white">Por acá se sigue</h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 sm:grid-cols-3" staggerDelay={0.08}>
          {entryPoints.map((entry) => (
            <StaggerItem key={entry.title}>
              <Link
                href={entry.href}
                {...(entry.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 backdrop-blur-sm transition-colors hover:border-accent/50"
              >
                <h3 className="font-serif text-lg text-white">{entry.title}</h3>
                <p className="mt-2 text-sm text-neutral-500 tracking-[-0.01em]">
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
