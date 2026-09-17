# Bitácora del sitio

## 2026-09-17 — Videos, redes y presentación personal

### Implementado

- `/videos`: seis piezas seleccionadas por tema, con captions originales de
  Instagram como fuente. Se evitan los títulos autogenerados de OpusClip.
- Home: tres videos destacados, presentación personal ampliada y entrada a
  Pablo cocinando. Se conserva el posicionamiento profesional y En Producción.
- Navegación y footer: acceso a videos, TikTok y ambas cuentas de Instagram.
- Sitemap: incorporación de `/videos`.
- Frase de home: «La ejecución sobra en la era de la IA. El criterio y el contexto no.»
- Decisiones y mantenimiento: `docs/adr/002-videos-y-redes.md`.
- Commits iniciales: `c430f20` (videos y redes), `c17822c` (home),
  `30abc7a` (documentación). Pablo autorizó el deploy a producción.

### Criterio para futuras rotaciones

Revisar aproximadamente una vez al mes. Comparar publicaciones de antigüedad
similar, atendiendo a guardados, compartidos y conversaciones además del alcance.
Mantener variedad temática y tres destacados. No cambiar por cambiar: conservar
una pieza si sigue representando bien a Pablo. Verificar el caption original,
los enlaces y el sentido del video antes de incluirlo. Registrar cada rotación
en esta bitácora y en un commit. Validar el build antes de publicar.

### Estado y propuestas pendientes

- Pablo publica un video diario; no hay libro ni producto comercial disponible.
- Las métricas consultadas vienen de la marca personal de Metricool. Cocina no
  apareció conectada en esa marca; no se inferirán resultados de esa cuenta.
- LinkedIn es el origen actual de los escritos; luego se archivan en la web.
- Substack: propuesta de probar una selección durante seis a ocho semanas,
  aprovechando conversación y descubrimiento. No se autorizó crear publicaciones,
  importar suscriptores ni cambiar Buttondown. El exportador existente
  `scripts/export-ghost.mjs` trabaja con contenido en inglés, no es una migración
  preparada de las ediciones en español.
- No hay rotación automática de videos: este documento registra el procedimiento
  para la próxima revisión.

### Validación

La primera integración pasó TypeScript y el build de producción (192 páginas).
Se inspeccionaron la home y `/videos` en navegador local. Los archivos locales
preexistentes de configuración y skills se mantuvieron fuera de los commits.
