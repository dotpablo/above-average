import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { GUIAS_GARMIN } from "@/lib/garmin";
import { ARTICULOS_GARMIN, articuloUrl } from "@/lib/correr";
import { VIDEOS } from "@/lib/videos";
import { getAllPosts } from "@/lib/posts";
import { VideoCard } from "@/components/video-card";
import { PostCard } from "@/components/post-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { AnimatedStats } from "@/components/motion/animated-stats";

// Hub de todo lo que tiene que ver con correr: guías de Garmin, artículos para
// Google, videos del tema y las ediciones que hablan de correr. Solo en español.

export const metadata: Metadata = {
  title: "Correr",
  description:
    "19 maratones, Garmin desde 2012 y una rodilla que se queja. Guías gratuitas de Garmin, zonas por umbral de lactato, qué reloj comprar y los videos sobre correr después de los 40.",
  alternates: { canonical: `${SITE.url}/correr` },
};

const VIDEOS_CORRER = 6;

// Los mismos datos que ya están en el texto de la página, en números.
const STATS = [
  { value: "19", label: "maratones" },
  { value: "6", label: "Majors" },
  { value: "2010", label: "primer trote" },
  { value: "2012", label: "primer Garmin" },
];

// Ediciones del newsletter que hablan de correr. Se eligen a mano: el pilar no alcanza.
const POSTS_CORRER = [
  "corro-hace-16-anos-todavia-no-llegue",
  "despedi-a-mi-entrenador-contrate-a-una-ia-el-experimento-de-42km",
  "mi-costo-de-entrada-al-mundo-sap-por-que-vendi-la-bici",
];

export default function CorrerPage() {
  const videos = VIDEOS.filter((v) => v.topic === "Correr").slice(0, VIDEOS_CORRER);
  const posts = getAllPosts().filter((p) => POSTS_CORRER.includes(p.slug));

  return (
    <div className="space-y-16">
      <FadeIn>
        <header className="space-y-8">
          <div className="grid grid-cols-[1fr_120px] items-end gap-4 sm:grid-cols-[1fr_200px] sm:gap-8">
            <div className="space-y-5">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Después de los 40, con datos
              </p>
              <h1 className="font-serif text-6xl leading-none tracking-tight text-white sm:text-7xl">Correr</h1>
              <p className="text-lg text-neutral-300 tracking-[-0.01em]">
                Empecé en 2010 porque había subido de peso. Van 19 maratones, seis de ellas Majors,
                y una rodilla que últimamente opina.
              </p>
            </div>
            <div className="relative h-56 overflow-hidden sm:h-72 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
              <Image
                src="/images/pablo-running.png"
                alt="Pablo Marichal corriendo una carrera"
                width={800}
                height={1200}
                sizes="(min-width: 640px) 320px, 200px"
                className="absolute right-[-12%] top-0 h-[135%] w-auto max-w-none"
                priority
              />
            </div>
          </div>
          <AnimatedStats stats={STATS} />
          <p className="max-w-xl text-base text-neutral-400 tracking-[-0.01em]">
            Acá junto lo que fui aprendiendo con el Garmin desde 2012 y lo que cuento en video
            sobre correr después de los 40. Nada de esto es consejo médico ni un plan de
            entrenamiento: es lo que hago yo, con mis datos.
          </p>
        </header>
      </FadeIn>

      <section className="space-y-5">
        <FadeIn>
          <h2 className="font-serif text-3xl text-white">Guías gratuitas de Garmin</h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2" staggerDelay={0.1}>
          {GUIAS_GARMIN.map((guia) => (
            <StaggerItem key={guia.slug}>
              <Link
                href={`/recursos/garmin/${guia.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-neutral-800 bg-gradient-to-b from-accent/[0.06] to-neutral-900/40 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl text-white">{guia.titulo}</h3>
                  <span className="shrink-0 rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
                    {guia.tag}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400 tracking-[-0.01em]">{guia.resumen}</p>
                <span className="mt-4 text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 group-hover:decoration-accent transition-colors">
                  Quiero la guía &rarr;
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <section className="space-y-5">
        <FadeIn>
          <h2 className="font-serif text-3xl text-white">Garmin, explicado</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Lo que más me preguntan, respondido una vez y bien.
          </p>
        </FadeIn>
        <StaggerChildren className="border-t border-neutral-800" staggerDelay={0.08}>
          {ARTICULOS_GARMIN.map((a, i) => (
            <StaggerItem key={a.slug}>
              <Link
                href={articuloUrl(a)}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-b border-neutral-800 py-5"
              >
                <span className="font-serif text-lg text-accent/70 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <h3 className="font-serif text-xl leading-snug text-white">
                    <span className="hover-underline">{a.titulo}</span>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-400 tracking-[-0.01em]">
                    {a.descripcion}
                  </p>
                </span>
                <span
                  className="text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <section className="space-y-5">
        <FadeIn>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-3xl text-white">En video</h2>
            <Link href="/videos" className="text-sm text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent">
              Todos los videos &rarr;
            </Link>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
          {videos.map((video) => (
            <StaggerItem key={video.id}>
              <VideoCard video={video} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {posts.length > 0 && (
        <section className="space-y-5">
          <FadeIn>
            <h2 className="font-serif text-3xl text-white">Lo que escribí sobre correr</h2>
          </FadeIn>
          <StaggerChildren className="flex flex-col gap-8" staggerDelay={0.06}>
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <div className="border-b border-neutral-800/50 pb-8 last:border-0 last:pb-0">
                  <PostCard post={post} compact />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      <FadeIn>
        <p className="text-sm text-neutral-500">
          Lo del día a día, la rodilla incluida, está en{" "}
          <a
            href={SITE.social.instagram}
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            @pablomarichal_
          </a>
          .
        </p>
      </FadeIn>
    </div>
  );
}
