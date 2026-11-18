import type { Metadata } from "next";
import prompts from "@/content/recursos/bot-prompts.json";
import { PromptsGuia } from "@/components/prompts-guia";

// Los prompts de la guía del bot de Telegram. La URL está impresa en el PDF, no moverla.
// Los textos salen de ~/ClaudeApps/bottelegramgarmin/manual/prompts.json.

export const metadata: Metadata = {
  title: "Los prompts, listos para copiar",
  robots: { index: false, follow: false },
};

export default function PromptsBotPage() {
  return (
    <PromptsGuia
      guia="Tu Garmin, cada mañana en tu Telegram"
      bajada="Copiá cada prompt y pegalo en Claude Code, en orden. El segundo es opcional."
      aviso="Es solo para Garmin con HRV nocturna: no sirve para Apple Watch, Coros, Polar ni Suunto. No soy médico ni entrenador: esto es una forma de leer tus propios datos."
      prompts={prompts}
      landing="/recursos/garmin/bot"
    />
  );
}
