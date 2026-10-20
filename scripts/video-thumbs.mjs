#!/usr/bin/env node
/**
 * video-thumbs.mjs — baja la miniatura de un reel de Instagram y muestra su caption.
 *
 *   node scripts/video-thumbs.mjs DeaRpjTzX4U [otro-id ...]
 *   node scripts/video-thumbs.mjs --check     # verifica que cada video de lib/videos.ts tenga miniatura
 *
 * La miniatura sale de los meta og: de la página pública del reel, así que no
 * hace falta login ni token. La URL del CDN viene firmada y vence: por eso se
 * guarda el archivo en public/images/videos/<id>.jpg en vez de linkearla.
 */
import { writeFile, readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = path.join(RAIZ, "public/images/videos");
const UA = "facebookexternalhit/1.1";

async function caption(id) {
  const u = `https://www.instagram.com/api/v1/oembed/?url=https://www.instagram.com/reel/${id}/`;
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) return null;
    return (await r.json()).title ?? null;
  } catch {
    return null;
  }
}

async function bajar(id) {
  const html = await (
    await fetch(`https://www.instagram.com/reel/${id}/`, { headers: { "User-Agent": UA } })
  ).text();

  const m = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!m) throw new Error("no se encontró og:image (¿reel privado o id mal escrito?)");

  const url = m[1].replace(/&amp;/g, "&");
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  if (img.length < 1000) throw new Error(`la imagen vino vacía (${img.length} bytes)`);

  const out = path.join(DESTINO, `${id}.jpg`);
  await writeFile(out, img);
  return { out, bytes: img.length };
}

/**
 * Verifica dos cosas distintas:
 *   1. que cada video de lib/videos.ts tenga su miniatura en el repo
 *   2. que el reel siga publicado (si lo borras o lo pasas a privado, la
 *      tarjeta queda linkeando a un 404 y la miniatura local lo disimula)
 */
async function check({ remoto = true } = {}) {
  const src = await readFile(path.join(RAIZ, "lib/videos.ts"), "utf8");
  const ids = [...src.matchAll(/^\s*id: "([^"]+)"/gm)].map((m) => m[1]);
  const sinThumb = [];
  const caidos = [];

  for (const id of ids) {
    try {
      await access(path.join(DESTINO, `${id}.jpg`));
    } catch {
      sinThumb.push(id);
    }
  }

  if (remoto) {
    const res = await Promise.all(
      ids.map(async (id) => {
        try {
          const r = await fetch(`https://www.instagram.com/reel/${id}/`, {
            headers: { "User-Agent": UA },
            redirect: "follow",
          });
          return { id, ok: r.ok };
        } catch {
          return { id, ok: null }; // red caida: no lo contamos como roto
        }
      })
    );
    caidos.push(...res.filter((r) => r.ok === false).map((r) => r.id));
  }

  for (const id of sinThumb) console.log(`  SIN MINIATURA  ${id}`);
  for (const id of caidos) console.log(`  REEL CAIDO     ${id}  (borrado o privado)`);

  const problemas = sinThumb.length + caidos.length;
  console.log(
    problemas === 0
      ? `OK — ${ids.length} videos, todos con miniatura y publicados`
      : `${problemas} problema(s) en ${ids.length} videos`
  );
  process.exit(problemas === 0 ? 0 : 1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    [
      "Uso:",
      "  node scripts/video-thumbs.mjs <reel-id> [...]   baja miniatura + imprime el caption",
      "  node scripts/video-thumbs.mjs --check           verifica miniaturas y que los reels sigan vivos",
      "  node scripts/video-thumbs.mjs --check --local   igual pero sin pegarle a Instagram",
      "",
      "El id es lo que va despues de /reel/ en la URL del posteo.",
    ].join("\n")
  );
  process.exit(1);
}
if (args[0] === "--check") await check({ remoto: !args.includes("--local") });

for (const id of args) {
  try {
    const { out, bytes } = await bajar(id);
    console.log(`OK  ${path.relative(RAIZ, out)}  (${Math.round(bytes / 1024)} KB)`);
    const c = await caption(id);
    if (c) {
      console.log("\n--- caption, para armar la entrada en lib/videos.ts ---");
      console.log(c.split("\n").slice(0, 6).join("\n"));
      console.log("---\n");
    }
  } catch (e) {
    console.error(`ERROR ${id}: ${e.message}`);
  }
}
