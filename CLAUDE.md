# CLAUDE.md

Sitio personal de Pablo Marichal, en pablomarichal.com.
Next.js 16 App Router, SSG puro, MDX como fuente de verdad, deploy en Vercel.

**Arquitectura de marca** (refactor de agosto 2026 — el sitio es la persona, no la marca):

| Qué | Nombre | Dónde vive |
|---|---|---|
| El sitio / el paraguas | Pablo Marichal | `SITE` en `lib/constants.ts` |
| El newsletter y blog enterprise | In Production | `NEWSLETTER` en `lib/constants.ts`, `/blog` |
| El producto (OS) y el futuro libro | Above Average | `/recursos/above-average-os` |

Regla de decisión: si un texto solo tiene sentido para alguien que ya trabaja en SAP, va en
In Production. Si tiene sentido para cualquier profesional de 40+, va en el sitio.

Dos cosas que no se deshacen sin que Pablo lo pida:

- El About **no identifica al empleador**. Nada de cargo exacto, empresa, premios internos ni
  nacionalidad de los directivos. La versión vigente dice "tech lead en corporaciones grandes".
- Desde noviembre 2026 el newsletter se llama **In Production** en los dos idiomas y se escribe
  primero en inglés (desde la edición 50; la versión en español es traducción). Las ediciones
  viejas cierran con **"Pablo / En Producción"** y quedan así: es el nombre que tenía cuando
  salieron. Las nuevas firman solo "Pablo". Los usos de "Above Average" *dentro* de la prosa son otra
  cosa: ahí es el concepto/producto y quedan como están. No tocar la prosa de Pablo.

El `README.md` documenta la arquitectura y el porqué de las decisiones. Este archivo cubre lo que
no se deduce leyendo el código: convenciones, contratos y trampas conocidas.

## Comandos

```bash
npm run dev            # desarrollo
npm run build          # build de producción (falla si un MDX tiene frontmatter roto)
npm run lint
python3 .claude/skills/publicar-articulo/validar.py   # consistencia de los índices
python3 bin/bitacora-backfill.py --resumen            # sesiones registradas en la bitácora
```

## Bitácora

Todo lo que se habla en este repo queda en `notas/bitacora.md` (gitignoreado: es conversación en
crudo, no contenido del sitio). Lo escribe un hook `Stop` definido en `.claude/settings.json` que
corre `bin/bitacora.py` al final de cada respuesta: lee el transcript de la sesión, saca el
intercambio nuevo sin tool calls ni razonamiento interno y lo agrega.

El histórico anterior al hook (junio–octubre 2026) se reconstruyó con `bin/bitacora-backfill.py`
desde los transcripts que Claude Code guarda en `~/.claude/projects/`. Ese script reescribe el
archivo completo y resiembra `.bitacora-state.json`, así que sirve para regenerar todo si la
bitácora se corrompe o se borra. Mismo patrón que el proyecto del libro en `../libro`.

## Contenido

`content/posts/*.mdx` es la fuente de verdad. No hay base de datos. Todo se lee en build time
desde `lib/posts.ts`.

Frontmatter (contrato con `lib/posts.ts` — `title`, `date` y `description` son los que importan;
el resto tiene default):

```yaml
title: "..."          # string
date: "YYYY-MM-DD"    # string entre comillas, no fecha YAML
description: "..."    # sale en el listado, el OG y el email
source: "linkedin"    # "linkedin" | "substack" — origen del archivo, no afecta el render
category: "..."       # pilar editorial, ver tabla abajo
archived: true        # opcional; lo oculta del sitio sin borrarlo
```

`category` usa artículo en dos de los cuatro pilares. Respetar el valor literal:

| Pilar | Valor en `category` |
|---|---|
| Enterprise & AI Survival | `Enterprise & AI Survival` |
| Builder Mindset | `The Builder Mindset` |
| Biological Clean Core | `Biological Clean Core` |
| Full Stack Human | `The Full Stack Human` |

`content/posts-en/` son traducciones al inglés, usadas por `scripts/export-ghost.mjs` para importar
a Substack. **No se renderizan en el sitio.** Hay 3 traducciones sueltas dentro de `content/posts/`
(la bici, el ERP zombie, la hora-hombre) que sí se renderizan: son legacy, no un patrón a repetir.

