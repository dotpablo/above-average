#!/usr/bin/env bash
# Trae al libro las ediciones nuevas publicadas en el sitio.
# Correr desde la raíz del repo del libro, después de publicar en pablomarichal.com.
#
#   bin/sync-corpus.sh
#
set -euo pipefail

SITIO="$HOME/ClaudeApps/webpablo"

if [ ! -d corpus/ediciones ]; then
  echo "Corré esto desde la raíz del repo del libro."
  exit 1
fi

antes=$(ls corpus/ediciones/*.mdx 2>/dev/null | wc -l | tr -d ' ')

# El índice siempre se pisa: es el mapa y tiene que reflejar el sitio.
cp "$SITIO/INDICE.md" corpus/
cp "$SITIO/indice-completo.json" corpus/

# Las ediciones: solo las que faltan. No se pisan las que ya están, para que
# una corrección en el sitio no te cambie una cita que ya usaste en un capítulo.
nuevas=()
for f in "$SITIO"/content/posts/*.mdx; do
  base=$(basename "$f")
  if [ ! -f "corpus/ediciones/$base" ]; then
    cp "$f" corpus/ediciones/
    nuevas+=("$base")
  fi
done

despues=$(ls corpus/ediciones/*.mdx | wc -l | tr -d ' ')

echo "Corpus: $antes -> $despues ediciones"
if [ ${#nuevas[@]} -eq 0 ]; then
  echo "Sin ediciones nuevas."
else
  printf '  + %s\n' "${nuevas[@]}"
  echo
  echo "Decile a Claude: 'entraron ediciones nuevas al corpus, decime si"
  echo "alguna aporta escena o dato a algún capítulo ya escrito.'"
fi
