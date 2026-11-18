// Las guías de Garmin, en el orden en que salen en el hub /recursos/garmin (la
// más nueva primero). Cada una tiene su landing en app/(es)/recursos/garmin/<slug>
// y su formulario en KIT. Para sumar una guía: crear la landing y agregarla acá.
export interface GuiaGarmin {
  slug: string;
  titulo: string;
  resumen: string;
  tag: "Nuevo" | "Gratuito";
}

export const GUIAS_GARMIN: GuiaGarmin[] = [
  {
    slug: "bot",
    titulo: "Tu Garmin, cada mañana en tu Telegram",
    resumen:
      "Un bot que te dice cada mañana si hoy podés darle, aflojar o descansar, según tu HRV, tu pulso y tu sueño. Y si te levantás antes, le escribís y te contesta. Lo arma Claude con 2 prompts.",
    tag: "Nuevo",
  },
  {
    slug: "maratones",
    titulo: "Tus maratones, explicadas por tus datos",
    resumen:
      "Conectá tu Garmin con Claude y entendé por qué cada maratón te salió como te salió. Con 3 prompts listos y mis 19 maratones como ejemplo.",
    tag: "Gratuito",
  },
  {
    slug: "zonas",
    titulo: "Cómo tengo configurado mi Garmin",
    resumen:
      "Tu Garmin sigue usando las zonas viejas. Zonas por umbral de lactato paso a paso, la banda, el informe matutino y qué Garmin comprar.",
    tag: "Gratuito",
  },
];
