// Generates per-type OG PNGs (1200x630) + generic match card.
// Mirror of src/constants/theme.ts TYPE_THEMES. Run: node scripts/generate-og.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

const THEMES = {
  INTJ: ['#a855f7', '#6366f1'], INTP: ['#8b5cf6', '#22d3ee'],
  ENTJ: ['#c026d3', '#7c3aed'], ENTP: ['#a855f7', '#ec4899'],
  INFJ: ['#34d399', '#22d3ee'], INFP: ['#4ade80', '#a3e635'],
  ENFJ: ['#2dd4bf', '#4ade80'], ENFP: ['#4ade80', '#22d3ee'],
  ISTJ: ['#38bdf8', '#6366f1'], ISFJ: ['#38bdf8', '#2dd4bf'],
  ESTJ: ['#60a5fa', '#818cf8'], ESFJ: ['#38bdf8', '#f472b6'],
  ISTP: ['#fbbf24', '#f97316'], ISFP: ['#fbbf24', '#ec4899'],
  ESTP: ['#fb923c', '#ef4444'], ESFP: ['#facc15', '#fb7185'],
};

const en = JSON.parse(readFileSync(join(root, 'src', 'locales', 'en', 'translation.json'), 'utf8'));
const names = {};
for (const [code] of Object.entries(THEMES)) names[code] = en.results.types[code].name;

const card = (big, sub, from, to) => `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1020"/><stop offset="1" stop-color="#0c1f2a"/>
    </linearGradient>
    <linearGradient id="tx" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="gl" cx="0.5" cy="0.45" r="0.6">
      <stop offset="0" stop-color="${from}" stop-opacity="0.35"/><stop offset="1" stop-color="${from}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#gl)"/>
  <rect width="1200" height="14" fill="url(#tx)"/>
  <text x="600" y="120" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="600" letter-spacing="8" fill="#ffffff" opacity="0.55">SIMPLEMBTI.COM</text>
  <text x="600" y="420" text-anchor="middle" font-family="sans-serif" font-size="230" font-weight="800" fill="url(#tx)">${big}</text>
  <text x="600" y="510" text-anchor="middle" font-family="sans-serif" font-size="52" font-weight="700" fill="#ffffff">${sub}</text>
</svg>`;

const jobs = [];
for (const [code, [from, to]] of Object.entries(THEMES)) {
  const file = join(outDir, `${code.toLowerCase()}.png`);
  jobs.push(sharp(Buffer.from(card(code, names[code], from, to))).png().toFile(file).then(() => console.log('og', code)));
}
jobs.push(
  sharp(Buffer.from(card('VS', 'MBTI Compatibility', '#4ade80', '#a855f7'))).png().toFile(join(outDir, 'match.png')).then(() => console.log('og match'))
);
const TIERS = {
  excellent: ['EXCELLENT', '#4ade80', '#22d3ee'],
  good: ['GOOD', '#38bdf8', '#4ade80'],
  average: ['AVERAGE', '#fbbf24', '#fb923c'],
  challenging: ['GROWTH', '#fb7185', '#a855f7'],
};
for (const [tier, [big, from, to]] of Object.entries(TIERS)) {
  jobs.push(
    sharp(Buffer.from(card(big, 'MBTI Compatibility', from, to))).png().toFile(join(outDir, `match-${tier}.png`)).then(() => console.log('og', tier))
  );
}
await Promise.all(jobs);
console.log('done:', jobs.length, 'images');
