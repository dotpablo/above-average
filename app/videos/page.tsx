import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { VIDEOS } from "@/lib/videos";
import { VideoCard } from "@/components/video-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Videos de Pablo Marichal: correr después de los 40, volver de una lesión, emigrar, criar hijos y lo que la IA le está haciendo al trabajo.",
  alternates: { canonical: `${SITE.url}/videos` },
};

const canales: [string, string][] = [
  ["Instagram", SITE.social.instagram],
  ["TikTok", SITE.social.tiktok],
  ["YouTube", SITE.social.youtube],
];

export default function VideosPage() {
  return (
    <div className="space-y-12 lg:relative lg:left-1/2 lg:w-[960px] lg:-translate-x-1/2">
      <header className="space-y-4">
        <h1 className="font-serif text-4xl text-white">También lo cuento en video.</h1>
        <p className="max-w-xl text-lg leading-relaxed text-neutral-400">
          Correr pasados los cuarenta, volver de una lesión, emigrar, criar hijos
          y lo que la IA le está haciendo al trabajo. Piezas cortas, en mi voz.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-accent">
          {canales.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {label}
              <span className="sr-only"> (abre en otra pestaña)</span>
            </a>
          ))}
        </div>
      </header>

      {/* Feed: orden cronológico inverso, el tema va como etiqueta en la tarjeta.
          Antes esto estaba agrupado por pilar y quedaban secciones de un video. */}
      <StaggerChildren
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.05}
      >
        {VIDEOS.map((video) => (
          <StaggerItem key={video.id}>
            <VideoCard video={video} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn>
        <aside className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
          <h2 className="font-serif text-2xl text-white">Y también cocino.</h2>
          <p className="text-neutral-400">
            Asados, pizzas, fuego y fermentaciones. Eso tiene su propia cuenta.
          </p>
          <a
            href={SITE.social.instagramCooking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent underline underline-offset-4"
          >
            @pablo_cocinando
            <span className="sr-only"> (abre en otra pestaña)</span>
          </a>
        </aside>
      </FadeIn>
    </div>
  );
}
