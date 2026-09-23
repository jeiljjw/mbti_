// Builds public/SEOUL.ico (multi-size, PNG-compressed entries) + public/SEOUL.png
// from public/SEOUL.svg. Run: node scripts/generate-SEOUL.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public', 'SEOUL.svg'));

const sizes = [16, 32, 48, 256];
const pngs = [];
for (const s of sizes) {
  const buf = await sharp(svg, { density: 512 }).resize(s, s).png().toBuffer();
  pngs.push({ size: s, buf });
}

// ICO: header + per-image dir entries + PNG payloads.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);
const entries = [];
let offset = 6 + 16 * pngs.length;
for (const { size, buf } of pngs) {
  const e = Buffer.alloc(16);
  e.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  e.writeUInt8(size >= 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bit depth
  e.writeUInt32LE(buf.length, 8); // payload size
  e.writeUInt32LE(offset, 12); // payload offset
  entries.push(e);
  offset += buf.length;
}
writeFileSync(
  join(root, 'public', 'SEOUL.ico'),
  Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)])
);

// 512px PNG fallback for modern browsers.
const big = await sharp(svg, { density: 512 }).resize(512, 512).png().toBuffer();
writeFileSync(join(root, 'public', 'SEOUL.png'), big);

// Manifest / PWA icons (single source of truth = SEOUL.svg).
for (const s of [192, 512]) {
  const buf = await sharp(svg, { density: 512 }).resize(s, s).png().toBuffer();
  writeFileSync(join(root, 'public', 'icons', `icon-${s}.png`), buf);
}
console.log('SEOUL.ico + SEOUL.png written');
