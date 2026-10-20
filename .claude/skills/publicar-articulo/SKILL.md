---
name: publicar-articulo
description: Publicar una nueva edición del newsletter Above Average. Crea el .mdx en content/posts/ y actualiza INDICE.md e indice-completo.json en la raíz. Usar cuando Pablo diga que vamos a publicar un artículo, una edición o un post nuevo del newsletter.
---

# Publicar una edición de Above Average

Tres pasos, en este orden: **crear el post → actualizar los dos índices → validar**. El deploy y el email son un cuarto paso opcional que solo se corre si Pablo lo pide.

Los índices se generaron el 2026-08-03 con un criterio específico. Este skill existe para que cada edición nueva entre con exactamente el mismo criterio y no haya que rederivarlo.

---

## Paso 0 — Antes de escribir nada

Leé `INDICE.md` completo. Necesitás:
- el número de la última edición (fila de arriba de la tabla) → la nueva es **ese número + 1**
- las tesis existentes, para el chequeo de solapamiento del paso 2

Si Pablo trae el texto del artículo, usalo tal cual. **No reescribas su prosa.** El rioplatense, el voseo y los giros son la marca.

---

## Paso 1 — Crear `content/posts/<slug>.mdx`

Frontmatter exacto, en este orden:

```yaml
---
title: "Título tal cual se publica"
date: "YYYY-MM-DD"
description: "2-3 oraciones. Es lo que sale en el listado del blog, en el OG y en el email."
source: "linkedin"
category: "Enterprise & AI Survival"
---
```

**`slug`**: minúsculas, sin tildes ni ñ, palabras con guiones. Derivalo del título. Si queda de más de ~80 caracteres, cortalo — hay precedentes truncados en el repo (`por-que-tu-tia-te-pregunta-si-tenes-trabajo-manual-para-estar-listo-para-renunci`), pero para posts nuevos preferí un slug corto y legible.

**`category`** (el valor literal del frontmatter, que no es idéntico al nombre del pilar):

| Pilar | Valor en `category` |
|---|---|
| Enterprise & AI Survival | `Enterprise & AI Survival` |
| Builder Mindset | `The Builder Mindset` |
| Biological Clean Core | `Biological Clean Core` |
| Full Stack Human | `The Full Stack Human` |

Usá `The Full Stack Human` con artículo — hay una edición vieja (la 30) que quedó sin él y es una inconsistencia, no un precedente.

**Cierre del cuerpo**: la convención es `Pablo / Above Average`, y después una P.D. corta invitando a reenviar. Si el artículo cita datos, agregá al final una sección `**Referencias:**` con lista de viñetas — autor, título, medio y fecha. Esa sección es de donde después sale `fuentes_clave`, así que vale la pena que esté.

Si el post lleva imágenes, van en `public/images/posts/`.

---

## Paso 2 — Actualizar los dos índices

### `indice-completo.json`

Insertá el objeto nuevo **al principio del array `ediciones`** (está ordenado de más reciente a más antiguo) y subí `meta.total_ediciones` en uno. Campos:

- **`edicion`** — último + 1.
- **`fecha`** — `YYYY-MM-DD`.
- **`titulo`** — tal cual el frontmatter.
- **`slug`** — sin `.mdx`.
- **`pilar`** — el nombre canónico de la tabla de arriba, no el valor del frontmatter.
- **`tesis`** — **una sola oración, máximo 20 palabras.** Es la idea que el artículo *defiende*, no un resumen de lo que contiene. Sacala del texto: casi siempre está en la frase de cierre, en un blockquote, o es la idea que se repite. Si tenés que inventar una síntesis propia, es que no la encontraste — releé el cierre.
  - Bien: «El titular elige el verbo que le conviene a quien vende.»
  - Mal: «Habla sobre un incidente de OpenAI y sobre modelos abiertos.»
