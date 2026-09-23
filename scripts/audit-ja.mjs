import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const walkFiles = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walkFiles(p, out);
    else if (/\.(tsx?|ts)$/.test(e.name)) out.push(p);
  }
  return out;
};

console.log('--- ko/en 분기 + ja 미처리 의심 ---');
for (const f of walkFiles('src')) {
  const src = readFileSync(f, 'utf8');
  const koEn = src.includes("=== 'ko'") || src.includes('=== "ko"');
  const ja = src.includes("'ja'") || src.includes('"ja"');
  if (koEn && !ja) console.log(f);
}

console.log('--- ja 번역키 결손 ---');
const ja = JSON.parse(readFileSync('src/locales/ja/translation.json', 'utf8'));
const en = JSON.parse(readFileSync('src/locales/en/translation.json', 'utf8'));
const keys = (o, path = '') =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null && !Array.isArray(v) ? keys(v, path + k + '.') : [path + k]);
const jaKeys = new Set(keys(ja));
console.log(keys(en).filter((k) => !jaKeys.has(k)).join('\n') || 'none');
