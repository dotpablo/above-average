"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DICT, type Locale } from "@/lib/i18n";

export function NewsletterForm({ locale = "es" as Locale }: { locale?: Locale }) {
  const t = DICT[locale].newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.already) {
          setStatus("already");
        } else {
          setStatus("success");
        }
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">Email</label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder={t.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-base text-white placeholder:text-neutral-600 focus:border-accent/50 focus:outline-none transition-colors"
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileTap={{ scale: 0.97 }}
          className="rounded-lg bg-accent px-6 py-2.5 text-base font-medium text-neutral-900 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? t.loading : t.subscribe}
        </motion.button>
      </form>
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-green-400"
          >
            {t.ok}
          </motion.p>
        )}
        {status === "already" && (
          <motion.p
            key="already"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-yellow-400"
          >
            {t.already}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-red-400"
          >
            {t.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
