#!/usr/bin/env python3
"""Valida la consistencia de INDICE.md e indice-completo.json contra content/posts/.

Uso:  python3 .claude/skills/publicar-articulo/validar.py
Sale con codigo 1 si hay errores.
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))
JSON_PATH = os.path.join(ROOT, "indice-completo.json")
MD_PATH = os.path.join(ROOT, "INDICE.md")
POSTS_DIR = os.path.join(ROOT, "content", "posts")
POSTS_EN_DIR = os.path.join(ROOT, "content", "posts-en")

PILARES = {
    "Enterprise & AI Survival",
    "Builder Mindset",
    "Biological Clean Core",
    "Full Stack Human",
}

errores = []
avisos = []


def main():
    if not os.path.exists(JSON_PATH):
        print(f"FALTA {JSON_PATH}")
        return 1

    try:
        with open(JSON_PATH, encoding="utf-8") as fh:
            data = json.load(fh)
    except json.JSONDecodeError as exc:
        print(f"JSON invalido: {exc}")
        return 1

    eds = data.get("ediciones", [])
    if not eds:
        errores.append("el array 'ediciones' esta vacio")
        return report()

    md = open(MD_PATH, encoding="utf-8").read() if os.path.exists(MD_PATH) else ""
    if not md:
        errores.append("INDICE.md no existe o esta vacio")

    slugs = {e.get("slug") for e in eds}

    # --- orden y numeracion ---------------------------------------------------
    nums = [e.get("edicion") for e in eds]
    esperado = list(range(len(eds), 0, -1))
    if nums != esperado:
        errores.append(
            f"numeracion: se esperaba {len(eds)}..1 de mas reciente a mas antigua, "
            f"se encontro {nums[:5]}..."
        )

    fechas = [e.get("fecha", "") for e in eds]
    if fechas != sorted(fechas, reverse=True):
        errores.append("las ediciones no estan ordenadas de mas reciente a mas antigua")

    total = data.get("meta", {}).get("total_ediciones")
    if total != len(eds):
        errores.append(f"meta.total_ediciones={total} pero hay {len(eds)} ediciones")

    # --- por edicion ----------------------------------------------------------
    for e in eds:
        n = e.get("edicion", "?")
        slug = e.get("slug", "")

        for campo in ("edicion", "fecha", "titulo", "slug", "pilar", "tesis", "temas"):
            if not e.get(campo):
                errores.append(f"ed. {n}: falta el campo '{campo}'")

        # Una edicion puede vivir en content/posts/ (español) o en
        # content/posts-en/ (las que Pablo escribio directamente en ingles).
        if slug and not (
            os.path.exists(os.path.join(POSTS_DIR, slug + ".mdx"))
            or os.path.exists(os.path.join(POSTS_EN_DIR, slug + ".mdx"))
        ):
            errores.append(f"ed. {n}: no existe el .mdx de {slug} en posts/ ni en posts-en/")

        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", e.get("fecha", "")):
            errores.append(f"ed. {n}: fecha '{e.get('fecha')}' no es YYYY-MM-DD")

        if e.get("pilar") not in PILARES:
            errores.append(f"ed. {n}: pilar '{e.get('pilar')}' no es uno de los cuatro")

        tesis = e.get("tesis") or ""
        palabras = len(tesis.split())
        if palabras > 20:
            errores.append(f"ed. {n}: la tesis tiene {palabras} palabras (max 20)")
        # una oracion: se permite punto y coma, no un segundo punto seguido
        if re.search(r"[.!?]\s+\S", tesis):
            avisos.append(f"ed. {n}: la tesis parece tener mas de una oracion")

        temas = [t.strip() for t in (e.get("temas") or "").split(",") if t.strip()]
        if not 4 <= len(temas) <= 8:
            errores.append(
                f"ed. {n}: {len(temas)} temas (deben ser entre 4 y 8; "
                "cuidado con comas dentro de una keyword)"
            )
        if any(t != t.lower() for t in temas):
            avisos.append(f"ed. {n}: hay temas con mayusculas")

        fuentes = e.get("fuentes_clave", "__falta__")
        if fuentes == "__falta__":
            errores.append(f"ed. {n}: falta el campo 'fuentes_clave' (usa null si no hay)")
        elif fuentes is None:
            listadas = {
                x.get("edicion")
                for x in data.get("revisar_manualmente", {})
                .get("sin_fuentes_identificables", [])
            }
            if n not in listadas:
                errores.append(
                    f"ed. {n}: fuentes_clave es null pero no esta en "
                    "revisar_manualmente.sin_fuentes_identificables"
                )
        elif not isinstance(fuentes, list) or not fuentes:
            errores.append(f"ed. {n}: fuentes_clave debe ser una lista no vacia o null")

        enlaces = e.get("enlaza_a", "__falta__")
        if enlaces == "__falta__":
            errores.append(f"ed. {n}: falta el campo 'enlaza_a' (usa [] si no hay)")
        elif not isinstance(enlaces, list):
            errores.append(f"ed. {n}: enlaza_a debe ser una lista (vacia si no hay)")
        else:
            for link in enlaces:
                if link not in slugs:
                    errores.append(f"ed. {n}: enlaza_a apunta a '{link}', que no es una edicion")
                if link == slug:
                    errores.append(f"ed. {n}: enlaza_a se apunta a si misma")

        if md and slug and slug not in md:
            errores.append(f"ed. {n}: el slug no aparece en INDICE.md")

    # --- duplicados -----------------------------------------------------------
    for campo in ("slug", "edicion", "fecha"):
        vistos, dup = set(), set()
        for e in eds:
            v = e.get(campo)
            (dup if v in vistos else vistos).add(v)
        if dup:
            nivel = avisos if campo == "fecha" else errores
            nivel.append(f"{campo} duplicado: {sorted(map(str, dup))}")

    # --- cobertura: posts en el repo que no estan en el indice ---------------
    excluidos = set(data.get("meta", {}).get("excluidos_conocidos", []))
    if os.path.isdir(POSTS_DIR):
        for fn in os.listdir(POSTS_DIR):
            if not fn.endswith(".mdx"):
                continue
            slug = fn[:-4]
            if slug in slugs or slug in excluidos:
                continue
            fecha = ""
            with open(os.path.join(POSTS_DIR, fn), encoding="utf-8") as fh:
                for line in fh:
                    if line.startswith("date:"):
                        fecha = line.split('"')[1] if '"' in line else ""
                        break
            if fecha and fecha >= min(fechas):
                avisos.append(
                    f"{slug} ({fecha}) es posterior al lanzamiento y no esta en el indice "
                    "— confirmar si es una edicion o una traduccion/archivo"
                )

    return report()


def report():
    for a in avisos:
        print(f"  aviso   {a}")
    for e in errores:
        print(f"  ERROR   {e}")
    if errores:
        print(f"\n{len(errores)} error(es). Corregir antes de publicar.")
        return 1
    print(f"\nOK — indice consistente ({len(avisos)} aviso(s)).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
