"use client";

import { useState } from "react";

/**
 * Copia el texto del elemento `targetId`. Si el portapapeles no está disponible
 * (http, permisos), deja el texto seleccionado para copiarlo a mano.
 */
export function CopyButton({ targetId, label }: { targetId: string; label: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.textContent ?? "");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={label}
      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-neutral-900 transition-colors ${
        copiado ? "bg-white" : "bg-accent hover:opacity-90"
      }`}
    >
      {copiado ? "Copiado" : "Copiar"}
    </button>
  );
}
