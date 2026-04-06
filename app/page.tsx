import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { AnimatedStats } from "@/components/motion/animated-stats";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pablo Marichal",
  url: SITE.url,
  sameAs: [
    "https://www.linkedin.com/in/pablomarichal/",
    "https://x.com/dotpablo",
    "https://www.instagram.com/pabloaboveaverage",
  ],
  jobTitle: "Senior SAP Tech Lead",
  description: SITE.description,
};

const stats = [
  { value: "20+", label: "años en Tech" },
  { value: "12+", label: "años SAP" },
  { value: "57", label: "artículos" },
  { value: "19", label: "maratones" },
  { value: "10", label: "años escribiendo" },
];

const topics = [
  {
    title: "Supervivencia Corporativa e IA",
    desc: "SAP, Copilot, Joule, migraciones cloud y cómo operar en la intersección del Legacy y el Futuro.",
  },
  {
    title: "Mentalidad de Constructor",
    desc: "Experimentos creando agentes IA, programando y entendiendo dónde se rompe la IA de frontera.",
  },
  {
    title: "Clean Core Biológico",
    desc: "Lecciones de 19 maratones aplicadas a mantener la máquina lista para aguantar el estrés corporativo.",
  },
  {
    title: "El Humano Full Stack",
    desc: "Cultura, evitar la 'vegetalización' automatizada y reflexiones aleatorias sobre la vida misma.",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

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
                src="/images/pablo-hero.jpg"
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
                <p className="text-lg text-white font-medium">Soy Pablo Marichal.</p>
                <p>
                  Arquitecto de sistemas enterprise. Atleta de resistencia. Padre.
                </p>
                <p>
                  20+ años haciendo que la tecnología sobreviva al contacto con la realidad.
                  19 maratones cruzando líneas de meta que nadie me obligó a cruzar.
                  Dos hijos que me obligan a construir algo que valga la pena dejar.
                </p>
                <p>
                  Opero en la intersección donde la arquitectura técnica, la IA de frontera
                  y la resistencia biológica se vuelven la misma disciplina.
                </p>
                <p>
                  Hablo fluido en <em>Legacy</em>. Fluido en <em>Futuro</em>.
                </p>
              </div>
            </FadeIn>

            {/* Stats inline */}
            <AnimatedStats stats={stats} />

            {/* Newsletter form */}
            <FadeIn delay={0.5} duration={0.6}>
              <div>
                <p className="mb-1 text-sm font-medium text-neutral-300">
                  Suscribite a Above Average
                </p>
                <p className="mb-2.5 text-sm text-neutral-500">
                  Un newsletter técnico, directo y sin humo.
                </p>
                <NewsletterForm />
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* Topics */}
      <section className="space-y-6">
        <FadeIn>
          <h2 className="font-serif text-2xl text-white">Tópicos principales</h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2" staggerDelay={0.1}>
          {topics.map((topic) => (
            <StaggerItem key={topic.title}>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 backdrop-blur-sm transition-colors hover:border-neutral-700">
                <h3 className="font-serif text-lg text-white">{topic.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{topic.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
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

      {/* Bottom CTA */}
      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-4">Newsletter</p>
          <h2 className="font-serif text-2xl text-white leading-snug">
            Para el profesional tech que no quiere quedar obsoleto.
          </h2>
          <p className="mt-3 max-w-lg text-base text-neutral-400 tracking-[-0.01em]">
            Cada semana: una dosis de criterio sobre SAP, IA de frontera y rendimiento humano.
            Sin motivación barata. Sin &quot;vibe coding&quot;. Solo lo que funciona en producción.
          </p>
          <div className="mt-6 max-w-md">
            <NewsletterForm />
          </div>
        </section>
      </FadeIn>

    </div>
    </>
  );
}
