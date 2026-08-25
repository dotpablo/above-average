import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { SITE, NEWSLETTER } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { AnimatedStats } from "@/components/motion/animated-stats";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pablo Marichal",
  url: SITE.url,
  sameAs: [
    SITE.social.linkedin,
    SITE.social.x,
    SITE.social.instagram,
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
    desc: "Piezas cortas sobre trabajo, tecnología y cómo se sostiene el rendimiento después de los 40.",
    cta: "Ver en Instagram",
    href: SITE.social.instagram,
    external: true,
  },
  {
    title: "Trabajar juntos",
    desc: "Advisory 1:1, proyectos SAP y adopción real de IA en equipos que mueven procesos críticos.",
    cta: "Ver opciones",
    href: "/trabajar-juntos",
    external: false,
  },
];

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 5);
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
    <div className="space-y-20">

      {/* Hero */}
      <section>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">

          {/* Photo */}
          <FadeIn delay={0.1} duration={0.8}>
            <div className="relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:h-72 sm:w-56">
              <Image
                // Nombre versionado a proposito: el optimizador de imagenes de
                // Vercel cachea por URL de origen, asi que reusar el nombre
                // viejo servia la foto anterior desde el CDN.
                src="/images/pablo-hero-2026.jpg"
                alt="Pablo Marichal"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </FadeIn>

          {/* Text */}
          <div className="flex-1 space-y-6">
            <FadeIn delay={0.2} duration={0.7}>
              <h1 className="font-serif text-4xl text-white sm:text-5xl md:text-6xl tracking-tighter leading-[1.1]">
                El código sobra<br />en la era de la IA.<br />
                <span className="text-neutral-500">El contexto no.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.35} duration={0.7}>
              <div className="space-y-3 text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
                {/* Sin biografía ni números: los contadores de abajo ya dan las
                    cifras y el About cuenta la historia. Acá solo posicionamiento. */}
                <p className="text-lg text-white font-medium">Soy Pablo Marichal.</p>
                <p>
                  Lidero adopción de IA adentro de corporaciones grandes. Escribo
                  sobre lo que eso le está haciendo al trabajo y a la gente, desde
                  adentro y no desde las noticias.
                </p>
              </div>
            </FadeIn>

            {/* Stats inline */}
            <AnimatedStats stats={stats} />

            {/* Newsletter form */}
            <FadeIn delay={0.5} duration={0.6}>
              <div>
                <p className="mb-1 text-sm font-medium text-neutral-300">
                  {NEWSLETTER.name}
                </p>
                <p className="mb-2.5 text-sm text-neutral-500">
                  {NEWSLETTER.tagline}
                </p>
                <NewsletterForm />
              </div>
            </FadeIn>
          </div>

        </div>
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
                  <PostCard post={post} />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

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
