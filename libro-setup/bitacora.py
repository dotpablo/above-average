#!/usr/bin/env python3
"""
Bitácora automática del proyecto del libro.

Lo dispara un hook Stop: cada vez que Claude termina de responder, este script
lee el transcript de la sesión, saca el intercambio nuevo (lo que preguntaste y
lo que respondió, sin tool calls ni razonamiento interno) y lo agrega a
notas/bitacora.md.

No filtra por tema: no hace falta. Vive en el repo del libro, así que todo lo
que se habla acá es sobre el libro. El filtro es la carpeta, no una heurística.

Recibe el JSON del hook por stdin. Nunca falla ruidosamente: si algo sale mal,
sale con 0 y no interrumpe la sesión.
"""

import datetime as dt
import json
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
BITACORA = RAIZ / "notas" / "bitacora.md"
ESTADO = RAIZ / ".bitacora-state.json"
MAX_LINEA = 40_000  # corta respuestas absurdamente largas


def cargar_estado() -> dict:
    try:
        return json.loads(ESTADO.read_text(encoding="utf-8"))
    except Exception:
        return {}


def texto_de(msg: dict) -> str:
    """Saca el texto legible de un mensaje. Ignora tool_use, tool_result y thinking."""
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
    """Prompts que no son conversación: comandos, reminders del sistema, vacíos."""
    if not txt:
        return True
    t = txt.lstrip()
    return t.startswith(("<command-name>", "<local-command", "<system-reminder>"))


def main() -> int:
    try:
        entrada = json.load(sys.stdin)
    except Exception:
        return 0

    ruta = entrada.get("transcript_path")
    sesion = entrada.get("session_id", "sin-sesion")
    if not ruta or not pathlib.Path(ruta).exists():
        return 0

    lineas = []
    with open(ruta, encoding="utf-8") as fh:
        for linea in fh:
            try:
                lineas.append(json.loads(linea))
            except Exception:
                continue

    estado = cargar_estado()
    ultimo = estado.get(sesion)

    # Arrancar después del último uuid ya registrado. Si no lo encuentra
    # (sesión nueva, compactada o reanudada), toma solo el final para no
    # duplicar media conversación.
    inicio = 0
    if ultimo:
        for i, m in enumerate(lineas):
            if m.get("uuid") == ultimo:
                inicio = i + 1
                break
        else:
            inicio = max(0, len(lineas) - 40)

    nuevos = lineas[inicio:]
    if not nuevos:
        return 0

    bloques = []
    for m in nuevos:
        tipo = m.get("type")
        if tipo not in ("user", "assistant"):
            continue
        txt = texto_de(m)
        if tipo == "user":
            if es_ruido(txt):
                continue
            bloques.append(("Pablo", txt))
        elif txt:
            bloques.append(("Claude", txt))

    if not bloques:
        # Igual guardamos la posición: así no se reprocesa en la próxima vuelta.
        if nuevos and nuevos[-1].get("uuid"):
            estado[sesion] = nuevos[-1]["uuid"]
            ESTADO.write_text(json.dumps(estado, indent=2) + "\n", encoding="utf-8")
        return 0

    BITACORA.parent.mkdir(parents=True, exist_ok=True)
    nueva = not BITACORA.exists()
    ahora = dt.datetime.now()

    with open(BITACORA, "a", encoding="utf-8") as fh:
        if nueva:
            fh.write(
                "# Bitácora\n\n"
                "Registro automático de las sesiones de trabajo sobre el libro.\n"
                "Lo escribe un hook Stop; no editar a mano salvo para borrar.\n"
            )
        fh.write(f"\n\n---\n\n## {ahora:%Y-%m-%d %H:%M}\n")
        for quien, txt in bloques:
            if len(txt) > MAX_LINEA:
                txt = txt[:MAX_LINEA] + "\n\n*[…recortado]*"
            fh.write(f"\n### {quien}\n\n{txt}\n")

    if nuevos and nuevos[-1].get("uuid"):
        estado[sesion] = nuevos[-1]["uuid"]
        ESTADO.write_text(json.dumps(estado, indent=2) + "\n", encoding="utf-8")

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
