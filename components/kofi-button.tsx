import { Coffee } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * "Invitame un café" para el final de las guías gratuitas. Botón propio en vez
 * de la imagen de Ko-fi, que está en inglés. El texto es el mismo del PDF.
 */
export function KofiButton({ que = "La guía es gratis" }: { que?: string }) {
  return (
    <section className="space-y-4 border-t border-neutral-900 pt-8">
      <p className="text-base text-neutral-300">
        <strong className="text-white">¿Te sirvió?</strong> {que} y lo va a seguir siendo. Si querés
        agradecer, podés invitarme un café.
      </p>
      <a
        href={SITE.social.kofi}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Coffee className="h-4 w-4" aria-hidden="true" />
        Invitame un café
        <span className="sr-only"> (abre Ko-fi en otra pestaña)</span>
      </a>
    </section>
  );
}
