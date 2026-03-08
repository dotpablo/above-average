"use client";

import { useState } from "react";

export function NewsletterForm() {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-base text-white placeholder:text-neutral-600 focus:border-neutral-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-white px-6 py-2.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-200 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Suscribirme"}
      </button>
      {status === "success" && (
        <p className="self-center text-sm text-green-400">Listo, bienvenido.</p>
      )}
      {status === "already" && (
        <p className="self-center text-sm text-yellow-400">Ya estas suscrito. Gracias!</p>
      )}
      {status === "error" && (
        <p className="self-center text-sm text-red-400">Algo salio mal. Intenta de nuevo.</p>
      )}
    </form>
  );
}
