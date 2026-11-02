#!/usr/bin/env python3
"""
Backfill de la bitácora: recupera todo lo hablado ANTES de que existiera el hook.

Lee los transcripts que Claude Code ya guarda en
~/.claude/projects/-Users-pablomarichal-ClaudeApps-webpablo/*.jsonl
y los vuelca en orden cronológico a notas/bitacora.md.

Se corre una sola vez (es idempotente: reescribe el archivo completo). De ahí en
adelante el hook Stop de bin/bitacora.py se encarga de ir agregando.

Uso:
    python3 bin/bitacora-backfill.py            # escribe notas/bitacora.md
    python3 bin/bitacora-backfill.py --resumen  # solo lista las sesiones
"""

import datetime as dt
import json
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
TRANSCRIPTS = pathlib.Path.home() / ".claude" / "projects" / (
    "-" + str(RAIZ).lstrip("/").replace("/", "-")
)
BITACORA = RAIZ / "notas" / "bitacora.md"
ESTADO = RAIZ / ".bitacora-state.json"
MAX_LINEA = 40_000


def texto_de(msg: dict) -> str:
    contenido = msg.get("message", {}).get("content")
    if isinstance(contenido, str):
        return contenido.strip()
    if isinstance(contenido, list):
        partes = [
            b.get("text", "")
            for b in contenido
            if isinstance(b, dict) and b.get("type") == "text"
        ]
        return "\n".join(p for p in partes if p).strip()
    return ""


def es_ruido(txt: str) -> bool:
    if not txt:
        return True
    t = txt.lstrip()
    return t.startswith(("<command-name>", "<local-command", "<system-reminder>"))


def leer_sesion(ruta: pathlib.Path) -> dict | None:
    """Devuelve {inicio, fin, bloques, ultimo_uuid} o None si no hay conversación."""
    lineas = []
    with open(ruta, encoding="utf-8") as fh:
        for linea in fh:
            try:
                lineas.append(json.loads(linea))
            except Exception:
                continue
    if not lineas:
        return None

    bloques, sellos = [], []
    for m in lineas:
        if m.get("timestamp"):
            sellos.append(m["timestamp"])
        tipo = m.get("type")
        if tipo not in ("user", "assistant"):
            continue
        if m.get("isMeta") or m.get("isSidechain"):
            continue
        txt = texto_de(m)
        if tipo == "user":
            if es_ruido(txt):
                continue
            bloques.append(("Pablo", m.get("timestamp", ""), txt))
        elif txt:
            bloques.append(("Claude", m.get("timestamp", ""), txt))

    if not bloques:
        return None
    return {
        "inicio": sellos[0] if sellos else "",
        "fin": sellos[-1] if sellos else "",
        "bloques": bloques,
        "ultimo_uuid": next(
            (m["uuid"] for m in reversed(lineas) if m.get("uuid")), None
        ),
        "id": ruta.stem,
    }


def local(sello: str) -> str:
    """ISO UTC -> hora local legible."""
    if not sello:
        return "?"
    try:
        t = dt.datetime.fromisoformat(sello.replace("Z", "+00:00"))
        return t.astimezone().strftime("%Y-%m-%d %H:%M")
    except Exception:
        return sello[:16]


def main() -> int:
    if not TRANSCRIPTS.is_dir():
        print(f"No encuentro los transcripts en {TRANSCRIPTS}", file=sys.stderr)
        return 1

    sesiones = [s for s in (leer_sesion(f) for f in sorted(TRANSCRIPTS.glob("*.jsonl"))) if s]
    sesiones.sort(key=lambda s: s["inicio"])

    if "--resumen" in sys.argv:
        for s in sesiones:
            pablo = sum(1 for q, _, _ in s["bloques"] if q == "Pablo")
            print(
                f"{local(s['inicio'])} → {local(s['fin'])}  "
                f"{pablo:>3} turnos de Pablo, {len(s['bloques']) - pablo:>3} respuestas  "
                f"[{s['id'][:8]}]"
            )
        return 0

    BITACORA.parent.mkdir(parents=True, exist_ok=True)
    with open(BITACORA, "w", encoding="utf-8") as fh:
        fh.write(
            "# Bitácora\n\n"
            "Registro de las sesiones de trabajo sobre el sitio.\n"
            "Lo escribe un hook Stop (`bin/bitacora.py`); no editar a mano salvo para borrar.\n\n"
            f"El histórico hasta {local(sesiones[-1]['fin']) if sesiones else '?'} "
            "se reconstruyó con `bin/bitacora-backfill.py` desde los transcripts de Claude Code.\n"
        )
        for s in sesiones:
            fh.write(
                f"\n\n---\n\n## {local(s['inicio'])} → {local(s['fin'])}\n\n"
                f"<!-- sesión {s['id']} -->\n"
            )
            for quien, sello, txt in s["bloques"]:
                if len(txt) > MAX_LINEA:
                    txt = txt[:MAX_LINEA] + "\n\n*[…recortado]*"
                fh.write(f"\n### {quien} · {local(sello)}\n\n{txt}\n")

    # Sembrar el estado para que el hook no vuelva a volcar lo ya escrito.
    estado = {s["id"]: s["ultimo_uuid"] for s in sesiones if s["ultimo_uuid"]}
    ESTADO.write_text(json.dumps(estado, indent=2) + "\n", encoding="utf-8")

    total = sum(len(s["bloques"]) for s in sesiones)
    print(
        f"{len(sesiones)} sesiones, {total} intercambios → {BITACORA.relative_to(RAIZ)} "
        f"({BITACORA.stat().st_size / 1024:.0f} KB)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
