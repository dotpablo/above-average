#!/usr/bin/env bash
# Crea el repo del libro y le copia la cantera. Se corre una sola vez.
#
#   bash ~/ClaudeApps/webpablo/libro-setup/setup.sh
#
set -euo pipefail

SITIO="$HOME/ClaudeApps/webpablo"
LIBRO="$HOME/ClaudeApps/libro"

if [ -d "$LIBRO" ]; then
  echo "Ya existe $LIBRO. Si querés empezar de cero, movelo o borralo primero."
  exit 1
fi

echo "==> Creando $LIBRO"
mkdir -p "$LIBRO"/{corpus,manuscrito,notas,bin}
cd "$LIBRO"
git init -q

echo "==> Copiando la cantera (solo lectura)"
cp "$SITIO/INDICE.md" corpus/
cp "$SITIO/indice-completo.json" corpus/
cp -r "$SITIO/content/posts" corpus/ediciones

echo "==> Copiando reglas y herramientas"
cp "$SITIO/libro-setup/CLAUDE.md" .
# El brief vive en el repo del libro, no acá. Si estás re-bootstrapeando,
# recuperalo del git de la carpeta vieja antes de borrarla.
if [ -f "$SITIO/libro-brief.md" ]; then
  cp "$SITIO/libro-brief.md" .
else
  echo "    (sin libro-brief.md: su copia vive en el repo del libro)"
fi
cp "$SITIO/libro-setup/sync-corpus.sh" bin/
cp "$SITIO/libro-setup/progreso.py" bin/
cp "$SITIO/libro-setup/bitacora.py" bin/
chmod +x bin/sync-corpus.sh

mkdir -p .claude
cat > .claude/settings.json <<'EOF'
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/bin/bitacora.py\"",
            "timeout": 20
          }
        ]
      }
    ]
  }
}
EOF

cat > .gitignore <<'EOF'
.DS_Store
notas/borradores-descartados/
.bitacora-state.json
EOF

cat > manuscrito/00-estructura.md <<'EOF'
# Estructura

Este archivo es el mapa del libro y lo único que se toca antes de escribir capítulos.
Ver `libro-brief.md` sección 3: los grupos de solapamiento del índice son los capítulos
candidatos.

## Tesis en una oración

<!-- Pablo: escribila acá. Punto de partida del corpus:
     "La ejecución sobra en la era de la IA. El contexto no." -->

## Lector

Profesional de 40+ en una organización grande, viendo llegar la IA a su trabajo.
No es el consultor SAP.

## Capítulos

<!-- Uno por línea, con la idea en una oración. Reordenar libremente.
     Cuando un capítulo se empieza a escribir, crear NN-slug.md acá al lado. -->

1.
2.
3.
EOF

# Estado inicial del tracker: objetivo y fecha, editables a mano.
cat > .progreso.json <<'EOF'
{
  "objetivo_palabras": 60000,
  "deadline": null,
  "historial": {}
}
EOF

git add -A
git commit -qm "chore: scaffold del proyecto del libro"

echo
echo "Listo. Ahora:"
echo "  cd $LIBRO"
echo "  python3 bin/progreso.py --deadline 2027-03-31   # fijá tu fecha"
echo "  claude"