- **`temas`** — string, **entre 4 y 8** keywords en minúscula separadas por coma. Incluí nombres propios (empresas, papers, personas citadas): son los que hacen la búsqueda útil. Ojo: ninguna keyword puede contener una coma interna (`0,04%` rompe el conteo — usá `0.04%`).
- **`fuentes_clave`** — array de 3-4 strings con medio y fecha, sacadas de la sección `Referencias`. Si el artículo no cita nada rastreable, poné **`null`** y agregá la entrada en `revisar_manualmente.sin_fuentes_identificables`. Si cita datos sin atribuir (una estadística suelta, un gráfico «visto en LinkedIn»), va en `revisar_manualmente.fuentes_incompletas`.
- **`enlaza_a`** — array de slugs de **otras ediciones** referenciadas dentro del texto. Cuentan «la semana pasada escribí sobre X», «hace unos meses hablamos de Y» y los links a LinkedIn que apuntan a una edición previa. **No cuentan** los links a artículos viejos de LinkedIn/Substack que no son ediciones del newsletter. Array vacío `[]` si no hay ninguna — no `null`.

### Chequeo de solapamiento (esto es el valor real del índice)

Compará la tesis nueva contra las tesis ya listadas. Si se parece a alguna:

- **Ya existe el grupo** → agregá el número nuevo al array `ediciones` de ese grupo en `solapamiento_tematico` y actualizá el `detalle`.
- **Es un grupo nuevo** → creá la entrada con `grupo`, `ediciones`, `nivel` (`medio` / `alto` / `muy alto`) y `detalle` explicando en qué se pisan.

Reservá `muy alto` para repetición literal: párrafos casi idénticos, la misma lista de reglas, el mismo framing en semanas consecutivas. **Decíselo a Pablo en la respuesta.** Es exactamente el dato que pidió tener a mano.

También revisá si la edición nueva usa la frase-firma «El que entiende los fundamentos orquesta. El que no, es orquestado.» — ya va en cuatro cierres y está trackeada como grupo estilístico.

### `INDICE.md`

1. **Fila nueva** arriba de todo en la tabla principal. Columnas: `Ed. | Fecha | Título | Pilar | Tesis | Slug`. El slug va entre backticks. Si el título es muy largo, cortalo con `…` (hay precedentes).
2. **Encabezado**: actualizá el conteo de ediciones.
3. **Distribución por pilar**: recalculá la tabla de conteos y porcentajes. Si el reparto cambia de forma relevante, ajustá la observación que va debajo (hoy dice que Biological Clean Core está casi sin cubrir).
4. **Solapamiento temático**: reflejá lo mismo que pusiste en el JSON.
5. **REVISAR MANUALMENTE**: agregá la edición a las secciones que correspondan (sin fuentes, fuentes incompletas, clasificación dudosa). Si no aplica ninguna, no toques nada.

---

## Paso 3 — Validar

```bash
python3 .claude/skills/publicar-articulo/validar.py
```

Chequea: JSON parseable, numeración consecutiva sin huecos, todo slug existe como `.mdx`, ningún `enlaza_a` apunta a un slug inexistente, tesis ≤20 palabras, temas entre 4 y 8, `total_ediciones` correcto y que la fila esté en `INDICE.md`. Si falla algo, arreglalo antes de seguir.

---

## Paso 4 — Deploy y email (solo si Pablo lo pide)

Ya existe `scripts/publish.mjs`. **No dupliques su lógica.**

Ojo con un detalle: `publish.mjs` hace `git add content/posts/<slug>.mdx` y después `git commit`. No stagea los índices. Para que entren en el mismo commit, stagealos vos antes:

```bash
git add INDICE.md indice-completo.json
node scripts/publish.mjs <slug> --draft
```

Flags: `--draft` crea el borrador en Buttondown sin enviar (por defecto), `--send` manda el email ya, `--schedule "2026-08-11T09:00:00-03:00"` lo programa.

**Por defecto usá `--draft`.** Mandar un email a la lista es irreversible: `--send` solo si Pablo lo pide explícitamente.

---

## Reglas que no se negocian

- **No inventes datos.** Si un campo no sale del archivo, va `null` y a la sección REVISAR MANUALMENTE. Vale para fuentes, fechas y números de edición.
- **La tesis sale del texto**, no de tu interpretación libre.
- **No toques los `.mdx` de ediciones ya publicadas.** El skill solo agrega.
- **No renumeres nada.** Si aparece un hueco de calendario, anotalo en `revisar_manualmente.numeracion_incierta`; no recalcules ediciones viejas.
- El criterio de inclusión del índice son **ediciones en español**. Si se publica una traducción al inglés, va a `content/posts-en/` y **no** entra en el índice (hay tres traducciones sueltas en `content/posts/` que están excluidas por esto mismo).
