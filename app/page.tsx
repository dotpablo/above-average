import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";

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
  { value: "9+", label: "años SAP" },
  { value: "57", label: "artículos" },
  { value: "19", label: "maratones" },
  { value: "2016", label: "desde" },
];

const topics = [
  {
    title: "Enterprise & AI Survival",
    desc: "SAP, Copilot, Joule, migraciones cloud y cómo operar en la intersección de Legacy y Future.",
  },
  {
    title: "The Builder Mindset",
    desc: "Experimentos creando agentes IA, programando y entendiendo dónde se rompe la IA de frontera.",
  },
  {
    title: "Biological Clean Core",
    desc: "Lecciones de 19 maratones aplicadas a mantener la máquina lista para aguantar el estrés corporativo.",
  },
  {
    title: "The Full Stack Human",
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
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">

          {/* Photo — portrait, more prominent */}
          <div className="relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:h-72 sm:w-56">
            <Image
              src="/images/pablo-hero.jpg"
              alt="Pablo Marichal"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Text */}
          <div className="flex-1 space-y-6">
            <h1 className="font-serif text-4xl text-white sm:text-5xl md:text-6xl tracking-tighter leading-[1.1]">
              Code is cheap<br />in the AI era.<br />
              <span className="text-neutral-500">Context is not.</span>
            </h1>

            <p className="text-base leading-relaxed text-neutral-400">
              Soy Pablo Marichal: Senior SAP Tech Lead, AI Champion y 19x Marathoner.
              Opero en la intersección de la robustez corporativa, la IA de frontera y la resistencia biológica.
              Hablo fluido en <em>Legacy</em> y fluido en <em>Futuro</em>.
            </p>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-800 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-serif text-xl text-white">{s.value}</span>
                  <span className="text-xs text-neutral-600">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Newsletter form */}
            <div>
              <p className="mb-2.5 text-sm text-neutral-500">
                Un newsletter técnico, directo y sin humo.
              </p>
              <NewsletterForm />
            </div>
          </div>

        </div>
      </section>

      {/* Topics */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <h2 className="font-serif text-2xl text-white">Tópicos principales</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
            >
              <h3 className="font-serif text-lg text-white">{topic.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl text-white">Últimos posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-white"
            >
              Ver todos &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {recentPosts.map((post) => (
              <div key={post.slug} className="border-b border-neutral-800/50 pb-8 last:border-0 last:pb-0">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-4">Newsletter</p>
        <h2 className="font-serif text-2xl text-white leading-snug">
          Para el profesional tech que no quiere quedar deprecated.
        </h2>
        <p className="mt-3 max-w-lg text-base text-neutral-400">
          Cada semana: una dosis de criterio sobre SAP, IA de frontera y rendimiento humano.
          Sin motivación barata. Sin "vibe coding". Solo lo que funciona en producción.
        </p>
        <div className="mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </section>

    </div>
    </>
  );
}
