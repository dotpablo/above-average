import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { VIDEOS, VIDEO_TOPICS } from "@/lib/videos";
import { VideoCard } from "@/components/video-card";

export const metadata: Metadata = {
  title: "Videos",
  description: "Una selección de videos de Pablo Marichal sobre trabajo e IA, correr, emigrar y vida cotidiana.",
  alternates: { canonical: `${SITE.url}/videos` },
};

export default function VideosPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="font-serif text-4xl text-white">También lo cuento en video.</h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Trabajo, correr, emigrar, ser padre. Una selección para empezar a mirar.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-accent">
          {[
            ["Instagram", SITE.social.instagram],
            ["TikTok", SITE.social.tiktok],
            ["YouTube: cortos y videos largos", SITE.social.youtube],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{label}<span className="sr-only"> (abre en otra pestaña)</span></a>
          ))}
        </div>
      </header>
      {VIDEO_TOPICS.map((topic) => (
        <section key={topic} className="space-y-5">
          <h2 className="font-serif text-2xl text-white">{topic}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {VIDEOS.filter((video) => video.topic === topic).map((video) => <VideoCard key={video.id} video={video} />)}
          </div>
        </section>
      ))}
      <aside className="space-y-3 rounded-xl border border-neutral-800 p-6">
        <h2 className="font-serif text-2xl text-white">Y también cocino.</h2>
        <p className="text-neutral-400">Asados, pizzas, fuego y fermentaciones. Eso tiene su propia cuenta.</p>
        <a href={SITE.social.instagramCooking} target="_blank" rel="noopener noreferrer" className="inline-block text-accent underline underline-offset-4">@pablo_cocinando<span className="sr-only"> (abre en otra pestaña)</span></a>
      </aside>
    </div>
  );
}
