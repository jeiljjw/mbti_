// Measures pairwise Jaccard similarity over word sets of the <noscript>
// fallback (unique per-pair title+description). This is a weak proxy — the
// real uniqueness gate is src/utils/uniqueness.test.ts over full rendered
// text. Threshold here only guards against a broken prerender (all identical).
// Run: node scripts/check-duplicate-content.mjs (after prerender)
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const LANGS = ['ko', 'en', 'ja'];
const TYPES = ['istj', 'isfj', 'infj', 'intj', 'istp', 'isfp', 'infp', 'intp', 'estp', 'esfp', 'enfp', 'entp', 'estj', 'esfj', 'enfj', 'entj'];

const pairs = [];
for (let i = 0; i < TYPES.length; i++)
  for (let j = i; j < TYPES.length; j++)
    pairs.push(`${[TYPES[i], TYPES[j]].sort().join('-')}`);

const wordsOf = (html) => {
  const m = html.match(/<noscript>([\s\S]*?)<\/noscript>/);
  const text = (m ? m[1] : html.replace(/<[^>]+>/g, ' ')).replace(/<[^>]+>/g, ' ').toLowerCase();
  return new Set(text.split(/[^a-z0-9\uac00-\ud7af\u3040-\u30ff]+/).filter((w) => w.length > 1));
};
const jaccard = (a, b) => {
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter || 1);
};

let checked = 0;
let missing = 0;
for (const lang of LANGS) {
  const sets = [];
  for (const pair of pairs) {
    const f = join(dist, lang, 'match', pair, 'index.html');
    if (!existsSync(f)) { missing++; continue; }
    sets.push(wordsOf(readFileSync(f, 'utf8')));
  }
  // Sample pairs (full 136x136 = 9k comparisons x3 langs is fine, keep full).
  let sum = 0;
  let n = 0;
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      sum += jaccard(sets[i], sets[j]);
      n++;
    }
  }
  const mean = n ? sum / n : 1;
  console.log(`${lang}: ${sets.length} match pages, mean noscript Jaccard=${mean.toFixed(3)}`);
  checked++;
  if (mean >= 0.9) {
    console.error(`FAIL: ${lang} match pages too similar (mean ${mean.toFixed(3)} >= 0.9). Prerender likely broken.`);
    process.exit(1);
  }
}
if (missing > 0) console.log(`note: ${missing} prerendered match files missing (build first?)`);
console.log(`duplicate check passed (${checked} langs)`);
