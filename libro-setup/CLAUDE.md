# CLAUDE.md — el libro

Proyecto del libro de Pablo Marichal, working title **Above Average**.
Leé `libro-brief.md` antes de hacer nada: tiene el inventario del corpus, la tesis,
el esqueleto de capítulos y los huecos.

## Reparto de trabajo

**Pablo escribe. Claude no escribe la prosa de Pablo.** El rioplatense, el voseo y los
giros son la marca. Correcciones de tipeo sí; "mejorar" la redacción no. Si un párrafo
hay que reescribirlo, se le dice a Pablo qué está fallando y por qué — no se lo reemplaza.

Lo que sí hace Claude, y es donde aporta de verdad:

- Buscar en `corpus/` la escena, el dato o el párrafo que sirve para lo que se está escribiendo.
- Marcar repeticiones: qué está diciendo este capítulo que ya dijo otro.
- Verificar datos y fuentes contra las ediciones originales.
- Señalar argumentos que no se sostienen, saltos lógicos y afirmaciones sin respaldo.
- Mantener `manuscrito/00-estructura.md` al día.
- Preguntar. Sobre todo por las escenas: el detalle concreto siempre lo tiene Pablo.

## Reglas duras

- **El lector es el profesional de 40+ en una organización grande**, no el consultor SAP.
  Si algo solo se entiende sabiendo SAP, o se traduce o se va. SAP es el escenario, no el tema.
- **No identificar al empleador.** Sin cargo exacto, sin nombre de empresa, sin premios
  internos, sin nacionalidad de directivos, sin información no pública. La formulación
  aprobada es "tech lead en corporaciones grandes". Sostenerla en 200 páginas es más difícil
  que en 3.000 palabras: es la regla que más caro sale romper.
- **Nada de AI slop.** La prueba de cada párrafo: ¿esto lo podría haber escrito alguien que
  no vivió esto? Si sí, sobra.
- **Nada que huela a infoproducto de gurú.** La edición 1 del newsletter dice *"Acá no hay
  cursos de $997. No coaches ni gurúes que no hacen lo que enseñan"* y la 30 desarma el
  survivorship bias. El libro no puede contradecir al corpus.
- **Ninguna edición entra entera.** Lo que se reusa es la escena y el dato, no el artículo.
  Las ediciones abren con la noticia de la semana; eso muere en seis meses. La escena no caduca.
- **La honestidad intelectual se conserva y se distribuye.** Las secciones "Antes de que me
  des la razón" son lo mejor del newsletter, pero repetidas en cada capítulo se vuelven
  fórmula: el índice ya marca que la 41 y la 42 usan un párrafo casi textual.

## Estructura

```
corpus/            solo lectura — no editar nunca
  INDICE.md              mapa curado de las ediciones
  indice-completo.json   tesis, temas, fuentes, cruces, solapamiento
  ediciones/             los .mdx tal como se publicaron
manuscrito/        el libro
  00-estructura.md       mapa: tesis, lector, capítulos
  NN-slug.md             un archivo por capítulo
notas/             investigación, entrevistas, descartes
  bitacora.md            log automático de las sesiones (lo escribe el hook Stop)
bin/               herramientas
```

## Comandos

```bash
python3 bin/progreso.py              # avance, ritmo necesario, racha
python3 bin/progreso.py --historial  # últimos 30 días
bin/sync-corpus.sh                   # traer ediciones nuevas del sitio
```

## Bitácora

Un hook `Stop` (`.claude/settings.json` → `bin/bitacora.py`) registra cada intercambio en
`notas/bitacora.md`: lo que preguntó Pablo y lo que respondió Claude, sin tool calls ni
razonamiento interno. No hay que hacer nada para que funcione.

No filtra por tema y no hace falta: todo lo que se habla en este repo es sobre el libro.
Si una conversación no debería quedar registrada, borrá esa entrada del archivo a mano.

## Rutina de sesión

1. `python3 bin/progreso.py` para ver dónde está.
2. Un capítulo por vez. No abrir el siguiente hasta que el anterior tenga un borrador entero,
   por malo que sea.
3. Al cerrar: commit con lo que se avanzó. El historial de git del manuscrito importa —
   permite ver qué se sacó y recuperarlo.

## Contexto del sitio (`~/ClaudeApps/webpablo`)

El sitio se llama **Pablo Marichal**; el newsletter, **En Producción**; **Above Average**
quedó como el nombre del sistema y de este libro. Las ediciones firman `Pablo / En Producción`.
El sitio sigue publicando los martes: `bin/sync-corpus.sh` trae lo nuevo.
