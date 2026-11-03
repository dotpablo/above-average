import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { VIDEOS, VIDEOS_VISIBLES } from "@/lib/videos";
import { VideoCard } from "@/components/video-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Videos by Pablo Marichal: running past forty, coming back from injury, emigrating, raising kids, and what AI is doing to work.",
  alternates: {
    canonical: `${SITE.url}/en/videos`,
    languages: {
      es: `${SITE.url}/videos`,
      en: `${SITE.url}/en/videos`,
      "x-default": `${SITE.url}/en/videos`,
    },
  },
};

const channels: [string, string][] = [
  ["Instagram", SITE.social.instagram],
  ["TikTok", SITE.social.tiktok],
  ["YouTube", SITE.social.youtube],
];

export default function VideosEn() {
  return (
    <div className="space-y-12 lg:relative lg:left-1/2 lg:w-[960px] lg:-translate-x-1/2">
      <header className="space-y-4">
        <h1 className="font-serif text-4xl text-white">I also tell it on video.</h1>
        <p className="max-w-xl text-lg leading-relaxed text-neutral-400">
          Running past forty, coming back from injury, emigrating, raising kids
          and what AI is doing to work. Short pieces, in my own voice.
        </p>
        <p className="max-w-xl text-sm text-neutral-500">
          The videos are in Spanish. Captions carry most of it.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-accent">
          {channels.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </header>
      <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
        {VIDEOS.slice(0, VIDEOS_VISIBLES).map((video) => (
          <StaggerItem key={video.id}>
            <VideoCard video={video} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* El resto queda en la página (y para buscadores) pero plegado: veinte
          tarjetas de entrada eran demasiadas. <details> no necesita JS. */}
      {VIDEOS.length > VIDEOS_VISIBLES && (
        <details className="group">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent group-open:hidden">
            See the {VIDEOS.length - VIDEOS_VISIBLES} earlier ones &darr;
          </summary>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.slice(VIDEOS_VISIBLES).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </details>
      )}

      <FadeIn>
        <aside className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
          <h2 className="font-serif text-2xl text-white">And I cook.</h2>
          <p className="text-neutral-400">
            Asados, pizza, fire and fermentation. That has its own account.
          </p>
          <a href={SITE.social.instagramCooking} target="_blank" rel="noopener noreferrer" className="inline-block text-accent underline underline-offset-4">
            @pablo_cocinando
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </aside>
      </FadeIn>
    </div>
  );
}
