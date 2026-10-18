import Image from "next/image";
import { Play } from "lucide-react";
import { videoThumb, videoUrl, type Video } from "@/lib/videos";

/**
 * Tarjeta de reel. La miniatura ya trae el gancho escrito encima —viene del
 * propio video— así que el título va debajo y no encima de la imagen.
 */
export function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={videoUrl(video)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-neutral-900">
        <Image
          src={videoThumb(video)}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-neutral-950/80 px-2.5 py-1 text-xs text-neutral-200 backdrop-blur-sm">
          <Play className="h-3 w-3 fill-accent text-accent" aria-hidden="true" />
          {video.topic}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg leading-snug text-white">{video.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-400">{video.description}</p>
        <span className="mt-auto pt-2 text-sm text-accent">
          Ver en Instagram &rarr;
          <span className="sr-only"> (abre en otra pestaña)</span>
        </span>
      </div>
    </a>
  );
}
