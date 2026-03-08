"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
        setStatus("success");
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
        className="flex-1 rounded-md border border-neutral-300 px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Suscribirme"}
      </button>
      {status === "success" && (
        <p className="self-center text-sm text-green-600">Listo, bienvenido.</p>
      )}
      {status === "error" && (
        <p className="self-center text-sm text-red-600">Algo salio mal. Intenta de nuevo.</p>
      )}
    </form>
  );
}
