import { readFileSync, writeFileSync } from 'node:fs';

// In matchContent.ts, Korean lines accidentally contain the kanji 同士.
// Replace with 끼리 on lines that have Hangul but no Japanese kana.
const p = 'src/utils/matchContent.ts';
const lines = readFileSync(p, 'utf8').split('\n');
let n = 0;
const out = lines.map((line) => {
  if (!line.includes('同士')) return line;
  if (/[\u3040-\u30ff]/.test(line)) return line; // Japanese line, keep
  n++;
  return line.split('同士').join('끼리');
});
writeFileSync(p, out.join('\n'));
console.log(`fixed ${n} lines`);
