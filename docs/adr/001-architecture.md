# ADR-001: Arquitectura de Above Average

**Estado:** Propuesto
**Fecha:** 2026-03-05
**Actualizado:** 2026-03-05

## Contexto

Migrar pablomarichal.com desde Beehiiv a un sitio propio en Next.js + Vercel.
Pablo Marichal: uruguayo (vivio muchos anos en Venezuela), ex-SAP, corredor de 19 maratones, creador de Above Average.
El sitio es su marca personal y plataforma de contenido (blog/newsletter).

**Requisitos clave:**
- Migrar dominio pablomarichal.com de Beehiiv a Vercel
- Migrar articulos de LinkedIn (~22) y de Substack
- Newsletter con suscripcion (sin lista previa — empezar de cero)
- Free tier de Vercel ($0/mes)
- Diseño minimalista, limpio, sobrio
- Fácil de administrar para publicar contenido

---

## Decisiones

### 1. Framework: Next.js 15 (App Router)

- App Router con React Server Components: cero JS innecesario en el cliente.
- SSG puro con `generateStaticParams` — sitio 100% estático.
- Deploy trivial en Vercel, bien dentro del free tier.

### 2. Contenido: MDX local en Git

- Posts como archivos `.mdx` en `/content/posts/`.
- Frontmatter con: title, date, description, tags, slug, issue (numero de newsletter).
- Parseo con `next-mdx-remote` + `gray-matter`.
- **Trade-off**: publicar = commit + push. Aceptable para un solo autor. Si en el futuro molesta, se puede añadir un CMS headless (Keystatic, Tina) sin reescribir nada — los MDX son portables.

### 3. Newsletter: Buttondown (gratis, simple)

**Abandonar Beehiiv** — no hay suscriptores, no hay infraestructura de envio armada. Empezar limpio.

- **Buttondown** (free tier: hasta 100 suscriptores, sin marca de agua):
  - API simple para suscripciones desde el sitio (`/api/subscribe` → Buttondown API).
  - Soporta markdown/HTML para emails.
  - Permite importar suscriptores si crecen.
  - Cuando supere 100 subs: $9/mes (escalable).
- Formulario de suscripcion en el sitio (Home + footer de cada post).
- El contenido vive en el sitio (MDX) — Buttondown solo envia el email con link al post.

**Por que no Substack**: Substack quiere ser tu plataforma, no tu herramienta. Buttondown es API-first, se integra limpio con un sitio propio.

### 4. Styling: Tailwind CSS v4

- `@tailwindcss/typography` (clase `prose`) para renderizar articulos con tipografia de lectura.
- Paleta minimalista: blanco/negro/gris con un accent color sutil.
- Sin libreria de componentes. Componentes propios minimos.
- Responsive mobile-first.

### 5. Diseño y marca "Above Average"

- **Tono visual**: minimalista, limpio, sobrio. Mucho espacio blanco.
- **Tipografia**: serif elegante para headings (ej. Playfair Display o Lora), sans limpia para body (ej. Inter).
- **Layout**: centrado, max-width ~720px para lectura comoda.
- **Nav**: simple — Home | Blog | About. Sin hamburger menu en desktop.
- **Footer**: links sociales (LinkedIn, Twitter/X) + link a newsletter.

### 6. Estructura de paginas

```
/                     → Home: quien sos, thesis de Above Average, CTA newsletter
/blog                 → Lista de los 22+ articulos, ordenados por fecha
/blog/[slug]          → Articulo individual con prose styling
/about                → Tu historia: Uruguay → Venezuela → SAP → 19 maratones → Above Average
```

### 7. Estructura del proyecto

```
/
├── app/
│   ├── layout.tsx              # Layout raiz (nav, footer, fonts, metadata global)
│   ├── page.tsx                # Home
│   ├── blog/
│   │   ├── page.tsx            # Lista de posts
│   │   └── [slug]/
│   │       └── page.tsx        # Post individual
│   ├── about/
│   │   └── page.tsx
│   ├── sitemap.ts              # Sitemap auto-generado
│   └── feed.xml/
│       └── route.ts            # RSS feed
├── content/
│   └── posts/                  # 22+ archivos .mdx
│       ├── mi-primer-post.mdx
│       └── ...
├── components/
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── post-card.tsx           # Card para lista de blog
│   ├── newsletter-form.tsx     # Formulario de suscripcion
│   └── mdx-components.tsx      # Componentes custom para MDX
├── lib/
│   ├── posts.ts                # getAllPosts, getPostBySlug
│   └── constants.ts            # Metadata del sitio
├── public/
│   ├── og-default.png          # OG image por defecto
│   └── images/                 # Imagenes de posts
└── docs/
    └── adr/
```

### 8. SEO

