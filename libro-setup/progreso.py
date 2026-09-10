#!/usr/bin/env python3
"""
Tracker de avance del libro. Sin dependencias, sin servidor, sin cuenta en ningún lado.

    python3 bin/progreso.py                      # estado de hoy (y lo registra)
    python3 bin/progreso.py --deadline 2027-03-31
    python3 bin/progreso.py --objetivo 60000
    python3 bin/progreso.py --historial          # últimos 30 días

Cuenta las palabras de manuscrito/*.md (menos 00-estructura.md, que es andamiaje),
las compara contra el objetivo y la fecha, y te dice a qué ritmo tenés que ir.
Guarda un snapshot por día en .progreso.json para poder mostrar la racha.
"""

import argparse
import datetime as dt
import json
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ESTADO = RAIZ / ".progreso.json"
MANUSCRITO = RAIZ / "manuscrito"
EXCLUIDOS = {"00-estructura.md"}


def contar(texto: str) -> int:
    """Palabras reales: sin comentarios HTML, sin encabezados markdown, sin marcas."""
    texto = re.sub(r"<!--.*?-->", " ", texto, flags=re.S)
    texto = re.sub(r"```.*?```", " ", texto, flags=re.S)
    texto = re.sub(r"^#{1,6}\s+.*$", " ", texto, flags=re.M)
    texto = re.sub(r"[*_`>#\[\]()]", " ", texto)
    return len(texto.split())


def capitulos() -> list[tuple[str, int]]:
    if not MANUSCRITO.is_dir():
        return []
    out = []
    for f in sorted(MANUSCRITO.glob("*.md")):
        if f.name in EXCLUIDOS:
            continue
        out.append((f.name, contar(f.read_text(encoding="utf-8"))))
    return out


def cargar() -> dict:
    if ESTADO.exists():
        return json.loads(ESTADO.read_text(encoding="utf-8"))
    return {"objetivo_palabras": 60000, "deadline": None, "historial": {}}


def guardar(d: dict) -> None:
    ESTADO.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def racha(historial: dict, hoy: dt.date) -> int:
    """Días consecutivos, hacia atrás desde hoy, con al menos una palabra más que el día previo."""
    n = 0
    d = hoy
    while True:
        k, kp = d.isoformat(), (d - dt.timedelta(days=1)).isoformat()
        if k not in historial:
            break
        if historial[k] <= historial.get(kp, 0):
            break
        n += 1
        d -= dt.timedelta(days=1)
    return n


def barra(frac: float, ancho: int = 32) -> str:
    frac = max(0.0, min(1.0, frac))
    lleno = int(round(frac * ancho))
    return "█" * lleno + "·" * (ancho - lleno)


def main() -> int:
    p = argparse.ArgumentParser(add_help=True)
    p.add_argument("--deadline", help="fecha objetivo, YYYY-MM-DD")
    p.add_argument("--objetivo", type=int, help="palabras objetivo")
    p.add_argument("--historial", action="store_true", help="mostrar los últimos 30 días")
    args = p.parse_args()

    est = cargar()
    if args.deadline:
        try:
            dt.date.fromisoformat(args.deadline)
        except ValueError:
            print("Fecha inválida. Usá YYYY-MM-DD.")
            return 1
        est["deadline"] = args.deadline
    if args.objetivo:
        est["objetivo_palabras"] = args.objetivo

    hoy = dt.date.today()
    caps = capitulos()
    total = sum(n for _, n in caps)
    est["historial"][hoy.isoformat()] = total
    guardar(est)

    if args.historial:
        print("\n  Últimos 30 días\n")
        items = sorted(est["historial"].items())[-30:]
        prev = None
        for fecha, n in items:
            delta = "" if prev is None else f"{n - prev:+6d}"
            print(f"  {fecha}  {n:>7,}  {delta}")
            prev = n
        print()
        return 0

    objetivo = est["objetivo_palabras"]
    print()
    print(f"  {barra(total / objetivo if objetivo else 0)}  {total:,} / {objetivo:,}")
    print()

    if caps:
        print("  Capítulos")
        for nombre, n in caps:
            print(f"    {nombre:<40} {n:>7,}")
        print()
    else:
        print("  Todavía no hay capítulos en manuscrito/.")
        print("  El primero se llama 01-<slug>.md\n")

    ayer = est["historial"].get((hoy - dt.timedelta(days=1)).isoformat())
    if ayer is not None:
        d = total - ayer
        print(f"  Hoy: {d:+,} palabras" + ("  (todavía nada)" if d == 0 else ""))
    r = racha(est["historial"], hoy)
    if r:
        print(f"  Racha: {r} día{'s' if r != 1 else ''} seguidos escribiendo")

    if est["deadline"]:
        fin = dt.date.fromisoformat(est["deadline"])
        dias = (fin - hoy).days
        faltan = max(0, objetivo - total)
        print()
        if dias < 0:
            print(f"  Deadline {fin} vencido hace {-dias} días. Faltan {faltan:,} palabras.")
            print("  Movela con --deadline y seguí. Una fecha vencida que no se mueve deja de ser fecha.")
        elif faltan == 0:
            print(f"  Objetivo alcanzado, con {dias} días de margen. Ahora viene editar,")
            print("  que es la mitad del trabajo y no cuenta palabras: las saca.")
        else:
            ritmo = faltan / max(1, dias)
            print(f"  Deadline {fin}  ·  {dias} días  ·  faltan {faltan:,} palabras")
            print(f"  Ritmo necesario: {ritmo:,.0f} palabras/día ({ritmo * 7:,.0f} por semana)")
            if ritmo > 1500:
                print("  Ese ritmo no es sostenible con un trabajo full time. Mové la fecha o bajá el objetivo.")
    else:
        print()
        print("  Sin deadline. Poné una:  python3 bin/progreso.py --deadline YYYY-MM-DD")
    print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
