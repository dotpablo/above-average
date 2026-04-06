"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref}>
      <AnimatedDigits motionValue={rounded} suffix={suffix} />
    </motion.span>
  );
}

function AnimatedDigits({
  motionValue,
  suffix,
}: {
  motionValue: ReturnType<typeof useTransform<number, number>>;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [motionValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

interface Stat {
  value: string;
  label: string;
}

export function AnimatedStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-800 pt-4">
      {stats.map((s, i) => {
        const numMatch = s.value.match(/^(\d+)(.*)$/);
        const numVal = numMatch ? parseInt(numMatch[1]) : 0;
        const suffix = numMatch ? numMatch[2] : s.value;

        return (
          <motion.div
            key={s.label}
            className="flex items-baseline gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <span className="font-serif text-xl text-accent">
              {numMatch ? (
                <AnimatedNumber value={numVal} suffix={suffix} />
              ) : (
                s.value
              )}
            </span>
            <span className="text-xs text-neutral-600">{s.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
