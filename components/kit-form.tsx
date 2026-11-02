"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Suscribe directo a un formulario de Kit, sin pasar por nuestra API: el
 * endpoint de formularios es público (es el mismo que usan sus embeds). Sin
 * JS, el `action` hace un POST normal y Kit muestra su propia confirmación.
 */
export function KitForm({ formId, cta }: { formId: string; cta: string }) {
  const inputId = useId();
  const action = `https://app.kit.com/forms/${formId}/subscriptions`;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      // Kit responde 200 incluso cuando rechaza el alta: el resultado real
      // viene en `status` ("success" | "failed").
      const data = await res.json();
      setStatus(data.status === "success" ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-accent/40 bg-accent/5 p-4"
      >
        <p className="text-sm font-medium text-white">Listo. Revisá tu email.</p>
        <p className="mt-1 text-sm text-neutral-400">
          Te llega un correo para confirmar y, apenas confirmás, la guía. Si no aparece en unos
          minutos, mirá en Promociones o Spam.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <form action={action} method="post" onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">Email</label>
        <input
          id={inputId}
          name="email_address"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="min-w-0 flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-base text-white placeholder:text-neutral-600 focus:border-accent/50 focus:outline-none transition-colors"
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileTap={{ scale: 0.97 }}
          className="rounded-lg bg-accent px-6 py-2.5 text-base font-medium text-neutral-900 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : cta}
        </motion.button>
      </form>
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-red-400"
          >
            Algo falló. Probá de nuevo en un rato o escribime por Instagram.
          </motion.p>
        )}
      </AnimatePresence>
      <p className="mt-3 text-xs text-neutral-600">
        Gratis. Te escribo cuando tenga algo que valga la pena. Te salís cuando quieras.
      </p>
    </div>
  );
}