- `generateMetadata` en cada pagina con title, description, OG tags.
- OG images: imagen estatica por defecto, opcionalmente generada con `next/og`.
- `sitemap.ts` auto-generado desde la lista de posts.
- RSS feed en `/feed.xml`.
- Canonical URLs apuntando a pablomarichal.com.

### 9. Analytics: ninguna por ahora

- Sin analytics al lanzar. Mantener el sitio simple.
- Cuando haga falta: Vercel Analytics (incluido en free tier) o Plausible.

### 10. Dependencias

```
next react react-dom
tailwindcss @tailwindcss/typography
next-mdx-remote gray-matter
date-fns
```

Nada mas hasta que haga falta.

---

## Migracion de dominio: Beehiiv → Vercel

### Paso a paso

**Fase 1: Preparar el sitio nuevo (antes de tocar DNS)**
1. Crear el proyecto Next.js y deployar en Vercel.
2. Verificar que funciona en el dominio temporal de Vercel (*.vercel.app).
3. Migrar articulos de LinkedIn y Substack a archivos MDX.

**Fase 2: Configurar dominio en Vercel**
4. En Vercel Dashboard → tu proyecto → Settings → Domains → agregar `pablomarichal.com`.
5. Vercel te dara los DNS records necesarios (generalmente un A record y/o CNAME).

**Fase 3: Cambiar DNS en Namecheap**
6. Ir a Namecheap → Domain List → pablomarichal.com → Manage → Advanced DNS.
7. Eliminar los Host Records que apuntan a Beehiiv (probablemente un CNAME o A record).
8. Agregar estos records:
   - **A Record**: Host `@` → Value `76.76.21.21` → TTL Automatic
   - **CNAME Record**: Host `www` → Value `cname.vercel-dns.com` → TTL Automatic
9. Si Namecheap tiene "Namecheap Web Redirect" o "URL Redirect" activos, desactivarlos.
10. Propagacion DNS: 5 min a 48 horas (tipicamente < 30 min con Namecheap).
11. Vercel auto-provisiona SSL (HTTPS) una vez que detecta el DNS.

**Fase 4: Verificar**
11. Visitar pablomarichal.com — debe cargar el sitio nuevo.
12. Verificar HTTPS funciona.
13. Verificar redirects de www → apex (o viceversa).

### Importante antes de migrar DNS
- **No cancelar Beehiiv** hasta verificar que el sitio nuevo funciona con el dominio.
- No hay suscriptores que exportar — se empieza de cero con Buttondown.

---

## Migracion de contenido: LinkedIn + Substack → MDX

### LinkedIn (~22 articulos)

LinkedIn no tiene API publica para exportar posts. Opciones:

1. **Exportar datos de LinkedIn** (recomendado):
   - LinkedIn → Settings → Data Privacy → Get a copy of your data → seleccionar "Posts".
   - LinkedIn envia un ZIP con tus posts en formato CSV/JSON en ~24-72 horas.
   - Luego convertimos ese export a archivos MDX con un script.

2. **Manual con asistencia de IA**:
   - Copiar/pegar cada articulo de LinkedIn.
   - Pasarlos por un script que genera el MDX con frontmatter.
   - Mas tedioso pero inmediato.

3. **Scraping del perfil publico**:
   - Posible pero fragil y contra los ToS de LinkedIn.
   - No recomendado.

### Substack

- Substack si permite exportar: Settings → Export → Download CSV con todos los posts.
- El CSV incluye titulo, contenido (HTML), fecha, URL.
- Script de conversion: HTML → MDX con frontmatter.

### Plan de accion

1. **Ahora**: solicitar el export de datos de LinkedIn (tarda dias).
2. **Ahora**: exportar posts de Substack (inmediato).
3. **Mientras tanto**: construir el sitio con 2-3 posts de ejemplo.
4. **Cuando lleguen los datos**: correr script de conversion y poblar `/content/posts/`.

---

## Consecuencias

- **Positivas**: costo $0, control total del diseño y contenido, performance excelente (estatico), SEO optimizado, sin vendor lock-in.
- **Trade-offs**: publicar requiere commit + push (mitigable con CMS headless en el futuro).
- **Riesgos**: downtime breve durante migracion DNS (~minutos si se hace bien).

---

## Alternativas descartadas

| Alternativa | Razon |
|---|---|
| Astro | Buen fit para blogs, pero Next.js da mas flexibilidad para features interactivas futuras |
| WordPress/Ghost | Hosting innecesario, mas complejidad, costo |
| Notion como CMS | API inestable, latencia, sin control |
| Contentlayer | Proyecto sin mantenimiento activo |
| Beehiiv | Sin suscriptores, sin infra armada — no hay razon para mantenerlo |
| Substack como newsletter | Quiere ser plataforma, no herramienta. Buttondown es API-first y se integra mejor con sitio propio |
