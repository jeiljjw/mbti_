// Generates lightweight .webp display variants alongside original PNGs
// (OG meta keeps pointing at PNGs — scrapers don't accept webp).
// Run: node scripts/generate-webp.mjs
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'public/blog/relationship.png',
  'public/blog/career.png',
  'public/blog/stress.png',
  'public/mbti_dashboard_mockup.png',
  'public/MBTI Background.webp',
  'public/1.webp',
  'public/2.webp',
  'public/3.webp',
];

for (const f of files) {
  const src = join(root, f);
  const out = src.replace(/\.(png|webp)$/, '.display.webp');
  const meta = await sharp(src).metadata();
  await sharp(src).webp({ quality: 78 }).toFile(out);
  console.log(f, `${meta.width}x${meta.height}`, '->', out.split('public/')[1]);
}
