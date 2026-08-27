import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
import { NEWSLETTER } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Uruguay, Venezuela, Uruguay otra vez. Veinte años adentro de corporaciones, 19 maratones y dos hijos. La historia de Pablo Marichal.",
};

export default function AboutPage() {
  return (
    <div className="space-y-14">
      {/* Apertura: la bici. Una decision concreta con costo real, no una fecha de nacimiento. */}
      <FadeIn>
        <section className="space-y-4">
          <h1 className="font-serif text-3xl text-white">Pablo Marichal</h1>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            En 2014, estaba en Venezuela entrenando para triatlón y trabajando como Full Stack Developer. No me fue muy bien en mis aventuras en ese mundo. Tenía una bicicleta de competencia en la que había invertido tiempo y esfuerzo. Al mismo tiempo estaba buscando salir de una zona de confort y mediocridad donde me encontraba, y vi que SAP era la puerta a mi siguiente nivel profesional. Evalué el costo de la certificación y tomé la decisión: vendí la bici.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            No fue un sacrificio dramático. Fue una apuesta calculada — y definitivamente el triatlón no era lo mío, al menos en ese momento. Eso es lo que entiendo por sistema: identificar el recurso correcto, moverlo al lugar correcto, en el momento correcto. Esa decisión abrió la puerta que me trajo hasta acá.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">El origen</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Nací en Uruguay en 1980 y me mudé tres veces antes de tener edad para opinar: a los 2 años a Venezuela, a los 4 de vuelta a Uruguay, a los 10 a Venezuela otra vez. Ahí me quedé. Ahí crecí, estudié Ingeniería en Informática y Gerencia de Proyectos, y ahí armé una vida entera.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Salir de Venezuela en enero de 2018 no fue una emigración más. Era escapar del desastre: el país era un caos.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Quien me despidió fue mi esposa. Nos volvimos a encontrar dos o tres meses después, cuando ya me había instalado acá. Llegué a casa de mi hermana, viví ahí un mes y después me fui a alquilar algo cerca de mi trabajo, que arranqué casi ganando como un junior. Lo agarré porque era lo mío, SAP, y ahí pude empezar a proyectarme nuevamente.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Trámites, no muchos: al ser uruguayo se me hizo muy fácil todo. Pero era borrón y cuenta nueva. Haberme despedido de una vida, regalado casi todas las cosas porque venderlas era casi ridículo. Casa, auto, mis libros.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Con los libros sentí como la escena de esa película donde los queman. Yo no los quemé: los publiqué, y la gente se los llevaba por un precio que daba risa. Algo así como diez libros por el precio de un café acá en Uruguay.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Lo más complicado es rehacerse y salir adelante. Algo que siempre tuve en mente fue el dicho de Naval: que si te sueltan en una sociedad con nada más que tus conocimientos, en cinco años o menos podés volver a estar como estabas, o incluso mejor. Eso me pasó. Este reboot costó, pero se logró.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white">El trabajo</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Hace más de 20 años que trabajo en tecnología enterprise, los últimos como tech lead en corporaciones grandes. Lidero adopción de IA en equipos que mueven procesos críticos y presento en inglés frente a comités ejecutivos. Todo lo que escribo sale de ahí adentro, no de leer noticias.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">El cuerpo es el plazo</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Empecé a correr en 2010 porque había ganado peso y quería un cambio real. Me lo tomé en serio: ese año corrí una media maratón, una maratón completa, y en septiembre mi primer Major: Berlín.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Hoy van 19 maratones — Berlín (2), Chicago (2), New York, Tokyo, Buenos Aires (5), Caracas (5), Punta del Este, Montevideo (2) — en camino a las 6 World Majors y trabajando para bajar de las 3 horas.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Le aplico al cuerpo la misma lógica que a un sistema que tiene que durar años: núcleo estándar — sueño, nutrición, movimiento —, sin personalizaciones tóxicas encima. Para sostener equipos en situaciones críticas necesitás una máquina que aguante. Sin eso, sos un sistema zombie esperando caerse.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white">Por qué escribo esto</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            El filósofo Éric Sadin habla de la <em>vegetalización de la humanidad</em>: delegar tanta agencia cognitiva a los algoritmos que terminamos siendo nodos pasivos del sistema, no agentes. Lo veo todos los días en el mundo corporativo: gente que copia prompts sin entender lo que ejecuta, managers que creen que Copilot reemplaza el criterio, juniors que no saben debuggear porque nunca aprendieron el error de raíz.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Contra eso escribo cada martes: qué está pasando de verdad con la IA adentro de las empresas grandes, sin humo y sin hype. Eso es <strong className="text-neutral-200">{NEWSLETTER.name}</strong>.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            <strong className="text-neutral-200">Above Average</strong> es otra cosa: el sistema al que fui llegando por el camino, y el libro en el que lo estoy escribiendo. Tres capas — el kernel biológico (el cuerpo en forma), las extensiones técnicas (IA, SAP, arquitectura) y la soberanía cognitiva (juicio propio que ninguna IA puede reemplazar). La v1.0 está publicada y es gratuita, en <a href="/recursos/above-average-os" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Recursos</a>.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">Para Max y Mía</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Escribo esto también para mis hijos. Para que un día, cuando sean adultos y el mundo vuelva a cambiar de formas que no imagino, encuentren acá un registro de cómo su viejo navegó la incertidumbre sin paralizarse.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            No porque fuera especial. Porque tenía sistemas y los uso todos los días.
          </p>
        </section>
      </FadeIn>

      {/* Newsletter CTA */}
      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <p className="mb-1 text-sm font-medium text-white">{NEWSLETTER.name}</p>
          <p className="mb-4 text-sm text-neutral-500 tracking-[-0.01em]">
            {NEWSLETTER.tagline}
          </p>
          <div className="max-w-md">
            <NewsletterForm />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
