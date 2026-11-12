import type { Metadata } from "next";
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

// Hub de todo lo que tiene que ver con correr: guías de Garmin, artículos para
// Google, videos del tema y las ediciones que hablan de correr. Solo en español.

export const metadata: Metadata = {
  title: "Correr",
  description:
    "19 maratones, Garmin desde 2012 y una rodilla que se queja. Guías gratuitas de Garmin, zonas por umbral de lactato, qué reloj comprar y los videos sobre correr después de los 40.",
  alternates: { canonical: `${SITE.url}/correr` },
};

const VIDEOS_CORRER = 6;

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
        <header className="space-y-5">
          <h1 className="font-serif text-4xl text-white sm:text-5xl">Correr</h1>
          <p className="max-w-xl text-lg text-neutral-300 tracking-[-0.01em]">
            Empecé en 2010 porque había subido de peso. Van 19 maratones, seis de ellas Majors,
            y una rodilla que últimamente opina.
          </p>
          <p className="max-w-xl text-base text-neutral-400 tracking-[-0.01em]">
            Acá junto lo que fui aprendiendo con el Garmin desde 2012 y lo que cuento en video
            sobre correr después de los 40. Nada de esto es consejo médico ni un plan de
            entrenamiento: es lo que hago yo, con mis datos.
          </p>
        </header>
      </FadeIn>

      <section className="space-y-5">
        <FadeIn>
          <h2 className="font-serif text-2xl text-white">Guías gratuitas de Garmin</h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2" staggerDelay={0.1}>
          {GUIAS_GARMIN.map((guia) => (
            <StaggerItem key={guia.slug}>
              <Link
                href={`/recursos/garmin/${guia.slug}`}
                className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl text-white">{guia.titulo}</h3>
                  <span className="shrink-0 rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent">
                    {guia.tag}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-neutral-500 tracking-[-0.01em]">{guia.resumen}</p>
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
          <h2 className="font-serif text-2xl text-white">Garmin, explicado</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Lo que más me preguntan, respondido una vez y bien.
          </p>
        </FadeIn>
        <StaggerChildren className="space-y-3" staggerDelay={0.08}>
          {ARTICULOS_GARMIN.map((a) => (
            <StaggerItem key={a.slug}>
              <Link href={articuloUrl(a)} className="group block border-b border-neutral-900 pb-4">
                <h3 className="text-base font-medium text-white group-hover:text-accent transition-colors">
                  {a.titulo}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 tracking-[-0.01em]">{a.descripcion}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <section className="space-y-5">
        <FadeIn>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl text-white">En video</h2>
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
            <h2 className="font-serif text-2xl text-white">Lo que escribí sobre correr</h2>
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
