/**
 * Redimensiona/comprime heroes que PageSpeed marca como sobredimensionados.
 * Uso: node scripts/optimize-pagespeed-images.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Display ~662×490 a 1.5–2× retina en columna hero (~50vw). */
const JOBS = [
  {
    rel: "public/img/hero/taller-barna-eva.webp",
    width: 1200,
    height: 750,
    quality: 74,
  },
  {
    rel: "public/img/hero/taller-barna.webp",
    width: 960,
    height: 600,
    quality: 72,
  },
  {
    rel: "public/img/hero/oratoria.webp",
    width: 960,
    height: 600,
    quality: 72,
  },
  {
    rel: "public/img/hero/conflictos.webp",
    width: 960,
    height: 600,
    quality: 72,
  },
  {
    rel: "public/img/hero/taller-equipos.webp",
    width: 960,
    height: 600,
    quality: 72,
  },
];

function kib(n) {
  return `${(n / 1024).toFixed(1)} KiB`;
}

for (const job of JOBS) {
  const file = path.join(ROOT, job.rel);
  if (!fs.existsSync(file)) {
    console.warn("SKIP missing", job.rel);
    continue;
  }
  const before = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  const buf = await sharp(file)
    .resize(job.width, job.height, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: job.quality, effort: 5 })
    .toBuffer();

  if (buf.length >= before && (meta.width ?? 0) <= job.width) {
    console.log(`${job.rel}: sin cambio (ya óptimo)`);
    continue;
  }

  const stagingDir = path.join(ROOT, "scripts", "_img-opt");
  const staging = path.join(stagingDir, path.basename(job.rel));
  fs.mkdirSync(stagingDir, { recursive: true });
  fs.writeFileSync(staging, buf);
  try {
    fs.copyFileSync(staging, file);
  } catch {
    console.warn(
      `WARN: no se pudo sobrescribir ${job.rel} (archivo bloqueado). Quedó en ${staging}`,
    );
    continue;
  }
  fs.unlinkSync(staging);
  const afterMeta = await sharp(file).metadata();
  console.log(
    `${job.rel}: ${meta.width}x${meta.height} ${kib(before)} → ${afterMeta.width}x${afterMeta.height} ${kib(buf.length)}`,
  );
}
