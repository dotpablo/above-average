"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, animate } from "motion/react";

/**
 * El valor final se renderiza en el HTML del server. La cuenta ascendente
 * se hace mutando el DOM despues de hidratar, sin IntersectionObserver:
 * si no hay JS (buscadores, crawlers de LLMs), el numero real ya esta ahi.
 */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const unsubscribe = motionValue.on("change", (v) => {
      node.textContent = `${Math.round(v)}${suffix}`;
    });
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
    });

    return () => {
      controls.stop();
      unsubscribe();
      // Si el componente se desmonta a mitad de camino, dejar el valor real.
      node.textContent = `${value}${suffix}`;
    };
  }, [motionValue, value, suffix]);

  // Un solo nodo de texto: el HTML servido dice "20+", no "20<!-- -->+".
  return <span ref={ref}>{`${value}${suffix}`}</span>;
}

interface Stat {
  value: string;
  label: string;
}

export function AnimatedStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-800 pt-4">
      {stats.map((s) => {
        const numMatch = s.value.match(/^(\d+)(.*)$/);

        return (
          // Sin opacity:0 inicial: estos numeros no pueden estar ocultos en el
          // HTML servido, es justamente lo que se estaba rompiendo.
          <div key={s.label} className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl text-accent">
              {numMatch ? (
                <CountUp value={parseInt(numMatch[1], 10)} suffix={numMatch[2]} />
              ) : (
                s.value
              )}
            </span>
            <span className="text-xs text-neutral-600">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}
