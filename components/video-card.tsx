import { Play, ArrowUpRight } from "lucide-react";
import type { Video } from "@/lib/videos";

export function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span>{video.topic}</span>
        <Play className="h-4 w-4 text-accent" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl leading-snug text-white">{video.title}</h3>
      <p className="text-sm leading-relaxed text-neutral-400">{video.description}</p>
      <span className="mt-auto flex items-center gap-1 pt-2 text-sm text-accent">
        Ver en Instagram <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(abre en otra pestaña)</span>
      </span>
    </a>
  );
}
