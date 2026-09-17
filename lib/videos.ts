// Selección editorial: títulos y extractos de los captions originales de Pablo.
// Una pieza por entrada, aunque también se publique en TikTok y Shorts.
export const VIDEO_TOPICS = ["Trabajo e IA", "Correr", "Emigrar", "Vida cotidiana"] as const;

export interface Video {
  id: string;
  title: string;
  description: string;
  topic: (typeof VIDEO_TOPICS)[number];
  url: string;
  featured?: boolean;
}

export const VIDEOS: Video[] = [
  {
    id: "irse-del-pais",
    title: "Cinco cosas sobre irse del país que nadie te dice.",
    description: "La nostalgia no es por un país. Es por una versión tuya que ya no existe.",
    topic: "Emigrar",
    url: "https://www.instagram.com/reel/Dc6ll9oTrGC/",
    featured: true,
  },
  {
    id: "horas-y-correccion",
    title: "Yo tenía las horas. No tenía la corrección.",
    description: "Nadie se hace experto por solo meter horas en algo…",
    topic: "Correr",
    url: "https://www.instagram.com/reel/DdHsRZGzCFH/",
    featured: true,
  },
  {
    id: "ia-y-criterio",
    title: "Estás usando IA para ahorrar tiempo y te está costando criterio.",
    description: "El que acepta el primer resultado no ahorró tiempo. Lo pidió prestado.",
    topic: "Trabajo e IA",
    url: "https://www.instagram.com/reel/Dc1vLAkzD8G/",
    featured: true,
  },
  {
    id: "amigos-en-el-telefono",
    title: "Más del 99% de mis amigos viven adentro de este teléfono.",
    description: "Lo bueno y lo malo de emigrar es lo mismo: gente para visitar en medio mundo, nadie a veinte minutos.",
    topic: "Emigrar",
    url: "https://www.instagram.com/reel/DdW8FaOzwhi/",
  },
  {
    id: "volver-a-correr",
    title: "No tengo que correr rápido, tengo que volver a correr.",
    description: "Estoy guardando las zapatillas de competir. Lo que más me costó no fue la rodilla.",
    topic: "Correr",
    url: "https://www.instagram.com/reel/DdUZeH1TLd2/",
  },
  {
    id: "recuerdos",
    title: "Para mí es un sábado. Para ellos capaz es un recuerdo.",
    description: "Por eso lo grabo.",
    topic: "Vida cotidiana",
    url: "https://www.instagram.com/reel/DdNaFiezvmf/",
  },
];