## Publicar una edición

Usar el skill **`publicar-articulo`** (`.claude/skills/publicar-articulo/`). Crea el `.mdx` y
actualiza `INDICE.md` + `indice-completo.json`, que son el índice curado de las 39 ediciones
(tesis, temas, fuentes, referencias cruzadas y solapamiento temático entre ediciones).

Los índices se mantienen a mano con criterio, no se autogeneran: la tesis y el solapamiento
requieren leer el texto. Si tocás un post publicado, revisá si el índice queda desactualizado.

Deploy y email: `node scripts/publish.mjs <slug> [--draft|--send|--schedule <ISO>]`.
Hace git push (Vercel despliega solo) y crea el email en Buttondown. **En pausa desde noviembre
2026:** el newsletter se dejó de mandar por email y el sitio quedó como blog.

- **Default `--draft`.** `--send` manda el email a la lista y es irreversible: solo si Pablo lo pide.
- `publish.mjs` stagea únicamente `content/posts/<slug>.mdx` y `public/images/posts/`. Si querés que
  los índices entren en el mismo commit, `git add INDICE.md indice-completo.json` **antes** de correrlo.
- Requiere `BUTTONDOWN_API_KEY` en `.env.local`.

## Diseño

Dark mode únicamente, sin toggle. Tokens en `app/globals.css` (`@theme` de Tailwind v4, no
`tailwind.config.js`):

- `--color-accent: #D4A853` → `text-accent`, `border-accent`. Es el único color de marca; usarlo
  con moderación (links, CTAs, tags).
- Serif `Instrument Serif` para títulos (`font-serif`), sans `Inter` para cuerpo.
- Fondo `bg-neutral-950`, texto `text-neutral-300`. Las escalas de gris hacen todo el trabajo.
- Ancho de lectura acotado (`max-w-2xl` en páginas de contenido).
- Animaciones vía `motion` en `components/motion/` (`FadeIn`, `StaggerChildren`, `ScrollProgress`).
  Sutiles, no decorativas.

## Voz y contenido

Español rioplatense con voseo. Directo, sin corporativismo, con cicatrices propias como evidencia.

**No reescribir la prosa de Pablo.** Si trae el texto de una edición, va tal cual: los giros y el
tono son la marca. Correcciones de tipeo sí; "mejorar" la redacción no.

La marca tiene compromisos explícitos escritos en las propias ediciones que acotan qué se puede
publicar o vender: la edición 1 dice *"Acá no hay cursos de $997. No coaches ni gurúes que no hacen
lo que enseñan"*, y la 30 desarma los podcasts de éxito y el survivorship bias. Cualquier cosa que
huela a infoproducto de gurú se contradice con el corpus. Vale la pena chequear el índice antes de
proponer copy o productos.

## Convenciones de código

- TypeScript en todo. Path alias `@/*` a la raíz.
- Server Components por defecto; `"use client"` solo donde hace falta estado o eventos
  (`nav`, `kit-form`, `copy-button`, `blog-filter`, `components/motion/*`).
- Datos de sitio centralizados en `lib/constants.ts` (`SITE`). No hardcodear URLs ni redes.
- Dependencias de producción mínimas y deliberadas. Antes de agregar una, verificar que no se
  resuelva con lo que ya hay.
- Todo estático, sin rutas de API. Desde noviembre 2026 el sitio no tiene formulario de
  newsletter (se sacó el de Buttondown); los únicos formularios son los de Kit de las guías de Garmin.

## Trampas conocidas

- **17 de las 39 ediciones tienen listas numeradas vacías** (`1.` `2.` `3.` sin texto) y algún bloque
  de código vacío: contenido perdido al convertir desde LinkedIn. No es un bug de render. Está
  inventariado en `indice-completo.json` → `revisar_manualmente.contenido_perdido_en_la_migracion`.
- Varios slugs viejos están truncados a ~80 caracteres por el script de conversión. Los slugs son
  URLs públicas e indexadas: **no renombrarlos**. Para posts nuevos, slug corto y legible.
- `date` debe ir entre comillas. Sin comillas, YAML lo parsea como fecha y el orden se rompe.
- El sitio es SSG: un cambio en contenido necesita rebuild/deploy para verse.
