// Los artículos de Garmin que viven en /correr/garmin/<slug>. Existen para que
// Google traiga gente que busca estas preguntas en español; cada uno termina en
// el formulario de la guía de zonas. El texto sale de la guía (PDF de noviembre
// 2026), no se inventa. Para sumar uno: crear la página y agregarlo acá.
export interface ArticuloGarmin {
  slug: string;
  titulo: string;
  descripcion: string;
  /** Fecha de publicación, para el JSON-LD y el sitemap. */
  fecha: string;
}

export const ARTICULOS_GARMIN: ArticuloGarmin[] = [
  {
    slug: "zona-2",
    titulo: "Zona 2 en Garmin: por qué un trote suave te marca zona 3",
    descripcion:
      "Las zonas de fábrica de Garmin salen de 220 menos tu edad. Por eso un trote cómodo a 140 bpm aparece como zona 3. Qué cambia cuando las calculás por umbral de lactato.",
    fecha: "2026-11-12",
  },
  {
    slug: "zonas-por-umbral-de-lactato",
    titulo: "Cómo configurar las zonas de tu Garmin por umbral de lactato (% LTHR)",
    descripcion:
      "El paso a paso en Garmin Connect y en el reloj: de % of Max a % of LT, el Reset que casi todos se saltean y la pestaña de Correr, que tiene sus propias zonas.",
    fecha: "2026-11-12",
  },
  {
    slug: "banda-de-pecho",
    titulo: "¿Hace falta banda de pecho con un Garmin?",
    descripcion:
      "El sensor de la muñeca sirve para dormir y para trotes suaves. En las series llega tarde. HRM-Pro Plus, HRM 200 y HRM 600: qué cambia entre ellas.",
    fecha: "2026-11-12",
  },
  {
    slug: "que-garmin-comprar",
    titulo: "Qué Garmin comprar para correr, según cuánto corrés",
    descripcion:
      "Forerunner 165, 265 o 570, 965 o 970, Fenix 8 o 9: por presupuesto y por uso, comparando el modelo nuevo contra la generación anterior. Precios de referencia de octubre 2026.",
    fecha: "2026-11-12",
  },
];

export function articuloUrl(a: ArticuloGarmin): string {
  return `/correr/garmin/${a.slug}`;
}
