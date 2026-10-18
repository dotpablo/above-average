/**
 * Dos idiomas, dos árboles de rutas.
 *
 *   español  → la raíz        (/blog, /about…)   — URLs ya indexadas, no se tocan
 *   inglés   → /en            (/en/blog, /en/about…)
 *
 * Cada página declara `canonical` hacia sí misma y `languages` con su par.
 * El canónico NO apunta de una versión a la otra: eso le diría a Google que
 * desindexe la española, que es donde están los 87 artículos que ya rankean.
 * La preferencia por el inglés se expresa con `x-default`, no con el canónico.
 */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Prefijo de ruta de cada idioma. El español vive en la raíz. */
export function prefix(locale: Locale): string {
  return locale === "es" ? "" : "/en";
}

/**
 * Equivalencias de ruta entre idiomas. La clave es el camino en español
 * (sin barra inicial); el valor, el camino en inglés bajo /en.
 */
const RUTAS: Record<string, string> = {
  "": "",
  about: "about",
  blog: "blog",
  videos: "videos",
  charlas: "talks",
  recursos: "resources",
  "trabajar-juntos": "contact",
};

export function pathFor(locale: Locale, esPath: string): string {
  const limpio = esPath.replace(/^\/|\/$/g, "");
  if (locale === "es") return `/${limpio}`.replace(/\/$/, "") || "/";
  const en = RUTAS[limpio];
  if (en === undefined) return `/en/${limpio}`.replace(/\/$/, "");
  return `/en/${en}`.replace(/\/$/, "") || "/en";
}

export interface Dict {
  nav: { blog: string; resources: string; talks: string; about: string; videos: string };
  switcher: { label: string; other: string; otherHref: (p: string) => string };
  footer: { blog: string; resources: string; talks: string; about: string; videos: string };
  blog: { title: string; editions: (n: number) => string; readMore: string; search: string; all: string };
  newsletter: { subscribe: string; placeholder: string; ok: string; already: string; error: string; loading: string };
  post: { readingTime: (t: string) => string; alsoIn: string; alsoInEs: string };
}

export const DICT: Record<Locale, Dict> = {
  es: {
    nav: { blog: "En Producción", resources: "Recursos", talks: "Charlas", about: "About", videos: "Videos" },
    switcher: { label: "Idioma", other: "English", otherHref: (p) => p },
    footer: { blog: "En Producción", resources: "Recursos", talks: "Charlas", about: "About", videos: "Videos" },
    blog: {
      title: "En Producción",
      editions: (n) => `${n} ediciones`,
      readMore: "Leer",
      search: "Buscar posts",
      all: "Todos",
    },
    newsletter: {
      subscribe: "Suscribirme",
      placeholder: "tu@email.com",
      ok: "Listo, bienvenido.",
      already: "Ya estás suscrito. ¡Gracias!",
      error: "Algo salió mal. Intentá de nuevo.",
      loading: "...",
    },
    post: {
      readingTime: (t) => t,
      alsoIn: "Read this in English",
      alsoInEs: "Leer en español",
    },
  },
  en: {
    nav: { blog: "In Production", resources: "Resources", talks: "Talks", about: "About", videos: "Videos" },
    switcher: { label: "Language", other: "Español", otherHref: (p) => p },
    footer: { blog: "In Production", resources: "Resources", talks: "Talks", about: "About", videos: "Videos" },
    blog: {
      title: "In Production",
      editions: (n) => `${n} editions`,
      readMore: "Read",
      search: "Search posts",
      all: "All",
    },
    newsletter: {
      subscribe: "Subscribe",
      placeholder: "you@email.com",
      ok: "You're in. Welcome.",
      already: "You're already subscribed. Thanks!",
      error: "Something went wrong. Try again.",
      loading: "...",
    },
    post: {
      readingTime: (t) => t,
      alsoIn: "Leer en español",
      alsoInEs: "Read this in English",
    },
  },
};

/** Metadatos del sitio por idioma. */
export const SITE_I18N: Record<Locale, { title: string; description: string; tagline: string }> = {
  es: {
    title: "Pablo Marichal",
    description:
      "Uruguayo criado en Venezuela. Padre de dos, 19 maratones, 20 años adentro de corporaciones implementando tecnología. Escribo sobre lo que la IA le está haciendo al trabajo y a la gente.",
    tagline:
      "Cada martes: qué está pasando de verdad con la IA en las empresas grandes, escrito por alguien que está adentro implementándola. Sin humo, sin hype, sin vender nada.",
  },
  en: {
    title: "Pablo Marichal",
    description:
      "SAP tech lead. Twenty years inside large enterprises, now leading AI adoption on systems that cannot go down. I write about what AI is actually doing to work, from the inside — not from the news.",
    tagline:
      "Every Tuesday: what is actually happening with AI inside large enterprises, written by someone implementing it there. No hype, nothing to sell.",
  },
};
