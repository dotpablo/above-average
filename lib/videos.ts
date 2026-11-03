// Selección editorial de reels. Títulos y descripciones salen de los captions
// originales de Pablo, no se inventan.
//
// El `id` es el código del reel de Instagram y también el nombre de la miniatura
// en public/images/videos/<id>.jpg. Para sumar un video: correr
// `node scripts/video-thumbs.mjs <id>` y agregar la entrada acá arriba de todo.
//
// El orden del array es el orden de la página: más reciente primero.
export const VIDEO_TOPICS = ["Trabajo e IA", "Correr", "Emigrar", "Vida cotidiana"] as const;

export interface Video {
  /** Código del reel. Define la URL y el archivo de miniatura. */
  id: string;
  title: string;
  description: string;
  topic: (typeof VIDEO_TOPICS)[number];
  featured?: boolean;
}

export const VIDEOS: Video[] = [
  {
    id: "DfKVOvBzmbV",
    title: "No te compares con los runfluencers.",
    description:
      "Para ellos correr es el trabajo. Vos tenés otro trabajo, dos que se despiertan a las 7am y una ventana chiquita antes de que arranque todo. El famoso balance no existe. Existe salir igual.",
    topic: "Correr",
  },
  {
    id: "DfF90bDTEZV",
    title: "Zonas, parte 2: tu Garmin sigue usando las zonas viejas.",
    description:
      "Garmin tiene dos juegos de zonas: las generales y las de correr. Con las de fábrica, un trote a 140 me daba zona 3. Ahora es zona 2. La configuración completa está en la guía gratuita.",
    topic: "Correr",
  },
  {
    id: "DfBPwRyTXEQ",
    title: "El traumatólogo me dijo que dejara de correr.",
    description:
      "Hace 15 años otro me dijo que me iba a tener que coser el tendón de Aquiles. 19 maratones después ahí sigue. Pedí otra opinión: fortalecimiento, movilidad, elíptica y correr menos.",
    topic: "Correr",
  },
  {
    id: "De-rDOgzreZ",
    title: "Mis hijos no se van a acordar de lo que les dije.",
    description: "Se van a acordar de lo que me vieron hacer. El ejemplo mata cualquier relato.",
    topic: "Vida cotidiana",
  },
  {
    id: "De2h5hVz90r",
    title: "Diecisiete segundos de Boston.",
    description:
      "Me faltan Boston y Londres para completar los seis Majors. Para 2027 hizo falta 3:09:43 y mi mejor marca es 3:10. Arranco saliendo de una lesión, y voy a documentar todo: lo que sale y lo que no.",
    topic: "Correr",
  },
  {
    id: "DezyDrczqFV",
    title: "Si corrés sin banda, la frecuencia cardíaca no sirve para nada.",
    description:
      "En el día a día el sensor de la muñeca anda perfecto. Corriendo, es otra historia: me pasó con todos los Fenix que tuve. Si me olvido la banda, vuelvo a casa a buscarla.",
    topic: "Correr",
  },
  {
    id: "De7svWjz_G5",
    title: "Fijate cómo calcula tus zonas tu Garmin.",
    description:
      "Por defecto usa porcentaje de frecuencia máxima, sin saber nada de cómo estás entrenado. Trotaba suave y ya me marcaba zona 4. Lo cambié a umbral de lactato: el umbral se mide.",
    topic: "Correr",
  },
  {
    id: "DefXYKuT1De",
    title: "Cada vez que mejorás algo, perdés a alguien.",
    description:
      "Cuando empecé a correr dejé de ver al 80% de mis amigos. Cero peleas: cambiaron los horarios, los planes y las conversaciones.",
    topic: "Correr",
  },
  {
    id: "DeaRpjTzX4U",
    title: "Mi peor triatlón me cambió la carrera.",
    description:
      "Me paré en cada boya y me agarraron calambres siete veces. Vendí la bici y con esa plata me pagué la certificación de SAP. Lo que no es para vos a veces te paga lo que sí.",
    topic: "Correr",
    featured: true,
  },
  {
    id: "DeXf1V3TTBm",
    title: "Tres disciplinas, y nos ganan al 99% de los que solo corremos.",
    description:
      "Antes estos tipos me hacían sentir un fraude. Hasta que entendí que no corro contra ellos: corro contra el tipo que sería si dejara.",
    topic: "Correr",
  },
  {
    id: "DeVhz2ATpiV",
    title: "No dormís mal. Te despertás mal.",
    description:
      "Siempre pensé que dormía mal por el cansancio o el estrés. Muchas veces era que había visto el sol después que la pantalla.",
    topic: "Correr",
  },
  {
    id: "DeQUB0qTqSZ",
    title: "A los 40 no corrés para mejorar. Corrés para no perder lo que ya tenés.",
    description:
      "Y eso no es resignación. Es la primera vez que entrenar me parece urgente.",
    topic: "Correr",
  },
  {
    id: "DeFYU8YTzG8",
    title: "Los cumpleaños dejaron de importarme hasta que tuve hijos.",
    description:
      "No me da miedo envejecer. Me da miedo perderme momentos en sus memorias.",
    topic: "Vida cotidiana",
    featured: true,
  },
  {
    id: "Dd7ljWfzzMg",
    title: "El Garmin te cuida de más.",
    description:
      "Largué mi último maratón con el body battery en 45 y fue mi segundo mejor tiempo. Las métricas te pueden enloquecer.",
    topic: "Correr",
  },
  {
    id: "Dd16ZMwTtn8",
    title: "Volver de una lesión no tiene nada de épico.",
    description:
      "Son veinte minutos de ejercicios en el piso del gym. El que vuelve no es el que tiene más ganas: es el que aguanta la parte aburrida.",
    topic: "Correr",
  },
  {
    id: "DdW8FaOzwhi",
    title: "Más del 99% de mis amigos viven adentro de este teléfono.",
    description:
      "Lo bueno y lo malo de emigrar es lo mismo: gente para visitar en medio mundo, nadie a veinte minutos.",
    topic: "Emigrar",
  },
  {
    id: "DdNaFiezvmf",
    title: "Para mí es un sábado. Para ellos capaz es un recuerdo.",
    description: "Por eso lo grabo.",
    topic: "Vida cotidiana",
  },
  {
    id: "DdHsRZGzCFH",
    title: "Yo tenía las horas. No tenía la corrección.",
    description: "Nadie se hace experto por solo meter horas en algo.",
    topic: "Correr",
  },
  {
    id: "Dc6ll9oTrGC",
    title: "Cinco cosas sobre irse del país que nadie te dice.",
    description:
      "La nostalgia no es por un país. Es por una versión tuya que ya no existe.",
    topic: "Emigrar",
  },
  {
    id: "Dc1vLAkzD8G",
    title: "Ahorrás tiempo y estás perdiendo criterio.",
    description:
      "El que acepta el primer resultado no ahorró tiempo. Lo pidió prestado.",
    topic: "Trabajo e IA",
    featured: true,
  },
];

export function videoUrl(video: Video): string {
  return `https://www.instagram.com/reel/${video.id}/`;
}

export function videoThumb(video: Video): string {
  return `/images/videos/${video.id}.jpg`;
}
