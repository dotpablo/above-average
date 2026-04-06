import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obsidian + Claude: Tu segundo cerebro",
  description:
    "Guía práctica para armar tu segundo cerebro en 30 minutos. Obsidian captura y conecta. Claude piensa con vos. Juntos extienden tu capacidad cognitiva.",
};

function Section({ label, title, subtitle, children }: {
  label: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">{label}</p>
        <h2 className="mt-1 font-serif text-2xl text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50">
      <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap">
        {children}
      </pre>
    </div>
  );
}

function PromptBlock({ label, children }: { label: string; children: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 px-5 py-3">
        <p className="text-xs text-neutral-500">{label}</p>
      </div>
      <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap">
        {children}
      </pre>
    </div>
  );
}

export default function ObsidianClaudePage() {
  return (
    <div className="space-y-16">

      {/* Header */}
      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">Recurso gratuito</p>
        <h1 className="font-serif text-4xl text-white sm:text-5xl">
          Obsidian + Claude: Tu segundo cerebro
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl">
          La mayoría usa Obsidian para tomar notas. Un grupo chico descubrió cómo convertirlo en un sistema que piensa con vos usando Claude. La diferencia no es habilidad técnica. Es pensamiento sistémico.
        </p>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 text-sm text-neutral-500 space-y-1">
          <p className="text-neutral-300 font-medium">Lo que necesitás antes de arrancar:</p>
          <ul className="space-y-1 mt-2">
            <li>
              <a href="https://obsidian.md/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Obsidian</a>
              {" "}— gratis, disponible para Mac, Windows, Linux, iOS y Android.
            </li>
            <li>
              <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Claude</a>
              {" "}— cuenta gratuita funciona.{" "}
              <a href="https://claude.ai/upgrade" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Claude Pro</a>
              {" "}($20/mes) te da más capacidad.
            </li>
            <li>30 minutos sin distracciones.</li>
          </ul>
        </div>
      </header>

      {/* Qué es */}
      <Section label="Concepto" title="Qué es realmente un segundo cerebro">
        <div className="space-y-4 text-sm text-neutral-400 leading-relaxed">
          <p>
            El término se usa mucho pero casi siempre significa "una app de notas más linda". No es de eso de lo que hablo.
          </p>
          <p>Un segundo cerebro real hace tres cosas que una app de notas no puede:</p>
          <div className="space-y-3">
            {[
              { n: "1", title: "Captura todo sin fricción", desc: "para que nada importante se pierda." },
              { n: "2", title: "Conecta información entre áreas distintas", desc: "de tu vida y trabajo para que emerjan patrones que nunca verías manualmente." },
              { n: "3", title: "Te ayuda a pensar", desc: "no solo a almacenar lo que ya pensaste." },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <span className="shrink-0 font-serif text-2xl text-neutral-700">{item.n}</span>
                <p><span className="text-white font-medium">{item.title}</span> {item.desc}</p>
              </div>
            ))}
          </div>
          <p>
            Obsidian resuelve las dos primeras. Claude resuelve la tercera. Juntos crean algo que genuinamente extiende tu capacidad cognitiva.
          </p>
        </div>
      </Section>

      {/* Paso 1 */}
      <Section label="Paso 1 — 5 minutos" title="Estructura tu vault">
        <div className="space-y-5 text-sm text-neutral-400">
          <p>Olvidate de crear 47 carpetas. La estructura que funciona tiene cuatro:</p>
          <div className="overflow-hidden rounded-xl border border-neutral-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500">Carpeta</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500">Para qué</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {[
                  { folder: "Inbox", desc: "Todo lo que capturás cae acá primero. Ideas, citas, artículos, notas de voz. Sin fricción." },
                  { folder: "Notes", desc: "Notas procesadas y permanentes. Ideas que ya pensaste y conectaste con otras." },
                  { folder: "Projects", desc: "Trabajo activo. Cada proyecto con su nota que enlaza a todo lo relevante." },
                  { folder: "Archive", desc: "Proyectos terminados y notas inactivas que querés conservar." },
                ].map((r) => (
                  <tr key={r.folder}>
                    <td className="px-4 py-3 font-medium text-neutral-300 whitespace-nowrap">{r.folder}</td>
                    <td className="px-4 py-3 text-neutral-500">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="font-medium text-neutral-300 mb-3">Tres plugins esenciales</p>
            <p className="text-neutral-600 text-xs mb-3">Obsidian → Settings → Community Plugins → Browse</p>
            <div className="space-y-2">
              {[
                { name: "Dataview", href: "https://github.com/blacksmithgu/obsidian-dataview", desc: "Consultá tu vault como una base de datos. Ej: \"mostrá todas las ideas taggeadas en los últimos 30 días\"." },
                { name: "Templater", href: "https://github.com/SilentVoid13/Templater", desc: "Templates automáticos con fecha, tags y estructura para que cada nota arranque bien." },
                { name: "Canvas", href: null, desc: "Viene incluido en Obsidian. Workspace visual para ver conexiones entre ideas espacialmente." },
              ].map((p) => (
                <div key={p.name} className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-3 flex gap-3">
                  <span className="shrink-0 font-medium text-white w-20">
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">{p.name}</a>
                    ) : p.name}
                  </span>
                  <span className="text-neutral-500">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Paso 2 */}
      <Section label="Paso 2 — El más importante" title="El hábito de captura diaria">
        <div className="space-y-5 text-sm text-neutral-400 leading-relaxed">
          <p>
            La parte más importante del sistema no es la herramienta. Es la disciplina de capturar todo.
          </p>
          <p>
            Instalá la{" "}
            <a href="https://obsidian.md/mobile" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">app móvil de Obsidian</a>
            {" "}y conectala al mismo vault vía iCloud o{" "}
            <a href="https://obsidian.md/sync" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Obsidian Sync</a>.
            Cuando una idea te pega mientras corrés, mientras leés, mientras escuchás — la tirás al Inbox en 10 segundos.
          </p>
          <div>
            <p className="font-medium text-neutral-300 mb-2">Template de nota diaria (configuralo en Templater)</p>
            <CodeBlock>{`# {{date}}

## Qué quiero lograr hoy

## Qué capturé ayer que necesito procesar

## En qué estoy pensando sobre mis proyectos activos

## Observaciones del día`}</CodeBlock>
          </div>
          <p>
            Esta nota diaria es el tejido conectivo de tu vault. Linka a tus proyectos, captura ideas nuevas, y crea un log buscable de cómo evoluciona tu pensamiento.
          </p>
        </div>
      </Section>

      {/* Paso 3 */}
      <Section label="Paso 3" title="Conectá Claude a tu vault">
        <div className="space-y-6 text-sm text-neutral-400 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-medium text-white">Método simple: copy-paste con intención</h3>
            <p>Suena básico pero es donde la mayoría debería empezar.</p>
            <p>
              Cuando tenés que pensar un problema complejo o escribir algo difícil, abrí las notas relevantes de tu vault y pegá el contexto directamente en una conversación con Claude. Dale el background. Dale tus notas acumuladas sobre el tema. Pedile que te ayude a pensar: identificar huecos en tu razonamiento, hacer conexiones que no viste, desafiar supuestos que estás dando por sentados.
            </p>
            <p>Claude con contexto completo de tu vault es dramáticamente más útil que Claude sin contexto.</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-white">Método avanzado: Claude Code con acceso al vault</h3>
            <p>
              Si usás{" "}
              <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Claude Code</a>,
              podés darle acceso directo a la carpeta de tu vault. Lee notas, actualiza notas, crea notas nuevas basadas en conversaciones, y busca conexiones en todo tu vault.
            </p>
            <p>Creá un archivo <code className="text-neutral-300 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code> en la raíz de tu vault:</p>
            <CodeBlock>{`# Mi Vault de Obsidian — Contexto para Claude

## Estructura
- /Inbox — Capturas sin procesar
- /Notes — Notas permanentes procesadas
- /Projects — Espacios de trabajo activos
- /Archive — Trabajo completado

## Proyectos activos
[Listá tus 3-5 proyectos más activos]

## Convenciones
- Uso [[doble corchete]] para links internos
- Tags con #tema para filtrar
- Notas diarias en formato YYYY-MM-DD

## Cómo quiero que Claude me ayude
- Conectar ideas entre notas que yo no vi
- Desafiar mi razonamiento cuando no se sostiene
- Desarrollar capturas del inbox en notas permanentes
- Surfacear notas relevantes cuando trabajo en un problema`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Paso 4 */}
      <Section label="Paso 4" title="Los 4 workflows que cambian todo">
        <div className="space-y-4">
          {[
            {
              name: "Briefing matutino",
              prompt: `"Revisá mis capturas de ayer. Identificá las 3 ideas más importantes para desarrollar. Chequeá si conectan con notas que ya tengo sobre [TEMAS]. Sugerí qué priorizar hoy según mis proyectos activos."`,
              desc: "Pegá tu nota diaria + las capturas de ayer.",
            },
            {
              name: "Desarrollo de ideas",
              prompt: `"Acá hay una idea cruda: [IDEA]. Acá las notas relacionadas que ya tengo: [NOTAS]. Ayudame a desarrollar esto en una nota permanente. ¿Cuál es el insight central? ¿Qué implica? ¿Qué preguntas abre? ¿Qué la fortalece o debilita?"`,
              desc: "Cuando tenés una idea cruda en el Inbox que querés desarrollar.",
            },
            {
              name: "Buscador de conexiones",
              prompt: `"Acá hay notas de áreas distintas de mi trabajo: [NOTAS]. ¿Qué conexiones no obvias ves? ¿Hay patrones que me estoy perdiendo? ¿Hay contradicciones entre mi pensamiento en distintas áreas?"`,
              desc: "Ejecutalo una vez por semana con tus notas más activas.",
            },
            {
              name: "Acelerador de escritura",
              prompt: `"Acá están todas mis notas sobre [TEMA]. Necesito escribir un [FORMATO] de aproximadamente [LARGO] para [AUDIENCIA]. Primero identificá las ideas más importantes. Después estructuralas en un outline lógico. Después identificá qué falta para que esto sea significativamente mejor."`,
              desc: "Juntá todas las notas relevantes antes de escribir algo largo. Convierte horas de preparación en 20 minutos.",
            },
          ].map((w) => (
            <div key={w.name} className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-800">
                <h3 className="font-medium text-white">{w.name}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{w.desc}</p>
              </div>
              <pre className="p-5 text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap overflow-x-auto">
                {w.prompt}
              </pre>
            </div>
          ))}
        </div>
      </Section>

      {/* Cierre */}
      <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 p-6 space-y-3">
        <h2 className="font-serif text-xl text-white">Lo más importante</h2>
        <div className="space-y-3 text-sm text-neutral-400 leading-relaxed">
          <p>El sistema solo funciona si lo usás todos los días.</p>
          <p>No perfecto. No exhaustivo. Consistente.</p>
          <p>
            Diez minutos de captura y procesamiento cada mañana compuestos durante meses generan algo extraordinario. El que construye este sistema y lo usa consistentemente piensa con más claridad, escribe con más facilidad, y hace conexiones más rápido de lo que jamás podría solo.
          </p>
          <p className="text-neutral-600">El que lo arma y lo abandona tiene una estructura de carpetas más linda.</p>
          <p className="font-medium text-white">Construí primero el hábito. Después optimizá el sistema alrededor del hábito.</p>
        </div>
      </div>

      {/* CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-3">Above Average</p>
        <h2 className="font-serif text-2xl text-white">Cada martes: sistemas, IA y cómo no quedar obsoleto.</h2>
        <p className="mt-2 text-sm text-neutral-500 max-w-md">
          Los suscriptores reciben los recursos nuevos antes de que se publiquen acá.
        </p>
        <div className="mt-5 max-w-md">
          <NewsletterForm />
        </div>
      </section>

    </div>
  );
}
