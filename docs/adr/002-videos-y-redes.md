# Videos y redes dentro del sitio personal

Fecha: 2026-09-17

## Decisión

El sitio presenta también al Pablo que publica sobre correr, emigrar y vida
cotidiana. En Producción conserva su propuesta de newsletter enterprise e IA.
Esta iteración no incorpora productos, preventas ni una página del libro.

Se incorpora `/videos`, con una selección manual organizada por tema, tres
destacados en la home y enlaces a Instagram personal, TikTok y YouTube. Cocina
mantiene su cuenta independiente y una entrada visible desde la home y videos.

## Contenido y mantenimiento

- `lib/videos.ts` contiene las piezas seleccionadas, con una entrada por video.
- Los títulos y extractos provienen de los captions originales de Instagram,
  consultados en Metricool el 17 de septiembre de 2026. No se importan los títulos
  automáticos de OpusClip de TikTok o Shorts.
- `featured: true` determina los destacados de la home; mantener tres.
- Los perfiles sociales se mantienen en `lib/constants.ts`.
- Las tarjetas son de texto y enlazan a Instagram; no reproducen videos dentro
  del sitio. No dependen de imágenes temporales, embeds ni consultas a Metricool
  en producción. Instagram puede pedir inicio de sesión al abrir una publicación.
- Actualizar la selección requiere commit y deploy, igual que el contenido MDX.
- La prosa de las ediciones y las URLs de los posts se conservan.

## Trazabilidad

Separar el catálogo y la navegación, los cambios de home y esta documentación
en commits. Incluir solamente archivos de este trabajo; los cambios locales
preexistentes de configuración y skills quedan fuera.

## Próximas decisiones

Evaluar imágenes propias para las tarjetas y relaciones con artículos cuando
aporten contexto. No automatizar un feed diario ni agregar páginas de productos
antes de que haya contenido u ofertas reales que sostener.
