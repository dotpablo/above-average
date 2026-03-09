# Above Average — pablomarichal.com

> Personal brand site, blog y newsletter de Pablo Marichal.
> Senior SAP Tech Lead · AI Champion · 19x Marathoner · Full Stack Human.

**Sitio en vivo:** [pablomarichal.com](https://pablomarichal.com)
**Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · MDX · Vercel

---

## Tabla de contenidos

- [Por qué no WordPress](#por-qué-no-wordpress)
- [Arquitectura](#arquitectura)
- [Stack técnico](#stack-técnico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Contenido](#contenido)
- [Newsletter](#newsletter)
- [SEO](#seo)
- [Seguridad](#seguridad)
- [Cómo agregar un post](#cómo-agregar-un-post)
- [Deploy](#deploy)
- [Cómo se construyó](#cómo-se-construyó)

---

## Por qué no WordPress

Esta es la pregunta obvia. La respuesta honesta:

| WordPress + plugins | Este sitio |
|---|---|
| Base de datos MySQL que mantener | Sin base de datos — cero |
| 40+ plugins para funcionalidad básica | 7 dependencias de producción |
| Actualizaciones constantes con riesgo de romper todo | Actualización bajo demanda y controlada |
| Superficie de ataque enorme (SQLi, XSS, plugin vulns) | Sin servidor de aplicación expuesto |
| Hosting con PHP, cPanel, backups manuales | Deploy automático desde git push |
| Tiempo de carga 2-5s en promedio | Pages pre-generadas en build time, ~100ms TTFB |
| Costo: $15-50/mes mínimo para algo decente | Costo: $0 (Vercel free tier) |
| Lock-in con la plataforma | El contenido es markdown plano — portable a cualquier cosa |

La diferencia fundamental: WordPress es una aplicación que corre en un servidor. Este sitio es un conjunto de archivos HTML estáticos generados en tiempo de build y servidos desde un CDN global. No hay nada que hackear en runtime porque no hay runtime.

---

## Arquitectura

### Static Site Generation (SSG)

Todos los posts son archivos `.mdx` en `content/posts/`. En el momento del deploy, Next.js los lee, los compila y genera un archivo HTML por cada ruta. Vercel distribuye esos archivos desde edge nodes alrededor del mundo.

```
content/posts/*.mdx
       ↓ (build time)
Next.js lee frontmatter + contenido
       ↓
Genera /blog/[slug].html para cada post
       ↓
Vercel sube los HTML al CDN global
       ↓
Usuario recibe HTML pre-generado en <100ms
```

**No hay base de datos.** No hay servidor de aplicación. No hay queries en runtime. El único punto dinámico es el API route de suscripción al newsletter (`/api/subscribe`), que corre como función serverless aislada.

### Arquitectura de datos

```
content/
└── posts/
    └── *.mdx          ← fuente de verdad, controlada por git
                         frontmatter: title, date, description, archived

public/
├── images/            ← imágenes del sitio (logo, fotos, OG)
└── images/posts/      ← imágenes descargadas de LinkedIn (persistidas localmente)
```

El frontmatter de cada post controla todo:

```yaml
---
title: "Título del post"
date: "2026-03-03"
description: "Meta description SEO-optimizada, 130-155 chars"
source: "linkedin" | "substack"
archived: true        # opcional — oculta del listing pero accesible por URL
---
```

### Flujo de deploy

```
Edición en local o GitHub web editor
         ↓
git push → GitHub
         ↓
Vercel detecta el push (webhook)
         ↓
npm run build (~45s)
         ↓
HTML estático generado para 57 posts + 6 páginas
         ↓
Deploy a CDN global
         ↓
Tiempo total puerta a producción: ~90 segundos
```

---

## Stack técnico

### Core

| Tecnología | Versión | Rol |
|---|---|---|
| **Next.js** | 16.1.6 | Framework — App Router, SSG, API routes |
| **React** | 19.2.4 | UI |
| **TypeScript** | 5.9.3 | Type safety |
| **Tailwind CSS** | 4.2.1 | Estilos — sin CSS custom casi |
| **@tailwindcss/typography** | 0.5.19 | Prosa de posts (prose-invert) |

### Contenido

| Tecnología | Versión | Rol |
|---|---|---|
| **next-mdx-remote** | 6.0.0 | Renderiza MDX como RSC |
| **gray-matter** | 4.0.3 | Parsea frontmatter YAML |
| **reading-time** | 1.5.0 | Calcula tiempo de lectura |
| **date-fns** | 4.1.0 | Formateo de fechas en español |

### Infra

| Servicio | Plan | Rol |
|---|---|---|
| **Vercel** | Free | Hosting, CDN, serverless functions |
| **GitHub** | Free | Control de versiones, trigger de deploys |
| **Buttondown** | Free | Newsletter — API de suscripción |
| **Namecheap** | — | DNS — pablomarichal.com |

**Costo operativo mensual: $0.**

---

## Estructura del proyecto

```
above-average/
├── app/
│   ├── layout.tsx              # Root layout — fuentes, nav, footer
│   ├── page.tsx                # Home — hero, stats, topics, posts recientes
│   ├── globals.css             # Tailwind v4 config + theme tokens
│   ├── icon.png                # Favicon (Next.js App Router convention)
│   ├── robots.ts               # robots.txt generado
│   ├── sitemap.ts              # sitemap.xml generado
│   ├── about/page.tsx          # Página About
│   ├── blog/
│   │   ├── page.tsx            # Blog listing (paginado, página 1)
│   │   ├── page/[page]/        # Páginas 2-6
│   │   └── [slug]/page.tsx     # Post individual + JSON-LD Article
│   ├── recursos/
│   │   ├── page.tsx            # Índice de recursos
│   │   └── above-average-os/   # Above Average OS v1.0 — prompts de IA
│   └── api/
│       └── subscribe/route.ts  # Serverless function — Buttondown API
├── components/
│   ├── nav.tsx                 # Navegación
│   ├── footer.tsx              # Footer con redes sociales
│   ├── post-card.tsx           # Card de post en listing
│   └── newsletter-form.tsx     # Form de suscripción con estados
├── content/
│   └── posts/                  # 57 posts en MDX (25 archivados)
├── lib/
│   ├── posts.ts                # getAllPosts(), getPostBySlug()
│   └── constants.ts            # SITE config, social URLs
├── public/
│   ├── images/                 # Logo, fotos, OG image default
│   └── images/posts/           # 38 imágenes migradas de LinkedIn
└── scripts/                    # (gitignored) — scripts de migración
    ├── convert-articles.mjs    # LinkedIn HTML → MDX
    ├── convert-substack.mjs    # Substack HTML → MDX con dedup
    ├── update-dates.mjs        # Parseo de fechas desde Excel
    └── download-images.mjs     # Descarga imágenes de LinkedIn y actualiza MDX
```

---

## Contenido

### Migración

El contenido viene de tres fuentes consolidadas en MDX:

- **LinkedIn Articles (~38 posts):** Exportados desde LinkedIn Data Export, convertidos desde HTML a MDX con un script custom (`convert-articles.mjs`) que escapa caracteres especiales y limpia el markup.
- **Substack (~25 posts):** Exportados desde el panel de Substack como HTML, convertidos con `convert-substack.mjs` que incluye detección de duplicados por overlap de palabras (evita subir el mismo artículo en español e inglés como dos posts distintos).
- **Fechas:** Matcheadas desde un Excel de referencia usando fuzzy matching de títulos (`update-dates.mjs`).

**Resultado:** 57 posts, desde 2016 hasta hoy, toda la producción de contenido de Pablo consolidada en un repositorio git.

### Sistema de archivo

Los posts con `archived: true` en el frontmatter no aparecen en el listing del blog ni en el home, pero siguen siendo accesibles por URL directa. Esto permite:
- Mantener el SEO de URLs existentes
- No mostrar contenido viejo/débil en el listing principal
- Decidir cuándo "rescatar" un post archivado con una simple edición de frontmatter

### Imágenes

Las 38 imágenes que LinkedIn embebía en los posts con URLs que expiran fueron descargadas localmente a `public/images/posts/` y las referencias en los MDX actualizadas automáticamente. Los posts nunca van a tener imágenes rotas.

---

## Newsletter

Integración con [Buttondown](https://buttondown.com) via API REST desde una serverless function.

```
Usuario ingresa email → POST /api/subscribe
                              ↓
                    Validación básica (formato)
                              ↓
                    POST https://api.buttondown.com/v1/subscribers
                              ↓
                    201 → "Listo, bienvenido"
                    409 → "Ya estás suscrito"
                    otros → error genérico
```

La API key vive en `.env.local` (gitignored) y en las variables de entorno de Vercel. Nunca toca el cliente.

---

## SEO

Implementado directamente en Next.js sin plugins externos:

- **`generateMetadata()`** en cada ruta — title, description, OG, Twitter card
- **Canonical URLs** explícitas en cada post
- **JSON-LD `Person` schema** en el home — ayuda al Knowledge Panel de Google
- **JSON-LD `Article` schema** en cada post — fecha, autor, URL para rich results
- **`sitemap.xml`** generado automáticamente en cada build — incluye todos los posts activos y páginas principales
- **`robots.txt`** generado — permite todo, apunta al sitemap
- **Meta descriptions** escritas manualmente para los 15 posts más importantes (130-155 chars, keyword-first)
- **Google Search Console** verificado y sitemap submitido

---

## Seguridad

Sin base de datos no hay SQL injection. Sin plugins de terceros no hay supply chain attacks. La única superficie de ataque es el API endpoint de suscripción:

- Validación de formato de email antes de llamar a Buttondown
- API key nunca expuesta al cliente (server-side only)
- No se guarda ningún dato en el servidor — todo va directo a Buttondown
- Headers de seguridad manejados por Vercel automáticamente (HTTPS, HSTS)
- Sin autenticación = sin sesiones = sin cookies de sesión que robar
- Dependencias mínimas (7 en producción) = superficie de ataque mínima

---

## Cómo agregar un post

**Opción A — Desde GitHub (sin instalar nada):**
1. Ir a `github.com/dotpablo/above-average`
2. Navegar a `content/posts/`
3. Click en "Add file" → "Create new file"
4. Nombrar el archivo como `slug-del-post.mdx`
5. Escribir el frontmatter y el contenido
6. Commit — Vercel deploya en ~90 segundos

**Opción B — Desde local:**
```bash
# Crear el archivo
cat > content/posts/mi-nuevo-post.mdx << 'EOF'
---
title: "Título del post"
date: "2026-03-09"
description: "Meta description, 130-155 chars, keyword incluida"
source: "original"
---

Contenido en markdown...
EOF

# Deployar
git add content/posts/mi-nuevo-post.mdx
git commit -m "Post: título del post"
git push
```

---

## Deploy

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Variables de entorno necesarias
BUTTONDOWN_API_KEY=tu_api_key
```

El deploy en producción es automático: cualquier push a `main` en GitHub dispara un build en Vercel.

---

## Cómo se construyó

Este sitio fue construido de forma **completamente iterativa** usando IA como par de desarrollo, en sesiones de trabajo asíncronas sin un plan fijo de antemano.

### El proceso

**El problema inicial:** Pablo tenía su contenido fragmentado en LinkedIn (~38 artículos), Substack (~25 posts) y quería salir de Beehiiv, donde tenía el dominio pero sin lista de suscriptores. Necesitaba un sitio profesional que reflejara su posicionamiento real como Tech Lead especializado en SAP e IA.

**La solución:** En lugar de instalar WordPress o pagar por un SaaS, construimos un sitio estático desde cero con control total, costo cero y velocidad máxima.

### Las iteraciones principales

1. **ADR primero** — Antes de escribir una línea de código, definimos la arquitectura en un Architecture Decision Record. Framework (Next.js), contenido (MDX), newsletter (Buttondown), hosting (Vercel).

2. **Scaffold manual** — `create-next-app` tenía problemas con prompts interactivos. Scaffoldeamos manualmente con `npm init` + dependencias individuales.

3. **Debug de Tailwind** — Tailwind v4 requiere `@tailwindcss/postcss` y un `postcss.config.js` con extensión `.js` (no `.mjs` — Turbopack no lo resolvía). Encontrado y resuelto iterativamente.

4. **Migración de contenido** — Scripts de conversión HTML→MDX para LinkedIn y Substack. Problemas resueltos: caracteres `<` y `>` interpretados como JSX en MDX, fechas faltantes matcheadas desde Excel con fuzzy matching, duplicados detectados por overlap de palabras entre versiones ES/EN del mismo post.

5. **Imágenes de LinkedIn** — Las URLs de LinkedIn expiran. Script para descargar 38 imágenes localmente y actualizar todas las referencias en los MDX automáticamente.

6. **Identidad visual** — Logo con fondo transparente invertido (para fondo oscuro), fotos de perfil y corriendo, paleta neutral-950 oscura con tipografía serif + sans.

7. **Newsletter funcional** — API route serverless que llama a Buttondown, maneja 201/409/400 con mensajes diferenciados para el usuario (suscrito, ya suscrito, error).

8. **Posicionamiento** — Revisión del contenido real de los posts para entender los temas reales (no "crecimiento personal" sino supervivencia tech en la era IA, SAP enterprise, Full Stack Human, vegetalización de Sadin). Reescritura del home y About en consecuencia.

9. **Limpieza editorial** — Agente de IA revisó 57 posts y eliminó todos los CTAs de LinkedIn/newsletter ("respondé este email", "te leo en los comentarios", "¿Arrancamos?", hashtags, emojis en headers). Los posts ahora leen como artículos, no como reposts.

10. **SEO técnico** — robots.txt, sitemap completo, JSON-LD schemas (Person + Article), canonical URLs, Twitter cards, 15 meta descriptions reescritas a mano.

11. **Above Average OS v1.0** — Recurso existente en Notion (sin tráfico) migrado al sitio, traducido al español, reformateado como página con bloques de código de prompts listos para copiar.

### Herramientas de IA usadas

- **[Claude Code](https://claude.ai/code) (Anthropic)** — Par de desarrollo principal. Arquitectura, código, scripts de migración, debugging, SEO, edición masiva de contenido con agentes en background.
- **[Antigravity](https://antigravity.ai) con Gemini 2.5 Pro** — Sesiones complementarias cuando se agotaban los créditos de Claude. Mismo flujo iterativo, diferente modelo.

### Lo que esto demuestra

Un profesional con criterio técnico + IA como par de desarrollo puede construir en horas lo que antes requería semanas de desarrollo o miles de dólares en agencias. El resultado no es un MVP frágil — es un sitio en producción con:

- Performance de primer nivel (HTML estático, CDN global)
- SEO técnico completo
- 57 artículos migrados desde 2016
- Newsletter funcional integrado
- Costo operativo de $0/mes
- Mantenimiento que cualquier persona con acceso a GitHub puede hacer

La clave no fue el código. Fue saber qué construir, por qué, y delegar la ejecución correctamente.

---

*Built with [Claude Code](https://claude.ai/code) + [Antigravity](https://antigravity.ai). Deployed on Vercel. Content owned by Pablo Marichal.*
