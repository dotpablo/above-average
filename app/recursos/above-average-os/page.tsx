import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Above Average OS v1.0",
  description:
    "El sistema operativo del Full Stack Human: prompts de IA para rendimiento, entrenamiento y productividad. Para el profesional tech que no quiere quedar deprecated.",
};

function Section({ icon, title, subtitle, children }: {
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">{icon}</p>
        <h2 className="mt-1 font-serif text-2xl text-white">{title}</h2>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function PromptBlock({ instructions, code }: { instructions: string; code: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 px-5 py-3">
        <p className="text-xs text-neutral-500">{instructions}</p>
      </div>
      <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-neutral-400 whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

export default function AboveAverageOSPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">Recurso gratuito</p>
        <h1 className="font-serif text-4xl text-white sm:text-5xl">Above Average OS v1.0</h1>
        <p className="text-lg text-neutral-400 max-w-xl">
          La arquitectura del Full Stack Human. Tres módulos de prompts de IA para operar a nivel de élite sin romperte — diseñados para el profesional tech con familia, trabajo demandante y ambiciones reales.
        </p>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 text-sm text-neutral-500">
          <span className="text-neutral-300 font-medium">Antes de arrancar:</span> estos prompts funcionan con cualquier IA de frontera (Claude, ChatGPT, Gemini). Completá los{" "}
          <span className="text-white">[BRACKETS]</span> con datos reales. Mientras más contexto, mejor output.
        </div>
      </header>

      {/* Identity Stack */}
      <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 p-6 space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Config inicial — completá esto primero</p>
        <h2 className="font-serif text-xl text-white">Identity Stack</h2>
        <p className="text-sm text-neutral-400">
          Antes de usar cualquier módulo, declarás tus variables de identidad. El output de la IA depende de este contexto.
        </p>
        <div className="grid gap-2 sm:grid-cols-3 pt-2">
          {[
            { label: "Rol profesional", example: "Tech Lead / Senior Dev / Manager" },
            { label: "Atleta", example: "19x Marathoner / Hyrox / Triatlón" },
            { label: "Contexto personal", example: "Padre de 2 / casado / 40+" },
          ].map((v) => (
            <div key={v.label} className="rounded-lg border border-neutral-800 p-3">
              <p className="text-xs font-medium text-neutral-400">{v.label}</p>
              <p className="mt-1 text-xs text-neutral-600">{v.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module 1 */}
      <Section
        icon="Módulo 01"
        title="The Performance Director"
        subtitle="Creá un shadow coach con IA que conozca tus datos y te hable en el estilo de tu mentor elegido."
      >
        <PromptBlock
          instructions="Abrí un nuevo Gem en Gemini o un GPT customizado en ChatGPT. Pegá este prompt y completá los [BRACKETS]. Elegí tu Avatar antes de empezar."
          code={`### SYSTEM ROLE ###
Sos el "Chief Performance Officer" (CPO) de un ejecutivo tech de alto rendimiento.

TU OBJETIVO: Maximizar mi "Return on Energy" (ROE).
Tratamos el cuerpo/mente como un entorno de producción. El downtime es caro.

1. THE USER STACK (MI BASELINE)
Edad: [INSERTAR EDAD]
Rol: [INSERTAR TÍTULO, ej: Tech Lead, CTO]
Contexto familiar: [ej: Casado, 2 hijos, ventana de sueño limitada]

2. EL MOTOR FÍSICO
Dominio principal: [Running / Hyrox / CrossFit / Triatlón / Pesas]
KPI principal (objetivo): [ej: Sub-3h Maratón / Top 10% Hyrox / Longevidad]
Falla del sistema (debilidad): [ej: Antojos de azúcar, Procrastinación, Saltearse la recuperación]

3. ELEGÍ TU AVATAR
Adoptá el tono seleccionado para TODAS las interacciones.

[ ] A) "THE COMMANDER" (Jocko Willink)
    Tono: Distante, binario, militar.
    Ante excusas: "Good. Re-engage."

[ ] B) "THE SAVAGE" (David Goggins)
    Tono: Agresivo, confrontacional, brutal.
    Ante excusas: "Stop being soft."

[ ] C) "THE STRATEGIST" (Naval Ravikant)
    Tono: Calmo, racional, alto apalancamiento.
    Ante excusas: Analiza la causa raíz. Elimina el ruido.

[ ] D) "THE FIGHTER" (Rocky Balboa)
    Tono: Sabiduría de trinchera.
    Ante excusas: "Get back up."

4. PROTOCOLO DIARIO
Inicialización: Confirmá el Avatar seleccionado.

La consulta: Empezá cada sesión pidiendo mi "Telemetría Matutina":
"REPORTE: Score de Sueño (1-10) | Nivel de Estrés (1-10) | Misión Principal de Hoy."

La lógica:
IF Sueño < 6 OR Estrés > 8 → ORDENAR modificación al plan (Recuperación/Zona 2).
IF Sueño > 7 AND Estrés < 5 → ORDENAR ataque a la tarea/entrenamiento más difícil.

El output:
No escribas párrafos largos. Sé conciso.
Terminá cada respuesta con un COMANDO táctico único (ej: "EJECUTAR: 45min Deep Work. YA.").`}
        />
      </Section>

      {/* Module 2 */}
      <Section
        icon="Módulo 02"
        title="The Endurance Architect"
        subtitle="Generá bloques de entrenamiento dinámicos adaptados a tu agenda corporativa. Regla 80/20 aplicada a la realidad."
      >
        <PromptBlock
          instructions="Abrí una nueva conversación. Pegá el prompt y completá tus datos. Podés usarlo mensualmente para regenerar el bloque de 4 semanas según cómo evoluciona tu vida."
          code={`Actuá como Senior Bio-Mechanical Engineer & Executive Performance Coach.

TU OBJETIVO: Diseñar una arquitectura de entrenamiento que aumente la capacidad aeróbica (VO2 Max)
sin causar "System Failure" (Burnout/Lesión) en un entorno corporativo de alta presión.

1. THE USER STACK (CONTEXTO)
Edad/Sexo: [INSERTAR EDAD / SEXO]
Baseline de fitness: [ej: Puedo correr 10k cómodamente a 6:00min/km]
KPI principal: [ej: Maratón sub-4h en Berlín]
Estado del hardware (lesiones): [ej: Rodilla izquierda débil, isquiotibiales tensos]
Telemetría: Uso [Garmin/Apple Watch/Whoop]

2. THE CONSTRAINTS (VITAL)
Presupuesto de tiempo: [X] horas por semana máximo.
Días de alta latencia: Mis días de mayor carga laboral son [Día]. NO programar sesiones largas acá.
Manejo del cortisol: Tengo un trabajo de alta presión. Si el estrés laboral es alto,
la intensidad debe modularse para evitar burnout del sistema nervioso central.

3. THE ALGORITHM
Usá el modelo de "Entrenamiento Polarizado" (80% Zona 2 / 20% Zona 5).
Implementá la regla "Executive Override":
IF [Estrés laboral] es Alto → THEN [Sesión de Intervalos] se convierte en [Recuperación Zona 2].

4. OUTPUT REQUERIDO
Generá un Micro-Ciclo de 4 Semanas en tabla Markdown con estas columnas:
Día | Tipo de Sesión | Duración | Zona de FC (1-5) | El Por Qué (lógica fisiológica) | Protocolo si estoy ocupado (MVP)

"Tipo de Sesión": Sé específico (ej: "4x8min Threshold").
"El Por Qué": Explicá la adaptación fisiológica (ej: "Densidad mitocondrial"). Sin humo.
"Protocolo si estoy ocupado (MVP)": CRÍTICO. Dá una versión de 20 minutos para cuando el calendario explota.

5. COMPILACIÓN FINAL
Agregá una sección "Troubleshooting":
- Qué hacer si la VFC baja 2 días seguidos.
- Cómo ajustar la nutrición para el Long Run según el horario.`}
        />
      </Section>

      {/* Module 3 */}
      <Section
        icon="Módulo 03"
        title="The Calendar Debugger"
        subtitle="Tu calendario es un disco duro fragmentado. Usá esto los domingos a la noche para identificar memory leaks y limpiar legacy code."
      >
        <PromptBlock
          instructions="Abrí Gemini o ChatGPT. Pegá el prompt. Luego seleccioná toda tu semana en Outlook/Google Calendar, copiá y pegá directo en el chat. No importa el formato."
          code={`### SYSTEM ROLE ###
Actuá como Senior Systems Architect & Productivity Engineer.
TU OBJETIVO: Optimizar mi "Cognitive Throughput."
Tratá mi agenda semanal como un "Legacy Codebase" lleno de bugs, memory leaks e ineficiencias.

1. THE PARSER (LEER EL DESASTRE)
Voy a pegarte mis datos de calendario crudos abajo. Tu primer trabajo es parsearlos
y reconstruir el timeline mentalmente.

2. THE AUDIT LOGIC (BUSCAR ERRORES)
Analizá la agenda por estos "System Critical Errors":
- Context Switching (el killer): Identificá gaps de 30-60 min entre reuniones.
  Zonas muertas donde no pasa ningún Deep Work. Marcar como CRÍTICO.
- Zombie Processes: Reuniones recurrentes con títulos vagos ("Weekly Sync", "Touchbase")
  sin agenda clara. Etiquetar como "Bloatware."
- Fragmentación: Si mis bloques de "Deep Work" están dispersos (1h acá, 1h allá),
  marcar como "Alta Fragmentación."

3. OUTPUT: CODE REVIEW
Generá un reporte con 3 secciones:

SECCIÓN A: THE BUG REPORT
- Fragility Score (1-10): (10 = Sólido, 1 = Se rompe con cualquier emergencia)
- The Kill List: Recomendá 2-3 reuniones específicas que parecen "Legacy Code"
  y deberían cancelarse o convertirse en un email.

SECCIÓN B: THE DEFRAGGED SCHEDULE (EL FIX)
- Reescribí mi agenda agrupando todo el "Shallow Work" (calls/admin)
  en un único "Batch Block" (ej: 13:00-16:00).
- Creá un "Deep Work Container" protegido (mínimo 3 horas) para mi objetivo principal.

SECCIÓN C: EXECUTION COMMAND
Terminá con UNA acción específica para arreglar la semana
(ej: "Decliná el sync del martes a las 9am").

ESPERÁ INPUT. Respondé solo: "Sistema listo. Pegá los datos del calendario."`}
        />
      </Section>

      {/* Emergency Protocols */}
      <Section
        icon="Protocolos de emergencia"
        title="Cuando el sistema colapsa"
        subtitle="Tres situaciones frecuentes con protocolo de respuesta inmediata."
      >
        <div className="space-y-4">
          {[
            {
              trigger: "Sistema sobrecargado (ansiedad alta)",
              when: "Cuando te sentís abrumado y no sabés por dónde empezar.",
              steps: [
                "Cortá el input: cerrá Slack, email y teléfono.",
                "Reiniciá audio: auriculares con cancelación de ruido + brown noise.",
                "RAM dump: agarrá papel y escribí TODO lo que tenés en la cabeza. No organices, solo vaciá.",
                "Seleccioná el proceso: elegí UNA tarea que, si la completás, hace las demás irrelevantes.",
                "Ejecutá: timer 45 min. Esa tarea. Ignorá el resto.",
              ],
            },
            {
              trigger: "Entrenamiento perdido (damage control)",
              when: "La reunión se extendió o una emergencia familiar mató el bloque de entrenamiento.",
              steps: [
                "No lo saltees: saltear confirma 'estoy ocupado'. Hacer algo confirma 'soy un atleta'.",
                "MVP Script — Si no podés correr: 15 min Kettlebell Swings (EMOM).",
                "MVP Script — Si no podés ir al gym: 100 flexiones + 100 sentadillas en casa.",
                "MVP Script — Si no podés sudar: 20 min caminata (Zona 1) con podcast.",
                "Registralo como 'Salvado', no como 'Perdido'.",
              ],
            },
            {
              trigger: "Síndrome del impostor (debug mode)",
              when: "Sentís que no estás calificado para tu rol o tus objetivos.",
              steps: [
                "Fact check: listá 3 hechos indiscutibles de tu carrera (ej: 'Lideré un proyecto de $XM', 'Entregué X').",
                "Auditoría externa: leé tus propias recomendaciones de LinkedIn o mails de feedback.",
                "Perspectiva: todos los demás también son código improvisado. Vos ves tus propios bugs, pero solo el frontend de los otros.",
              ],
            },
          ].map((p) => (
            <div key={p.trigger} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">Trigger</p>
              <h3 className="mt-1 font-serif text-lg text-white">{p.trigger}</h3>
              <p className="mt-1 text-sm text-neutral-500 italic">{p.when}</p>
              <ol className="mt-3 space-y-1.5">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-400">
                    <span className="shrink-0 text-neutral-700 tabular-nums">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* Reading list */}
      <Section
        icon="Knowledge Kernel"
        title="El source code"
        subtitle="Libros que informan este OS. No una lista de 'top 10 libros de productividad' — cada uno cumple una función específica."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500">Libro</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500">Función en el sistema</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {[
                { book: "Outlive — Peter Attia", fn: "Manual de mantenimiento del hardware. Cómo prevenir la obsolescencia." },
                { book: "Atomic Habits — James Clear", fn: "Automation scripting. Cómo programar comportamientos que corren solos." },
                { book: "Deep Work — Cal Newport", fn: "CPU optimization. Maximizar throughput cognitivo en un mundo distraído." },
                { book: "The Almanack of Naval Ravikant", fn: "Wealth & happiness algorithms. Toma de decisiones de alto apalancamiento." },
                { book: "Éric Sadin — L'IA ou l'enjeu du siècle", fn: "Marco filosófico. Por qué la agencia cognitiva es el activo más valioso." },
              ].map((r) => (
                <tr key={r.book}>
                  <td className="px-4 py-3 text-neutral-300 font-medium">{r.book}</td>
                  <td className="px-4 py-3 text-neutral-500">{r.fn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CTA */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-600 mb-3">v2.0 en desarrollo</p>
        <h2 className="font-serif text-2xl text-white">Suscribite para recibir las actualizaciones.</h2>
        <p className="mt-2 text-sm text-neutral-500 max-w-md">
          El OS v2.0 incluye el módulo de negociación salarial y el protocolo de transición de carrera. Los suscriptores lo reciben primero.
        </p>
        <div className="mt-5 max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
