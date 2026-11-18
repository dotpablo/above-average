import type { Metadata } from "next";
import prompts from "@/content/recursos/maratones-prompts.json";
import { PromptsGuia } from "@/components/prompts-guia";

// Los prompts de la guía de maratones. La URL está impresa en el PDF, no moverla.
// Los textos salen de ~/ClaudeApps/Garmin/manual/prompts.json.

export const metadata: Metadata = {
  title: "Los prompts, listos para copiar",
  robots: { index: false, follow: false },
};

export default function PromptsMaratonesPage() {
  return (
    <PromptsGuia
      guia="Tus maratones, explicadas por tus datos"
      bajada="Copiá cada prompt y pegalo en Claude Code, en orden. Corren sobre tu propia cuenta de Garmin, en tu computadora y en modo de solo lectura."
      aviso="Solo para Garmin y para maratones: no sirve para Strava ni Apple Watch. No soy médico ni entrenador: esto es una forma de entender tus propios datos."
      prompts={prompts}
      landing="/recursos/garmin/maratones"
    />
  );
}
