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
      <section className="flex flex-col-reverse items-center gap-10 sm:flex-row sm:items-start sm:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex-1 space-y-6">
          <h1 className="font-serif text-5xl text-white sm:text-6xl md:text-7xl tracking-tighter leading-[1.1]">
            Code is cheap<br />in the AI era.<br />
            <span className="text-neutral-500">Context is not.</span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 max-w-xl">
            Soy Pablo Marichal: Senior SAP Tech Lead, AI Champion y 19x Marathoner.
            <br /><br />
            Opero en la intersección exacta entre la robustez corporativa, la agilidad de la Inteligencia Artificial y la resistencia biológica.
            <br /><br />
            Hablo fluido en <i>Legacy</i> y fluido en <i>Futuro</i>.
          </p>
          <div className="pt-2">
            <p className="mb-2.5 text-sm font-medium text-neutral-400">
              Únete a los que usan la IA antes de que la IA los use a ellos. <br />
              <span className="text-neutral-500 text-xs">Un newsletter técnico, directo y sin humo.</span>
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:h-56 sm:w-56">
          <Image
            src="/images/pablo-hero.jpg"
            alt="Pablo Marichal"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: "9+", label: "años en SAP" },
          { value: "57", label: "artículos publicados" },
          { value: "19", label: "maratones corridos" },
          { value: "2016", label: "escribiendo desde" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 text-center">
            <p className="font-serif text-3xl text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-neutral-600">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Topics */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <h2 className="font-serif text-2xl text-white">Tópicos principales</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
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
          ].map((topic) => (
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
            <h2 className="font-serif text-2xl text-white">Ultimos posts</h2>
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
          Para el profesional tech que no quiere<br className="hidden sm:inline" /> quedar deprecated.
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
